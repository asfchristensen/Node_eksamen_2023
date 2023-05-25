<script>
    import "@picocss/pico";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { feedbackStore } from "../../stores/feedback.js";
    import { getWithCredentials } from "../../api/api.js";
    import { onMount } from "svelte";
    import ModalFeedbackButton from "../Feedback/ModalFeedbackButton.svelte";

    onMount(async () => {
        await handleGetAllPublicRatings();
    });

    async function handleGetAllPublicRatings() {
        const url = $BASE_URL + "/api/admin/feedback";
        const result = await getWithCredentials(url);
        console.log(result.data);
        feedbackStore.set(result.data);
        return result.data;
    }

</script>

<h3>Feedback from users:</h3>
<table role="grid">
    <thead>
        <tr>
            <th scope="col">FROM</th>
            <th scope="col">SUBJECT</th>
            <th scope="col">READ</th>
        </tr>
    </thead>
    <tbody>
        {#each $feedbackStore as feedback }  
            <tr>
            <td>{feedback.username}</td>
            <td>{feedback.subject}</td>
            <td><ModalFeedbackButton feedbackToShow={feedback}/></td>
            </tr>
        {/each} 
    </tbody>
</table>
