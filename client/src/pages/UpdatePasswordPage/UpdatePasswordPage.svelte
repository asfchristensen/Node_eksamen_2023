<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { post } from "../../api/api.js";
    import { navigate } from "svelte-navigator";
    import LoadingButton from "../../components/Templates/Buttons/LoadingButton.svelte";
    import toastr from "toastr";

    let activationCode = "";
    let newPassword = "";
    let confirmPassword = "";
    let passwordsMatch;
    let updateOK = false;
   
    function handleCheckPasswords() {
        passwordsMatch = false;
        passwordsMatch = newPassword !== confirmPassword;
    }

    async function handleUpdatePassword () {
        const url = $BASE_URL + "/api/all/auth/update-password";

        const updatePasswordInfoToJSON = JSON.stringify({
            activationCode: activationCode, 
            newPassword: newPassword, 
            confirmPassword: confirmPassword
        });

        const result = await post(url, updatePasswordInfoToJSON);
      
        if (result.status === 200) {
            toastr.success("Password updated");
            updateOK = true;
            setTimeout(() => {
                navigate("/login", { replace: true });
                updateOK = false; 
            }, 2500);
        } else {
            toastr.error("Failed to update password");
        }
        
        activationCode = "";
        newPassword = "";
        confirmPassword = "";
    }
</script>

<div class="grid">
    <div class="col-left"></div>
    <div class="col-middle">
        <h2>Reset Password</h2>
        <form on:submit|preventDefault={handleUpdatePassword}>
            <input type="number" placeholder="Activation code from phone" bind:value={activationCode}>
            <input type="password" placeholder="New password" bind:value={newPassword}>
            <input type="password" placeholder="Confirm password" bind:value={confirmPassword} on:input={handleCheckPasswords} aria-invalid={passwordsMatch}>
            <LoadingButton action={updateOK} loadingTitle="Updating password..." title="Save new password"/>
        </form>
    </div>
    <div class="col-right"></div>
</div>

<style>
    form { margin: 10%; }
</style>