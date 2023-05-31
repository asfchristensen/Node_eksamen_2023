<script>
    import { user } from "../../../stores/userGlobals.js";
    import { publicRecipes } from "../../../stores/publicRecipes.js";
    import Sidebar from "../../../components/Navbars/Sidebar.svelte";
    import ProfileInfo from "../../../components/Profile/ProfileInfo/ProfileInfo.svelte";
    import LikeButton from "../../../components/LikeButton/LikeButton.svelte";
    import ModalRecipe from "../../../components/ModalRecipe/ModalRecipe.svelte";
    import NavigateToButton from "../../../components/Templates/Buttons/NavigateToButton.svelte";

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
        grid-template-columns: repeat(3, 1fr);
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