<script>
    import Sidebar from "../../components/Navbars/Sidebar.svelte";
    import ShowPublicRecipe from "../../components/Newsfeed/ShowPublicRecipe.svelte";
    import SearchBar from "../../components/SearchBar/SearchBar.svelte";

    let title
  
</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>
    <div class="col-middle">
        <ShowPublicRecipe/>
    </div>

    <div class="col-right">
        <SearchBar searchSubject="Category"/>
        <SearchBar searchSubject="Title"/>
    </div>
</div>



