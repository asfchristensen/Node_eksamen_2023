<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { user } from "../../stores/user.js";
    import toastr from "toastr";
    import { post } from "../../api/api.js";
    
 
    let ratingNumber = 0;
    let comment = "";

    async function handleCreateRating() {
        const url = $BASE_URL + "/api/user/ratings";
        const rating = { isPublic: false, rating: ratingNumber, comment: comment, username: $user.username, isDeleted: false };
        const ratingToJSON = JSON.stringify(rating);

        const result = await post(url, ratingToJSON);
        console.log(result);

        if (result.status === 200) {
            toastr.success("Thanks for your rating");
        } else {
            toastr.error("Failed to upload your rating");
        }

        ratingNumber = 0;
        comment = "";
    }

</script>

<h4>Rate our application</h4>
<form>
    <label for="ratingNumber">How would you rate us?</label> 
    <p>Number of stars: {ratingNumber}</p>
    <input type="range" min="0" max="5" step="1" bind:value={ratingNumber}>
    <br>
    
    <label for="comment">Feel free to elaborate:</label>
    <br>
    <textarea cols="30" rows="10" bind:value={comment}></textarea>
</form>
<button on:click={handleCreateRating}>Send Rating</button>

<hr>


