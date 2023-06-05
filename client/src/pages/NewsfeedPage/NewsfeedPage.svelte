<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { get } from "../../api/api.js";
    import { publicRecipes } from "../../stores/publicRecipes.js";
    import { user } from "../../stores/userGlobals.js";
    import Sidebar from "../../components/Navbars/Sidebar.svelte";
    import SearchBar from "../../components/SearchBar/SearchBar.svelte";
    import LikeButton from "../../components/LikeButton/LikeButton.svelte";
    import CreateComment from "../../components/CreateComment/CreateComment.svelte";
    import DeleteButton from "../../components/Templates/Buttons/DeleteButton.svelte";
    import ModalRecipe from "../../components/ModalRecipe/ModalRecipe.svelte";
    import toastr from "toastr";
  
    onMount(async () => {
        await handleGetAllPublicRecipes();
    });

    async function handleGetAllPublicRecipes() {
        const url = $BASE_URL + "/api/both/public_recipes";
        const result = await get(url);

        if (result.status === 200 || result.data === undefined) {
            result.data.reverse();
            publicRecipes.set(result.data);
        } else {
            toastr.error("Failed to get all public recipes");
        } 
    } 
</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>
    <div class="col-middle">
        <h2>Newsfeed</h2>
        {#each $publicRecipes as publicRecipe}
            <article id="{publicRecipe._id}">
                <h4>{publicRecipe.title}</h4>
                <img src="{publicRecipe.picURL}" alt="imageOfFood"/>
                <p><strong>Author: </strong>{publicRecipe.author}</p>
                <p><strong>Category: </strong>{publicRecipe.category}</p>
                {#if publicRecipe.likes === undefined}
                    <p></p>
                {:else}
                    <p><strong>Likes: </strong>{publicRecipe.likes.length}</p>
                {/if}
                {#if $user.role === 2}
                    <footer>
                        <div class="buttons">
                            <div id="button">
                                <LikeButton recipeToLike={publicRecipe}/>
                            </div>
                            <div id="button">
                                <ModalRecipe 
                                    path="/newsfeed"
                                    recipeToShow={publicRecipe}
                                ></ModalRecipe>
                            </div>
                        </div>        
                        <CreateComment recipeToComment={publicRecipe}/>
                    </footer>
                {:else if $user.role === 1}
                    <footer>
                        <DeleteButton
                            objectToDelete={publicRecipe}
                            onHandleUpdate={handleGetAllPublicRecipes}
                            endpoint={`/api/admin/public_recipes/${publicRecipe._id}`}
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
        <div class="searchbar-wrapper">
            <h6>What was the recipe again?..</h6> 
            <h6>Search here by:</h6>
            <hr>
            <SearchBar searchTitle="Title"/>
            <SearchBar searchTitle="Category"/>
            <SearchBar searchTitle="Author"/>
        </div>
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

    .buttons {
        display: flex;
        justify-content: space-between;
    }

    #button {
        width: 50%;
        height: 10%;
        margin: 0.1em;
    }

    p { 
        margin-top: 2em;
        line-height: 5%;
    }

    h6 { font-weight:400; }

    .searchbar-wrapper {
        display: flex;
        flex-direction: column;
    }
</style>

