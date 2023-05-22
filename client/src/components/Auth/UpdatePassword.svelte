<script>
    import { BASE_URL } from "../../stores/urlDomain";
    import { post } from "../../api/api";
    import { navigate } from "svelte-navigator";
    import toastr from "toastr";

    let activationCode = "";
    let newPassword = "123";
    let confirmPassword = "123";

    async function handleUpdatePassword (){
        const url = $BASE_URL + "/api/auth/update-password"
        const updatePasswordInfoToJSON = JSON.stringify({activationCode, newPassword, confirmPassword});
        const result = await post(url, updatePasswordInfoToJSON);
      
        if (result.status === 200) {
            toastr.success(result.message);
            setTimeout(() => {
                navigate("/login", { replace: true }); 
            }, 1500)
        } else {
            toastr.error(result.message)
        }
        
        activationCode = "";
        newPassword = "";
        confirmPassword = "";
    }
</script>

<form on:submit|preventDefault={handleUpdatePassword}>
    <input type="number" placeholder="Activation code from phone" bind:value={activationCode}>
    <input type="password" placeholder="New password" bind:value={newPassword}>
    <input type="password" placeholder="Confirm password" bind:value={confirmPassword}>
    <button type="submit">Save new password</button>
</form>

<style>
    form { margin: 10%; }
    
    button { margin-top: 1em; }
</style>