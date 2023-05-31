<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../../stores/urlDomain.js";
    import { feedbackStore } from "../../../stores/adminGlobals.js";
    import { get, patch } from "../../../api/api.js";
    import Sidebar from "../../../components/Navbars/Sidebar.svelte";
    import UserCounter from "../../../components/UserCounter/UserCounter.svelte";
    import Modal from "../../../components/Templates/Modal/Modal.svelte";
    import toastr from "toastr";
    
    let isModalOpen = false;
    let feedbackToRead = null;
    let isAnswered = false;

    let adminFeedbackAnswer = "";

    onMount(async () => {
        await handleGetAllFeedback();
    });

    async function handleGetAllFeedback() {
        const url = $BASE_URL + "/api/admin/feedback";
        const result = await get(url);

        if (result.status === 200 || result.data === undefined) {
            feedbackStore.set(result.data);
            return result.data;
        } else {
            toastr.error("Failed to get all the feedback");
        } 
    }

    async function handleCreateAnswer (feedbackToAnswer) {
        const url = $BASE_URL + `/api/admin/feedback/${feedbackToAnswer._id}`;
        const answer = { answer: adminFeedbackAnswer };
        const answerToJSON = JSON.stringify(answer);

        const response = await patch(url, answerToJSON);

        if (response.ok) {
            toastr.success("Answer sent")
            await handleGetAllFeedback();
        } else {
            toastr.error("Failed to send answer");
        }
        
        adminFeedbackAnswer = "";
        handleModal();
    }

    async function handleModal (feedback) {
        isModalOpen = !isModalOpen;
        feedbackToRead = feedback;
    }

    function handleToggleAnswer() {
        isAnswered = !isAnswered;
    }
</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>
    <div class="col-middle">
        <h2>Feedback from users</h2>
        <table role="grid">
            <thead>
                <tr>
                    <th scope="col">FROM</th>
                    <th scope="col">SUBJECT</th>
                    <th scope="col">READ</th>
                </tr>
            </thead>
            <tbody>
                {#each $feedbackStore as feedback}  
                    <tr>
                        <td>{feedback.username}</td>
                        <td>{feedback.subject}</td>
                        <td>
                            {#if feedback.isAnswered}
                                <button id="isAnswered" on:click={handleModal.bind(null, feedback)}>Read feedback</button>
                            {:else}
                                <button on:click={handleModal.bind(null, feedback)}>Read feedback</button>
                            {/if}
                        </td>
                    </tr>
                {/each} 
            </tbody>
        </table>
    </div>
    <div class="col-right">
        <UserCounter/>
    </div>
</div>

<Modal 
    isOpen={isModalOpen}
    path="/admin-feedback"
    header=""
    onModal={handleModal}
>
    <h5>{feedbackToRead.subject}</h5>
    <div class="modal">
        <span><strong>FROM:</strong></span><br><br>
        <span>{feedbackToRead.username} ({feedbackToRead.userEmail})</span><br>
        <hr>
        <span><strong>MESSAGE:</strong></span><br><br>
        <span>{feedbackToRead.feedback}</span>
    </div>
    <footer>
        <button on:click={handleToggleAnswer}>Reply</button>
        {#if isAnswered}
            <div>
                <textarea placeholder="Write comment" cols="30" rows="1" bind:value={adminFeedbackAnswer}></textarea>
                <button on:click={handleCreateAnswer.bind(null, feedbackToRead)}>Send answer</button>
            </div>
        {/if}
    </footer>
</Modal>

<style>
    .modal { text-align: left; }

    #isAnswered { background-color: green; }
</style>