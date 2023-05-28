<script>
    import CreateFeedback from "../../components/Feedback/CreateFeedback.svelte";
    import Sidebar from "../../components/Navbars/Sidebar.svelte";
    import CreateRating from "../../components/Ratings/CreateRating.svelte";

</script>


<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>

    <div class="col-middle">
        <h2>Feedback</h2>
        <CreateRating/>
        <CreateFeedback/>
    </div>
    <div class="col-right"></div>
</div>

