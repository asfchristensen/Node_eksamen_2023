<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { user } from "../../stores/userGlobals.js";
    import { publicRatings } from "../../stores/ratings.js";
    import { frontpagePics } from "../../stores/hardcodedData.js";
    import { get } from "../../api/api.js";
    import Sidebar from "../../components/Navbars/Sidebar.svelte";
    import Carousel from "svelte-carousel";
    import DeleteButton from "../../components/Templates/Buttons/DeleteButton.svelte";
    import NavigateToButton from "../../components/Templates/Buttons/NavigateToButton.svelte";
    import toastr from "toastr";

    onMount(async () => {
        await handleGetAllPublicRatings();
    });

    async function handleGetAllPublicRatings() {
        const url = $BASE_URL + "/api/all/ratings/public";
        const result = await get(url);

        if (result.status === 200 || result.data === undefined) {
            publicRatings.set(result.data);
        } else {
            toastr.error("Failed to get all public ratings");
        }
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
                {#each $frontpagePics as picture}
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
            <div id="join-btn">
                {#if $user === null}
                    <NavigateToButton 
                        path="/signup"
                        buttonTitle="Join now"
                    />
                {/if}
            </div>
        </div>

        <div class="rating-wrapper">
            <h4>What others think of the universe</h4>
            {#if $publicRatings !== undefined}
                <Carousel particlesToShow={3} particlesToScroll={1}>
                    {#each $publicRatings as rating}
                        <article id="article-rating-wrapper">
                            <div class="stars">
                                {#each Array(rating.rating) as _}
                                    <img src="../icons/star.png" alt="star">
                                {/each}
                                <p id="username"><strong>{rating.username}</strong></p>
                                <hr>
                                <p>{rating.comment}</p>
                            </div>
                            {#if $user && $user.role === 1}
                                <div class="button">
                                    <DeleteButton 
                                        objectToDelete={rating}
                                        onHandleUpdate={handleGetAllPublicRatings}
                                        endpoint={`/api/admin/ratings/${rating._id}`}
                                        objectName={"Rating"}
                                    /> 
                                </div>
                            {/if}
                        </article>
                    {/each}
                </Carousel>
            {:else}
                <p>No ratings to show at the moment...</p>
            {/if}
        </div>
    </div>
    <div class="col-right"></div>
</div>

<style>
    p { color: rgb(108, 134, 143); }

    .col-middle {
        display: flex;
        flex-direction: column;
    }

    .carousel-wrapper { 
        height: 30%; 
        margin-bottom: 1em;
    }

    .about-wrapper { 
        display: flex;
        margin-top: 3em; 
    }

    .box {
        height: 8em;
        margin-bottom: 10em;
    }

    #intro-phrase {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #4f81bd;
        height: 15em;
        margin: 1em;
    }

    #intro-text {
        height: 15em;
        margin: 1em;
    }

    h3 {
        color: white;
        margin-top: 2em;
    }

    .join-button {
        display: flex;
        justify-content: center;
        margin-top: 3em;
        margin-bottom: 2em;
    }

    #join-btn { width: 20%; }

    .rating-wrapper { height: auto; }

    #article-rating-wrapper {
        border: 0.1em solid black;
        box-shadow: none;
        width: 80%;
    }

    img {
        height: 60%;
        width: auto;
    }

    .stars { height: 80%; }

    .stars img {
        height: 10%;
        width: 15%;
        vertical-align: middle;
    }

    #username { margin-top: 1em; }
</style>
