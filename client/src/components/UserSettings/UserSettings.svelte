<script>
    import toastr from "toastr";
    import { patch, remove } from "../../api/api.js";
  


    import { BASE_URL } from "../../stores/urlDomain.js";
    import { profilePics } from "../../stores/hardcodedData.js";

    let username = "";
    let password = "";
    let newPassword = "";
    let confirmNewPassword = "";
    let email = "";
    let deletePassword = "";
    let confirmDeletePassword = "";
    let updateMatch;
    let deleteMatch;
/*
    const profilePics = [
        { id: 1, img: "../profilePictures/default.png" },
        { id: 2, img: "../profilePictures/alien.png" },
        { id: 3, img: "../profilePictures/cheese.png" },
        { id: 3, img: "../profilePictures/chef.png" },
        { id: 3, img: "../profilePictures/christmas.png" }
    ];
    */

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

    async function handleDeleteProfile(){
        const url = $BASE_URL + "/api/all/users";
        const profileToDelete = { email, deletePassword, confirmDeletePassword };
        const profileToJSON = JSON.stringify(profileToDelete);
        console.log("profile 2 delete: ", profileToJSON);

        const result = await remove(url,profileToJSON);
        console.log("del profile result;", result);

        if (result.status === 200) {
            toastr.success("success - profile deleted");
        } else {
            toastr.error("error - failed to delete profile");
        }
        email = "";
        deletePassword = "";
        confirmDeletePassword = "";
    }

    function handleCheckPasswords() {
        if (newPassword) {
            updateMatch = false;
            updateMatch = newPassword !== confirmNewPassword 
        } 

        if (deletePassword) {
            deleteMatch = false;
            deleteMatch = deletePassword !== confirmDeletePassword 
        }     
    }

    async function handleUpdateProfilePic(picture){
        const url = $BASE_URL + "/api/user/users";
        const pictureToUpdate = { profilePicture: picture.img };
        const pictureToJSON = JSON.stringify(pictureToUpdate);
        console.log("username data: ", pictureToUpdate);

        const result = await patch(url, pictureToJSON);
        console.log(result);

        if (result.status === 200) {
            toastr.success("success - profile picture updated");
        } else {
            toastr.error("error - failed to update profile picture");
        }
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
        <input type="password" placeholder="Your password" bind:value={password} required>
        <input type="password" placeholder="New password" bind:value={newPassword} required>
        <input type="password" placeholder="Confirm password" bind:value={confirmNewPassword} on:input={handleCheckPasswords} aria-invalid={updateMatch} required>
        <button type="submit">Update password</button>   
    </form>
</details>

<details  >
    <summary>Profile picture</summary> 

    {#each $profilePics as picture }
        <ul>
            <button id="avatarPic" on:click={handleUpdateProfilePic.bind(null, picture)}> 
                <img src="{picture.img}" alt="picture">
            </button>
        </ul>
            
    {/each}
</details>

<details >
    <summary>Delete profile</summary> 
    <form on:submit|preventDefault={handleDeleteProfile} >
        <input type="email" placeholder="Your email" bind:value={email} required>
        <input type="password" placeholder="Your password" bind:value={deletePassword} required>
        <input type="password" placeholder="Your password" bind:value={confirmDeletePassword}  on:input={handleCheckPasswords} aria-invalid={deleteMatch} required>
        <button type="submit">Delete profile</button>  
    </form>
    <h2>HER SKAL VI HAVE CONFIRM BOX + NAVIGERES TIL FORSIDEN / LOGGET UD</h2>
</details>

<style>
    img {
        width: 4em;
    }

    #avatarPic {
        background-color: white;
        border-color: white;
    }

    #avatarPic:hover {
        background-color: white;
        border-color: #1095c1;
    }
</style>