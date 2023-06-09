<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../../stores/urlDomain.js";
    import { recipes, answeredFeedback } from "../../../stores/userGlobals.js";
    import { get, patch } from "../../../api/api.js";
    import { categories } from "../../../stores/hardcodedData.js";
    import Sidebar from "../../../components/Navbars/Sidebar.svelte";
    import ProfileInfo from "../../../components/Profile/ProfileInfo/ProfileInfo.svelte";
    import LikedRecipes from "../../../components/Profile/LikedRecipes/LikedRecipes.svelte";
    import Modal from "../../../components/Templates/Modal/Modal.svelte";
    import PrivateRecipes from "../../../components/Profile/PrivateRecipes/PrivateRecipes.svelte";
    import toastr from "toastr";
    import NavigateToButton from "../../../components/Templates/Buttons/NavigateToButton.svelte";

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

    async function handleGetAllRecipes() {
        const url = $BASE_URL + "/api/user/users/recipes";
        const result = await get(url);

        if (result.status === 200) {
            recipes.set(result.data);
        } else {
            toastr.error("Failed to get all recipes");
        } 
    }

    async function handleGetAllAnsweredFeedback() {
        const url = $BASE_URL + "/api/user/feedback/email";
        const result = await get(url);

        if (result.status === 200 || result.data === undefined) {
            answeredFeedback.set(result.data);
        } else {
            toastr.error("Failed to get all feedback answers");
        }
    }

    async function handleCreateRecipe() {
        const url = $BASE_URL + "/api/user/users/recipes";
        const recipe = { 
            title: title, 
            category: category, 
            picURL: picURL, 
            serves: serves, 
            ingredients: ingredients, 
            procedure: procedure 
        };
        const recipeToJSON = JSON.stringify(recipe);
        const response = await patch(url, recipeToJSON);
    
        if (response.ok) { 
            toastr.success("Recipe created");
            await handleGetAllRecipes();
        } else {
            toastr.error("Failed to create recipe");
        }

        title = "";
        category = "";
        picURL = "";
        serves = "";
        ingredients = "";
        procedure = "";

        handleCreateModal();
    }
    
    function handleFeedbackModal() {
        isFeedbackModalOpen = !isFeedbackModalOpen;
    }

    function handleCreateModal() {
        isCreateModalOpen = !isCreateModalOpen;
    }

</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>
    <div class="col-middle">
        <PrivateRecipes onGetAllRecipes={handleGetAllRecipes}/>
        <LikedRecipes/>
    </div>
    <div class="col-right">
        <ProfileInfo/>

        <NavigateToButton
            path="/weekly-plan"
            buttonTitle="Weekly food plan"
        />

        <button on:click={handleCreateModal}>Create recipe</button>
        <a href="#inbox" data-tooltip="Read feedback answers" on:click={handleFeedbackModal}>
            <img src="../icons/inbox.png" alt="inbox">
        </a>
    </div>
</div>

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
                    <option value="" disabled>{placeholder}</option>
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
            <textarea placeholder="procedure" cols="30" rows="5" bind:value={procedure} required></textarea>
            <button type="submit">Upload recipe</button>
        </form>
    </div>
</Modal>

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
                <hr>
                    <p><strong>Answer: </strong>{answer}</p>
                {/each}
            </details>
        {/each}
    {/if}
</Modal>

<style>
    img {
        height: 3em;
        width: 3em;
        margin-top: 2em;
    }

    details { text-align: left; }
</style>