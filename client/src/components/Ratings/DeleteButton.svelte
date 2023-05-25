<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { ratingsToPublic, publicRatings } from "../../stores/ratings.js";
    import { remove } from "../../api/api.js";
    import toastr from "toastr";

    export let ratingToDelete;

    async function handleDeleteRating(ratingToDelete) {
        const url = $BASE_URL + "/api/admin/ratings";
        const ratingToJSON = JSON.stringify(ratingToDelete);
        console.log("RatingToJSON: ", ratingToJSON);

        const result = await remove(url, ratingToJSON);
        console.log(result);

        if (result.status === 200) {
            toastr.success("success - rating deleted");
        } else {
            toastr.error("error - failed to delete rating");
        }

        ratingToDelete.isDeleted = true;
        ratingsToPublic.update( ratings => ratings.filter(rating => !rating.isDeleted ));
        publicRatings.update( ratings => ratings.filter(rating => !rating.isDeleted ));
    } 
</script>

<button on:click={handleDeleteRating.bind(null, ratingToDelete)} class="delete-button">Delete rating</button>

<style>
    .delete-button {
        background-color: brown;
    }
</style>