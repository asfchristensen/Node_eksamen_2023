<!--<script>
    import CreateComment from "./CreateComment.svelte";

    export let recipe;

    let showComments = {};
    let commentInput = "";

    function handleToggleComments(recipe) {
        console.log("toggle", showComments[recipe._id]);
        showComments[recipe._id] = !showComments[recipe._id];
    }

  
</script>

<button on:click={handleToggleComments.bind(null, recipe)}>Comment</button>
<div>
    {#if recipe.comments !== undefined && showComments[recipe._id]}
        <div>
            {#each recipe.comments as comment}                 
                <div class="comment-wrapper">
                    <span><strong>{comment.email}</strong></span>
                    <span>{comment.comment}</span>
                </div>
            {/each}
                <CreateComment recipe={recipe}/>
        </div>
    {:else if recipe.comments === undefined && showComments[recipe._id]}
        <CreateComment recipe={recipe}/>
    {:else}
        <div></div>
    {/if} 
</div>

<style>
    .comment-wrapper {
        border: 0.1em solid darkgray;
        border-radius: 1em;
        margin-bottom: 0.5em;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

    }

    .comment-wrapper span {
        margin: 0.2em 0.8em ;
    }

    textarea {
        margin-top: 1em;
    }
</style> -->