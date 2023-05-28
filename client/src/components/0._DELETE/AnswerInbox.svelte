<!-- <script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { get } from "../../api/api.js";
    import { answeredFeedback } from "../../stores/userGlobals.js";
    import { Link } from "svelte-navigator";

    onMount( async () => {
        await handleGetAllAnsweredFeedback();
    })

    let isClicked = false;
    function handleModal () {
        isClicked = !isClicked;
    }

    async function handleGetAllAnsweredFeedback() {
        const url = $BASE_URL + "/api/user/feedback/email";
        const result = await get(url);
        answeredFeedback.set(result.data);
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
</style> -->