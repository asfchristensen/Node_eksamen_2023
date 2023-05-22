<script>
    import toastr from "toastr";
    import { BASE_URL } from "../../stores/urlDomain";

    let activationCode = "";
    let newPassword = "123";
    let confirmPassword = "123";

    async function handleUpdatePassword (){
        console.log("Update password function")

        const updatePasswordInfoToJSON = JSON.stringify({activationCode, newPassword, confirmPassword});
        console.log("new password info: ", updatePasswordInfoToJSON);

        const response = await fetch($BASE_URL + "/api/auth/update-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: updatePasswordInfoToJSON,
            credentials: "include"
        });
        
        const result = await response.json();
        console.log("result: ",  result);

        if (response.ok) {
            toastr.success(result.message);
        } else {
            toastr.error(result.message)
        }
        
        activationCode = "";
        newPassword = "";
        confirmPassword = "";
    }
</script>

<h1>Reset Password - 2</h1>
<form on:submit|preventDefault={handleUpdatePassword}>
    <label for="activationcode">Activation code from phone</label>
    <input type="number" bind:value={activationCode}>

    <label for="newPassword">New password</label>
    <input type="password" placeholder="password" bind:value={newPassword}>

    <label for="newPassword">Confirm password</label>
    <input type="password" placeholder="password" bind:value={confirmPassword}>
    <button type="submit">Save new password</button>
</form>