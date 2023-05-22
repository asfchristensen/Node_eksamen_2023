<script>
    import { publishedRatings } from "../../stores/rating.js";

</script>

<h3>All publish ratings</h3>
{#each $publishedRatings as rating }
    <div>
        <p>{rating.rating}</p>
        <p>{rating.comment}</p>
        <p> - {rating.username}</p>
    </div>

{/each}

