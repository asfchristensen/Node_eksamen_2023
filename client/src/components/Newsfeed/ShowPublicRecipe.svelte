<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js"; 
    import { publishedRecipes } from "../../stores/publishedRecipes.js";
    import LikeButton from "./LikeButton.svelte";
    import Comment from "./Comment.svelte";
    import SeeRecipeButton from "./SeeRecipeButton.svelte";
    import { get } from "../../api/api.js";

    // importer component med special navbar også .. 
    onMount(async () => {
        await handleGetPublishedRecipes();
    });

    async function handleGetPublishedRecipes() {
        const url = $BASE_URL + "/api/publishedRecipes";
        const result = await get(url);
        result.data.reverse();
        publishedRecipes.set(result.data); 
    } 

    function handleAnchorClick(event) {
        event.preventDefault(); // Prevent the default behavior of the anchor tag
    }

</script>

<h2>Newsfeed</h2>
{#each $publishedRecipes as publicRecipe}

    <article id="{publicRecipe._id.toLowerCase()}">
        <h4>{publicRecipe.title}</h4>
        <img src="{publicRecipe.picURL}" alt="image of food"/>
        <footer>
            <LikeButton recipe={publicRecipe}/>
            <SeeRecipeButton recipe={publicRecipe}/> 
            <Comment recipe={publicRecipe}/>
        </footer>
       
    </article>

{/each} 

<style>
    article {
        display: inline-block;
        width: 60%;
    }

    img { 
        width: 40em;
        height: 20em;
        object-fit: cover;
    }
</style>

