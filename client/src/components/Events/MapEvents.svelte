<h2>All Events and A Map with events</h2>

<!--
<script>
  
  import { onMount } from "svelte";
  import { BASE_URL } from "../../stores/urlDomain.js";
  import { eventsDB } from "../../stores/events.js";

  let lat = null;
  let lng = null;
  const zoomLevel = 12;
  let shareLocation = false;
  let userMarker = null;
  let eventMarkers = [];

  onMount(async () => {
    await handleGetAllEvents();
    loadGoogleMaps();
  });

  async function handleGetAllEvents() {
    // Brug API get() function 
    const response = await fetch($BASE_URL + "/api/events");
    const result = await response.json();
    eventsDB.set(result.data);
    console.log(result.data);
    return result.data;
  }
  
  function toggleShareLocation() {
  shareLocation = !shareLocation;

  if (shareLocation) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          lat = position.coords.latitude;
          lng = position.coords.longitude;

          const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat, lng },
            zoom: zoomLevel
          });

          // Create marker for the current user's position
          userMarker = new google.maps.Marker({
            position: { lat, lng },
            map: map,
            icon: {
              url: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png',
              scaledSize: new google.maps.Size(32, 32)
            }
          });

          // Add event markers to the map
          addEventMarkers(map);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  } else {
    lat = null;
    lng = null;
    initializeMap();
  } 
}

function addEventMarkers(map) {
  eventMarkers = $eventsDB.map(event => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: event.address }, (results, status) => {
      if (status === 'OK') {
        const destination = results[0].geometry.location;
        const marker = new google.maps.Marker({
          position: destination,
          map: map
        });

        // Add event information to the marker
        const infowindow = new google.maps.InfoWindow({
          content: `
            <p>${event.date}</p>
            <p>${event.eventName}</p>
            <p>${event.startTime} : ${event.endTime}</p>
            <p>${event.category}</p>
            <p>${event.address}</p>
            <img src="${event.picURL}" alt="pic" height="100px" width="100px">
          `
        });

        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });

        return marker;
      } else {
        console.error(`Geocode request failed due to ${status}`);
      }
    });
  });
}

  function loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAWnmxKxT-u5I2cWddNZqlhxlXCfUjSx4Q`;
    script.onload = initializeMap;
    document.body.appendChild(script);
  }

  function initializeMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 55.6918026, lng:12.5542553},
      zoom: zoomLevel
    });

    // Add event markers to the map
    addEventMarkers(map);
}  
 
</script>

<h2>Upcoming Events</h2>
<div>
  {#each $eventsDB as event}
    <p>{event.date}</p>
    <p>{event.eventName}</p>
    <p>{event.startTime} : {event.endTime}</p>
    <p>{event.category} </p>
    <p>{event.address} </p>
    <img src="{event.picURL}" alt="pic">  
{/each}
</div>


<button on:click={toggleShareLocation}>
  {#if shareLocation}
    <span>Location shared</span>
  {:else}
    <span>Share location</span>
  {/if}
</button>

<div id="map" style="height: 400px;"></div>


 
<style>
    img {
      height: 100px;
      width: 100px;
    }
</style> -->