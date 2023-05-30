<script>
    import { BASE_URL } from "../../stores/urlDomain";
    import { navigate } from "svelte-navigator";
    import { post } from "../../api/api";
    import toastr from "toastr";
    import LoadingButton from "../../components/Templates/Buttons/LoadingButton.svelte";
    
    let username = "";
    let password = "";
    let confirmedPassword = "";
    let email = "";
    let passwordsMatch;
    let signupOK = false;

    function handleCheckPasswords() {
        passwordsMatch = false;
        passwordsMatch = password !== confirmedPassword;
    }

    async function handleSignup() {
        const picture = "../profilePictures/default.png";
        const userToJSON = JSON.stringify({ username, password, confirmedPassword, email, memberSince: new Date().getFullYear() });
        console.log("Date now: ", Date.now());
        const url = $BASE_URL + "/api/auth/signup";

        const result = await post(url, userToJSON);

        if (result.data === username) {
            signupOK = true;
            setTimeout(() => {
                navigate("/login", {replace: true});
                signupOK = false;
            }, 2500)
        } else if (result.message === "error") {
            toastr.error("Account already exists");
        } else {
            toastr.error("Error creating user");
        }

        username = "";
        password = "";
        confirmedPassword = "";
        email = "";
        
    }
    
</script>

<div class="grid">
    <div class="col-left"></div>

    <div class="col-middle">
        <h2>Sign up</h2>
        <form on:submit|preventDefault={handleSignup}>
            <input type="text" placeholder="Username" name="username" bind:value={username} required>
            <input type="password" placeholder="Password" name="password" bind:value={password} required>
            <input type="password" placeholder="Confirm password" name="confirmedPassword" bind:value={confirmedPassword} on:input={handleCheckPasswords} aria-invalid={passwordsMatch} required>
            <input type="email" placeholder="Email" name="email" bind:value={email} required>
            <LoadingButton action={signupOK} loadingTitle="Saving credentials..." title="Sign up"/>
        </form>

    </div>

    <div class="col-right"></div>
</div>

<style>
    form { margin: 10%; }
</style>

