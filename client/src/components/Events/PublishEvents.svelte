<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { eventsToPublish } from "../../stores/events.js";
    import { post } from "../../api/api.js";
    import toastr from "toastr";

  
    async function handlePublishEvents() {
        const url = $BASE_URL + "/api/events";
        const eventToPublish = $eventsToPublish.filter( event => event.isPublished === true );
        console.log(eventToPublish.length);

        const eventToJSON = JSON.stringify(eventToPublish);

        const result = await post(url, eventToJSON);
        console.log(result.data);


        if (result.status === 200 ){
            toastr.success("Success - Event is now published");
            console.log("success");
        } else {
            toastr.success("error - creating evennt");
            console.log("error");
        }

        eventsToPublish.update( events => events.filter( event => !event.isPublished ));
        $eventsToPublish.forEach( e => console.log(e));
    }

    function handleDeleteEvent(eventToDelete) {
        eventsToPublish.update(events => events.filter(event => 
        event.eventName !== eventToDelete.eventName && event.date !== eventToDelete.date
        ));
    }
</script>

<h2>All events to handle</h2>
{#each $eventsToPublish as event }
    <div style="background-color:rosybrown;">
        <p>Event Name: {event.eventName}</p>
        <p>Category: {event.category}</p>
        <p>Date: {event.date}</p>
        <hr>
        <p>
            <b>Publish Event:</b> 
            <input type="checkbox" bind:checked={event.isPublished}> 
        </p>
        <button on:click={handleDeleteEvent.bind(null, event)} class="delete-button">Delete event</button>
    </div>
{/each}

<button on:click={handlePublishEvents}>Publish event(s)</button>


