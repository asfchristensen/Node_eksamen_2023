<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js"; 
    import { user } from "../../stores/userGlobals.js";
    import { publicRecipes } from "../../stores/publicRecipes.js";
    import { get } from "../../api/api.js";
    import LikeButton from "../Newsfeed/LikeButton.svelte";
    import CommentButton from "../Newsfeed/CommentButton.svelte";
    import ModalRecipeButton from "../ModalRecipeButton/ModalRecipeButton.svelte";
    import DeleteButton from "../Newsfeed/DeleteButton.svelte";

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
                <CommentButton recipe={publicRecipe}/>
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
</style>

