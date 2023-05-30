<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../../stores/urlDomain.js";
    import { user, recipes, answeredFeedback } from "../../../stores/userGlobals.js";
    import { get, patch } from "../../../api/api.js";
    import Sidebar from "../../../components/Navbars/Sidebar.svelte";
    import ProfileInfo from "../../../components/ProfileInfo/ProfileInfo.svelte";
    import LikedRecipes from "../../../components/LikedRecipes/LikedRecipes.svelte";
    import Modal from "../../../components/Templates/Modal/Modal.svelte";
    import toastr from "toastr";
    import { categories } from "../../../stores/hardcodedData.js";
    import PrivateRecipes from "../../../components/PrivateRecipes/PrivateRecipes.svelte";

    let isFeedbackModalOpen = false;
    let isCreateModalOpen = false;

    let title = "";
    let category = "";
    let picURL = "";
    let serves = "";
    let ingredients = "";
    let procedure = "";
    let placeholder = "Category";

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

    async function handleCreateRecipe() {
        const url = $BASE_URL + "/api/user/recipes";
        const recipeToJSON = JSON.stringify({ isPublic: false, title, category, picURL, serves, ingredients, procedure, isDeleted: false });
        console.log("object to send: ", recipeToJSON);
        const result = await patch(url, recipeToJSON);
    
        if (result.status === 200) { 
            toastr.success("Recipe created");
            setTimeout(async () => {
                await handleGetAllRecipes();
            }, 1000)
        } else {
            toastr.error("Failed to create recipe");
        }

        title = "";
        category = "";
        picURL = "";
        serves = "";
        ingredients = "";
        procedure = "";

        handleCreateModal()
    }
    
    function handleFeedbackModal () {
        isFeedbackModalOpen = !isFeedbackModalOpen;
    }

    function handleCreateModal () {
        isCreateModalOpen = !isCreateModalOpen;
    }

</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>
    <div class="col-middle">
        <h2>{$user.username}'s profile</h2>
        <PrivateRecipes onGetAllRecipes={handleGetAllRecipes}/>
        <LikedRecipes onGetAllRecipes={handleGetAllRecipes}/>  <!--  HANDLEGETALLRECIPES ER FORKERT? -->
 
    </div>
    <div class="col-right">
        <ProfileInfo/>
        <button on:click={handleCreateModal}>Create recipe</button>
        <a href="#inbox" data-tooltip="Read feedback answers">
            <img src="../icons/inbox.png" alt="inbox" on:click={handleFeedbackModal}>
        </a>
    </div>
</div>

<Modal 
    isOpen={isFeedbackModalOpen}
    path="/profile"
    header="Feedback answers"
    onModal={handleFeedbackModal}
>
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
</Modal>

<Modal 
    isOpen={isCreateModalOpen}
    path="/profile"
    header="Create recipe"
    onModal={handleCreateModal}
>
    <div class="form-recipe">
        <form on:submit|preventDefault={handleCreateRecipe}>
            <input type="text" placeholder="Title" name="title" bind:value={title} required>

            <select bind:value={category} required>
                {#if placeholder}
                    <option value="" disabled selected hidden>{placeholder}</option>
                {/if}
                {#each $categories as category}
                    <option value={category.text}>
                        {category.text}
                    </option>
                {/each}
            </select>

            <input type="url" placeholder="picture url (web url)" name="picURL" bind:value={picURL} required>
            <input type="text" placeholder="4 serves" name="serves" bind:value={serves} required>
            <input type="text" placeholder="ingredients" name="ingredients" bind:value={ingredients} required>
            <textarea placeholder="procedure"cols="30" rows="5" bind:value={procedure} required></textarea>

            <button type="submit">Upload recipe</button>
        </form>
    </div>
</Modal>



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