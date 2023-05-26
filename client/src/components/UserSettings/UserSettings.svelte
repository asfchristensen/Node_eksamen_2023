<script>
    import toastr from "toastr";
    import { patch } from "../../api/api.js";


    import { BASE_URL } from "../../stores/urlDomain.js";

    let username = "";
    let password = "";
    let newPassword = "";
    let confirmNewPassword = "";
    let email = "";

    async function handleUpdateUser() {
        const url = $BASE_URL + "/api/user/users";
        const usernameToUpdate = { username };
        const usernameToJSON = JSON.stringify(usernameToUpdate);
        console.log("username data: ", usernameToJSON);

        const result = await patch(url, usernameToJSON);
        console.log(result);

        if (result.status === 200) {
            toastr.success("success - username updated");
        } else {
            toastr.error("error - failed to update username");
        }

        username = "";
    }

    async function handleUpdatePassword() {
        const url = $BASE_URL + "/api/user/users";
        const passwordToUpdate = { password, newPassword, confirmNewPassword };
        const passwordToJSON = JSON.stringify(passwordToUpdate);
        console.log("PW data: ", passwordToJSON);

        const result = await patch(url, passwordToJSON);
        console.log(result);

        if (result.status === 200) {
            toastr.success("success - password updated");
        } else {
            toastr.error("error - failed to update password");
        }

        password = "";
        newPassword = "";
        confirmNewPassword = "";
    }

</script>

<h2>Edit profile</h2>

<details>
    <summary>Username</summary>
    <form on:submit|preventDefault={handleUpdateUser}>
        <input type="text" placeholder="Username" bind:value={username} required>
        <!-- Button -->
        <button type="submit">Update username</button>   
    </form>
    
</details>
  
<details >
    <summary>Password</summary>
    <form on:submit|preventDefault={handleUpdatePassword}> 
        <input type="password" placeholder="your password" bind:value={password} required>
        <input type="password" placeholder="new password"bind:value={newPassword} required>
        <input type="password" placeholder="confirm password"bind:value={confirmNewPassword} required>
        <button type="submit">Update password</button>   
    </form>
</details>

<details >
    <summary>Profile picture</summary> 
</details>

<details >
    <summary>Delete profile</summary> 
    <form >
        <input type="email" placeholder="your email" bind:value={email} required>
        <input type="password" placeholder="your password"bind:value={password} required>
        
    </form>
</details>