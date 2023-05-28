<script>
    import { user } from "../../stores/user.js";
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { getWithCredentials } from "../../api/api.js";
    import { publicRatings } from "../../stores/ratings.js";

    import { pictures } from "../../stores/frontpage.js";
    import DisplayPublicRatings from "../../components/Ratings/DisplayPublicRatings.svelte";
    import Sidebar from "../../components/Navbars/Sidebar.svelte";

    import Carousel from "svelte-carousel";

    onMount(async () => {
        await handleGetAllPublicRatings();
    });

    async function handleGetAllPublicRatings() {
        const url = $BASE_URL + "/api/ratings/public";
        const result = await getWithCredentials(url);
        console.log(result.data);
        publicRatings.set(result.data);
        return result.data;
    }


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
        <p>Hej hej hej ændring</p>
        <!-- Karusel med billeder af opskrifter-->

        <!-- Fortælle om os sektion -->

        <DisplayPublicRatings ratingsList={$publicRatings} ratingsToShow={3} ratingsOnScroll={1}/>    

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
