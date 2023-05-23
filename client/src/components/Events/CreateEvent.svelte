<script>
    import { eventsToPublish } from "../../stores/events.js";

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
    }
</script>

<form on:submit|preventDefault={handleCreateEvent}>
    <input type="text" bind:value={eventName} placeholder="name">
   <input type="text" bind:value={category} placeholder="category">
   <input type="date" bind:value={date}>
   <input type="time" bind:value={startTime}>
   <input type="time" bind:value={endTime}>
   <input type="url" bind:value={picURL} placeholder="picURL">
   <input type="text" bind:value={address} placeholder="address">
   <button type="submit">Create event </button>
 </form>