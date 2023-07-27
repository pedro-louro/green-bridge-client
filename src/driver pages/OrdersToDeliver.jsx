import { useEffect, useState } from 'react';
import { getOrderStatus, updateOrder } from '../api/order.api';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../api/auth.api';
import AddressSearchBar from '../components/AddressSearchBar';
import {
  Button,
  SimpleGrid,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  HStack,
  Heading,
  Icon,
  Box
} from '@chakra-ui/react';
import DriverOrderCard from './DriverOrderCard';
import { MdLocationOn } from 'react-icons/md';
import DriverOrders from './DriverOrders';

const OrdersToDeliver = () => {
  const [orders, setOrders] = useState(null);
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState(null);
  const [numOrders, setNumOrders] = useState([]);
  const [address, setAddress] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState('');
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await getOrderStatus('ready');
      console.log(response.data);
      if (response.data.length) {
        setOrders(response.data);
        setNumOrders(response.data.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    const userDetails = await getUser(userId);
    setUser(userDetails.data);
  };
  const handleAddress = coordinates => {
    setAddress(coordinates);
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

  useEffect(() => {
    fetchOrders();
    fetchUser();
  }, [numOrders]);

  // Sort orders to get closests first
  if (orders && address) {
    orders.sort(
      (a, b) =>
        calcDistance(a.store.address, address) -
        calcDistance(b.store.address, address)
    );
  }

  return (
    <div>
      <Box h={'80px'}></Box>
      <Tabs
        isFitted
        variant='enclosed-colored'
        colorScheme='green'
      >
        <TabList mb='1em'>
          <Tab _selected={{ color: 'white', bg: 'green.500' }}>
            Find orders to Deliver
          </Tab>
          <Tab _selected={{ color: 'white', bg: 'green.500' }}>
            My Driver Orders
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack
              p={10}
              pt={20}
            >
              <Heading size={'md'}>
                <Icon as={MdLocationOn} />
                Find orders Nearby
              </Heading>
              <AddressSearchBar
                handleAddress={handleAddress}
                currentAddress={formattedAddress}
              />
              {!orders && (
                <Heading size='md'>
                  There are no orders ready to be delivered at the moment.
                </Heading>
              )}
              {orders && (
                <SimpleGrid
                  spacing={5}
                  columns={[1, null, 2, null, 3]}
                  bg='#ebf2e8'
                  p={'5%'}
                  minW={'240px'}
                  h='100%'
                >
                  {orders &&
                    orders.map(order => {
                      return (
                        <DriverOrderCard
                          key={order._id}
                          order={order}
                          currentLocation={address}
                        />
                      );
                    })}
                </SimpleGrid>
              )}
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack
              p={10}
              pt={20}
            >
              <DriverOrders />
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default OrdersToDeliver;
