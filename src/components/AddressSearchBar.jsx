import { useState, useEffect } from 'react';
import { Autocomplete } from '@react-google-maps/api';

const AddressSearchBar = ({ user, handleAddress }) => {
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
  useEffect(() => {
    handleAddress(coordinates);
  }, [coordinates]);
  return (
    <div>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
      >
        <input
          placeholder='Search'
          // defaultValue={user.address}
        />
      </Autocomplete>
    </div>
  );
};
export default AddressSearchBar;
