<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js"; 
    import { publishedRecipes } from "../../stores/publishedRecipes.js";

    // importer component med special navbar også .. 

    onMount(async () => {
        await handleGetPublishedRecipes();
    });

    async function handleGetPublishedRecipes() {
        const response = await fetch($BASE_URL + "/api/publishedRecipes");
        const result = await response.json();
        result.data.reverse();
        publishedRecipes.set(result.data); 
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
    {/each}
</div>


