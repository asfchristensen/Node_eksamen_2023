<script>
    import { recipes } from "../../../stores/userGlobals.js";
    import ModalRecipe from "../../ModalRecipe/ModalRecipe.svelte";
    import UpdateRecipe from "../UpdateRecipe/UpdateRecipe.svelte";
    import RecipeToPublicButton from "../RecipeToPublicButton/RecipeToPublicButton.svelte";
    import DeletePrivateRecipeButton from "../DeletePrivateRecipeButton/DeletePrivateRecipeButton.svelte";
    import NavigateToButton from "../../Templates/Buttons/NavigateToButton.svelte";

    export let onGetAllRecipes;

    $: latestAdded = $recipes ? [...$recipes].reverse().slice(0,2) : []; 
</script>

<h2 id="header">Your recipes sneak-peak</h2>
{#if latestAdded.length === 0}
    <p id="p">No recipes created yet...</p>   
{:else}
    <div class="grid">
        {#each latestAdded as recipe}
            <article class="recipe-article">
                <h4>{recipe.title}</h4>
                <img src="{recipe.picURL}" alt="imageOfFood"/><br>
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
                            path="/profile"
                            recipeToShow={recipe}
                        >
                            <UpdateRecipe 
                                recipeToUpdate={recipe}
                                onGetAllRecipes={onGetAllRecipes}
                            />
                        </ModalRecipe>
                    </div>
                    <div id="button">
                        <DeletePrivateRecipeButton recipeToDelete={recipe}/>
                    </div>
                </div>
            </article>
        {/each}
    </div>
{/if}

<NavigateToButton 
    path="/my-recipes" 
    buttonTitle="See all your recipes"
/>

<style>
    .recipe-article { display: inline-block; }

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
        width: 35%;
        height: 10%;
        margin: 0.1em;
    }

    #header { margin-bottom: none; }

    #p { color: rgb(108, 134, 143); }
</style>