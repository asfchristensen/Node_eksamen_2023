<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { user, recipes } from "../../stores/user.js";
    import toastr from "toastr";
    import MyLikes from "../MyLikes/MyLikes.svelte";
    import { get } from "../../api/api.js";

    console.log('recipes:', $recipes);

    onMount(async () => {
       await handleGetAllRecipes();
       console.log('recipes after onmount:', $recipes);

    });

    async function handleGetAllRecipes(){
        const url = $BASE_URL + `/api/recipes/${$user.email}`;
        const result = await get(url);
        console.log("From get all recipes:", result.data);
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
        const recipeInfo = JSON.stringify({ isPublished: false, title, category, picURL, ingredients, procedure });
        console.log("object to send: ", recipeInfo);
        const response = await fetch($BASE_URL + "/api/recipes", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: recipeInfo,
            credentials: "include"
        });
    
        const result = await response.json(); 
        console.log(result); 

        if (response.ok) { 
            toastr.success(`Recipe uploaded, good job ${$user.username}`);
            setTimeout(() => {
                handleGetAllRecipes();
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

    async function handlePublishRecipe(recipe) {
        console.log("Handle publish recipes", recipe);
        recipe.isPublished = true;
        
        const recipeToPublish = { author: $user.email, ...recipe };
        const recipeToJSON = JSON.stringify(recipeToPublish);

        // sætter recipen til published collection
        const response = await fetch($BASE_URL + "/api/publishedRecipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: recipeToJSON,
            credentials: "include"
        });

        if (response.ok) {
            // opdaterer samme recipe i useren 
            const recipeInfo = JSON.stringify({ ...recipe });
            const res = await fetch($BASE_URL + "/api/recipes/published", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: recipeInfo,
                credentials: "include"
            });

            if (res.ok) {
                console.log("Changes isPublished to true in user Laura", res.ok);
                const updateRecipes = $recipes.map((r) => {
                    if (r.procedure === recipe.procedure) {
                        console.log("Recipe changed to true", recipe);
                        return recipe;
                    }
                    return r;
                });
                $recipes = updateRecipes;
                $recipes.forEach(r => console.log("Is published in foreach:", r.isPublished))
            } else {
                console.log("error - not changed anything");
            }
        }
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
            {#if !recipe.isPublished}
            <button on:click={handlePublishRecipe.bind(null, recipe)}>Publish</button>
            {:else}
            <button disabled>Published</button>
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