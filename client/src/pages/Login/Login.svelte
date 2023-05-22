<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { user } from "../../stores/user.js";
    import { navigate } from "svelte-navigator";
    import toastr from "toastr";
    import 'toastr/build/toastr.css';

    toastr.options = {
        "positionClass": "toast-top-center",
        "timeOut": "1200"
    }

<<<<<<< HEAD
    let email = "bob@mail.dk";
    let password = "bob123";
=======
    let email = "admin@mail.dk";
    let password = "admin123";
>>>>>>> googleMaps

    async function handleLogin() {
        const userCredentials = JSON.stringify({ email, password });
        const loginURL = $BASE_URL + "/api/auth/login";

        const response = await fetch(loginURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: userCredentials,
            credentials: "include"
        });
        const result = await response.json();

        if (result.data.email === email) {
            console.log(result.data)
            console.log(JSON.stringify(result.data))
            localStorage.setItem("user",JSON.stringify(result.data));
            user.set(result.data);
           
        
            toastr.success(`You've logged in successfully, welcome back ${$user}`);
            setTimeout(() => {
                navigate("/newsFeed", { replace: true });
            }, 1500)
        } else {
            toastr.error("Wrong email or password. Try again.");
        }

        email = "";
        password = "";
    }
</script>

<slot></slot>

<h2>Login page</h2>

<div class="form-login">
    <form on:submit|preventDefault={handleLogin}>
        <input type="email" placeholder="email" name="email" bind:value={email} required><br><br>

        <input type="password" placeholder="password" name="password" bind:value={password} required><br><br>

        <button type="submit">Log in</button>
    </form><br><br>
</div>

<style>
    .form-login {
        display: flex;
        justify-content: center;
        position: relative;
        border: solid;
        border-color: rgb(242, 242, 126);
        border-radius: 30em;
        background-color: rgb(247, 244, 204);
        padding: 3em; 
        margin: 0em 30em 0em 30em;
    }

    button {
        margin: 0em 1em 0em 2em;
    }
</style>