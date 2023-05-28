<!--<script>
    import CreateAnswer from "../0._DELETE/CreateAnswer.svelte";

    export let feedbackToAnswer;
    export let onCloseModal;

    // let isAnswered = false;
    // console.log("answerFeedback:", isAnswered );
    // function handleToggleAnswer() {
    //     isAnswered = !isAnswered;
    //     console.log("answerFeedback:", isAnswered);

    // }
</script>
 {#if isAnswered }
    <CreateAnswer feedbackToAnswer={feedbackToAnswer} onCloseModal={onCloseModal}/>
{/if}

{#if !isAnswered}
    <button on:click={handleToggleAnswer}>Answer</button>
{/if} -->