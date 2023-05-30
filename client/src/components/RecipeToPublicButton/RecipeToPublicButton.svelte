<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { user, recipes } from "../../stores/userGlobals.js";
    import { patch, post } from "../../api/api.js";

    export let recipeToPublic;
    
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

<button class="contrast" on:click={handleMakePublicRecipe.bind(null, recipeToPublic)}>To public</button>