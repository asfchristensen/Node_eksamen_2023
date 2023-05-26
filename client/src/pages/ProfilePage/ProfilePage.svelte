<script>
    import AnswerInbox from "../../components/Feedback/AnswerInbox.svelte";
    import Sidebar from "../../components/Navbars/Sidebar.svelte";
    import Recipes from "../../components/Recipes/Recipes.svelte";
    import UserInfo from "../../components/UserInfo/UserInfo.svelte";
    
</script>




<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>

    <div class="col-middle">
        <Recipes/>
    </div>

    <div class="col-right">
        <UserInfo/>
        <!-- Profilbillede
            Brugernavn 
            Medlem siden -->
        
        <!-- CREATE RECIPE knap (modal)-->
        <!-- CREATE video/music knap (modal)-->
        <!-- See Feedback fra admin-->
        <AnswerInbox/>

        

    </div>
</div>