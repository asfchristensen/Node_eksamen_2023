<script>
  import { onMount } from "svelte";
  import { publicEvents } from "../../stores/events.js";

  export let onGetAllPublicEvents;

  onMount(async () => {
      await onGetAllPublicEvents();
      loadGoogleMaps();
  });

  let lat = null;
  let lng = null;
  const zoomLevel = 12;
  let shareLocation = false;
  let eventMarkers = [];
  let placeUserOK = false;
  
  function toggleShareLocation() {
    shareLocation = !shareLocation;

    if (shareLocation) {
      placeUserOK = true;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            lng = position.coords.longitude;

            const map = new google.maps.Map(document.getElementById("map"), {
              center: { lat, lng },
              zoom: zoomLevel
            });

            new google.maps.Marker({
              position: { lat, lng },
              map: map,
              icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/purple-dot.png",
                scaledSize: new google.maps.Size(32, 32)
              }
            });

            addEventMarkers(map);
            placeUserOK = false;
        });
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
        if (status === "OK") {
          const destination = results[0].geometry.location;

          const marker = new google.maps.Marker({
            position: destination,
            map: map,
            icon: { 
              url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
              scaledSize: new google.maps.Size(32, 32)
            }
          });
         
          const infowindow = new google.maps.InfoWindow({
            content: `
              <span>${event.eventName}</span><br>
              <span>${event.address}</span><br>
              <img src="${event.picURL}" alt="pic" height="100px" width="100px">
            `
          });

          marker.addListener("mouseover", () => {
            infowindow.open(map, marker);
          });

          marker.addListener("mouseout", () => {
            infowindow.close(map, marker);
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
      center: { lat: 55.6918026, lng: 12.5542553},
      zoom: zoomLevel
    });

    addEventMarkers(map);
  }
</script>

<div id="map"></div>

<button id="shareLocation-btn" aria-busy={placeUserOK} on:click={toggleShareLocation}>
  {#if shareLocation && placeUserOK}
    <span>Loading...</span> 
  {:else if shareLocation} 
    <span>Location shared</span>
  {:else}
    <span>Share your location</span>
  {/if}
</button>

<style>
  #map {
    height: 25em;
    margin-bottom: 1em;
  }

  #shareLocation-btn { margin-bottom: 8em; }
</style>
