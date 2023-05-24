<script>

    import Sidebar from "../../components/Navbars/Sidebar.svelte";
    import DisplayPublishRatings from "../../components/Rating/DisplayPublishRatings.svelte";
    import PublishRatings from "../../components/Rating/PublishRatings.svelte";
    import UserCounter from "../../components/UserCounter/UserCounter.svelte";

</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>

    <div class="col-middle">
        <h2>Rating page</h2>
        <PublishRatings/> 
        <hr>
        <DisplayPublishRatings/>  <!--  skal denne være her? -->
    </div>

    <div class="col-right">
        <UserCounter/>
    </div>
</div>