<script>
    import { Link } from "svelte-navigator";
    import { publicRecipes } from "../../stores/publicRecipes.js";
    import { user } from "../../stores/user.js"
    import ModalRecipeButton from "../ModalRecipeButton/ModalRecipeButton.svelte";

    export let onGetAllRecipes;

    const myLikes = $publicRecipes.filter(recipe => recipe.likes && recipe.likes.includes($user.email));

    let latestLiked;

    $: {
        latestLiked = myLikes ? [...myLikes].reverse().slice(0,2) : []; 
    }

</script>

<h2 id="header">My likes</h2>

<div class="grid">
    {#each latestLiked as liked }
        <article>
            <h4>{liked.title}</h4>
            <img src="{liked.picURL}" alt="image of food"/>
            <p>Author: {liked.author}</p>
            
            <div class="buttons">
                <div id="button">
                    <ModalRecipeButton buttonTitle="Read" recipeToShow={liked} path="/profile" onGetAllRecipes={onGetAllRecipes}/>
                </div>
            </div>
        </article>
    {/each}
</div>
<Link to="/my-likes" role="button">See all your liked recipes</Link>

<style>
    article {
        display: inline-block;
    }

    img { 
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
        margin-top: 2em;
    }
    
</style>