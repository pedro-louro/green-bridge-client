import { useState, useEffect } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { Input } from '@chakra-ui/react';

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
        <Input
          placeholder='Search'
          // defaultValue={user.address}
        />
      </Autocomplete>
    </div>
  );
};
export default AddressSearchBar;
