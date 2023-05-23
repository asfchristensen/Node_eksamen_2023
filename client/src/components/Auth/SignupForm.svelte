<script>
    import { BASE_URL } from "../../stores/urlDomain";
    import { navigate } from "svelte-navigator";
    import { post } from "../../api/api";
    import toastr from "toastr";
    import 'toastr/build/toastr.css';
    import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.svelte";
    
    toastr.options = {
        "positionClass": "toast-top-center",
        "timeOut": "1200"
    }

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
        const userToJSON = JSON.stringify({ username, password, confirmedPassword, email });
        const url = $BASE_URL + "/api/auth/signup";

        const result = await post(url, userToJSON);

        if (result.data === username) {
            toastr.success(`User successfully created. Welcome ${result.data}`);
            signupOK = true;
            setTimeout(() => {
                navigate("/login", {replace: true});
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

{#if signupOK}
    <LoadingSpinner/>
{/if}

<form on:submit|preventDefault={handleSignup}>
    <input type="text" placeholder="Username" name="username" bind:value={username} required>
    <input type="password" placeholder="Password" name="password" bind:value={password} required>
    <input type="password" placeholder="Confirm password" name="confirmedPassword" bind:value={confirmedPassword} on:input={handleCheckPasswords} aria-invalid={passwordsMatch} required>
    <input type="email" placeholder="Email" name="email" bind:value={email} required>
    <button type="submit">Sign up</button>
</form>

<style>
    form { margin: 10%; }

    button { margin-top: 1em; }
</style>