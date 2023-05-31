<script>
    import { get } from "../../../api/api";
    import GoBackButton from "../../../components/Templates/Buttons/NavigateToButton.svelte";
    import Sidebar from "../../../components/Navbars/Sidebar.svelte";
    import DeleteButton from "../../../components/DeletePrivateRecipeButton/DeletePrivateRecipeButton.svelte";
    import UserInfo from "../../../components/ProfileInfo/ProfileInfo.svelte";
    import { BASE_URL } from "../../../stores/urlDomain";
    import { recipes } from "../../../stores/userGlobals";
    import ModalRecipe from "../../../components/ModalRecipe/ModalRecipe.svelte";
    import UpdateRecipe from "../../../components/UpdateRecipe/UpdateRecipe.svelte";
    import RecipeToPublicButton from "../../../components/RecipeToPublicButton/RecipeToPublicButton.svelte";
    import NavigateToButton from "../../../components/Templates/Buttons/NavigateToButton.svelte";


    async function handleGetAllRecipes(){
        const url = $BASE_URL + "/api/user/recipes";
        const result = await get(url);
        console.log("From get all recipes:", result);
        recipes.set(result.data);
    }

</script>
    
<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>
    <div class="col-middle">
        <h2>All my recipes</h2>
        <div class="recipes">
            {#each $recipes as recipe}
                <article>
                    <h4>{recipe.title}</h4>
                    <img src={recipe.picURL} alt="imageOfFood"/>
                    <div class="buttons">
                        {#if !recipe.isPublic}
                            <div id="button">
                                <RecipeToPublicButton recipeToPublic={recipe}/>
                            </div>
                        {:else}
                            <button id="button" class="contrast" disabled>Is public</button>
                        {/if}
                        <div id="button">
                            <ModalRecipe 
                              
                                path="/my-recipes"
                                recipeToShow={recipe}
                            >
                                <UpdateRecipe 
                                    recipeToUpdate={recipe}
                                    onGetAllRecipes={handleGetAllRecipes}
                                />
                            </ModalRecipe>
                        </div>
                        <div id="button">
                            <DeleteButton recipeToDelete={recipe}/>
                        </div>
                    </div>
                </article>
            {/each}
        </div>
    </div>
    <div class="col-right">
        <UserInfo/>
        <NavigateToButton path="/profile" buttonTitle="Go back to profile"/>
    </div>
</div>

<style>

    .recipes {
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* Creates three equal-width columns */
        /* Adds a gap of 20px between grid items */
        grid-gap: 1em; 
    }

    img { 
        width: 25em;
        height: 15em;
        object-fit: cover;
        margin-bottom: 1em;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }

    #button {
        width: 35%;
        height: 10%;
        margin: 0.1em;
    }
</style>