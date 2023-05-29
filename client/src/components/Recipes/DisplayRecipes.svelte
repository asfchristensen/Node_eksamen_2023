<script>
    import { Link } from "svelte-navigator";
    import { recipes } from "../../stores/userGlobals.js";
    import ModalRecipeButton from "../ModalRecipeButton/ModalRecipeButton.svelte";
    import DeleteButton from "./DeleteButton.svelte";
    import MakePublicButton from "./MakePublicButton.svelte";

    export let onGetAllRecipes;

    let latestAdded;

    $: {
        latestAdded = $recipes ? [...$recipes].reverse().slice(0,2) : [];
    }

</script>


<h2 id="header">Your recipes sneak-peak</h2>
{#if $recipes === null || $recipes === undefined || $recipes.length === 0}
    <h4>No recipes created yet...</h4>
{:else}
    <div class="grid">
        {#each latestAdded as recipe}
            <article class="recipe-article">
                <h4>{recipe.title}</h4>
                <img src="{recipe.picURL}" alt="image of food"/><br>
                <div class="buttons">
                    {#if !recipe.isPublic}
                        <div id="button">
                            <MakePublicButton recipeToPublic={recipe}/>
                        </div>
                    {:else}
                        <button id="button" class="contrast" disabled>Is public</button>
                    {/if}
                    <div id="button">
                        <ModalRecipeButton buttonTitle="Read" recipeToShow={recipe} path="/profile" onGetAllRecipes={onGetAllRecipes}/>
                    </div>
                    <div id="button">
                        <DeleteButton recipeToDelete={recipe}/>
                    </div>
                </div>
            </article>
        {/each}
    </div>
{/if}
<Link to="/my-recipes" role="button">See all your recipes</Link>


<style>
    .recipe-article {
        display: inline-block;
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
        width: 35%;
        height: 10%;
        margin: 0.1em;
    }

    #header {
        margin-bottom: none;
    }
    
</style>