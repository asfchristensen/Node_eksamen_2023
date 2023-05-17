<!--
<script>
    import { onMount } from 'svelte';
    let map;
  
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 8
      });
    }
  
    onMount(() => {
      initMap();
    });
</script>
-->
<!--
<script>
    import { onMount } from 'svelte';
  
    let address = '';
    let lat = 55.689528;
    let lng = 12.560859;
    const zoomLevel = 12;
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK') {
          const destination = results[0].geometry.location;
          const directionsService = new google.maps.DirectionsService();
          const directionsRenderer = new google.maps.DirectionsRenderer();
          const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat, lng },
            zoom: zoomLevel
          });
          directionsRenderer.setMap(map);
          const request = {
            origin: { lat, lng },
            destination,
            travelMode: google.maps.TravelMode.DRIVING
          };
          directionsService.route(request, (result, status) => {
            if (status === 'OK') {
              directionsRenderer.setDirections(result);
            } else {
              console.error(`Directions request failed due to ${status}`);
            }
          });
        } else {
          console.error(`Geocode request failed due to ${status}`);
        }
      });
    };
  
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAWnmxKxT-u5I2cWddNZqlhxlXCfUjSx4Q`;
      script.onload = () => {
        const map = new google.maps.Map(document.getElementById('map'), {
          center: { lat, lng },
          zoom: zoomLevel
        });
        const marker = new google.maps.Marker({
          position: { lat, lng },
          map,
          title: 'Guldbergsgade 29N, 2300 København N'
        });
      };
      document.body.appendChild(script);
    };
  
    onMount(loadGoogleMaps);
</script>
-->

<script>
  import { onMount } from 'svelte';
  import { BASE_URL } from '../../stores/urlDomain';

  let startLocation = "";
  //let address = "";
  let lat = 55.6918026;
  let lng = 12.5542553;
  const zoomLevel = 12;
  //let error = null;
  //let directionsRenderer;

  // Array of objects with predefined coordinates
  const events = [
    {
      date: "2023-06-02", 
      eventName: "Tapas Night",
      startTime: "19:00",
      endTime: "00:00", 
      category: "Spanish", 
      picURL: "https://cdn-rdb.arla.com/Files/arla-dk/2689814313/1b428bbb-99f7-499a-8090-bf7442120635.jpg?crop=(0,184,0,-277)&w=1200&h=630&mode=crop&ak=6826258c&hm=fc2f9168" ,
      address: "norgesgade 5b"
    },
    {
      date: "2023-06-02", 
      eventName: "Italian Night",
      startTime: "20:00",
      endTime: "00:00", 
      category: "Italian", 
      picURL: "https://previews.123rf.com/images/greatnotions/greatnotions1509/greatnotions150907250/45219243-the-perfect-design-to-go-with-pizza-night.jpg" ,
      address: "hemsedalsgade 5"
    },
    {
      date: "2023-06-02", 
      eventName: "Mexi Night",
      startTime: "21:00",
      endTime: "00:00", 
      category: "Mexican", 
      picURL: "https://tipster.dk/static/team/2021/0519/16214556399431.jpg" ,
      address: "markmandsgade 5"
    }
/*

    { lat: 55.689528, lng: 12.560859, title: 'Marker 1' },
    { lat: 55.691234, lng: 12.567890, title: 'Marker 2' },
    { lat: 55.650332633903574, lng: 12.549130767261829, title: 'Marker 3' },
    { lat: 55.694979112178686, lng: 12.55854544631927, title: 'Marker 4' },
    { lat: 55.682912289484804, lng: 12.573351723186258, title: 'Marker 5' },
*/
  ];

  
  function handleEventAddress(address) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, handleGeocodeResponse);
  }

  function handleSubmit() {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: startLocation }, handleGeocodeResponse);
  }

  function handleGeocodeResponse(results, status) {
    if (status === 'OK') {
      const destination = results[0].geometry.location;
      //const directionsService = new google.maps.DirectionsService();
      //directionsRenderer = new google.maps.DirectionsRenderer();
      const map = new google.maps.Map(document.getElementById('map'), {
        center: destination, //{ lat, lng },
        zoom: zoomLevel
      });

      
        new google.maps.Marker({
          position: destination,
          map: map
        });
      
    } else {
      console.error(`Geocode request failed due to ${status}`);
    }

    
      /*
      directionsRenderer.setMap(map);
      const request = {
        origin: { lat, lng },
        destination,
        travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(request, handleDirectionsResponse);
    } else {
      console.error(`Geocode request failed due to ${status}`);
    }
    */
  }

  /*
  function handleDirectionsResponse(result, status,) {
    if (status === 'OK') {
      directionsRenderer.setDirections(result);
    } else {
      console.error(`Directions request failed due to ${status}`);
    }
  }
  */

  function loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAWnmxKxT-u5I2cWddNZqlhxlXCfUjSx4Q`;
    script.onload = initializeMap;
    document.body.appendChild(script);
  }

  function initializeMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat, lng },
      zoom: zoomLevel
    });
  }

  onMount(loadGoogleMaps);

