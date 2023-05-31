<script>
    import { patch } from "../../../api/api.js";
    import { BASE_URL } from "../../../stores/urlDomain.js";
    import toastr from "toastr";

    export let recipeToUpdate;
    export let onGetAllRecipes;

    let ingredients = "";
    let procedure = "";

    async function handleUpdateRecipe() {
        const url = $BASE_URL + "/api/users/recipes/update-recipe";
    
        const recipe = { 
            ...recipeToUpdate, 
            ingredients: ingredients, 
            procedure: procedure 
        };

        const recipeToJSON = JSON.stringify(recipe);
        const response = await patch(url, recipeToJSON);

        if (response.ok) { 
            toastr.success("Recipe updated");
            await onGetAllRecipes();
        } else {
            toastr.error("Failed to update recipe");
        }

        ingredients = "";
        procedure = "";
    }
</script>

<details>
    <summary role="button">Update</summary>
    <form on:submit|preventDefault={handleUpdateRecipe}> 
        <input type="text" placeholder="ingredients" name="ingredients" bind:value={ingredients}>
        <textarea placeholder="procedure" cols="30" rows="5" bind:value={procedure}></textarea>
        <button type="submit">Update recipe</button>   
    </form>
</details>  

<style>
    details { margin-top: 5%; }
</style>