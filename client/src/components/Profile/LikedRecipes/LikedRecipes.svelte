<script>
    import { publicRecipes } from "../../../stores/publicRecipes.js";
    import { user } from "../../../stores/userGlobals.js";
    import LikeButton from "../../LikeButton/LikeButton.svelte";
    import ModalRecipe from "../../ModalRecipe/ModalRecipe.svelte";
    import NavigateToButton from "../../Templates/Buttons/NavigateToButton.svelte";

    $: myLikes = $publicRecipes.filter(recipe => recipe.likes && recipe.likes.includes($user.email));

    let latestLiked;
    $: { latestLiked = myLikes ? [...myLikes].reverse().slice(0,2) : []; }
</script>

<h2>My likes sneak-peak</h2>
<div class="grid">
    {#if latestLiked.length === 0}
        <p id="p">No liked recipes at the moment. Explore in Newsfeed</p>
    {/if}

    {#each latestLiked as liked }
        <article class="recipe-article">
            <h4>{liked.title}</h4>
            <img src="{liked.picURL}" alt="imageOfFood"/>
            <p>Author: {liked.author}</p>
            <div class="buttons">
                <div id="button">
                    <ModalRecipe    
                        path="/profile"
                        recipeToShow={liked}
                    ></ModalRecipe>
                </div>
                <div id="button">
                    <LikeButton recipeToLike={liked}/>
                </div>
            </div>
        </article>
    {/each}
</div>

<NavigateToButton path="/my-likes" buttonTitle="See all your liked recipes"/>

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

    h2 { margin-top: 2em; }
    
    #p { color: rgb(108, 134, 143); } 
</style>