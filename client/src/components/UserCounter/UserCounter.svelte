<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain";
    import { allUsers } from "../../stores/user";

    onMount( async () => {
        await handleGetAllUsers();
    })

    async function handleGetAllUsers() {
        const response = await fetch($BASE_URL + "/api/users");
        const result = await response.json();
        console.log("Result: ", result.data);
        allUsers.set(result.data);
    }

</script>

<h1>How many have joined the universe?</h1>
<p>{$allUsers.length}</p>