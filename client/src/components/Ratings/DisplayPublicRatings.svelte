<script>
    import "@picocss/pico";
    import { publicRatings } from "../../stores/ratings.js";
    import { user } from "../../stores/user.js";
    import Carousel from "svelte-carousel";
    import DeleteButton from "../Ratings/DeleteButton.svelte";

    export let ratingsToShow = 3;
    export let ratingsOnScroll = 1;
    export let ratingsList = [];
    console.log("to show: ", ratingsToShow);

</script>

<h3>What others think of the universe</h3>

<Carousel particlesToShow={ratingsToShow} particlesToScroll={ratingsOnScroll}>
    {#each ratingsList as rating}
        <article>
            <div class="rating">
                {#each Array(rating.rating) as _}
                    <img src="../icons/star.png" alt="star">
                {/each}
                <p id="username"><strong>{rating.username}</strong></p>
                <hr>
                <p>{rating.comment}</p>
            </div>
            {#if $user && $user.role === 1}
                <div class="button">
                    <DeleteButton ratingToDelete={rating}/> 
                </div>
            {/if}
        </article>
    {/each}
</Carousel>

<style>
    article {
        border: 0.1em solid black;
        box-shadow: none;
        width: 80%;
    }

    .rating { height: 80%; }

    img {
        height: 10%;
        width: 15%;
        vertical-align: middle;
    }

    #username { margin-top: 1em; }
    
</style>


