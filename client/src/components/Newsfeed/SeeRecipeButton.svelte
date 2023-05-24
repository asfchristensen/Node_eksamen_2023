<script>
    import "@picocss/pico";
    import { Link } from "svelte-navigator";
    export let recipe;
    
    let isClicked = false;

    console.log("before clicked: ", isClicked);
    function handleModal () {
        isClicked = !isClicked;
        console.log("after cliked: ",isClicked);
    }


</script>

<button on:click={handleModal}>Read Recipe</button>

{#if isClicked}
<dialog open>
    <article>
        <header>
            <Link to="/newsfeed" class="close" on:click={handleModal}></Link>
            <h3 id="recipe-title">{recipe.title}</h3>
            <img src="{recipe.picURL}" alt="image of food"/>
        </header>
        <div class="recipe-wrapper">
            <span><strong>Ingredients</strong></span>
            <span>{recipe.ingredients}</span> <br>
            <span><strong>Procedure</strong></span>
            <span>{recipe.procedure}</span>
        </div>
    </article>
  </dialog>
{/if}

<style>
    .recipe-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 0% 5%;
    }

    img { 
        width: 40em;
        height: 20em;
        object-fit: cover;
    }
</style>