<script>
    import { onMount } from "svelte";
    import { get } from "../../api/api";
    import { BASE_URL } from "../../stores/urlDomain";
    import { user, profileInfo } from "../../stores/user";

    onMount( async () => {
        await handleGetUser();
    });

    async function handleGetUser() {
        const url = $BASE_URL + "/api/user/users";
        const result = await get(url);
        console.log(result.data);
        profileInfo.set(result.data);
        return result.data;
    }

</script>

{#if $profileInfo}
    <div>
        <img src={$profileInfo.profilePicture} alt="profilepic">   
        <h6>{$user.username}</h6>
        <p>Member since: {$profileInfo.memberSince}</p>
        
    </div>
{:else}
    <div></div>
{/if}

<style>
    h6 {
        margin-top: 1em;
    }
</style>



