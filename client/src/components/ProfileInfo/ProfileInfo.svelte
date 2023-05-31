<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { get } from "../../api/api.js";
    import { user, profileInfo } from "../../stores/userGlobals.js";

    onMount(async () => {
        await handleGetUser();
    });

    async function handleGetUser() {
        const url = $BASE_URL + "/api/user/users/email";
        const result = await get(url);
        profileInfo.set(result.data);
        return result.data;
    }
</script>

{#if $profileInfo}
    <div>
        <img src={$profileInfo.profilePicture} alt="profilePicture">   
        <h6>{$user.username}</h6>
        <p>Member since: {$profileInfo.memberSince}</p>
    </div>
{:else}
    <div></div>
{/if}

<style>
    h6 { margin-top: 1em; }
</style>



