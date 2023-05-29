<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { patch } from "../../api/api.js";
    import toastr from "toastr";
    import { recipes } from "../../stores/userGlobals.js";

    export let recipeToDelete;


    async function handleDeleteRecipe(recipe) {
        const url = $BASE_URL + "/api/user/recipes/delete-recipe";
        const recipeToJSON = JSON.stringify(recipe); 
        console.log("recipe",recipeToJSON);

        const result = await patch(url, recipeToJSON);
        console.log("result delete:", result);

        if (result.status === 200) {
            toastr.success("success - event deleted");
            // evt. get all xxxx som en prop
        } else {
            toastr.error("error - failed to delete event");
        }

        recipe.isDeleted = true;
        recipes.update( recipes => recipes.filter(recipe => !recipe.isDeleted ));
        $recipes.forEach(event => console.log("recipes after:", recipe));

    }
</script>

<button on:click={handleDeleteRecipe.bind(null, recipeToDelete)} class="delete-button">Delete</button>

