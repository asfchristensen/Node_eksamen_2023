<script>
    import { BASE_URL } from "../../stores/urlDomain.js"; 
    import { publishedRecipes } from "../../stores/publishedRecipes.js";
    import { user } from "../../stores/user.js";
    import { patch } from "../../api/api.js";

    export let recipe;

    let showComments = {};
    let commentInput = "";

    function handleToggleComments(recipe) {
        console.log("toggle", showComments[recipe._id]);
        showComments[recipe._id] = !showComments[recipe._id];
    }

    // Create function that saves the comment
    async function hanndleCreateComment (recipe){
        const url = $BASE_URL + "/api/publishedRecipes/comment";

        console.log("handle create recipe - comment ",recipe);
        console.log("rcomment to the recipe ", commentInput);

         //update store published recipe
        const email = $user.email;
        const id = recipe._id;

        if (recipe.comments === undefined) {
            console.log("Inside if statement - create comment []");
            recipe.comments = [];
            console.log(recipe);
        }

       const commentToObject = { email, id, comment: commentInput };

        recipe.comments.push(commentToObject); 

        //fecth
        const commentToJSON = JSON.stringify(commentToObject);
        console.log("CommentToJSON ", commentToJSON);
        const response = await patch(url, commentToJSON);
    
        if (response.ok) { 
            const recipeComments = $publishedRecipes.map((r) => {
            if (r.procedure === recipe.procedure) {
                console.log("Recipe changed to true", recipe);
                return recipe;
            }
            return r;
            });
            $publishedRecipes = recipeComments;
        } else {
            console.log("Failed create a comment");
        }

        commentInput = "";
    }
</script>

<button on:click={handleToggleComments.bind(null, recipe)}>Comment</button>
<div>
    {#if recipe.comments !== undefined && showComments[recipe._id]}
        <div class="">
            {#each recipe.comments as comment}                 
                <div class="comment-wrapper">
                    <span><strong>{comment.email}</strong></span>
                    <span>{comment.comment}</span>
                </div>
            {/each}

            <div>
                <textarea placeholder="Write comment"cols="30" rows="1" bind:value={commentInput}></textarea>
                <button on:click={hanndleCreateComment.bind(null, recipe)}>Add comment</button>
            </div>
        </div>
    {:else if recipe.comments === undefined && showComments[recipe._id]}
        <div>
            <textarea placeholder="Write comment"cols="30" rows="3" bind:value={commentInput}></textarea>
            <button on:click={hanndleCreateComment.bind(null, recipe)}>Add comment</button>
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

    }

    span {
        margin: 0.2em 0.8em ;
    }

    textarea {
        margin-top: 1em;
    }

   
</style>