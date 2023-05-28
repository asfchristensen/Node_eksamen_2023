<script>
    import { getWithCredentials } from "../../../api/api";
    import ModalRecipeButton from "../../../components/ModalRecipeButton/ModalRecipeButton.svelte";
    import Sidebar from "../../../components/Navbars/Sidebar.svelte";
    import DeleteButton from "../../../components/Recipes/DeleteButton.svelte";
    import MakePublicButton from "../../../components/Recipes/MakePublicButton.svelte";
    import UserInfo from "../../../components/UserInfo/UserInfo.svelte";
    import { BASE_URL } from "../../../stores/urlDomain";
    import { recipes } from "../../../stores/user";

    async function handleGetAllRecipes(){
        const url = $BASE_URL + "/api/user/recipes";
        const result = await getWithCredentials(url);
        console.log("From get all recipes:", result);
        recipes.set(result.data);
    }
</script>


    
<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>



    <div class="col-middle">
        <h2>All my recipes</h2>
        <div class="recipes">
            {#each $recipes as recipe}
                <article>
                    <h4>{recipe.title}</h4>
                    <img src={recipe.picURL} alt="image of food"/>
                    <div class="buttons">
                        {#if !recipe.isPublic}
                            <div id="button">
                                <MakePublicButton recipeToPublic={recipe}/>
                            </div>
                        {:else}
                            <button id="button" class="contrast" disabled>Is public</button>
                        {/if}
                        <div id="button">
                            <ModalRecipeButton buttonTitle="Read" recipeToShow={recipe} path="/my-recipes" onGetAllRecipes={handleGetAllRecipes}/>
                        </div>
                        <div id="button">
                            <DeleteButton recipeToDelete={recipe}/>
                        </div>
                    </div>
                </article>
            {/each}
        </div>
    </div>


    <div class="col-right">
        <UserInfo/>
    </div>
</div>

<style>

    .recipes {
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* Creates three equal-width columns */
        /* Adds a gap of 20px between grid items */
        grid-gap: 1em; 
    }

    img { 
        width: 25em;
        height: 15em;
        object-fit: cover;
        margin-bottom: 1em;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }

    #button {
        width: 35%;
        height: 10%;
        margin: 0.1em;
    }
</style>