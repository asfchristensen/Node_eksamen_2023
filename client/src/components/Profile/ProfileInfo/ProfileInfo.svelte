<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../../stores/urlDomain.js";
    import { get } from "../../../api/api.js";
    import { profileInfo } from "../../../stores/userGlobals.js";
    import toastr from "toastr";

    onMount(async () => {
        await handleGetUser();
    });

    async function handleGetUser() {
        const url = $BASE_URL + "/api/user/users/email";
        const result = await get(url);

        if (result.status === 200) {
            profileInfo.set(result.data);
            return result.data;
        } else {
            toastr.error("Failed to get user");
        }
    }
</script>

{#if $profileInfo}
    <div class="profile-wrapper">
        <img src={$profileInfo.profilePicture} alt="profilePicture">   
        <h6>{$profileInfo.username}</h6>
        <p>Member since: {$profileInfo.memberSince}</p>
    </div>
{:else}
    <div></div>
{/if}

<style>
    h6 { margin-top: 1em; }

    .profile-wrapper img {
        width: 60%;
    }
</style>



