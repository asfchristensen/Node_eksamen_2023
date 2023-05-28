<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { eventsToPublic, publicEvents } from "../../stores/events.js";
    import { remove } from "../../api/api.js";
    import toastr from "toastr";

    export let eventToDelete;


    async function handleDeleteEvent(event) {
        const url = $BASE_URL + "/api/admin/events";
        const eventToJSON = JSON.stringify(event); 

        const result = await remove(url, eventToJSON);
        console.log("result delete:", result);

        if (result.status === 200) {
            toastr.success("success - event deleted");
        } else {
            toastr.error("error - failed to delete event");
        }

        event.isDeleted = true;
        eventsToPublic.update( events => events.filter(event => !event.isDeleted ));
        $eventsToPublic.forEach(event => console.log("events after:", event));

        publicEvents.update( events => events.filter(event => !event.isDeleted ));
        $publicEvents.forEach(event => console.log("events after:", event));
    }
</script>

<button on:click={handleDeleteEvent.bind(null, eventToDelete)} class="delete-button">Delete</button>
