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
    import { Link } from "svelte-navigator";

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
        <div class="carousel-wrapper">
            <Carousel autoplay autoplayDuration={2500} arrows={false} dots={false}>
                {#each $pictures as picture}
                    <img src={picture.picURL} alt="food">
                {/each}
            </Carousel>
        </div>

        <div class="about-wrapper">
            <div class="box">
                <article id="intro-phrase">
                    <h3>... Lets Taco 'Bout it! ...</h3>
                </article>
            </div>
            <div class="box">
                <article id="intro-text">
                    <strong>My Food Universe</strong><br>
                    <hr> 
                    A website for all food enthusiasts. Here you can share, like, get inspired and talk
                    about food and recipes aaaaaaall day long.<br><br> 
                    So do you want a plate at the table?  
                </article>
            </div>
        </div>

        <div class="join-button">
            <Link role="button" to="/signup">Join now</Link>
        </div> 

        <div class="rating-wrapper">
            <DisplayPublicRatings ratingsList={$publicRatings} ratingsToShow={3} ratingsOnScroll={1}/>    
        </div>
    </div>
    <div class="col-right"></div>
</div>



<style>
    .col-middle {
        display: flex;
        flex-direction: column;
    }

    .carousel-wrapper {
        flex: 1;
        height: 40%;
    }

    .about-wrapper {
        display: flex;
    }

    .box {
        flex: 1;
        height: 5em;
        margin-bottom: 10em;
    }

    article {
        height: 15em;
        margin: 1em;
    }

    #intro-phrase {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #4f81bd;
    }

    h3 {
        color: white;
        margin-top: 2em;
    }

    .join-button {
        margin-top: 4em;
        margin-bottom: 4em;
    }

    .rating-wrapper {
        flex: 1;
        height: auto;
    }

    img {
        height: 60%;
        width: auto;
    }
</style>
