<script>
    import { publicRecipes } from "../../stores/publicRecipes.js";
    import SearchOptions from "./SearchOptions.svelte";

    export let searchTitle;
    let showOptions = false;
    
    let filteredItems = [];
    let userSearchInput = "";

    function handleFilter() {
        filteredItems = $publicRecipes.filter(item => item[searchTitle.toLowerCase()].toLowerCase().includes(userSearchInput.toLowerCase()));
    }

    function handleToggleOptions() {
        showOptions = !showOptions;
    }
</script>

<div class="dropdown">

<button on:click={handleToggleOptions}>{searchTitle}</button>

    <div class:show={showOptions} class="dropdown-content">
        <input type="text" placeholder="Search... " bind:value={userSearchInput} on:keyup={handleFilter}>

        {#if userSearchInput && filteredItems.length > 0}
            {#each filteredItems as item}
                <SearchOptions recipe_id={item._id} label={item.title}/>
            {/each}
        {:else if userSearchInput && filteredItems.length === 0}
            <p>No matching recipes found</p>
        {:else}
            {#each $publicRecipes as item}
               <SearchOptions recipe_id={item._id} label={item.title}/>
            {/each}
        {/if}
    </div>
</div>

<style>
    .dropdown {
        position: relative;
        display: inline-block;
        margin-bottom: 0.5em;
    }

    .dropdown-content {
        display: none;
        background-color: rgba(108, 134, 143, 0.054);
        width: auto;
    }

    .show { display:block; }
</style>

