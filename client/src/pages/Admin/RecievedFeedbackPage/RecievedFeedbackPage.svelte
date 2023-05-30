<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../../stores/urlDomain.js";
    import { feedbackStore } from "../../../stores/adminGlobals.js";
    import { get, patch } from "../../../api/api.js";
    import { Link } from "svelte-navigator";
    import toastr from "toastr";
    import Sidebar from "../../../components/Navbars/Sidebar.svelte";
    import UserCounter from "../../../components/UserCounter/UserCounter.svelte";
    
    let isClicked = false;
    let feedbackToRead = null;
    let isAnswered = false;

    let adminFeedbackAnswer = "";

    onMount(async () => {
        await handleGetAllFeedback();
    });

    async function handleGetAllFeedback() {
        const url = $BASE_URL + "/api/admin/feedback";
        const result = await get(url);
        feedbackStore.set(result.data);
        return result.data;
    }

    async function handleModal (feedback) {
        isClicked = !isClicked;
        feedbackToRead = feedback;
    }

    function handleToggleAnswer() {
        isAnswered = !isAnswered;
    }

    async function handleCreateAnswer (feedbackToAnswer) {
        const url = $BASE_URL + `/api/admin/feedback/${feedbackToAnswer._id}`;
        const answer = { answer: adminFeedbackAnswer };
        const answerToJSON = JSON.stringify(answer);

        const result = await patch(url, answerToJSON);

        if (result.status === 200) {
            toastr.success("Answer sent")
            await handleGetAllFeedback();
        } else {
            toastr.error("Failed to send answer");
        }
        
        adminFeedbackAnswer = "";
        handleModal();
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
                {#each $feedbackStore as feedback }  
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

{#if isClicked}
    <dialog open>
        <article>
            <header>
                <Link to="/admin-feedback" class="close" on:click={handleModal}></Link>
                <h4>{feedbackToRead.subject}</h4>
            </header>
            <div>
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
        </article>  
    </dialog>
{/if}

<style>
    article {
        width: 80%;
    }

    header h4 {
        margin-bottom: 0.1em;
    }

    #isAnswered {
        background-color: green;
    }
</style>