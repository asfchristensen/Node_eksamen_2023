<script>
    import "@picocss/pico";
    import { Link } from "svelte-navigator";
    import AnswerButton from "../Feedback/AnswerButton.svelte";
    
    export let feedbackToShow;
    
    let isClicked = false;

    console.log("before clicked: ", isClicked);
    function handleModal () {
        isClicked = !isClicked;
        console.log("after cliked: ",isClicked);
    }

    let isAnswered = feedbackToShow.isAnswered === true;
    console.log(isAnswered);

</script>

{#if isAnswered}
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
            <div class="feedback-wrapper">
                <span><strong>From:</strong> {feedbackToShow.username}, ({feedbackToShow.userEmail})</span>
                <hr>
                <span><strong>Message:</strong></span><br>
                <span>{feedbackToShow.feedback}</span>
            </div>
            <footer>
                <AnswerButton feedbackToAnswer={feedbackToShow}/>
            </footer>
        </article>
        
    </dialog>
{/if}

<style>
    #isAnswered {
        background-color: green;
    }
</style>