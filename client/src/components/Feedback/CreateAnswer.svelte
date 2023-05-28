<!-- <script>
    import { BASE_URL } from "../../stores/urlDomain.js"; 
    import { get, patch } from "../../api/api.js";
    import toastr from "toastr";
    import { publicRatings } from "../../stores/ratings.js";
    
    export let feedbackToAnswer;
    export let onCloseModal;

    // let answerInput = "";

    async function handleGetAllPublicRatings() {
        const url = $BASE_URL + "/api/ratings/public";
        const result = await get(url);
        console.log(result.data);
        publicRatings.set(result.data);
        return result.data;
    }

    // async function handleCreateAnswer (feedbackToAnswer){
    //     const url = $BASE_URL + "/api/admin/feedback";
    //     const answer = {id: feedbackToAnswer._id, answer: answerInput };
    //     console.log("feedback answer object:", answer); 
    //     const answerToJSON = JSON.stringify(answer);

    //     const result = await patch(url, answerToJSON);

    //     if (result.status === 200) {
    //         console.log("Answer Created");
    //         toastr.success("success - Answer sent")
    //         await handleGetAllPublicRatings();
    //     } else {
    //         toastr.error("error - failed to sent answer");
    //     }
        
    //     answerInput = "";
    //     onCloseModal();
    // }
</script>

<div>
    <textarea placeholder="Write comment"cols="30" rows="1" bind:value={answerInput}></textarea>
    <button on:click={handleCreateAnswer.bind(null, feedbackToAnswer)}>Send answer</button>
</div> --> 