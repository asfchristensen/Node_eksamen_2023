<!-- <script>
    import { BASE_URL } from "../../stores/urlDomain";
    import { post } from "../../api/api";
    import { navigate } from "svelte-navigator";
    import toastr from "toastr";
    import LoadingButton from "../LoadingButton/LoadingButton.svelte";

    let activationCode = "";
    let newPassword = "123";
    let confirmPassword = "123";
    let passwordsMatch;
    let updateOK = false;

    function handleCheckPasswords() {
        passwordsMatch = false;
        passwordsMatch = newPassword !== confirmPassword;
    }

    async function handleUpdatePassword (){
        const url = $BASE_URL + "/api/auth/update-password"
        const updatePasswordInfoToJSON = JSON.stringify({activationCode, newPassword, confirmPassword});
        const result = await post(url, updatePasswordInfoToJSON);
      
        if (result.status === 200) {
            toastr.success(result.message);
            updateOK = true;
            setTimeout(() => {
                navigate("/login", { replace: true });
                updateOK = false; 
            }, 2500)
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
    <input type="password" placeholder="Confirm password" bind:value={confirmPassword} on:input={handleCheckPasswords} aria-invalid={passwordsMatch}>
    <LoadingButton action={updateOK} loadingTitle="Updating password..." title="Save new password"/>
</form>

<style>
    form { margin: 10%; }
    
</style> -->