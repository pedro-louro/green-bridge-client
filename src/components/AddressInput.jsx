import { Input, Select } from '@chakra-ui/react';

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useMemo, useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete';

export default function AddressInput() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBVp_Q1EgrDgWrR2h635oY6UXEphO0jrLg',
    libraries: ['places']
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className='places-container'>
        <PlacesAutocomplete setSelected={setSelected} />
      </div>

      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName='map-container'
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutocomplete();

  const handleSelect = async address => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <div>
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        onClick={handleSelect}
        disabled={!ready}
        className='combobox-input'
        placeholder='Search an address'
      />
      <Select>
        {status === 'OK' &&
          data.map(({ place_id, description }) => (
            <option key={place_id}> {description}</option>
          ))}
      </Select>
    </div>
  );
};
