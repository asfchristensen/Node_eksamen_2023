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
        const url = $BASE_URL + `/api/user/public_recipes/likes/${recipeToLike._id}`;
        const email = $user.email;

        const likedRecipeToJSON = JSON.stringify({ email: email });

        if (recipeToLike.likes === undefined) {
             recipeToLike.likes = [];
        }
        
        recipeToLike.likes.push(email); 

        const response = await patch(url, likedRecipeToJSON);
    
        if (response.ok) { 
            publicRecipes.set($publicRecipes);
        } else {
            toastr.error("Failed to like recipe");
        }
    }

    async function handleDislike(recipeToDislike) {
        const url = $BASE_URL + `/api/user/public_recipes/dislike/${recipeToLike._id}`;
        const email = $user.email;

        const updatedLikes = recipeToDislike.likes.filter(like => like !== email);
        recipeToDislike.likes = updatedLikes;

        const dislikedRecipeToJSON = JSON.stringify({ email: email });

        const response = await patch(url, dislikedRecipeToJSON);

        if (response.ok) {
            publicRecipes.set($publicRecipes);
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
        background-color: rgb(71, 198, 170);
    }
</style>