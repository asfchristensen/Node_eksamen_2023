<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js"; 
    import { publicRecipes } from "../../stores/publicRecipes.js";
    import LikeButton from "./LikeButton.svelte";
    import Comment from "./Comment.svelte";
    import SeeRecipeButton from "./SeeRecipeButton.svelte";
    import { getWithCredentials } from "../../api/api.js";

    onMount(async () => {
        await handleGetPublicRecipes();
    });

    async function handleGetPublicRecipes() {
        const url = $BASE_URL + "/api/all/publicRecipes";
        const result = await getWithCredentials(url);
        console.log("result.data: ", result);
        result.data.reverse();
        publicRecipes.set(result.data); 
    } 

</script>

<h2>Newsfeed</h2>
{#each $publicRecipes as publicRecipe}

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

