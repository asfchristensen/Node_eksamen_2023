<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { user, recipes } from "../../stores/userGlobals.js";
    import { patch, post } from "../../api/api.js";
    import toastr from "toastr";

    export let recipeToPublic;
    
    async function handleCreatePublicRecipe(recipe) {
        const url = $BASE_URL + "/api/user/publicRecipes";
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
                toastr.error("Failed to make recipe public");
            }
        };    
    }
</script>

<button class="contrast" on:click={handleCreatePublicRecipe.bind(null, recipeToPublic)}>To public</button>