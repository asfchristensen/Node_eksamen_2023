<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js"; 
    import { publishedRecipes } from "../../stores/publishedRecipes.js";
    import { user } from "../../stores/user.js";

    // importer component med special navbar også .. 

    onMount(async () => {
        await handleGetPublishedRecipes();
        getAllLikedRecipe();
    });

    async function handleGetPublishedRecipes() {
        const response = await fetch($BASE_URL + "/api/publishedRecipes");
        const result = await response.json();
        result.data.reverse();
        publishedRecipes.set(result.data); 
    } 

    function handleHasLikedButton(recipe) {
        console.log(recipe.likes);
        const isLiked = recipe.likes && recipe.likes.some(email => email === $user.email);
        console.log("isLiked: ", isLiked);
        return isLiked;
    }

    async function handleLike(recipe) {
        console.log("Recipe in handleLikeRecipe: ", recipe);
        
        // tjek om bruger med samme email har liket 
        const email = $user.email;
        const id = recipe._id;

        if (recipe.likes === undefined) {
            console.log("Inside if statement");
            recipe.likes = [];
            console.log(recipe);
        }
        
        recipe.likes.push(email); 


        const recipeLiked = JSON.stringify({ email, id });
        console.log("Recipe liked before patched: ", recipeLiked);
        const response = await fetch($BASE_URL + "/api/publishedRecipes/likes", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: recipeLiked,
            credentials: "include"
        }); 
    
        if (response.ok) { 
            const likedRecipes = $publishedRecipes.map((r) => {
            if (r.procedure === recipe.procedure) {
                console.log("Recipe changed to true", recipe);
                return recipe;
            }
            return r;
            });
            $publishedRecipes = likedRecipes;
        } else {
            console.log("Failed to like recipe");
        }
    }

    async function handleDislike(recipe) {
        console.log("Dislike function");
        const email = $user.email;
        const id = recipe._id;

        const updatedLikes = recipe.likes.filter(like => like !== email);
        console.log("updated like list:", updatedLikes);
        recipe.likes = updatedLikes;

        const recipeLiked = JSON.stringify({ email, id });
        console.log("Recipe liked before patched: ", recipeLiked);
        const response = await fetch($BASE_URL + "/api/publishedRecipes/dislike", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: recipeLiked,
            credentials: "include"
        }); 


        const updatePublishedRecipes = $publishedRecipes.map((r) => {
            if (r.procedure === recipe.procedure) {
                console.log("Likes updated", recipe);
                return recipe;
            }
            return r;
        });

        $publishedRecipes = updatePublishedRecipes;
    }

    function getAllLikedRecipe(){
        const myLikes = $publishedRecipes.filter( recipe => recipe.likes && recipe.likes.includes('bob@mail.dk'));
        console.log("Bobs liked list:", myLikes);
        return myLikes;
    }

</script>

<h1>News Feed</h1>

<div class="recipes">
    <h1>Her er der opskrifter</h1>
    {#each $publishedRecipes as recipe}
        <p>{recipe.author}</p>
        <img src="{recipe.picURL}" alt="image of food"/>
        <p>{recipe.title}</p>
        <p>{recipe.procedure}</p><br>
        {#if handleHasLikedButton(recipe)}
        <button on:click={handleDislike.bind(null, recipe)} class="liked">Liked </button>
        {:else}
        <button on:click={handleLike.bind(null, recipe)}>Like recipe</button>
        {/if}
    {/each}
</div>

<style>
    .liked {
        background-color: green;
    }
</style>

