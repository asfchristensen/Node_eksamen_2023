<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { user, recipes, answeredFeedback } from "../../stores/userGlobals.js";
    import { get } from "../../api/api.js";
    import { Link } from "svelte-navigator";
    import Sidebar from "../../components/Navbars/Sidebar.svelte";
    import CreateRecipe from "../../components/Recipes/CreateRecipe.svelte";
    import DisplayRecipes from "../../components/Recipes/DisplayRecipes.svelte";
    import ProfileInfo from "../../components/ProfileInfo/ProfileInfo.svelte";
    import MyLikes from "../../components/MyLikes/MyLikes.svelte";

    let isClicked = false;

    onMount(async () => {
       await handleGetAllRecipes();
       await handleGetAllAnsweredFeedback();
    });

    async function handleGetAllRecipes(){
        const url = $BASE_URL + "/api/user/recipes";
        const result = await get(url);
        console.log("From get all recipes:", result);
        recipes.set(result.data);
    }

    async function handleGetAllAnsweredFeedback() {
        const url = $BASE_URL + "/api/user/feedback/email";
        const result = await get(url);
        answeredFeedback.set(result.data);
        return result;
    }
    
    function handleModal () {
        isClicked = !isClicked;
    }


</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>
    <div class="col-middle">
        <h2>{$user.username}'s profile</h2>
        <DisplayRecipes onGetAllRecipes={handleGetAllRecipes}/>
        <MyLikes onGetAllRecipes={handleGetAllRecipes}/>
        </div>
    <div class="col-right">
        <ProfileInfo/>
        <CreateRecipe onGetAllRecipes={handleGetAllRecipes}/>
        <!-- CREATE video/music knap (modal)-->
        <a href="#inbox" data-tooltip="Read feedback answers">
            <img src="../icons/inbox.png" alt="inbox" on:click={handleModal}>
        </a>
    </div>
</div>

{#if isClicked}
    <dialog open>
        <article>
            <header>
                <Link to="/profile" class="close" on:click={handleModal}></Link>
                <h4>Feedback answers</h4>
            </header>
            {#if $answeredFeedback === undefined}
                <summary>Your feedback hasn't been answered yet</summary>
            {:else}
                {#each $answeredFeedback as feedback }
                    <details>
                        <summary><strong>Subject: </strong>{feedback.subject}</summary>
                        {#each feedback.answer as answer}
                            <p>{answer}</p>
                        {/each}
                    </details>
                {/each}
            {/if}
        </article>
    </dialog>
{/if}

<style>
    img {
        height: 3em;
        width: 3em;
        margin-top: 2em;
    }

    article {
        width: 50em;
    }
</style>