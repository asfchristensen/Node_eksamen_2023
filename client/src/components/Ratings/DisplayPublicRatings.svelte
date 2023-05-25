<script>
    import "@picocss/pico";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { publicRatings } from "../../stores/ratings.js";
    import { getWithCredentials } from "../../api/api.js";
    import { onMount } from "svelte";
    import { user } from "../../stores/user.js";
    import DeleteButton from "../Ratings/DeleteButton.svelte";

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

<h3>What others think of the universe:</h3>
{#each $publicRatings as rating }
    <div>
        <p>{rating.rating}</p>
        <p>{rating.comment}</p>
        <p> - {rating.username}</p>
    </div>
    {#if $user && $user.role === 1}
        <DeleteButton ratingToDelete={rating}/> 
    {/if}
{/each}

