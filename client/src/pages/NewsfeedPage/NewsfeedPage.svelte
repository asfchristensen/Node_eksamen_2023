<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain";
    import { get } from "../../api/api";
    import { publicRecipes } from "../../stores/publicRecipes";
    import { user } from "../../stores/userGlobals.js";
    import Sidebar from "../../components/Navbars/Sidebar.svelte";
    import SearchBar from "../../components/SearchBar/SearchBar.svelte";
    import LikeButton from "../../components/LikeButton/LikeButton.svelte";
    import ModalRecipeButton from "../../components/ModalRecipe/ModalRecipe.svelte";
    import CreateComment from "../../components/CreateComment/CreateComment.svelte";
    import DeleteButton from "../../components/Templates/Buttons/DeleteButton.svelte";
    import ModalRecipe from "../../components/ModalRecipe/ModalRecipe.svelte";
  
    onMount(async () => {
        await handleGetAllPublicRecipes();
    });

    async function handleGetAllPublicRecipes() {
        const url = $BASE_URL + "/api/both/publicRecipes";
        const result = await get(url);
        console.log("result.data: ", result);
        result.data.reverse();
        publicRecipes.set(result.data); 
    } 


</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>

    <div class="col-middle">
        <h2>Newsfeed</h2>
        {#each $publicRecipes as publicRecipe}
            <article id="{publicRecipe._id.toLowerCase()}">
                <h4>{publicRecipe.title}</h4>
                <img src="{publicRecipe.picURL}" alt="imageOfFood"/>
                <p>Author: {publicRecipe.author}</p>
                {#if $user.role === 2}
                    <footer>
                        <LikeButton recipeToLike={publicRecipe}/>
                        
                        <ModalRecipe 
                            path="/newsfeed"
                            recipeToShow={publicRecipe}
                        ></ModalRecipe>
                        
                        <CreateComment recipeToComment={publicRecipe}/>
                    </footer>
                {:else if $user.role === 1}
                    <footer>
                        <DeleteButton
                            objectToDelete={publicRecipe}
                            onHandleUpdate={handleGetAllPublicRecipes}
                            endpoint={`/api/admin/publicRecipes/${publicRecipe._id}`}
                            objectName="Public recipe"
                        />
                        <ModalRecipe 
                            path="/newsfeed"
                            recipeToShow={publicRecipe}
                        ></ModalRecipe>
                    </footer>
                {/if}
            </article>
        {/each} 


    </div>

    <div class="col-right">
        <SearchBar searchSubject="Category"/>
        <SearchBar searchSubject="Title"/>
    </div>
</div>

<style>
    article {
        display: inline-block;
        width: 60%;
    }

    img { 
        width: 40em;
        height: 20em;
        object-fit: cover;
    } 

    p{ margin-top: 1em;}
</style>

