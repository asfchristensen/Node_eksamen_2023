<script>

    import Sidebar from "../../components/Navbars/Sidebar.svelte";
    import MakePublicRatings from "../../components/Ratings/MakePublicRatings.svelte";
    import UserCounter from "../../components/UserCounter/UserCounter.svelte";

</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>

    <div class="col-middle">
        <h2>Rating page</h2>
        <MakePublicRatings/> 
    </div>

    <div class="col-right">
        <UserCounter/>
    </div>
</div>