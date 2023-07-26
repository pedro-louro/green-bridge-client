import { useState, useEffect } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { Input, Icon, HStack, Button } from '@chakra-ui/react';
import { BiCurrentLocation } from 'react-icons/bi';
import { toast } from 'react-toastify';

const AddressSearchBar = ({ handleAddress, currentAddress }) => {
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

    // Google Maps reverse geocoding to get readable address
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
        import.meta.env.VITE_GOOGLE_MAPS_API
      }`
    )
      .then(response => response.json())
      .then(responseJSON => {
        setFormattedAddress(responseJSON.results[0].formatted_address);
        setCoordinates({ lat, lng });
      });
    // toast.success('We found your address!');
    toast.success('We found your address!', {
      position: 'top-center',
      autoClose: 3000
    });
  };

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    toast.error(
      'Something went wrong getting your address. Search for the address instead',
      {
        position: 'top-center',
        autoClose: 3000
      }
    );
  }

  useEffect(() => {
    coordinates && handleAddress(coordinates);
  }, [coordinates]);
  return (
    <HStack>
      <Button
        bg={'blue.100'}
        _hover={{
          bg: 'blue.400'
        }}
        onClick={async () => {
          toast.info('Searching for your Address', {
            position: 'top-center',
            autoClose: 3000
          });
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
        <Input
          placeholder={addressPlaceholder}
          bg={'white'}
        />
      </Autocomplete>
    </HStack>
  );
};
export default AddressSearchBar;
