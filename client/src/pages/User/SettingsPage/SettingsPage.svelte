<script>
    import { BASE_URL } from "../../../stores/urlDomain.js";
    import { user } from "../../../stores/userGlobals.js"; 
    import { profilePics } from "../../../stores/hardcodedData.js";
    import { patch, remove } from "../../../api/api.js";
    import { navigate } from "svelte-navigator";
    import { Confirm } from "svelte-confirm";
    import toastr from "toastr";
    import Sidebar from "../../../components/Navbars/Sidebar.svelte";

    let username = "";
    let password = "";
    let newPassword = "";
    let confirmNewPassword = "";
    let email = "";
    let deletePassword = "";
    let confirmDeletePassword = "";
    let updateMatch;
    let deleteMatch;

    async function handleUpdateUser() {
        const url = $BASE_URL + "/api/user/users";
        const usernameToUpdate = { username };
        const usernameToJSON = JSON.stringify(usernameToUpdate);
        console.log("username data: ", usernameToJSON);

        const result = await patch(url, usernameToJSON);
        console.log(result);

        if (result.status === 200) {
            toastr.success("Username updated");
        } else {
            toastr.error("Failed to update username");
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
            toastr.success("Password updated");
        } else {
            toastr.error("Failed to update password");
        }

        password = "";
        newPassword = "";
        confirmNewPassword = "";
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
            toastr.success("Profile picture updated");
        } else {
            toastr.error("Failed to update profile picture");
        }
    }

    async function handleDeleteProfile(){
        const url = $BASE_URL + "/api/both/users/email";
        const profileToDelete = { email, deletePassword, confirmDeletePassword };
        const profileToJSON = JSON.stringify(profileToDelete);
        console.log("profile 2 delete: ", profileToJSON);

        const result = await remove(url,profileToJSON);
        console.log("del profile result;", result);

        if (result.status === 200) {
            toastr.success("Profile deleted");
            $user = null;
            localStorage.removeItem("user");
            navigate("/");
        } else {
            toastr.error("Failed to delete profile");
        }

        email = "";
        deletePassword = "";
        confirmDeletePassword = "";
    }

</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>

    <div class="col-middle">
        <h2>Edit profile</h2>

        <details>
            <summary>Username</summary>
            <div class="summary-content">
                <form on:submit|preventDefault={handleUpdateUser}>
                    <input type="text" placeholder="Username" bind:value={username} required>
                    <button type="submit">Update username</button>   
                </form>
            </div>
            
        </details>
  
        <details >
            <summary>Password</summary>
            <div class="summary-content">
                <form on:submit|preventDefault={handleUpdatePassword}> 
                    <input type="password" placeholder="Your password" bind:value={password} required>
                    <input type="password" placeholder="New password" bind:value={newPassword} required>
                    <input type="password" placeholder="Confirm password" bind:value={confirmNewPassword} on:input={handleCheckPasswords} aria-invalid={updateMatch} required>
                    <button type="submit">Update password</button>   
                </form>
            </div>
        </details>

        <details>
            <summary>Profile picture</summary> 
            <div class="summary-content">
            {#each $profilePics as picture }
                <ul>
                    <button id="avatarPic" on:click={handleUpdateProfilePic.bind(null, picture)}> 
                        <img src="{picture.img}" alt="picture">
                    </button>
                </ul> 
            {/each}
            </div>
        </details>

        <details >
            <summary>Delete profile</summary>
            <div class="summary-content"> 
                <Confirm
                        confirmTitle="Delete"
                        cancelTitle="Cancel"
                        let:confirm="{confirmThis}"
                >
                    <input type="email" placeholder="Your email" bind:value={email} required>
                    <input type="password" placeholder="Your password" bind:value={deletePassword} required>
                    <input type="password" placeholder="Your password" bind:value={confirmDeletePassword}  on:input={handleCheckPasswords} aria-invalid={deleteMatch} required>
                    <button on:click={() => confirmThis(handleDeleteProfile)}>Delete profile</button>
                </Confirm>  
            </div>
        </details>
    </div>
    <div class="col-right"></div>
</div>

<style>
    details {
        display: inline-block;
        width: 60%;
        margin: 2em;
        font-weight: bold;
    }

    .summary-content {
        padding: 2em 2em;
        background-color: rgba(108, 134, 143, 0.054);
    }

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