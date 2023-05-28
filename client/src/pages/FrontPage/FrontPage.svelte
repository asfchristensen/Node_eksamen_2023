<script>
    import { user } from "../../stores/user.js";
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { getWithCredentials } from "../../api/api.js";
    import { publicRatings } from "../../stores/ratings.js";

    import DisplayPublicRatings from "../../components/Ratings/DisplayPublicRatings.svelte";
    import Sidebar from "../../components/Navbars/Sidebar.svelte";

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
        <p>Hej hej hej ændring</p>
        <!-- Karusel med billeder af opskrifter-->

        <!-- Fortælle om os sektion -->

        <DisplayPublicRatings ratingsList={$publicRatings} ratingsToShow={3} ratingsOnScroll={1}/>    
    </div>
    <div class="col-right">

    </div>
</div>

