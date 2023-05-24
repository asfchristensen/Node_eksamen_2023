<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { eventsToPublic } from "../../stores/events.js";
    import { del, getWithCredentials, patch } from "../../api/api.js";
    import { onMount } from "svelte";
    import toastr from "toastr";

    onMount(async () => {
        await handleGetAllNotPublicEvents();
    });

    async function handleGetAllNotPublicEvents(){
        const url = $BASE_URL + "/api/admin/events/not-public";
        const result = await getWithCredentials(url);
        console.log("Non public events", result.data);
        eventsToPublic.set(result.data);
        return result.data;
    }
  
    async function handleMakePublicEvents() {
        const url = $BASE_URL + "/api/admin/events";
        $eventsToPublic.forEach( e => console.log(e));
        const eventToPublic = $eventsToPublic.filter( event => event.isPublic === true );
        console.log(eventToPublic.length);

        const eventToJSON = JSON.stringify(eventToPublic);
        console.log("event array:", eventToJSON);

        const result = await patch(url, eventToJSON);
        console.log(result);

        if (result.status === 200 ){
            toastr.success("Success - Event is now public");
            console.log("success");
        } else {
            toastr.success("error - creating event");
            console.log("error");
        }

        eventsToPublic.update(events => events.filter( event => !event.isPublic ));

        //await handleGetAllNotPublicEvents();
    }

    async function handleDeleteEvent(eventToDelete) {
        const url = $BASE_URL + "/api/admin/events";
        const eventToJSON = JSON.stringify(eventToDelete); 

        const result = await del(url, eventToJSON);
        console.log("result delete:", result);



        eventsToPublic.update(events => events.filter(event => 
        event.eventName !== eventToDelete.eventName && event.date !== eventToDelete.date
        ));
    }
</script>

<h2>All events to handle</h2>
{#each $eventsToPublic as event }
    <div style="background-color:rosybrown;">
        <p>Event Name: {event.eventName}</p>
        <p>Category: {event.category}</p>
        <p>Date: {event.date}</p>
        <hr>
        <p>
            <b>Make event public:</b> 
            <input type="checkbox" bind:checked={event.isPublic}> 
        </p>
        <button on:click={handleDeleteEvent.bind(null, event)} class="delete-button">Delete event</button>
    </div>
{/each}

<button on:click={handleMakePublicEvents}>Make event(s) public</button>


