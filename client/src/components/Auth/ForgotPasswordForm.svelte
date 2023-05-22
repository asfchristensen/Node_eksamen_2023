<script>
    import { BASE_URL } from "../../stores/urlDomain";
    import { post } from "../../api/api.js";
    import { navigate } from "svelte-navigator";
    import toastr from "toastr";

    let email = "laura@mail.dk";
    let phoneNumber = "";

    async function handleRequestNewPassword() {
        const url = $BASE_URL + "/api/auth/forgot-password";
        const userInfoToJSON = JSON.stringify({email, phoneNumber});

        const result = await post(url, userInfoToJSON);

        if (result.status === 200) {
            toastr.success(result.message);
            setTimeout(() => {
                navigate("/update-password", { replace: true }); 
            }, 1500)
        } else {
            toastr.error(result.message);
        }
        
        email = "laura@mail.dk";
        phoneNumber = "";
    }
</script>

<form on:submit|preventDefault={handleRequestNewPassword}>
    <input type="email" placeholder="Email" bind:value={email} required>
    <input type="tel" placeholder="phone" bind:value={phoneNumber} required>
    <button type="submit">Send activation code</button>
</form>

<style>
    form { margin: 10%; }
    
    button { margin-top: 1em; }
</style>