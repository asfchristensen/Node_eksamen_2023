<script>
    import MakePublicEvents from "../../components/Events/MakePublicEvents.svelte";
    import Sidebar from "../../components/Navbars/Sidebar.svelte";
    import UserCounter from "../../components/UserCounter/UserCounter.svelte";

</script>
<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>

    <div class="col-middle">
       <MakePublicEvents/>
    </div>

    <div class="col-right">
       <UserCounter/>
    </div>
</div>