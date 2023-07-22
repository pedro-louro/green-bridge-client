import { getAllStores } from '../api/stores.api';
import { useState, useEffect } from 'react';
import StoreCard from '../components/StoreCard';
import { Box, Center, Stack } from '@chakra-ui/react';
import AddressSearchBar from '../components/AddressSearchBar';
import { getUser } from '../api/auth.api';

const Stores = () => {
  const [stores, setStores] = useState(null);
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');

  const fetchUser = async () => {
    const userDetails = await getUser(userId);
    setUser(userDetails.data);
  };

  const getStores = async () => {
    try {
      const response = await getAllStores();
      setStores(response.data);
    } catch (error) {
      console.log('Error getting the Stores');
    }
  };

  //Functions to calculate the distance between two coordinates

  // Convert from degrees to radians
  const degreesToRadians = degrees => {
    const radians = (degrees * Math.PI) / 180;
    return radians;
  };

  // Function takes two objects, that contain coordinates to a starting and destination location.
  const calcDistance = (startingCoords, destinationCoords) => {
    const startingLat = degreesToRadians(startingCoords.lat);
    const startingLong = degreesToRadians(startingCoords.lng);
    const destinationLat = degreesToRadians(destinationCoords.lat);
    const destinationLong = degreesToRadians(destinationCoords.lng);

    // Radius of the Earth in kilometers
    const radius = 6571;

    // Haversine equation
    const distanceInKilometers =
      Math.acos(
        Math.sin(startingLat) * Math.sin(destinationLat) +
          Math.cos(startingLat) *
            Math.cos(destinationLat) *
            Math.cos(startingLong - destinationLong)
      ) * radius;
    return Math.floor(distanceInKilometers);
  };

  // const sortDistance = () => {
  //   stores.sort(
  //     (a, b) =>
  //       calcDistance(a.address, user.address) -
  //       calcDistance(b.address, user.address)
  //   );
  // };

  useEffect(() => {
    fetchUser();
    getStores();
  }, []);
  if (stores && user) {
    stores.sort(
      (a, b) =>
        calcDistance(a.address, user.address) -
        calcDistance(b.address, user.address)
    );
  }

  return (
    <div>
      <Center>
        <Stack
          w='50%'
          p='20px'
          spacing='3vh'
        >
          {stores &&
            stores.map(store => {
              const distance = calcDistance(store.address, user.address);
              return (
                <Box
                  key={store._id}
                  boxShadow='lg green'
                >
                  <StoreCard
                    w='60%'
                    store={store}
                    distance={distance}
                  />
                </Box>
              );
            })}
        </Stack>
      </Center>
      {/* <AddressSearchBar /> */}
    </div>
  );
};

export default Stores;
