<script>
    import { BASE_URL } from "../../../stores/urlDomain.js";
    import { user, recipes } from "../../../stores/userGlobals.js";
    import { patch, post } from "../../../api/api.js";
    import Confirm from "svelte-confirm/src/Confirm.svelte";
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
        
            if (res.status === 200) {
                const updateRecipes = $recipes.map((recipeInStore) => {
                    if (recipeInStore.procedure === recipe.procedure) {
                        return recipe;
                    }
                    return recipeInStore;
                });
                $recipes = updateRecipes;
            } else {
                toastr.error("Failed to make recipe public");
            }
        };    
    }
</script>

<Confirm
    confirmTitle="Make public"
    cancelTitle="Cancel"
    let:confirm="{confirmThis}"
>
    <button class="contrast" on:click={() => confirmThis(handleCreatePublicRecipe.bind(null, recipeToPublic))}>To public</button>
    <span slot="title">
        Make your recipe public?
    </span>
    <span slot="description">
        You can't make the recipe not public again. Are you sure?
    </span>
</Confirm> 
