<script>
    import { eventsToPublish } from "../../stores/events.js";
    import { Link } from "svelte-navigator";

    let isClicked = false;

    console.log("before clicked: ", isClicked);
    function handleModal () {
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
        const event = { isPublished: false, eventName, category, date, startTime, endTime, picURL, address };

        if ($eventsToPublish.length === 0) {
            eventsToPublish.set([event]);
        
        } else {
            eventsToPublish.update((eventList) => {
            eventList.push(event);
            return eventList;
        });
        }

        console.log("Event added to store: ")
        $eventsToPublish.forEach( e => console.log(e));
        
        eventName = "";
        category = "";
        date = "";
        startTime = "";
        endTime = "";
        picURL = "";
        address = "";

        handleModal ()
    }
</script>


<p>Share events here</p>
<button on:click={handleModal}> Create Event</button>

{#if isClicked}
    <dialog open>
        <article>
            <header><Link to="/events" class="close" on:click={handleModal}></Link>
            <h4>Create Event</h4>
            <form on:submit|preventDefault={handleCreateEvent}>
                <input type="text" bind:value={eventName} placeholder="Event name">
                <input type="text" bind:value={category} placeholder="Category">
                <input type="date" bind:value={date}>
                <input type="time" bind:value={startTime}>
                <input type="time" bind:value={endTime}>
                <input type="url" bind:value={picURL} placeholder="Picture URL">
                <input type="text" bind:value={address} placeholder="Address">
                <button type="submit">Create event</button>
            </form>
        </article>
  </dialog>
{/if}


