<script>
    import { ratings, publishedRatings } from "../../stores/rating.js";
    
    function handlePublishRating() {
        console.log("handle publish");
        const toPublish = $ratings.filter(rating => rating.isPublished === true);
        console.log(toPublish);

        if ($publishedRatings.length === 0) {
            publishedRatings.set(toPublish);
        } 
        
        publishedRatings.update(ratings => ratings.filter(rating => rating.isPublished));
        ratings.update( ratings => ratings.filter(rating => !rating.isPublished));
    
        
        $ratings.forEach(rating => console.log("ratings:", rating));
        $publishedRatings.forEach(rating => console.log("published rating:", rating));
    }

        function handleDeleteRating(rating) {
            rating.isDeleted = true;
            ratings.update( ratings => ratings.filter(rating => !rating.isDeleted));
            $ratings.forEach(rating => console.log("ratings updated:", rating));
        }    
</script>

<h4>All Ratings</h4>

{#each $ratings as rating }
    <div style="background-color:rosybrown;">
        <p>rating: {rating.rating}</p>
        <p>comment: {rating.comment}</p>
        <p>username: {rating.username}</p>
        <p>is public: {rating.isPublished}</p>
        <hr>
        <p>
            <b>Publish Rating:</b> 
            <input type="checkbox" bind:checked={rating.isPublished}> 
        </p>
        <button on:click={handleDeleteRating.bind(null, rating)} class="delete-button">Delete rating</button>
    </div>
{/each}
<button on:click={handlePublishRating}>Publish Rating(s)</button>


<style>
    .delete-button {
        background-color: brown;
    }
</style>