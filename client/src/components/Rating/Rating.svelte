<script>
    import { ratings } from "../../stores/rating.js";
    import { user } from "../../stores/user.js";
    import toastr from "toastr";
    
 
    let ratingNumber = 0;
    let comment = "";

    function handleCreateRating () {
        console.log("handle create rating ()", $ratings);
       
        ratings.update((currentRating) => {
            const createdRating= { isPublished: false, rating: ratingNumber, comment: comment, username: $user.username};
            console.log(createdRating);
            currentRating.push(createdRating);
            toastr.success("Thanks for your elaboration");
            return currentRating;
        });

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
    <textarea  name="" id="" cols="30" rows="10" bind:value={comment}></textarea>
</form>
<button on:click={handleCreateRating}>Send Rating</button>

