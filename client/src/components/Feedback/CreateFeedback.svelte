<script>
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
</script>


<h4>Anything on your mind?</h4>
<p>We always want to be the best "uni-version" of ourselves.</p>
<p>Feel free to write to our administration, if you have any reports to make, suggestions or wishes for this application.</p>
<form> 
    <input type="text" placeholder="Subject" bind:value={subject}>   
    <textarea cols="30" rows="10" bind:value={feedback}></textarea>
</form>
<button on:click={handleCreateFeedback}>Send feedback</button>