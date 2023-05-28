<script>
    import { user } from "../../stores/user";
    import Sidebar from "../../components/Navbars/Sidebar.svelte";
    import CreateEvent from "../../components/Events/CreateEvent.svelte";
    import UserCounter from "../../components/UserCounter/UserCounter.svelte";
    import DisplayEventList from "../../components/Events/DisplayEventList.svelte";
    import DisplayMap from "../../components/Events/DisplayMap.svelte";
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain";
    import { publicEvents } from "../../stores/events";
    import { getWithCredentials } from "../../api/api";
   
    onMount(async () => {
        await handleGetAllPublicEvents();
    });

    async function handleGetAllPublicEvents() {
        const url = $BASE_URL + "/api/all/events/public";
        const result = await getWithCredentials(url);

        publicEvents.set(result.data);
        console.log(result.data);
        return result.data;
    }

</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>
    <div class="col-middle">
        <h2>Upcoming Events</h2>
        <DisplayEventList/>
        <br><br>
        <h2>Any events close to you?</h2>
        <DisplayMap onGetAllPublicEvents={handleGetAllPublicEvents}/>
    </div>
    <div class="col-right">
        {#if $user.role === 2}
            <CreateEvent/>
        {:else if $user.role === 1}
            <UserCounter/>
        {/if}
    </div>
</div>