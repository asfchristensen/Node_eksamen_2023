<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { user } from "../../stores/userGlobals.js";
    import { navigate, Link } from "svelte-navigator";
    import { post } from "../../api/api.js";
    import LoadingButton from "../LoadingButton/LoadingButton.svelte";

    import toastr from "toastr";

    let email = "bob@mail.dk";
    let password = "bob123";
    let loginOK = false;

    async function handleLogin() {
        const userToJSON = JSON.stringify({ email, password });
        const url = $BASE_URL + "/api/auth/login";
   
       const result = await post(url, userToJSON);
       console.log("result", result.data.role);

        if (result.message) {
            toastr.error("Wrong email or password. Try again." );
        } else {
            localStorage.setItem("user",JSON.stringify(result.data));
            user.set(result.data);
            loginOK = true;
            setTimeout(() => {
                navigate("/newsfeed", {replace: true});
                loginOK = false;
            }, 2500);
        }
        email = "";
        password = "";
        console.log($user)
    }

    function handleNavigateToSignup() {
        navigate("/signup", {replace: true});
    }

</script>


<div class="auth">
    <form on:submit|preventDefault={handleLogin}>
        <input type="email" placeholder="email" name="email" bind:value={email} required>
        <input type="password" placeholder="password" name="password" bind:value={password} required>
        <Link style="font-size: medium;" to="/forgot-password">Forgot password?</Link>
        <LoadingButton action={loginOK} loadingTitle="Logging in..." title="Log in"/>
    </form>
    <hr>
    <button class="secondary" on:click={handleNavigateToSignup}>Sign up</button>
</div>

<style>
    .auth { margin: 10%; }
    
    button { margin-top: 1em; }
</style>