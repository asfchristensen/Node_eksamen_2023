<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { publicEvents } from "../../stores/events.js";
    import { get, post } from "../../api/api.js";
    import { user } from "../../stores/userGlobals.js";
    import Sidebar from "../../components/Navbars/Sidebar.svelte";
    import UserCounter from "../../components/UserCounter/UserCounter.svelte";
    import DeleteButton from "../../components/Templates/Buttons/DeleteButton.svelte";
    import Modal from "../../components/Templates/Modal/Modal.svelte";
    import Map from "../../components/Map/Map.svelte";
    import toastr from "toastr";

    let isModalOpen = false; 
    let eventName = "";
    let category = "";
    let date = "";
    let startTime = "";
    let endTime = "";
    let picURL = "";
    let address = "";

    onMount(async () => {
        await handleGetAllPublicEvents();
    });

    async function handleGetAllPublicEvents() {
        const url = $BASE_URL + "/api/both/events/public";
        const result = await get(url);

        if (result.status === 200 || result.data === undefined) {
            const todaysDate = new Date();
            const upComingEvents = result.data.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate > todaysDate;
            });

            publicEvents.set(upComingEvents);
        } else {
            toastr.error("Failed to get all public events");
        }
    }

    async function handleCreateEvent() {
        const formattedDate = new Date(date).toLocaleDateString("en-US");
        const url = $BASE_URL + "/api/user/events";

        const event = { 
            eventName: eventName, 
            category: category, 
            date: formattedDate, 
            startTime: startTime, 
            endTime: endTime, 
            picURL: picURL, 
            address: address, 
        };

        const eventToJSON = JSON.stringify(event);

        const result = await post(url, eventToJSON);

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

    function handleModal() {
        isModalOpen = !isModalOpen;
    }
</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>
    <div class="col-middle">
        <h2>Upcoming Events</h2>
        <div class="event-list">
            {#each $publicEvents as event}
              <article>
                <div class="inner-grid">
                  <div id="div-picture">
                    <img src="{event.picURL}" alt="pic">
                  </div>
                  <div id="div-info">
                        <h6><strong>{event.eventName}</strong></h6>
                        <span><strong>Date: </strong>{event.date}</span>
                        <span><strong>Time: </strong>{event.startTime} – {event.endTime}</span>
                        <span><strong>Category: </strong>{event.category}</span>
                        <span><strong>Address: </strong>{event.address}</span>
                    {#if $user.role === 1}
                        <div id="delete-button">
                            <DeleteButton 
                                objectToDelete={event} 
                                onHandleUpdate={handleGetAllPublicEvents}
                                endpoint={`/api/admin/events/${event._id}`}
                                objectName="Event"
                            />   
                        </div>  
                    {/if}
                  </div>
                </div> 
              </article>
            {/each}
        </div>

        <br><br>
        <h2>Any events close to you?</h2>
        <Map onGetAllPublicEvents={handleGetAllPublicEvents}/>
    </div>
    
    <div class="col-right">
        {#if $user.role === 2}
            <button on:click={handleModal}>Create event</button>
        {:else if $user.role === 1}
            <UserCounter/>
        {/if}
    </div>
</div>

<Modal
    isOpen={isModalOpen}
    path="/events"
    header="Create event"
    onModal={handleModal}
>
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
</Modal>

<style>
    .event-list {
        height: 40%;
        overflow: auto;
    }

    article {
        display: flex;
        align-items: center;
        padding: 1.1em 1em;
    }

    .inner-grid {
        display: grid;
        grid-template-columns: 40% 60%;
        grid-gap: 1em;
    }

    #div-picture img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    #div-info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        height: 100%;
    }

    #div-info span, h6 {
        display: block;
        margin-bottom: 0.5em;
        text-align: left;
    }

    h6 { color: #1095c1; }

    #delete-button { width: 20%}
</style>