import { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';

const AddressSearchBar = () => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [coordinates, setCoordinates] = useState({});

  const onLoad = autoC => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace();
    if (place && place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setCoordinates({ lat, lng });
    }
  };
  console.log(coordinates);
  return (
    <div>
      <script
        async
        src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBVp_Q1EgrDgWrR2h635oY6UXEphO0jrLg&callback=initMap'
      ></script>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
      >
        <input placeholder='Search' />
      </Autocomplete>
    </div>
  );
};
export default AddressSearchBar;
