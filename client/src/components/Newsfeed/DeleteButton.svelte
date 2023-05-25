<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { publicRecipes } from "../../stores/publicRecipes.js";
    import { remove } from "../../api/api.js";
    import toastr from "toastr";

    export let recipeToDelete;

    async function handleDeletePublicRecipe(recipe) {
        const url = $BASE_URL + "/api/admin/publicRecipes";
        const recipeToJSON = JSON.stringify(recipe); 

        const result = await remove(url, recipeToJSON);
        console.log("result delete:", result);

        if (result.status === 200) {
            toastr.success("success - public recipe deleted");
        } else {
            toastr.error("error - failed to delete public recipe recipe");
        }

        recipeToDelete.isDeleted = true;
        publicRecipes.update( recipes => recipes.filter(recipe => !recipe.isDeleted ));
        $publicRecipes.forEach(recipe => console.log("recipes after:", recipe));
    }
</script>

<button on:click={handleDeletePublicRecipe.bind(null, recipeToDelete)} class="delete-button">Delete recipe</button>

<style>
    .delete-button {
        background-color: brown;
    }
</style>