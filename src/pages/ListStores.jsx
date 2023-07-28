import { getAllStores } from '../api/stores.api';
import { useState, useEffect } from 'react';
import { SimpleGrid, VStack, Box, Text, Icon } from '@chakra-ui/react';

import { getUser } from '../api/auth.api';
import StoreCard from '../components/StoreCard';
import { MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Stores = () => {
  const [stores, setStores] = useState(null);
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');
  const [userAddress, setUserAddress] = useState('');

  const fetchUser = async () => {
    const userDetails = await getUser(userId);
    setUser(userDetails.data);
    getAddress(userDetails.data.address);
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

  const getAddress = async coordinates => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        coordinates.lat
      },${coordinates.lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API}`
    )
      .then(response => response.json())
      .then(responseJSON => {
        setUserAddress(responseJSON.results[0].formatted_address.toString());
      });
  };

  useEffect(() => {
    fetchUser();
    getStores();
  }, []);

  if (stores) {
    stores.sort(
      (a, b) =>
        calcDistance(a.address, user.address) -
        calcDistance(b.address, user.address)
    );
  }

  return (
    <div>
      <Box h='50px'></Box>
      <VStack
        p={10}
        pt={20}
      >
        <Box pb={10}>
          <Text color={'gray.800'}>
            Delivering To: <Icon as={MdLocationOn} /> {userAddress}
          </Text>
          <Link
            to='/userdetails'
            color={'gray.700'}
          >
            <u>Change Delivery Address</u>
          </Link>
        </Box>
        <SimpleGrid
          spacing={5}
          columns={[1, null, 2, null, 3]}
          bg='#f2efda'
          p={'5%'}
          pl={'10%'}
          pr={'10%'}
          minW={'240px'}
          h='100%'
        >
          {stores &&
            stores.map(store => {
              const distance = calcDistance(store.address, user.address);
              return (
                <StoreCard
                  key={store._id}
                  store={store}
                  distance={distance}
                />
              );
            })}
        </SimpleGrid>
      </VStack>
    </div>
  );
};

export default Stores;
