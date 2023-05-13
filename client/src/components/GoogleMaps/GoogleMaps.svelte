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
  
  <form on:submit={handleSubmit}>
    <label>
      Enter an address:
      <input type="text" bind:value={address} required>
    </label>
    <button type="submit">Show Map</button>
  </form>
  
  <div id="map" style="height: 400px;"></div>
  
 
  