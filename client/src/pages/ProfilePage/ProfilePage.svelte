<script>
    import AnswerInbox from "../../components/Feedback/AnswerInbox.svelte";
    import Sidebar from "../../components/Navbars/Sidebar.svelte";
    import CreateRecipe from "../../components/Recipes/CreateRecipe.svelte";
    import UserInfo from "../../components/UserInfo/UserInfo.svelte";
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { user, recipes } from "../../stores/user.js";
    import { get } from "../../api/api.js";
    import MyLikes from "../../components/MyLikes/MyLikes.svelte";
    import DisplayRecipes from "../../components/Recipes/DisplayRecipes.svelte";

    onMount(async () => {
       await handleGetAllRecipes();
       console.log('recipes after onmount:', $recipes);

    });

    async function handleGetAllRecipes(){
        console.log(1);
        const url = $BASE_URL + "/api/user/recipes";
        const result = await get(url);
        console.log("From get all recipes:", result);
        recipes.set(result.data);
    }
    
</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>

    <div class="col-middle">
        <h2>{$user.username}'s profile</h2>
        <!-- My Recipes  (sneak peak )-->
        <DisplayRecipes onGetAllRecipes={handleGetAllRecipes}/>
        <!-- Knap: My see all recipes - hen til en page -->
        <!-- My likes  (sneak peak )-->
        <MyLikes onGetAllRecipes={handleGetAllRecipes}/>
        <!-- Knap: My see all recipes - hen til en page-->
    </div>

    <div class="col-right">
         <!-- Profilbillede
            Brugernavn 
            Medlem siden -->
        <UserInfo/>
        <!-- CREATE RECIPE knap (modal)-->
        <CreateRecipe onGetAllRecipes={handleGetAllRecipes}/>
        <!-- CREATE video/music knap (modal)-->
        <!-- See Feedback fra admin-->
        <AnswerInbox/>
    </div>
</div>

<style>
    .user {
        font-size: large;
        font-weight: bold;
        color: rgb(209, 76, 232);
    }
</style>