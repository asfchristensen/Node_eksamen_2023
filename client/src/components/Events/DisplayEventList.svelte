<script>
    import { publicEvents } from "../../stores/events.js";
    import { user } from "../../stores/userGlobals.js";
    import DeleteButton from "./DeleteButton.svelte";

</script>

<div class="event-list">
    {#each $publicEvents as event}
      <article>
        <div class="grid">
          <div id="div-picture">
            <img src="{event.picURL}" alt="pic">
          </div>
          <div id="div-info">
            <h6><strong>{event.eventName}</strong></h6>
            <span><strong>Date: </strong>{event.date}</span>
            <span><strong>Time: </strong>{event.startTime} : {event.endTime}</span>
            <span><strong>Category: </strong>{event.category}</span>
            <span><strong>Address: </strong>{event.address}</span>
            {#if $user.role === 1}
              <div id="delete-button">
                <DeleteButton eventToDelete={event}/>
              </div>
                
            {/if}
          </div>
        </div> 
      </article>
    {/each}
</div>

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

    .grid {
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

    #delete-button { width: 30%}
</style> 

