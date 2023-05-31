<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { patch } from "../../api/api.js";
    import { user } from "../../stores/userGlobals.js";
    import { publicRecipes } from "../../stores/publicRecipes.js";
    import toastr from "toastr";

    export let recipeToComment;
    
    let showComments = {};
    let commentInput= "";

    function handleToggleComments(recipeToComment) {
        showComments[recipeToComment._id] = !showComments[recipeToComment._id];
    }

    async function handleCreateComment (recipeToComment) {
        const url = $BASE_URL + `/api/user/publicRecipes/comment/${recipeToComment._id}`;

        if (recipeToComment.comments === undefined) {
            recipeToComment.comments = [];
        }

        const comment = { 
            username: $user.username, 
            comment: commentInput
        };

       recipeToComment.comments.push(comment); 

        const commentToJSON = JSON.stringify(comment);
        const response = await patch(url, commentToJSON);
    
        if (response.ok) { 
            const recipeComments = $publicRecipes.map((recipe) => {
                if (recipe.procedure === recipeToComment.procedure) {
                    return recipeToComment;
                }
                return recipe;
            });

            $publicRecipes = recipeComments;
        } else {
            toastr.error("Failed create a comment");
        }

        commentInput = "";
    }
</script>

<button on:click={handleToggleComments.bind(null, recipeToComment)}>Comment</button>

<div>
    {#if recipeToComment.comments !== undefined && showComments[recipeToComment._id]}
        <div>
            {#each recipeToComment.comments as comment}                 
                <div class="comment-wrapper">
                    <span><strong>{comment.username}</strong></span>
                    <span>{comment.comment}</span>
                </div>
            {/each}
            <textarea placeholder="Write comment" cols="30" rows="1" bind:value={commentInput}></textarea>
            <button on:click={handleCreateComment.bind(null, recipeToComment)}>Add comment</button>
        </div>
    {:else if recipeToComment.comments === undefined && showComments[recipeToComment._id]}
        <div>
            <textarea placeholder="Write comment" cols="30" rows="1" bind:value={commentInput}></textarea>
            <button on:click={handleCreateComment.bind(null, recipeToComment)}>Add comment</button>
        </div>
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
        background-color: rgba(108, 134, 143, 0.054);
    }

    .comment-wrapper span { margin: 0.2em 0.8em ; }
</style>