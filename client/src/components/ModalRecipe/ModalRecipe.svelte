<script>
    import { user } from "../../stores/userGlobals";
    import { Link } from "svelte-navigator";
    import UpdateRecipe from "../UpdateRecipe/UpdateRecipe.svelte";

    //export let isOpen = false;
    //export let onModal;
    export let path;
    export let recipeToShow;
    
    let isModalOpen = false;

    function handleRecipeModal () {
        isModalOpen = !isModalOpen;
    }

    
</script>

<button on:click={handleRecipeModal}>Read</button>

{#if isModalOpen}
    <dialog open>
        <article>
            <header>
                <Link to={path} class="close" on:click={handleRecipeModal}></Link>
                <h4>{recipeToShow.title}</h4>
                <img src="{recipeToShow.picURL}" alt={recipeToShow.title}/>
            </header>
            <div class="recipe-wrapper">
                <span><strong>Serves</strong></span>
                <span>{recipeToShow.serves}</span><br>
                <span><strong>Ingredients</strong></span>
                <span>{recipeToShow.ingredients}</span> <br>
                <span><strong>Procedure</strong></span>
                <span>{recipeToShow.procedure}</span>
            </div>

            <slot/>
            <!-- {#if canUpdate}
                <UpdateRecipe recipeToUpdate={recipeToShow} onGetAllRecipes={onGetAllRecipes}/> 
            {/if} -->
        </article>
        
    </dialog>
{/if}

<style>
    header h4 { margin-bottom: 0.1em; }

    .recipe-wrapper {
        display: flex;
        flex-direction: column;
        text-align: left;
        margin: 0% 5%;
    }

    img { 
        width: 40em;
        height: 20em;
        object-fit: cover;
    }
</style>