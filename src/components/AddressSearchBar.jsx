import { useState, useEffect } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { Input, Icon, HStack, Button } from '@chakra-ui/react';
import { BiCurrentLocation } from 'react-icons/bi';

const AddressSearchBar = ({ user, handleAddress, currentAddress }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState(null);
  const addressPlaceholder = formattedAddress
    ? formattedAddress
    : currentAddress;

  const onLoad = autoC => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace();
    if (place && place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setCoordinates({ lat, lng });
    }
  };

  // Variables/functions to get the Current Location using
  const options = {
    timeout: 5000,
    maximumAge: 0
  };

  const success = async pos => {
    const crd = await pos.coords;
    const lat = crd.latitude;
    const lng = crd.longitude;

    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);

    // Google Maps rever geocoding to get readable addess
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBVp_Q1EgrDgWrR2h635oY6UXEphO0jrLg`
    )
      .then(response => response.json())
      .then(responseJSON => {
        setFormattedAddress(responseJSON.results[0].formatted_address);
        setCoordinates({ lat, lng });
        console.log(formattedAddress);
      });
  };

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    handleAddress(coordinates);
  }, [coordinates]);
  return (
    <HStack>
      <Button
        bg={'blue.100'}
        _hover={{
          bg: 'blue.400'
        }}
        onClick={async () => {
          await navigator.geolocation.getCurrentPosition(
            success,
            error,
            options
          );
        }}
      >
        <Icon as={BiCurrentLocation} />
      </Button>

      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
      >
        <Input placeholder={addressPlaceholder} />
      </Autocomplete>
    </HStack>
  );
};
export default AddressSearchBar;
