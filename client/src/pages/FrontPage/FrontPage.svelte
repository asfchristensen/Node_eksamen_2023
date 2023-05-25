<script>
    import { user } from "../../stores/user.js";
    import DisplayPublicRatings from "../../components/Ratings/DisplayPublicRatings.svelte";
    import Sidebar from "../../components/Navbars/Sidebar.svelte";

</script>

<div class="grid">
    <div class="col-left">
        {#if $user}
            <Sidebar/>
        {/if}
    </div>
    <div class="col-middle">
        <!-- Karusel med billeder af opskrifter-->

        <!-- Fortælle om os sektion -->

        <DisplayPublicRatings/>    
    </div>
    <div class="col-right">

    </div>
</div>

