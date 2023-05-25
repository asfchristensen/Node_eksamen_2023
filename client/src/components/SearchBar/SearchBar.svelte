<script>
    import { publicRecipes } from "../../stores/publicRecipes.js";
    import MenuItems from "./MenuItems.svelte";

    export let searchSubject;
    let showMenu = false;
    
    
    let filteredItems = [];
    let userSearchInput = "";
    $:{console.log("filtered items:", filteredItems)}

    function handleFilter (){
        filteredItems = $publicRecipes.filter( item => item[searchSubject.toLowerCase()].toLowerCase().includes(userSearchInput.toLowerCase()));
    }

</script>


<div class="dropdown">


    <button on:click={() => showMenu = !showMenu}>{searchSubject}</button>
    <div class:show={showMenu} class="dropdown-content">
        <input type="text" placeholder="Search... " id="userSearchInput" bind:value={userSearchInput} on:keyup={handleFilter}>

        {#if filteredItems.length > 0}
            {#each filteredItems as item}
                <MenuItems recipe_id={item._id} label={item.title}/>
            {/each}
        {:else}
            {#each $publicRecipes as item}
               <MenuItems recipe_id={item._id} label={item.title}/>
           
            {/each}
        {/if}

    </div>


</div>




<style>
    .dropdown{
        position: relative;
        display: inline-block;
    }

    .dropdown-content{
        display: none;
        background-color: khaki;
        width: auto;

    }

    .show {
        display:block;
    }
</style>

