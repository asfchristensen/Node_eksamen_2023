<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../../stores/urlDomain";
    import { user, recipes } from "../../../stores/userGlobals";
    import { publicRecipes } from "../../../stores/publicRecipes.js";
    import { get } from "../../../api/api";
    import Sidebar from "../../../components/Navbars/Sidebar.svelte";
    import ProfileInfo from "../../../components/ProfileInfo/ProfileInfo.svelte";
    import LikeButton from "../../../components/LikeButton/LikeButton.svelte";
    import ModalRecipe from "../../../components/ModalRecipe/ModalRecipe.svelte";
    import NavigateToButton from "../../../components/Templates/Buttons/NavigateToButton.svelte";

    onMount(async () => {
        await handleGetAllRecipes();
    });

    async function handleGetAllRecipes(){
        const url = $BASE_URL + "/api/user/recipes";
        const result = await get(url);
        recipes.set(result.data);
    }

    $: myLikes = $publicRecipes.filter(recipe => recipe.likes && recipe.likes.includes($user.email));

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
                    <img src="{liked.picURL}" alt="imageOfFood"/>
                     <p>Author: {liked.author}</p>
                    <div class="buttons">
                        <div id="button">
                            <ModalRecipe  
                                path="/my-likes"
                                recipeToShow={liked}
                            ></ModalRecipe>
                        </div>
                     
                        <div id="button">
                            <LikeButton recipeToLike={liked}/>
                        </div>
                     
                    </div>
                </article>
            {/each}
        </div>
    </div>


    <div class="col-right">
        <ProfileInfo/>
        <NavigateToButton path="/profile" buttonTitle="Go back to profile"/>

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


    #button {
        width: 35%;
        height: 10%;
        margin: 0.1em;
    }

  
</style>