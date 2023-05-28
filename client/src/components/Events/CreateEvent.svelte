<script>
    import toastr from "toastr";
    import { post } from "../../api/api.js";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { Link } from "svelte-navigator";

    let isClicked = false;

    console.log("before clicked: ", isClicked);
    function handleModal() {
        isClicked = !isClicked;
        console.log("after cliked: ",isClicked);
    }

    let eventName = "";
    let category = "";
    let date = "";
    let startTime = "";
    let endTime = "";
    let picURL = "";
    let address = "";

    async function handleCreateEvent() {
        const formattedDate = new Date().toLocaleDateString("en-US")
        const url = $BASE_URL + "/api/user/events";
        const event = { isPublic: false, eventName, category, date: formattedDate, startTime, endTime, picURL, address, isDeleted: false };
        const eventToJSON = JSON.stringify(event);

        const result = await post(url, eventToJSON);
        console.log("Result: ", result.data);

        if (result.status === 200) {
            toastr.success("Created event successfully");
        } else {
            toastr.error("Failed to create event");
        }
        
        eventName = "";
        category = "";
        date = "";
        startTime = "";
        endTime = "";
        picURL = "";
        address = "";

        handleModal();
    }
    
</script>


<p>Share events here</p>
<button on:click={handleModal}>Create Event</button>

{#if isClicked}
    <dialog open>
        <article>
            <header><Link to="/events" class="close" on:click={handleModal}></Link>
            <h4>Create Event</h4>
            <form on:submit|preventDefault={handleCreateEvent}>
                <input type="text" bind:value={eventName} placeholder="Event name" required>
                <input type="text" bind:value={category} placeholder="Category" required>
                <input type="date" bind:value={date} required>
                <input type="time" bind:value={startTime} required>
                <input type="time" bind:value={endTime} required>
                <input type="url" bind:value={picURL} placeholder="Picture URL" required>
                <input type="text" bind:value={address} placeholder="Address" required>
                <button type="submit">Create event</button>
            </form>
        </article>
  </dialog>
{/if}


