<script>
    import { user } from "../../stores/user";
    import Sidebar from "../../components/Navbars/Sidebar.svelte";
    import CreateEvent from "../../components/Events/CreateEvent.svelte";
    import UserCounter from "../../components/UserCounter/UserCounter.svelte";
    import DisplayEvents from "../../components/Events/DisplayEvents.svelte";
   
</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>

    <div class="col-middle">
        <DisplayEvents/>
    </div>
    <div class="col-right">
        {#if $user.role === 2}
            <CreateEvent/>
        {:else if $user.role === 1}
            <UserCounter/>
        {/if}
    </div>
</div>