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
  TabPanel
} from '@chakra-ui/react';
import DriverOrderCard from './DriverOrderCard';

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
      <h1>Orders to Deliver</h1>{' '}
      <Link to='/driver/myorders'>
        <Button>My orders</Button>
      </Link>
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
          <Tab _selected={{ color: 'white', bg: 'green.500' }}>
            Update Driver Details
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack p={10}>
              <AddressSearchBar
                handleAddress={handleAddress}
                currentAddress={formattedAddress}
              />
              <SimpleGrid
                spacing={5}
                columns={[1, null, 2, null, 3]}
                bg='#ebf2e8'
                pl={'120px'}
                pr={'120px'}
                pt={'70px'}
                pb={'70px'}
                h='100%'
                w={'80%'}
              >
                {orders &&
                  orders.map(order => {
                    return (
                      <DriverOrderCard
                        key={order._id}
                        order={order}
                      />
                    );
                  })}
                {!orders && (
                  <h2>
                    There are not orders ready for delivering at the moment.
                  </h2>
                )}
              </SimpleGrid>
            </VStack>
          </TabPanel>
          <TabPanel>{/* <StoreOrders storeId={myStore._id} /> */}</TabPanel>
          <TabPanel>
            {/* <UpdateStore
              storeId={myStore._id}
              refreshStores={fetchStore}
            /> */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default OrdersToDeliver;
