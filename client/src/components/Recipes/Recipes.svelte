<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { user, recipes } from "../../stores/user.js";
    import toastr from "toastr";
    import MyLikes from "../MyLikes/MyLikes.svelte";
    import { getWithCredentials, patch, post } from "../../api/api.js";

    console.log('recipes:', $recipes);

    onMount(async () => {
       await handleGetAllRecipes();
       console.log('recipes after onmount:', $recipes);

    });

    async function handleGetAllRecipes(){
        const url = $BASE_URL + "/api/user/recipes";
        const result = await getWithCredentials(url);
        console.log("From get all recipes:", result);
        recipes.set(result.data);
    }

    const categories = [
        { text: "Italian" },
        { text: "Mexican" },
        { text: "Nordic kitchen" },
        { text: "Thai" },
        { text: "Chinese" },
        { text: "Sweets" },
        { text: "Baking" }
    ]

    let title = "";
    let category = "";
    let picURL = "";
    let ingredients = "";
    let procedure = "";

    let placeholder = "Category";

    async function handleCreateRecipe() {
        const url = $BASE_URL + "/api/user/recipes";
        const recipeToJSON = JSON.stringify({ isPublic: false, title, category, picURL, ingredients, procedure, isDeleted: false });
        console.log("object to send: ", recipeToJSON);
        const result = await patch(url, recipeToJSON);
    
        if (result.status === 200) { 
            toastr.success("Recipe created");
            setTimeout(async () => {
                await handleGetAllRecipes();
            }, 1000)
        } else {
            toastr.error("Failed to create recipe");
        }

        title = "";
        category = "";
        picURL = "";
        ingredients = "";
        procedure = "";
    }

    async function handleMakePublicRecipe(recipe) {
        const url = $BASE_URL + "/api/user/publicRecipes";
        console.log("Handle public recipes", recipe);
        recipe.isPublic = true;
        
        const recipeToPublic = { author: $user.email, ...recipe };
        const recipeToJSON = JSON.stringify(recipeToPublic);

        const result = await post(url, recipeToJSON);

        if (result.status === 200) {
            const url = $BASE_URL + "/api/user/recipes/make-public";
            const recipeInfo = JSON.stringify({ ...recipe });
            const res = await patch(url, recipeInfo);
        
            if (res.status === 200 ) {
                console.log("Changes isPublic to true", res.ok);
                const updateRecipes = $recipes.map((recipeInStore) => {
                    if (recipeInStore.procedure === recipe.procedure) {
                        console.log("Recipe changed to true", recipe);
                        return recipe;
                    }
                    return recipeInStore;
                });
                $recipes = updateRecipes;
                $recipes.forEach(recipeInStore => console.log("Is public in foreach:", recipeInStore.isPublic))
            } else {
                console.log("error - not changed anything");
            }
        };    
    }
</script>

<MyLikes/>

<hr>

<h2>Profile</h2>
<h5>Welcome to your profile page <span class="user">{$user.username}</span></h5>


<div class="form-recipe">
    <form on:submit|preventDefault={handleCreateRecipe}>
        <input type="text" placeholder="Title" name="title" bind:value={title} required>

        <select bind:value={category} required>
            {#if placeholder}
                <option value="" disabled selected hidden>{placeholder}</option>
            {/if}
            {#each categories as category}
                <option value={category.text}>
                    {category.text}
                </option>
            {/each}
        </select>

        <input type="url" placeholder="picture url" name="picURL" bind:value={picURL} required>
        <input type="text" placeholder="ingredients" name="ingredients" bind:value={ingredients} required>
        <input type="text" placeholder="procedure" name="procedure" bind:value={procedure} required>

        <button type="submit">Upload recipe</button>
    </form>
</div>

<div class="recipes">
    <h1>Her skal der være opskrifter</h1>
    {#if $recipes === null || $recipes === undefined}
        <h4>Add your recipes here...</h4>
    {:else}
        {#each $recipes as recipe}
            <img src="{recipe.picURL}" alt="image of food"/>
            <p>{recipe.title}</p>
            <p>{recipe.procedure}</p><br>
            {#if !recipe.isPublic}
            <button on:click={handleMakePublicRecipe.bind(null, recipe)}>Make public</button>
            {:else}
            <button disabled>Is public</button>
            {/if}
        {/each}
    {/if}
</div>


<style>
    .user {
        font-size: large;
        font-weight: bold;
        color: rgb(209, 76, 232);
    }
</style>