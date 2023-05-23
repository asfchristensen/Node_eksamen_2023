<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { eventsToPublish } from "../../stores/events.js";

  
    async function handlePublishEvents() {
        const eventToPublish = $eventsToPublish.filter( event => event.isPublished === true );
        console.log(eventToPublish.length);

        const eventToJSON = JSON.stringify(eventToPublish);
        console.log("As JSON: ", eventToJSON);
        const response = await fetch($BASE_URL + "/api/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: eventToJSON,
        credentials: "include"
        });

        const result = await response.json();
        console.log(result.data);

        if (response.ok){
        console.log("success");
        } else {
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


