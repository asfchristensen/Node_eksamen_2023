<script>
    import { BASE_URL } from "../../stores/urlDomain";
    import { navigate } from "svelte-navigator";
    import { post } from "../../api/api";
    import toastr from "toastr";
    import 'toastr/build/toastr.css';
    
    toastr.options = {
        "positionClass": "toast-top-center",
        "timeOut": "1200"
    }

    let username = "";
    let password = "";
    let email = "";

    async function handleSignup() {
        const userToJSON = JSON.stringify({ username, password, email });
        const url = $BASE_URL + "/api/auth/signup";

        const result = await post(url, userToJSON);

        if (result.data === username) {
            toastr.success(`User successfully created. Welcome ${result.data}`);
            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 1500)
        } else if (result.message === "error") {
            toastr.error("Account already exists");
        } else {
            toastr.error("Error creating user");
        }

        username = "";
        password = "";
        email = "";
    }
</script>

<form on:submit|preventDefault={handleSignup}>
    <input type="text" placeholder="username" name="username" bind:value={username} required>
    <input type="password" placeholder="password" name="password" bind:value={password} required>
    <input type="email" placeholder="email" name="email" bind:value={email} required>
    <button type="submit">Sign up</button>
</form>

<style>
    form { margin: 10%; }

    button { margin-top: 1em; }
</style>