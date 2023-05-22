<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { user } from "../../stores/user.js";
    import { navigate, Link } from "svelte-navigator";
    import { post } from "../../api/api.js";
    import toastr from "toastr";
    import 'toastr/build/toastr.css';
    import "@picocss/pico";

   

    toastr.options = {
        "positionClass": "toast-top-center",
        "timeOut": "1200"
    }

    let email = "bob@mail.dk";
    let password = "bob123";

    async function handleLogin() {
        
        const userToJSON = JSON.stringify({ email, password });
        const url = $BASE_URL + "/api/auth/login";
   
       const result = await post(url, userToJSON);
       console.log("result", result);

        if (result.message) {
            toastr.error("Wrong email or password. Try again." );
        } else {
            localStorage.setItem("user",JSON.stringify(result.data));
            user.set(result.data);
                    
            toastr.success(`You've logged in successfully, welcome back ${$user.username}`);
            setTimeout(() => {
                navigate("/newsFeed", { replace: true });
            }, 1500)
        }
        email = "";
        password = "";
    }
</script>

<form on:submit|preventDefault={handleLogin}>
    <input type="email" placeholder="email" name="email" bind:value={email} required>
    <input type="password" placeholder="password" name="password" bind:value={password} required>
    <Link style="font-size: medium;" to="/forgot-password">Forgot password?</Link>
    <button type="submit">Log in</button>
</form><br><br>

<style>
    form { margin: 10%; }
    
    button { margin-top: 1em; }
</style>