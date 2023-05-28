<script>
    import "@picocss/pico";
    import { Link } from "svelte-navigator";
    import UpdateRecipe from "../Recipes/UpdateRecipe.svelte";
    import { user } from "../../stores/user";

    export let buttonTitle;
    export let recipeToShow;
    export let path;
    export let onGetAllRecipes;
    
    let isClicked = false;

    console.log("before clicked: ", isClicked);
    function handleModal () {
        isClicked = !isClicked;
        console.log("after cliked: ",isClicked);
    }

</script>

<button on:click={handleModal}>{buttonTitle}</button>

{#if isClicked}
    <dialog open>
        <article>
            <header>
                <Link to={path} class="close" on:click={handleModal}></Link>
                <h3>{recipeToShow.title}</h3>
                <img src="{recipeToShow.picURL}" alt="image of food"/>
            </header>
            <div class="recipe-wrapper">
                <span><strong>Serves</strong></span>
                <span>{recipeToShow.serves}</span><br>
                <span><strong>Ingredients</strong></span>
                <span>{recipeToShow.ingredients}</span> <br>
                <span><strong>Procedure</strong></span>
                <span>{recipeToShow.procedure}</span>
            </div>
            {#if path === "/profile" && recipeToShow.author === $user.email}
                <!-- UPDATE PRIVATE RECIPE-->
                <UpdateRecipe recipeToUpdate={recipeToShow} onGetAllRecipes={onGetAllRecipes}/>   
            {/if}
        </article>
        
    </dialog>
{/if}

<style>
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