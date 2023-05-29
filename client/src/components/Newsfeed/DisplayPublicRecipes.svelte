<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js"; 
    import { user } from "../../stores/userGlobals.js";
    import { publicRecipes } from "../../stores/publicRecipes.js";
    import { get, patch } from "../../api/api.js";
    import LikeButton from "../Newsfeed/LikeButton.svelte";
    import ModalRecipeButton from "../ModalRecipeButton/ModalRecipeButton.svelte";
    import DeleteButton from "../Newsfeed/DeleteButton.svelte";

    let showComments = {};
    let commentInput = "";
   

    onMount(async () => {
        await handleGetPublicRecipes();
    });

    async function handleGetPublicRecipes() {
        const url = $BASE_URL + "/api/both/publicRecipes";
        const result = await get(url);
        console.log("result.data: ", result);
        result.data.reverse();
        publicRecipes.set(result.data); 
    } 
    function handleToggleComments(recipe) {
        console.log("toggle", showComments[recipe._id]);
        showComments[recipe._id] = !showComments[recipe._id];
    }

    async function handleCreateComment (recipe){
        const url = $BASE_URL + "/api/user/publicRecipes/comment";

        console.log("handle create recipe - comment ",recipe);
        console.log("rcomment to the recipe ", commentInput);

        const email = $user.email;
        const id = recipe._id;

        if (recipe.comments === undefined) {
            console.log("Inside if statement - create comment []");
            recipe.comments = [];
            console.log(recipe);
        }

       const commentToObject = { email, id, comment: commentInput };

        recipe.comments.push(commentToObject); 

        const commentToJSON = JSON.stringify(commentToObject);
        console.log("CommentToJSON ", commentToJSON);
        const response = await patch(url, commentToJSON);
    
        if (response.ok) { 
            const recipeComments = $publicRecipes.map((r) => {
            if (r.procedure === recipe.procedure) {
                console.log("Recipe changed to true", recipe);
                return recipe;
            }
            return r;
            });
            $publicRecipes = recipeComments;
        } else {
            console.log("Failed create a comment");
        }

        commentInput = "";
    }

</script>

<h2>Newsfeed</h2>
{#each $publicRecipes as publicRecipe}
    <article id="{publicRecipe._id.toLowerCase()}">
        <h4>{publicRecipe.title}</h4>
        <img src="{publicRecipe.picURL}" alt="image of food"/>
        {#if $user.role === 2}
            <footer>
                <LikeButton recipe={publicRecipe}/>
                <ModalRecipeButton buttonTitle="Read recipe" recipeToShow={publicRecipe} path="/newsfeed" onGetAllRecipes={handleGetPublicRecipes}/> 
               
               
               <!-- Comment button -->
               <button on:click={handleToggleComments.bind(null, publicRecipe)}>Comment</button>
                <div>
                    {#if publicRecipe.comments !== undefined && showComments[publicRecipe._id]}
                        <div>
                            {#each publicRecipe.comments as comment}                 
                                <div class="comment-wrapper">
                                    <span><strong>{comment.email}</strong></span>
                                    <span>{comment.comment}</span>
                                </div>
                            {/each}
                               
                            <!--<CreateComment recipe={publicRecipe}/> -->
                            <div>
                                <textarea placeholder="Write comment"cols="30" rows="1" bind:value={commentInput}></textarea>
                                <button on:click={handleCreateComment.bind(null, publicRecipe)}>Add comment</button>
                            </div>

                        </div>
                    {:else if publicRecipe.comments === undefined && showComments[publicRecipe._id]}
                       
                    <!--<CreateComment recipe={publicRecipe}/> -->
                        <div>
                            <textarea placeholder="Write comment"cols="30" rows="1" bind:value={commentInput}></textarea>
                            <button on:click={handleCreateComment.bind(null, publicRecipe)}>Add comment</button>
                        </div>
                    {:else}
                        <div></div>
                    {/if} 
                </div>

            </footer>


        {:else if $user.role === 1}
            <footer>
                <ModalRecipeButton buttonTitle="Read recipe" recipeToShow={publicRecipe} path="/newsfeed" onGetAllRecipes={handleGetPublicRecipes}/> 
                <DeleteButton recipeToDelete={publicRecipe}/>
            </footer>
        {/if}
    </article>

{/each} 

<style>
    article {
        display: inline-block;
        width: 60%;
    }

    img { 
        width: 40em;
        height: 20em;
        object-fit: cover;
    } 

    .comment-wrapper {
        border: 0.1em solid darkgray;
        border-radius: 1em;
        margin-bottom: 0.5em;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background-color: rgba(108, 134, 143, 0.054);

    }

    .comment-wrapper span {
        margin: 0.2em 0.8em ;
    }


</style>

