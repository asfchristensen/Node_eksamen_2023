<script>
    import { BASE_URL } from "../../stores/urlDomain.js"; 
    import { user } from "../../stores/userGlobals.js";
    import { publicRecipes } from "../../stores/publicRecipes.js";
    import { patch } from "../../api/api.js";
    
    export let recipeToLike;

    function handleHasLikedButton(recipe) {
        const isLiked = recipe.likes && recipe.likes.some(email => email === $user.email);
        return isLiked;
    }

    async function handleLike(recipe) {
        const url = $BASE_URL + "/api/user/publicRecipes/likes";
        const email = $user.email;
        const id = recipe._id;

        const likedRecipeToJSON = JSON.stringify({ email, id });

        if (recipe.likes === undefined) {
            recipe.likes = [];
        }
        
        recipe.likes.push(email); 

        const response = await patch(url, likedRecipeToJSON);
    
        if (response.ok) { 
            const likedRecipes = $publicRecipes.map((r) => {
                if (r.procedure === recipe.procedure) {
                    return recipe;
                }
                return r;
            });
            $publicRecipes = likedRecipes;
        } else {
            console.log("Failed to like recipe");
        }
    }

    async function handleDislike(recipeToDislike) {
        console.log("Dislike function");
        const url = $BASE_URL + "/api/user/publicRecipes/dislike";
        const email = $user.email;
        const id = recipeToDislike._id;

        const updatedLikes = recipeToDislike.likes.filter( like => like !== email);
        console.log("updated like list:", updatedLikes);
        recipeToDislike.likes = updatedLikes;

        const dislikedRecipeToJSON = JSON.stringify({ email, id });

        await patch(url, dislikedRecipeToJSON);

        const updatePublicRecipes = $publicRecipes.map(recipe => {
            if (recipe.procedure === recipeToDislike.procedure) {
                return recipeToDislike;
            }
            return recipe;
        });

        $publicRecipes = updatePublicRecipes;
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