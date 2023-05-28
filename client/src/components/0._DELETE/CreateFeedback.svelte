<!-- <script>
    import toastr from "toastr";
    import { post } from "../../api/api";
    import { BASE_URL } from "../../stores/urlDomain";
    import { user } from "../../stores/user.js";

    let subject = "";
    let feedback = "";

    async function handleCreateFeedback() {
        const url = $BASE_URL + "/api/user/feedback";
        const createFeedback = { isAnswered: false, subject: subject, feedback: feedback, isDeleted: false, username: $user.username, userEmail: $user.email };
        const feedbackToJSON = JSON.stringify(createFeedback)
        
        const result = await post(url, feedbackToJSON);

        if (result.status === 200) {
            toastr.success("Feedback sent. We will get back to you soon");
        } else {
            toastr.error("Failed to create feedback");
        }
       
        subject = "";
        feedback = "";
    }
</script> -->

<!-- <article>
    <h4>Anything on your mind?</h4>

    <div class="info-text">
        <span>We always want to be the best "uni-version" of ourselves.</span><br>
        <span>Feel free to write to our administration, if you have any reports to make</span>
    
    </div>
    
    <form> 
        <input type="text" placeholder="Subject" bind:value={subject}>   
        <textarea cols="30" rows="5" bind:value={feedback} placeholder="Suggestions, wishes, complaints..."></textarea>
        <button on:click={handleCreateFeedback}>Send feedback</button>
    </form>
</article>

<style>
    article {
        display: inline-block;
        width: 90%;     
    }

     form {
        display: inline-block;
        width: 60%;
        margin-top: 5%;    
    }

    .info-text span {
        color: rgb(108, 134, 143);
    }
</style> -->