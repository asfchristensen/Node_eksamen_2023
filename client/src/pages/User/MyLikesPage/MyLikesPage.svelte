<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../../stores/urlDomain";
    import { user, recipes } from "../../../stores/user";
    import { publicRecipes } from "../../../stores/publicRecipes.js";
    import { get } from "../../../api/api";

    import ModalRecipeButton from "../../../components/ModalRecipeButton/ModalRecipeButton.svelte";
    import Sidebar from "../../../components/Navbars/Sidebar.svelte";
    import UserInfo from "../../../components/UserInfo/UserInfo.svelte";
    import GoBackButton from "../../../components/Templates/Buttons/GoBackButton.svelte";

    onMount(async () => {
        await handleGetAllRecipes();
    });

    async function handleGetAllRecipes(){
        console.log(1);
        const url = $BASE_URL + "/api/user/recipes";
        const result = await get(url);
        console.log("From get all recipes:", result);
        recipes.set(result.data);
    }

    const myLikes = $publicRecipes.filter(recipe => recipe.likes && recipe.likes.includes($user.email));

</script>


    
<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>



    <div class="col-middle">
        <h2>All my likes</h2>
        <div class="recipes">
            {#each myLikes as liked}
                <article>
                    <h4>{liked.title}</h4>
                    <img src="{liked.picURL}" alt="image of food"/>
                     <p>Author: {liked.author}</p>
                    <div class="buttons">
                        <ModalRecipeButton buttonTitle="Read" recipeToShow={liked} path="/profile" onGetAllRecipes={handleGetAllRecipes}/>
                    </div>
                </article>
            {/each}
        </div>
    </div>


    <div class="col-right">
        <UserInfo/>
        <GoBackButton path="/profile"/>
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
        justify-content: center;
    }

  
</style>