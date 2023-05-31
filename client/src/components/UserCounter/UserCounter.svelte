<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { allUsers } from "../../stores/userGlobals.js";
    import { get } from "../../api/api.js";

    onMount( async () => {
        await handleGetAllUsers();
    });

    async function handleGetAllUsers() {
        const url = $BASE_URL + "/api/admin/users";
        const result = await get(url);
        console.log("Result: ", result.data);
        allUsers.set(result.data);
        return result.data;
    }
</script>

<div>
    <p id="header">How many have joined the universe?</p>
    <p id="user-amount"><strong>{$allUsers.length}</strong></p>

</div>

<style>
    #header { border-bottom: 0.1em solid rgba(0, 0, 0, 0.223); }
</style>