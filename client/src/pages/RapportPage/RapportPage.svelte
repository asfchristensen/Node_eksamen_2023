<script>
    import Sidebar from "../../components/Navbars/Sidebar.svelte";
    import UserCounter from "../../components/UserCounter/UserCounter.svelte";

</script>


<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>

    <div class="col-middle">
        <h2>Rapport page</h2>
        rapport
    </div>

    <div class="col-right">
        <UserCounter/>
    </div>
</div>