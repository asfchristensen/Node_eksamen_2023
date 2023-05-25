<script>
    import CreateAnswer from "../Feedback/CreateAnswer.svelte";

    export let feedbackToAnswer;

    let isAnswered = false;
    console.log("answerFeedback:", isAnswered );
    function handleToggleAnswer() {
        isAnswered = !isAnswered;
        console.log("answerFeedback:", isAnswered );
    }
</script>
{#if isAnswered }
    <CreateAnswer feedbackToAnswer={feedbackToAnswer}/>
{/if}

{#if !isAnswered}
    <button on:click={handleToggleAnswer}>Answer</button>
{/if}