<script>
    import Sidebar from "../../components/Navbars/Sidebar.svelte";
    import DisplayPublicRecipes from "../../components/Newsfeed/DisplayPublicRecipes.svelte";
    import SearchBar from "../../components/SearchBar/SearchBar.svelte";
  
</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>
    <div class="col-middle">
        <DisplayPublicRecipes/>
    </div>

    <div class="col-right">
        <SearchBar searchSubject="Category"/>
        <SearchBar searchSubject="Title"/>
    </div>
</div>



