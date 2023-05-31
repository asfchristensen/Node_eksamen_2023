<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { patch } from "../../api/api.js";
    import { recipes } from "../../stores/userGlobals.js";
    import toastr from "toastr";

    export let recipeToDelete;

    async function handleDeleteRecipe(recipe) {
        const url = $BASE_URL + "/api/user/recipes/delete-recipe";
        const recipeToJSON = JSON.stringify(recipe); 

        const response = await patch(url, recipeToJSON);
        console.log("result delete:", response);

        if (response.ok) {
            toastr.success("Recipe deleted");
        } else {
            toastr.error("Failed to delete recipe");
        }

        recipe.isDeleted = true;
        recipes.update( recipes => recipes.filter(recipe => !recipe.isDeleted ));
    }
</script>

<button on:click={handleDeleteRecipe.bind(null, recipeToDelete)} class="delete-button">Delete</button>

