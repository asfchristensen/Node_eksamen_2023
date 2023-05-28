<script>
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import { get } from "../../api/api";
    import { BASE_URL } from "../../stores/urlDomain";
    import { answeredFeedback, feedbackStore } from "../../stores/feedback";

    onMount( async () => {
        await handleGetAllAnsweredFeedback();
    })

    let isClicked = false;
    console.log("before clicked: ", isClicked);
    function handleModal () {
        isClicked = !isClicked;
        console.log("after cliked: ",isClicked);
    }

    async function handleGetAllAnsweredFeedback() {
        const url = $BASE_URL + "/api/user/feedback/email";
        const result = await get(url);
        //console.log(result.data);
        answeredFeedback.set(result.data)


      // $answeredFeedback.forEach(feedback => console.log(feedback));
        return result;
    }

</script>



<img src="../icons/inbox.png" alt="inbox" on:click={handleModal}>

{#if isClicked}
    <dialog open>
        <article>
            <header>
                <Link to="/profile" class="close" on:click={handleModal}></Link>
                <h4>Feedback answers</h4>
            </header>
            {#if $answeredFeedback === undefined}
                <summary>Your feedback hasn't been answered yet</summary>
                 
            {:else}
                {#each $answeredFeedback as feedback }
                    <details>
                        <summary><strong>Subject: </strong>{feedback.subject}</summary>
                        {#each feedback.answer as answer}
                            <p>{answer}</p>
                        {/each}
                        
                    </details>
                {/each}
               
            {/if}

        </article>
    </dialog>
{/if}

<style>
    img {
        height: 2em;
        width: 2em;
    }

    article {
        width: 50em;
    }
</style>