<!--<h2>All Events and A Map with events</h2>

<script>

  import { onMount } from "svelte";
  import { BASE_URL } from "../../stores/urlDomain.js";
  import { publicEvents } from "../../stores/events.js";
  import { getWithCredentials } from "../../api/api.js";
  import { user } from "../../stores/user.js";
  import DeleteButton from "../Events/DeleteButton.svelte";

  let lat = null;
  let lng = null;
  const zoomLevel = 12;
  let shareLocation = false;
  let userMarker = null;
  let eventMarkers = [];

  onMount(async () => {
    await handleGetAllPublicEvents();
    loadGoogleMaps();
  });

  async function handleGetAllPublicEvents() {
    const url = $BASE_URL + "/api/all/events/public";
    const result = await getWithCredentials(url);
    publicEvents.set(result.data);
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
  eventMarkers = $publicEvents.map(event => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: event.address }, (results, status) => {
      if (status === 'OK') {
        const destination = results[0].geometry.location;

        const markerImage = {
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', // Red marker icon URL
          scaledSize: new google.maps.Size(32, 32),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(16, 32)
        };

        const marker = new google.maps.Marker({
          position: destination,
          map: map,
          icon: markerImage
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

    addEventMarkers(map);
  } 
</script>

<h2>Upcoming Events</h2>
<div>
  {#each $publicEvents as event}
    <p>{event.date}</p>
    <p>{event.eventName}</p>
    <p>{event.startTime} : {event.endTime}</p>
    <p>{event.category} </p>
    <p>{event.address} </p>
    <img src="{event.picURL}" alt="pic">  

    {#if $user.role === 1}
      <DeleteButton eventToDelete={event}/>
    {/if}
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
</style>-->

<script>
  import { onMount } from "svelte";
  import { BASE_URL } from "../../stores/urlDomain.js";
  import { publicEvents } from "../../stores/events.js";
  import { getWithCredentials } from "../../api/api.js";
  import { user } from "../../stores/user.js";
  import DeleteButton from "../Events/DeleteButton.svelte";
    import { navigate } from "svelte-navigator";

  let lat = null;
  let lng = null;
  const zoomLevel = 12;
  let shareLocation = false;
  let userMarker = null;
  let eventMarkers = [];

  onMount(async () => {
    await handleGetAllPublicEvents();
    loadGoogleMaps();
  });

  async function handleGetAllPublicEvents() {
    const url = $BASE_URL + "/api/all/events/public";
    const result = await getWithCredentials(url);
    publicEvents.set(result.data);
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

            const map = new google.maps.Map(document.getElementById("map"), {
              center: { lat, lng },
              zoom: zoomLevel,
            });

            // Create marker for the current user's position
            userMarker = new google.maps.Marker({
              position: { lat, lng },
              map: map,
              icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/purple-dot.png",
                scaledSize: new google.maps.Size(32, 32),
              },
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
    eventMarkers = $publicEvents.map((event) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: event.address }, (results, status) => {
        if (status === "OK") {
          const destination = results[0].geometry.location;

          const markerImage = {
            url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // Red marker icon URL
            scaledSize: new google.maps.Size(32, 32),
          };

          const marker = new google.maps.Marker({
            position: destination,
            map: map,
            icon: markerImage,
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
            `,
          });

          marker.addListener("click", () => {
            infowindow.open(map, marker);
          });

          // Add an event listener to navigate to the marker when the button is clicked
          const button = document.getElementById(`navigateButton-${event.id}`);
          button.addEventListener("click", () => {
            navigate(`/map/${event.id}`); // Update the route according to your app's routing configuration
          });

          return marker;
        } else {
          console.error(`Geocode request failed due to ${status}`);
        }
      });
    });
  }

  function loadGoogleMaps() {
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAWnmxKxT-u5I2cWddNZqlhxlXCfUjSx4Q";
    script.onload = initializeMap;
    document.body.appendChild(script);
  }

  function initializeMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 55.6918026, lng: 12.5542553 },
      zoom: zoomLevel,
    });

    addEventMarkers(map);
  }
</script>

<h2>Upcoming Events</h2>
<div>
  {#each $publicEvents as event}
    <p>{event.date}</p>
    <p>{event.eventName}</p>
    <p>{event.startTime} : {event.endTime}</p>
    <p>{event.category} </p>
    <p>{event.address} </p>
    <img src="{event.picURL}" alt="pic">

    {#if $user.role === 1}
      <DeleteButton eventToDelete={event} />
    {/if}

    <button id="navigateButton-{event.id}">Navigate to Marker</button>
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
</style>
