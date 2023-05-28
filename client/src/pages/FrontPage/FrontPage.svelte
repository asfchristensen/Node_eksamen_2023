<script>
    import { user } from "../../stores/user.js";
    import { pictures } from "../../stores/frontpage.js";
    import DisplayPublicRatings from "../../components/Ratings/DisplayPublicRatings.svelte";
    import Sidebar from "../../components/Navbars/Sidebar.svelte";

    import Carousel from "svelte-carousel";

</script>

<div class="grid">
    <div class="col-left">
        {#if $user}
            <Sidebar/>
        {/if}
    </div>
    <div class="col-middle">
        <Carousel autoplay autoplayDuration={2500} pauseOnFocus>
            {#each $pictures as picture}
                <img src={picture.picURL} alt="food">
            {/each}
        </Carousel>

        <!-- Fortælle om os sektion -->


        <DisplayPublicRatings/>    
    </div>
    <div class="col-right">

    </div>
</div>


<style>
    img {
        height: 60%;
        width: 10%;
    }
</style>
