<script>
    import { BASE_URL } from "../../../stores/urlDomain.js";
    import { recipes } from "../../../stores/userGlobals.js";
    import { get } from "../../../api/api.js";
    import Sidebar from "../../../components/Navbars/Sidebar.svelte";
    import DeleteButton from "../../../components/Profile/DeletePrivateRecipeButton/DeletePrivateRecipeButton.svelte";
    import ModalRecipe from "../../../components/ModalRecipe/ModalRecipe.svelte";
    import UpdateRecipe from "../../../components/Profile/UpdateRecipe/UpdateRecipe.svelte";
    import RecipeToPublicButton from "../../../components/Profile/RecipeToPublicButton/RecipeToPublicButton.svelte";
    import NavigateToButton from "../../../components/Templates/Buttons/NavigateToButton.svelte";
    import toastr from "toastr";
    import ProfileInfo from "../../../components/Profile/ProfileInfo/ProfileInfo.svelte";

    async function handleGetAllRecipes() {
        const url = $BASE_URL + "/api/user/recipes";
        const result = await get(url);

        if (result.status === 200 || result.data === undefined) {
            recipes.set(result.data);
        } else {
            toastr.error("Failed to get all recipes");
        }
    }
</script>
    
<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>
    <div class="col-middle">
        <h2>All my recipes</h2>
        {#if $recipes === undefined}
            <p id="p">No recipes created yet...</p>   
        {:else}
            <div class="recipe-grid">
                {#each $recipes as recipe}
                    <article class="recipe-article">
                        <h4>{recipe.title}</h4>
                        <img src={recipe.picURL} alt="imageOfFood"/>
                        <div class="buttons">
                            {#if !recipe.isPublic}
                                <div id="button">
                                    <RecipeToPublicButton recipeToPublic={recipe}/>
                                </div>
                            {:else}
                                <button class="contrast public-btn" disabled>Is public</button>
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
        {/if}
    </div>
    <div class="col-right">
        <ProfileInfo/>
        <NavigateToButton path="/profile" buttonTitle="Go back to profile"/>
    </div>
</div>

<style>
 .recipe-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1em;
    }

    .recipe-article {
        display: flex;
        flex-direction: column;
        padding: 1em;
       
    }

    .recipe-article h4 {
        margin-top: 0;
    }

    .recipe-article img { 
        width: 25em;
        height: 15em;
        object-fit: cover;
        margin-bottom: 1em;
    }

    .buttons {
        display: flex;
        justify-content: center;
    }

    #button {
      margin: 0.1em;
      height: 10%;
    } 

    #p { color: rgb(108, 134, 143); }
</style>
