<script>
    import { publishedRecipes } from "../../stores/publishedRecipes";
    import MenuItems from "./MenuItems.svelte";

    let showMenu = false;
    
    /*
    function toggleMenu () {
        console.log("toggle Menu", showMenu);
        showMenu = !showMenu;
    }
    */
 
   
    let filteredItems = [];
    let userSearchInput = "";
    $:{console.log("filtered items:", filteredItems)}

    function handleFilter (){
        filteredItems = $publishedRecipes.filter( item => item.title.toLowerCase().includes(userSearchInput.toLowerCase()));
    }


</script>


<div class="dropdown">

    <button on:click={() => showMenu = !showMenu}>Dropdown</button>
    <div class:show={showMenu} class="dropdown-content">
        <input type="text" placeholder="Search... " id="userSearchInput" bind:value={userSearchInput} on:keyup={handleFilter}>

        {#if filteredItems.length > 0}
            {#each filteredItems as item}
                <MenuItems recipe_id={item._id} label={item.title}/>
            {/each}
        {:else}
            {#each $publishedRecipes as item}
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

