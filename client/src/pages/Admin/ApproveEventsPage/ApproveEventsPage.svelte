<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../../stores/urlDomain.js";
    import { eventsToPublic } from "../../../stores/events.js";
    import { get, patch } from "../../../api/api.js";
    import Sidebar from "../../../components/Navbars/Sidebar.svelte";
    import UserCounter from "../../../components/UserCounter/UserCounter.svelte";
    import DeleteButton from "../../../components/Templates/Buttons/DeleteButton.svelte";
    import Modal from "../../../components/Templates/Modal/Modal.svelte";
    import toastr from "toastr";

    let isModalOpen = false;
    let eventToRead = null;

    onMount(async () => {
        await handleGetAllNotPublicEvents();
    });

    async function handleGetAllNotPublicEvents(){
        const url = $BASE_URL + "/api/admin/events/not-public";
        const result = await get(url);

        if (result.status === 200) {
            eventsToPublic.set(result.data);
            return result.data;
        } else {
            toastr.error("Failed to get all non-public events");
        }  
    }
  
    async function handleCreatePublicEvents() {
        const url = $BASE_URL + "/api/admin/events";
        const eventToPublic = $eventsToPublic.filter( event => event.isPublic === true );

        const eventToJSON = JSON.stringify(eventToPublic);

        const response = await patch(url, eventToJSON);

        if (response.ok) {
            toastr.success("Event is now public");
        } else {
            toastr.error("Failed to make event public");
        }

        eventsToPublic.update(events => events.filter( event => !event.isPublic ));
    }

    async function handleModal(event) {
        eventToRead = event;
        isModalOpen = !isModalOpen;
    }

</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>
    <div class="col-middle">
        <h2>Events from users</h2>
        <table role="grid">
            <thead>
                <tr>
                    <th scope="col">MAKE PUBLIC</th>
                    <th scope="col">EVENT NAME</th>
                    <th scope="col">CAREGORY</th>
                    <th scope="col">READ</th>
                    <th scope="col">DELETE</th>
                </tr>
            </thead>
            <tbody>
                {#each $eventsToPublic as event}  
                    <tr>
                        <td><input type="checkbox" bind:checked={event.isPublic}></td>
                        <td>{event.eventName}</td>
                        <td>{event.category}</td>
                        <td><button on:click={handleModal.bind(null, event)}>Read Event</button></td>
                        <td>
                            <DeleteButton 
                                objectToDelete={event} 
                                onHandleUpdate={handleGetAllNotPublicEvents}
                                endpoint={`/api/admin/events/${event._id}`}
                                objectName="Event"
                            />   
                        </td>
                    </tr>
                {/each} 
            </tbody>
        </table>
        <button on:click={handleCreatePublicEvents}>Make event(s) public</button>
    </div>
    <div class="col-right">
        <UserCounter/>
    </div>
</div>

<Modal
    isOpen={isModalOpen}
    onModal={handleModal}
    path="/approve-events"
    header=""   
>
    <div class="event-info">
        <div id="div-picture">
            <img src={eventToRead.picURL} alt={eventToRead.eventName}>
        </div>
        <div id="div-info">
            <h6><strong>{eventToRead.eventName}</strong></h6>
            <span><strong>Date: </strong>{eventToRead.date}</span>
            <span><strong>Time: </strong>{eventToRead.startTime} : {eventToRead.endTime}</span>
            <span><strong>Category: </strong>{eventToRead.category}</span>
            <span><strong>Address: </strong>{eventToRead.address}</span>
        </div>
    </div>
</Modal>

<style>
    .event-info {
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
</style>