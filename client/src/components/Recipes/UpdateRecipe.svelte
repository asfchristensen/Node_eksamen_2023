<script>
    import toastr from "toastr";
    import { patch } from "../../api/api";
    import { BASE_URL } from "../../stores/urlDomain";
   // import { user } from "../../stores/userGlobals.userGlobals.js";

    export let recipeToUpdate;
    export let onGetAllRecipes;

    let ingredients = "";
    let procedure = "";

    async function handleUpdateRecipe() {
        const url = $BASE_URL + "/api/users/recipes/update-recipe";
    
        const recipe = {...recipeToUpdate, ingredients, procedure };

        const recipeToJSON = JSON.stringify(recipe);
        const result = await patch(url, recipeToJSON)
        console.log(result);

        if (result.status === 200) { 
            toastr.success("Recipe updated");
            setTimeout(async () => {
                await onGetAllRecipes();
            }, 1000)
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
            <textarea placeholder="procedure"cols="30" rows="5" bind:value={procedure}></textarea>
            <button type="submit">Update recipe</button>   
        </form>
    </details>  


<style>
    details {
        margin-top: 5%;
    }
</style>