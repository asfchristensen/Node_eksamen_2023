<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { onMount } from "svelte";
    import { ratingsToPublic } from "../../stores/ratings.js";
    import { getWithCredentials, patch, remove } from "../../api/api.js";
    import toastr from "toastr";
    import DeleteButton from "../Ratings/DeleteButton.svelte";
    
    onMount(async () => {
        await handleGetAllNotPublicRatings();
    });

    async function handleGetAllNotPublicRatings() {
        const url = $BASE_URL + "/api/admin/ratings/not-public";
        const result = await getWithCredentials(url);
        console.log(result.data);
        ratingsToPublic.set(result.data);
        return result.data;
    }

    async function handleMakePublicRating() {
        const url = $BASE_URL + "/api/admin/ratings";
        const ratingToPublic = $ratingsToPublic.filter( rating => rating.isPublic === true );
        const ratingToJSON = JSON.stringify(ratingToPublic);

        const result = await patch(url, ratingToJSON);
        console.log(result);

        if (result.status === 200) {
            toastr.success("success - rating is now public");
        } else {
            toastr.error("error - making rating public")
        }

        ratingsToPublic.update(ratings => ratings.filter( rating => !rating.isPublic ));
    }
   
</script>

<h4>All Ratings</h4>

{#if $ratingsToPublic !== undefined}
    {#each $ratingsToPublic as rating }
        <div style="background-color:rosybrown;">
            <p>rating: {rating.rating}</p>
            <p>comment: {rating.comment}</p>
            <p>username: {rating.username}</p>
            <p>Is public: {rating.isPublic}</p>
            <hr>
            <p>
                <b>Publish Rating:</b> 
                <input type="checkbox" bind:checked={rating.isPublic}> 
            </p>
            <DeleteButton ratingToDelete={rating}/>
        </div>
    {/each}
{:else}
    <p>No ratings to make public at the moment...</p>
{/if}
<button on:click={handleMakePublicRating}>Make rating(s) public</button>
