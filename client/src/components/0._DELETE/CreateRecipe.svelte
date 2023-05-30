<!-- <script>
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import toastr from "toastr";
    import { patch } from "../../api/api.js";
    import { categories } from "../../stores/hardcodedData.js";
    
    export let onGetAllRecipes;

    let title = "";
    let category = "";
    let picURL = "";
    let serves = "";
    let ingredients = "";
    let procedure = "";
    let placeholder = "Category";

    let isClicked = false;

    function handleModal() {
        isClicked = !isClicked;
    }

    async function handleCreateRecipe() {
        const url = $BASE_URL + "/api/user/recipes";
        const recipeToJSON = JSON.stringify({ isPublic: false, title, category, picURL, serves, ingredients, procedure, isDeleted: false });
        console.log("object to send: ", recipeToJSON);
        const result = await patch(url, recipeToJSON);
    
        if (result.status === 200) { 
            toastr.success("Recipe created");
            setTimeout(async () => {
                await onGetAllRecipes();
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
        
        handleModal();
    }

    
</script>

<button on:click={handleModal}>Create recipe</button>

{#if isClicked}
    <dialog open>
        <article>
            <header>
                <Link to="/profile" class="close" on:click={handleModal}></Link>
                <h4>Create recipe</h4> 
            </header>
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
        </article>
    </dialog>               
{/if} -->
