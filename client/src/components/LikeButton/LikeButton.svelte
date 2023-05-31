<script>
    import { BASE_URL } from "../../stores/urlDomain.js"; 
    import { publicRecipes } from "../../stores/publicRecipes.js";
    import { patch } from "../../api/api.js";
    import { user } from "../../stores/userGlobals.js";
    import toastr from "toastr";
    
    export let recipeToLike;

    function handleHasLikedButton(recipe) {
        const isLiked = recipe.likes && recipe.likes.some(email => email === $user.email);
        return isLiked;
    }

    async function handleLike(recipeToLike) {
        const url = $BASE_URL + `/api/user/publicRecipes/likes/${recipeToLike._id}`;
        const email = $user.email;

        const likedRecipeToJSON = JSON.stringify({ email: email });

        if (recipeToLike.likes === undefined) {
             recipeToLike.likes = [];
        }
        
        recipeToLike.likes.push(email); 

        const response = await patch(url, likedRecipeToJSON);
    
        if (response.ok) { 
            const likedRecipes = $publicRecipes.map((recipe) => {
                if (recipe.procedure === recipeToLike.procedure) {
                    return recipeToLike;
                }
                return recipe;
            });

            $publicRecipes = likedRecipes;
        } else {
            toastr.error("Failed to like recipe");
        }
    }

    async function handleDislike(recipeToDislike) {
        const url = $BASE_URL + `/api/user/publicRecipes/dislike/${recipeToLike._id}`;
        const email = $user.email;

        const updatedLikes = recipeToDislike.likes.filter(like => like !== email);
        console.log("updated like list:", updatedLikes);
        recipeToDislike.likes = updatedLikes;

        const dislikedRecipeToJSON = JSON.stringify({ email: email });

        const response = await patch(url, dislikedRecipeToJSON);

        if (response.ok) {
            const updatePublicRecipes = $publicRecipes.map(recipe => {
                if (recipe.procedure === recipeToDislike.procedure) {
                    return recipeToDislike;
                }
                return recipe;
            });

            $publicRecipes = updatePublicRecipes;
        } else {
            toastr.error("Failed to dislike recipe");
        }
    }
</script>

{#if handleHasLikedButton(recipeToLike)}
    <button on:click={handleDislike.bind(null, recipeToLike)} class="liked">Liked</button>
{:else}
    <button on:click={handleLike.bind(null, recipeToLike)}>Like recipe</button>
{/if}

<style>
    .liked {
        background-color: green;
    }
</style>