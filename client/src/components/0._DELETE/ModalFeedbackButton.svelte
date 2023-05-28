<!-- <script>
    // import "@picocss/pico";
    // import { Link } from "svelte-navigator";
    // import { BASE_URL } from "../../stores/urlDomain";
    // import { patch } from "../../api/api";
    // import toastr from "toastr";
    
    export let feedbackToShow;
    
    let isClicked = false;

    let answerInput = "";

    console.log("before clicked: ", isClicked);
    async function handleModal () {
        isClicked = !isClicked;
        console.log("after cliked: ",isClicked);
    }

    let isAnswered = false;
    console.log("answerFeedback:", isAnswered );
    function handleToggleAnswer() {
        isAnswered = !isAnswered;
        console.log("answerFeedback:", isAnswered);
    }

    let isGreen = feedbackToShow.isAnswered;
    console.log("is answered",isGreen);

    async function handleCreateAnswer (feedbackToAnswer){
        const url = $BASE_URL + "/api/admin/feedback";
        const answer = {id: feedbackToAnswer._id, answer: answerInput };
        console.log("feedback answer object:", answer); 
        const answerToJSON = JSON.stringify(answer);

        const result = await patch(url, answerToJSON);

        if (result.status === 200) {
            console.log("Answer Created");
            toastr.success("success - Answer sent")
            // await handleGetAllPublicRatings();
        } else {
            toastr.error("error - failed to sent answer");
        }
        
        answerInput = "";
        handleModal();
    }

</script> -->

<!-- {#if isGreen}
    <button id="isAnswered" on:click={handleModal}>Read feedback</button>
{:else}
    <button on:click={handleModal}>Read feedback</button>
{/if}

{#if isClicked}
    <dialog open>
        <article>
            <header>
                <a href="/admin-feedback" class="close" on:click={handleModal}></a>
                <h3>{feedbackToShow.subject}</h3>
            </header>
            <div>
                <span><strong>From:</strong> {feedbackToShow.username}, ({feedbackToShow.userEmail})</span>
                <hr>
                <span><strong>Message:</strong></span><br>
                <span>{feedbackToShow.feedback}</span>
            </div>
            <footer>
                <AnswerButton feedbackToAnswer={feedbackToShow} onCloseModal={handleModal}/>
                {#if isAnswered }
                <CreateAnswer feedbackToAnswer={feedbackToAnswer} onCloseModal={onCloseModal}/>
                    <div>
                        <textarea placeholder="Write comment"cols="30" rows="1" bind:value={answerInput}></textarea>
                        <button on:click={handleCreateAnswer.bind(null, feedbackToShow)}>Send answer</button>
                    </div>

                {/if}

                {#if !isAnswered}
                    <button on:click={handleToggleAnswer}>Answer</button>
                {/if}
            </footer>
        </article>
        
    </dialog>
{/if}

<style>
    #isAnswered {
        background-color: green;
    }
</style> -->