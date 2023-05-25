<script>
    import DisplayFeedback from "../../components/Feedback/DisplayFeedback.svelte";
    import Sidebar from "../../components/Navbars/Sidebar.svelte";
    import UserCounter from "../../components/UserCounter/UserCounter.svelte";

</script>


<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>

    <div class="col-middle">
        <h2>Recieved feedback page</h2>
        <DisplayFeedback/>
    </div>

    <div class="col-right">
        <UserCounter/>
    </div>
</div>