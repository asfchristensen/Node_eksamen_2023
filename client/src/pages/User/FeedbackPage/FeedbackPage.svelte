<script>  
    import { BASE_URL } from "../../../stores/urlDomain.js";
    import { post } from "../../../api/api.js";
    import { user } from "../../../stores/userGlobals.js";

    import toastr from "toastr";
    import Sidebar from "../../../components/Navbars/Sidebar.svelte";

    let ratingNumber = 0;
    let comment = "";

    let subject = "";
    let feedback = "";

    async function handleCreateRating() {
        const url = $BASE_URL + "/api/user/ratings";
        const rating = { 
            isPublic: false, 
            rating: ratingNumber, 
            comment: comment, 
            username: $user.username, 
            isDeleted: false 
        };

        const ratingToJSON = JSON.stringify(rating);
        const result = await post(url, ratingToJSON);

        if (result.status === 200) {
            toastr.success("Thanks for your rating");
        } else {
            toastr.error("Failed to upload rating");
        }

        ratingNumber = 0;
        comment = "";
    }

    async function handleCreateFeedback() {
        const url = $BASE_URL + "/api/user/feedback";
        const createFeedback = { 
            isAnswered: false, 
            subject: subject, 
            feedback: feedback,  
            username: $user.username, 
            userEmail: $user.email,
            isDeleted: false 
        };

        const feedbackToJSON = JSON.stringify(createFeedback);
        const result = await post(url, feedbackToJSON);

        if (result.status === 200) {
            toastr.success("Feedback sent. We will get back to you soon");
        } else {
            toastr.error("Failed to create feedback");
        }
       
        subject = "";
        feedback = "";
    }
</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>

    <div class="col-middle">
        <h2>Feedback</h2>

        <!--Rating-->
        <article>
            <h4>Rate our application</h4>
        
            <form on:submit|preventDefault={handleCreateRating}>
                <div class="rating-container">
                    <input id="stars" type="range" min="0" max="5" step="1" bind:value={ratingNumber}>
                    <h3>{ratingNumber}</h3>
                    <img src="../icons/star.png" alt="star">
                </div>
                <textarea cols="30" rows="5" bind:value={comment} placeholder="Feel free to elaborate..."></textarea>
                <button type="submit">Send Rating</button>
            </form>
        </article>

        <!--Feedback-->
        <article>
            <h4>Anything on your mind?</h4>
        
            <div class="info-text">
                <span>We always want to be the best "uni-version" of ourselves.</span><br>
                <span>Feel free to write to our administration, if you have any reports to make</span>
            
            </div>
            
            <form on:submit|preventDefault={handleCreateFeedback}> 
                <input type="text" placeholder="Subject" bind:value={subject}>   
                <textarea cols="30" rows="5" bind:value={feedback} placeholder="Suggestions, wishes, complaints..."></textarea>
                <button type="submit">Send feedback</button>
            </form>
        </article>
    </div>
    <div class="col-right"></div>
</div>

<style>
    article {
        display: inline-block;
        width: 90%;     
    }

    .rating-container {
        display: flex;
        align-items: center;
    }

    .rating-container h3 {
        margin-left: 8%;
        font-size: large;
    }

    form {
        display: inline-block;
        width: 60%;
        margin-top: 5%;    
    }

    .info-text span {
        color: rgb(108, 134, 143);
    }

    #stars {
        display: flex;
        align-items: flex-start;
        width: 80%;
        color:#1095c1;
    }

    img {
        height: 6%;
        width: 6%;
        margin-left: 3%;
        vertical-align: middle;
        margin-bottom: 8%;
    }
</style>