/*
const marker = new google.maps.Marker({
      position: { lat, lng },
      map,
      title: 'Frederikssundsvej 259H, 2700 Brønshøj'
    });

    // Create markers for each object in markersData array
    markersData.forEach((markerData) => {
      const markerList = new google.maps.Marker({
        position: { lat: markerData.lat, lng: markerData.lng },
        map,
        title: markerData.title
    });
  });
*/


  //create event
  let eventName = "";
  let category = "";
  let date = "";
  let startTime = "";
  let endTime = "";
  let picURL = "";
  let address = "";

  async function handleCreateEvent() {
    const eventToJSON = JSON.stringify({eventName, category, date, startTime, endTime, picURL, address});
    console.log(eventToJSON);
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
    eventName = "";
    category = "";
    date = "";
    startTime = "";
    endTime = "";
    picURL = "";
    address = "";

  }

</script>



<!-- 
<script>
  import { onMount } from 'svelte';

let address = '';
let lat = 55.6918026;
let lng = 12.5542553;
const zoomLevel = 12;
let error = null;
let directionsRenderer;

// Array of objects with predefined coordinates
const markersData = [
  { lat: 55.689528, lng: 12.560859, title: 'Marker 1' },
  { lat: 55.691234, lng: 12.567890, title: 'Marker 2' },
  { lat: 55.650332633903574, lng: 12.549130767261829, title: 'Marker 3' },
  { lat: 55.694979112178686, lng: 12.55854544631927, title: 'Marker 4' },
  { lat: 55.682912289484804, lng: 12.573351723186258, title: 'Marker 5' },
];

let userMarker; // Store user marker reference

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        error = null;

        // Remove existing user marker if it exists
        if (userMarker) {
          userMarker.setMap(null);
        }

        const map = new google.maps.Map(document.getElementById('map'), {
          center: { lat, lng },
          zoom: zoomLevel
        });

        // Create a new user marker with a different color
        userMarker = new google.maps.Marker({
          position: { lat, lng },
          map,
          title: 'Your Location',
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', // Change the marker color
            scaledSize: new google.maps.Size(32, 32) // Adjust the marker size if needed
          }
        });

        // Create markers for each object in markersData array
        markersData.forEach((markerData) => {
          const marker = new google.maps.Marker({
            position: { lat: markerData.lat, lng: markerData.lng },
            map,
            title: markerData.title
          });

          // Calculate distance between user location and marker
          const distance = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(lat, lng),
            new google.maps.LatLng(markerData.lat, markerData.lng)
          );

          // Display distance as marker label
          const distanceLabel = (distance / 1000).toFixed(2) + ' km';
          const infowindow = new google.maps.InfoWindow({
            content: distanceLabel
          });
          marker.addListener('click', () => {
            infowindow.open(map, marker);
          });
        });
      },
      err => {
        error = err.message;
        lat = null;
        lng = null;
      }
    );
  } else {
    error = 'Geolocation is not supported by this browser.';
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: address }, handleGeocodeResponse);
}

function handleGeocodeResponse(results, status) {
  if (status === 'OK') {
    const destination = results[0].geometry.location;
    const directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat, lng },
      zoom: zoomLevel
    });
    directionsRenderer.setMap(map);
    const request = {
      origin: { lat, lng },
      destination,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, handleDirectionsResponse);
  } else {
    console.error(`Geocode request failed due to ${status}`);
  }
}

function handleDirectionsResponse(result, status) {
  if (status === 'OK') {
    directionsRenderer.setDirections(result);
  } else {
    console.error(`Directions request failed due to ${status}`);
  }
}

function loadGoogleMaps() {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAWnmxKxT-u5I2cWddNZqlhxlXCfUjSx4Q`;
  script.onload = initializeMap;
  document.body.appendChild(script);
}

function initializeMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat, lng },
    zoom: zoomLevel
  });

  // Create markers for each object in markersData array
  markersData.forEach((markerData) => {
    const marker = new google.maps.Marker({
      position: { lat: markerData.lat, lng: markerData.lng },
      map,
      title: markerData.title
    });

    // Calculate distance between user location and marker
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(lat, lng),
        new google.maps.LatLng(markerData.lat, markerData.lng)
      );
  
      // Display distance as marker label
      const distanceLabel = (distance / 1000).toFixed(2) + ' km';
      const infowindow = new google.maps.InfoWindow({
        content: distanceLabel
      });
      marker.addListener('click', () => {
        infowindow.open(map, marker);
      });
  });
}

onMount(loadGoogleMaps);

</script>
-->

<!--INPUT ADDRESS-->
<form on:submit|preventDefault={handleSubmit}>
  <label>
    Enter an address:
    <input type="text" bind:value={startLocation} required>
  </label>
  <button type="submit">Show specific location</button>
</form>

<!--MAP-->
<div id="map" style="height: 400px;"></div>

<!--EVENTS-->
<div>
  {#each events as event}
    <p>{event.date}</p>
    <p>{event.eventName}</p>
    <p>{event.startTime} : {event.endTime}</p>
    <p>{event.category} </p>
    <p>{event.address} </p>
    <img src="{event.picURL}" alt="pic">
    
    <button on:click={handleEventAddress.bind(null, event.address)}>📍 See Location</button>
  
{/each}
</div>



<hr>  

<!--CREATE EVENT-->
 
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
 


<style>
    img {
      height: 100px;
      width: 100px;
    }
</style>


