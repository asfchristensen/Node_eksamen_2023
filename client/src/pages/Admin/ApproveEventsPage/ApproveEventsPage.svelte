<script>
    import { onMount } from "svelte";
    import { getWithCredentials, patch } from "../../../api/api";


    import Sidebar from "../../../components/Navbars/Sidebar.svelte";
    import UserCounter from "../../../components/UserCounter/UserCounter.svelte";
    import { BASE_URL } from "../../../stores/urlDomain";
    import { eventsToPublic } from "../../../stores/events";
    import toastr from "toastr";
    import DeleteButton from "../../../components/Events/DeleteButton.svelte";
    import { Link } from "svelte-navigator";

    let isClicked = false;
    let eventToRead = null;

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
            toastr.success("success - event is now public");
        } else {
            toastr.error("error - making event public");
        }

        eventsToPublic.update(events => events.filter( event => !event.isPublic ));
    }

    async function handleModal (event) {
        eventToRead = event;
        isClicked = !isClicked;
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
                {#each $eventsToPublic as event }  
                    <tr>
                    <td><input type="checkbox" bind:checked={event.isPublic}></td>
                    <td>{event.eventName}</td>
                    <td>{event.category}</td>
                    <td><button on:click={handleModal.bind(null, event)}>Read Event</button></td>
                    <td><DeleteButton eventToDelete={event}/></td>
                    </tr>
                {/each} 
            </tbody>
        </table>
    <button on:click={handleMakePublicEvents}>Make event(s) public</button>
 
    </div>

    <div class="col-right">
        <UserCounter/>
    </div>
</div>

{#if isClicked}
    <dialog open>
        <article>
            <Link to="/approve-events" class="close" on:click={handleModal}></Link>
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
        </article>
    </dialog>
{/if}

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