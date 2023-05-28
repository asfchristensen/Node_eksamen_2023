<script>
    import DisplayFeedback from "../../components/Feedback/DisplayFeedback.svelte";
    import Sidebar from "../../components/Navbars/Sidebar.svelte";
    import UserCounter from "../../components/UserCounter/UserCounter.svelte";
    import "@picocss/pico";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { feedbackStore } from "../../stores/feedback.js";
    import { getWithCredentials } from "../../api/api.js";
    import { onMount } from "svelte";

   
    onMount(async () => {
        await handleGetAllFeedback();
    });

    async function handleGetAllFeedback() {
        const url = $BASE_URL + "/api/admin/feedback";
        const result = await getWithCredentials(url);
        console.log(result.data);
        feedbackStore.set(result.data);
        return result.data;
    }
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