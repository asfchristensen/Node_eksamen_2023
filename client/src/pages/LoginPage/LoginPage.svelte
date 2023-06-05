<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { user } from "../../stores/userGlobals.js";
    import { navigate, Link } from "svelte-navigator";
    import { post } from "../../api/api.js";
    import toastr from "toastr";
    import LoadingButton from "../../components/Templates/Buttons/LoadingButton.svelte";
    import NavigateToButton from "../../components/Templates/Buttons/NavigateToButton.svelte";

    let email = "";
    let password = "";
    let loginOK = false;

    async function handleLogin() {
        const url = $BASE_URL + "/api/all/auth/login";

        const userToJSON = JSON.stringify({ 
            email: email, 
            password: password 
        });
   
        const result = await post(url, userToJSON);

        if (result.message) {
            toastr.error("Wrong email or password. Please try again");
        } else {
            localStorage.setItem("user", JSON.stringify(result.data));
            user.set(result.data);
            loginOK = true;
            setTimeout(() => {
                navigate("/newsfeed", {replace: true});
                loginOK = false;
            }, 2500);
        }
        
        email = "";
        password = "";
    }

    function handleNavigateToSignup() {
        navigate("/signup", {replace: true});
    }
</script>

<div class="grid">
    <div class="col-left"></div>
    <div class="col-middle">
        <h2>Login</h2>
        <div class="login-wrapper">
            <form on:submit|preventDefault={handleLogin}>
                <input type="email" placeholder="email" name="email" bind:value={email} required>
                <input type="password" placeholder="password" name="password" bind:value={password} maxlength="8" required>
                <Link style="font-size: medium;" to="/forgot-password">Forgot password?</Link>
                <LoadingButton action={loginOK} loadingTitle="Logging in..." title="Log in"/>
            </form>
            <hr>
            <button class="secondary" on:click={handleNavigateToSignup}>Sign up</button>
        </div>
    </div>
    <div class="col-right"></div>
</div>

<style>
    .login-wrapper { margin: 10%;}

    button { margin-top: 1em; }
</style>