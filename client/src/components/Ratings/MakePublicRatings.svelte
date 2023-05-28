<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { ratingsToPublic } from "../../stores/ratings.js";
    import { patch } from "../../api/api.js";
    import toastr from "toastr";
    import DeleteButton from "../Ratings/DeleteButton.svelte";
    import ModalRatingButton from "./ModalRatingButton.svelte";
    

    async function handleMakePublicRating() {
        const url = $BASE_URL + "/api/admin/ratings";
        const ratingToPublic = $ratingsToPublic.filter( rating => rating.isPublic === true );
        const ratingToJSON = JSON.stringify(ratingToPublic);

        const result = await patch(url, ratingToJSON);

        if (result.status === 200) {
            toastr.success("success - rating is now public");
        } else {
            toastr.error("error - making rating public")
        }

        ratingsToPublic.update(ratings => ratings.filter( rating => !rating.isPublic ));
    }
</script>

{#if $ratingsToPublic !== undefined}
    <table role="grid">
        <thead>
            <tr>
                <th scope="col">MAKE PUBLIC</th>
                <th scope="col">FROM</th>
                <th scope="col">RATING</th>
                <th scope="col">READ</th>
                <th scope="col">DELETE</th>
            </tr>
        </thead>
        <tbody>
            {#each $ratingsToPublic as rating }  
                <tr>
                <td><input type="checkbox" bind:checked={rating.isPublic}></td>
                <td>{rating.username}</td>
                <td>{rating.rating}</td>
                <td><ModalRatingButton ratingToRead={rating}/></td>
                <td><DeleteButton ratingToDelete={rating}/></td>
                </tr>
            {/each} 
        </tbody>
    </table>

    <button on:click={handleMakePublicRating}>Make rating(s) public</button>
{:else}
    <p>No ratings to make public at the moment...</p>
{/if}

<style>
    p { color: rgb(108, 134, 143); }
</style>