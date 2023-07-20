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
    <Autocomplete
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
    >
      <input placeholder='Search…' />
    </Autocomplete>
  );
};
export default AddressSearchBar;
