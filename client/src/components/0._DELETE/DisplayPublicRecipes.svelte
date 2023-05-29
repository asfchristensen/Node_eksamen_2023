<!-- <script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js"; 
    import { user } from "../../stores/userGlobals.js";
    import { publicRecipes } from "../../stores/publicRecipes.js";
    import { get, patch } from "../../api/api.js";
    import LikeButton from "../Newsfeed/LikeButton.svelte";
    import ModalRecipeButton from "../ModalRecipeButton/ModalRecipeButton.svelte";
    import DeleteButton from "../Templates/Buttons/DeleteButton.svelte";
    import CreateComment from "../CreateComment/CreateComment.svelte";

    onMount(async () => {
        await handleGetAllPublicRecipes();
    });

    async function handleGetAllPublicRecipes() {
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
        <img src="{publicRecipe.picURL}" alt="imageOfFood"/>
        {#if $user.role === 2}
            <footer>
                <LikeButton recipeToLike={publicRecipe}/>
                <ModalRecipeButton canUpdate={false} buttonTitle="Read recipe" recipeToShow={publicRecipe} path="/newsfeed" onGetAllRecipes={handleGetAllPublicRecipes}/> 
                <CreateComment recipe={publicRecipe}/>
            </footer>
        {:else if $user.role === 1}
            <footer>
                <ModalRecipeButton canUpdate={false} buttonTitle="Read recipe" recipeToShow={publicRecipe} path="/newsfeed" onGetAllRecipes={handleGetAllPublicRecipes}/> 
                <DeleteButton
                    objectToDelete={publicRecipe}
                    onHandleUpdate={handleGetAllPublicRecipes}
                    endpoint={`/api/admin/publicRecipes/${publicRecipe._id}`}
                    objectName="Public recipe"
                />
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
 -->
