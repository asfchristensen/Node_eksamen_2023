<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { user, recipes } from "../../stores/user.js";
    import { navigate } from "svelte-navigator"; 
    import toastr from "toastr";

    console.log('recipes:', $recipes);

    onMount(async () => {
       await getAllRecipes();
    });

    async function getAllRecipes(){
        const recipesURL = $BASE_URL + `/api/recipes/${$user.email}`;
        const response = await fetch(recipesURL);
        console.log(response)
        const result = await response.json();
        console.log(result)
        recipes.set(result.data); 
        console.log(typeof $recipes);
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
        const recipeInfo = JSON.stringify({ title, category, picURL, ingredients, procedure });
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
            toastr.success(`Recipe uploaded, good job ${$user}`);
            setTimeout(() => {
                getAllRecipes();
                console.log(response);
                console.log(result);
                //navigate("/profile", { replace: true });
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

</script>

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
    {#if $recipes === null}
        <h4>Add your recipes here...</h4>
    {:else}
        {#each $recipes as recipe}
            <img src="{recipe.picURL}" alt="image of food"/>
            <p>{recipe.title}</p>
        {/each}
    {/if}
</div>

<!--
<div class="form-signup">
    <form on:submit|preventDefault={handleSignup}>
        <input type="text" placeholder="username" name="username" bind:value={username} required><br><br>

        <input type="password" placeholder="password" name="password" bind:value={password} required><br><br>

        <input type="email" placeholder="email" name="email" bind:value={email} required><br><br>

        <button type="submit">Sign up</button>
    </form>
</div>
-->

<style>
    .user {
        font-size: large;
        font-weight: bold;
        color: rgb(209, 76, 232);
    }
</style>