import { Link, useNavigate, useParams } from 'react-router-dom';
import { getOrder, updateOrder } from '../api/order.api';
import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Stack,
  Text,
  StackDivider,
  Badge,
  Image,
  HStack,
  Center,
  VStack,
  Button,
  Icon
} from '@chakra-ui/react';
import { MdLocationOn } from 'react-icons/md';
import { GiRoad } from 'react-icons/gi';
import { toast } from 'react-toastify';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isDelivered, setIsDelivered] = useState(false);
  const [storeAddress, setStoreAddress] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [orderFetched, setOrderFetched] = useState(false);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    const response = await getOrder(orderId);
    setOrder(response.data);
    order && getAddress(order.store.address, 'store');
    order && getAddress(order.user.address, 'user');
    setOrderFetched(true);
  };

  const updateOrderStatus = async status => {
    try {
      const response = await updateOrder({
        _id: orderId,
        status: status
      });
      setIsDelivered(true);
      if (status === 'delivered') {
        toast.success('Order Delivered!', {
          position: 'top-center',
          autoClose: 3000
        });
      }
      if (status === 'canceled') {
        toast.success('Order Canceled!', {
          position: 'top-center',
          autoClose: 3000
        });
      }
      navigate('/driver/orders');
    } catch (error) {
      console.log(error);
    }
  };
  const getAddress = async (coordinates, object) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        coordinates.lat
      },${coordinates.lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API}`
    )
      .then(response => response.json())
      .then(responseJSON => {
        object === 'store'
          ? setStoreAddress(
              responseJSON.results[0].formatted_address.toString()
            )
          : setUserAddress(
              responseJSON.results[0].formatted_address.toString()
            );
      });
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
    fetchOrder();
  }, [isDelivered, orderFetched]);

  return (
    <div>
      <Box h={'80px'}></Box>
      <h1>Order details</h1>
      {order && (
        <Center
          py={6}
          p={2}
        >
          <Box
            maxW={'400px'}
            minW={'240px'}
            w={'full'}
            bg={'white'}
            boxShadow={'2xl'}
            rounded={'md'}
            p={6}
          >
            <Stack>
              <Badge
                size='xs'
                textTransform='uppercase'
                colorScheme={'green'}
                alignSelf={'center'}
              >
                {order.status}
              </Badge>

              <VStack
                pt={1}
                pb={2}
              >
                <Text
                  color={'grey'}
                  size='sm'
                >
                  <b>From</b> {order.store.name} Store
                </Text>

                <a
                  href={`geo:${order.store.address.lat},${order.store.address.lng}`}
                  target='_blank'
                >
                  <Heading
                    color={'green'}
                    size='sm'
                    fontFamily={'body'}
                  >
                    <Icon as={MdLocationOn} /> {storeAddress}
                  </Heading>
                </a>

                <Text
                  color={'grey'}
                  size='sm'
                >
                  <b>To</b> {order.user.name}
                </Text>
                <Heading
                  color={'green'}
                  size='sm'
                  fontFamily={'body'}
                >
                  <Icon as={MdLocationOn} /> {userAddress}
                </Heading>
                <Text>
                  <Icon as={GiRoad} />
                  {'  '}
                  {calcDistance(order.store.address, order.user.address)}KM
                </Text>
              </VStack>
              <Stack
                divider={<StackDivider />}
                spacing='4'
                pt={2}
              >
                <Box>
                  <Heading
                    size='md'
                    pb={2}
                  >
                    Order Details
                  </Heading>

                  {order.products &&
                    order.products.map(orderProduct => {
                      return (
                        <HStack
                          key={orderProduct.product._id}
                          pt='4'
                        >
                          <Image
                            boxSize='30px'
                            src={orderProduct.product.img}
                          />
                          <Text fontSize='md'>
                            {orderProduct.product.name} |{' '}
                            {orderProduct.quantity} x{' '}
                            {orderProduct.product.price}€
                          </Text>
                        </HStack>
                      );
                    })}
                </Box>
                <HStack>
                  <Text>
                    <b>Delivery:</b> {order.shipping}€
                  </Text>
                </HStack>
                <HStack>
                  <Text
                    fontWeight='bold'
                    textTransform='uppercase'
                  >
                    Total: {order.total}€
                  </Text>
                </HStack>
              </Stack>
              <Center>
                <Button
                  color={'white'}
                  bg={'red.400'}
                  _hover={{
                    bg: 'red.600'
                  }}
                  onClick={() => {
                    updateOrderStatus('canceled');
                  }}
                >
                  Cancel Order
                </Button>
                <Button
                  color={'white'}
                  bg={'green.500'}
                  _hover={{
                    bg: 'green.700'
                  }}
                  onClick={() => {
                    updateOrderStatus('delivered');
                  }}
                >
                  Order Delivered
                </Button>
              </Center>
              <Text>
                Order ID <i>{order._id.slice(-4)}</i>
              </Text>
            </Stack>
          </Box>
        </Center>
      )}
      {isDelivered && (
        <div>
          <h3>
            Order Delivered!{' '}
            <Link to='/driver/orders'>Find a new Order to Deliver</Link>
          </h3>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
