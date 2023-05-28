<script>
    import "@picocss/pico";
    import { Link } from "svelte-navigator";
    import AnswerButton from "../Feedback/AnswerButton.svelte";
    
    export let feedbackToShow;
    
    let isClicked = false;

    console.log("before clicked: ", isClicked);
    async function handleModal () {
        isClicked = !isClicked;
        console.log("after cliked: ",isClicked);
    }

    let isGreen = feedbackToShow.isAnswered;
    console.log("is answered",isGreen);

</script>

{#if isGreen}
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
            </footer>
        </article>
        
    </dialog>
{/if}

<style>
    #isAnswered {
        background-color: green;
    }
</style>