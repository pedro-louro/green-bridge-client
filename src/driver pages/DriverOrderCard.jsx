import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Text,
  Box,
  StackDivider,
  Badge,
  Image,
  HStack,
  Center,
  Avatar,
  VStack,
  Button,
  Icon
} from '@chakra-ui/react';
import { updateOrder } from '../api/order.api';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { GiRoad } from 'react-icons/gi';

const DriverOrderCard = ({ order }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [address, setAddress] = useState('');

  const [user, setUser] = useState(null);

  const badgeColor = status => {
    if (status === 'new' || status === 'preparing') {
      return 'purple';
    } else if (status === 'ready') {
      return 'blue';
    } else if (status === 'delivering' || status === 'delivered') {
      return 'green';
    } else if (status === 'canceled') {
      return 'red';
    }
  };

  const acceptOrder = async orderId => {
    try {
      const response = await updateOrder({
        _id: orderId,
        status: 'delivering',
        driver: userId
      });

      // setNumOrders(prevNum => prevNum - 1);
      navigate(`/driver/orders/${orderId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getAddress = async coordinates => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        coordinates.lat
      },${coordinates.lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API}`
    )
      .then(response => response.json())
      .then(responseJSON => {
        setAddress(responseJSON.results[0].formatted_address);
        console.log(address);
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
    getAddress(order.store.address);
  });
  return (
    <Center
      py={6}
      p={2}
    >
      <Box
        maxW={'450px'}
        minw={'300px'}
        w={'full'}
        bg={'white'}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Stack>
          <Badge
            size='xs'
            textTransform='uppercase'
            colorScheme={badgeColor(order.status)}
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
              From {order.store.name} Store
            </Text>
            <Heading
              color={'green'}
              size='sm'
              fontFamily={'body'}
            >
              <Icon as={MdLocationOn} /> {address && address}
            </Heading>
            <Text>
              <Icon as={GiRoad} />
              {'  '}
              {calcDistance(order.store.address, order.user.address)}KM
            </Text>

            <Text
              color={'grey'}
              size='sm'
            >
              To {order.user.name}
            </Text>
            <Heading
              color={'green'}
              size='sm'
              fontFamily={'body'}
            >
              <Icon as={MdLocationOn} /> {address && address}
            </Heading>
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
                        {orderProduct.product.name} | {orderProduct.quantity} x{' '}
                        {orderProduct.product.price}€
                      </Text>
                    </HStack>
                  );
                })}
            </Box>
            <Box>
              <Heading
                size='xs'
                textTransform='uppercase'
              >
                Total
              </Heading>
              <Text
                pt='2'
                fontSize='md'
              >
                {order.total}€
              </Text>
            </Box>
          </Stack>
          <Button
            color={'white'}
            bg={'green.500'}
            _hover={{
              bg: 'green.700'
            }}
            onClick={() => {
              acceptOrder(order._id);
            }}
          >
            Accept Order
          </Button>
          <Text>
            Order ID <i>{order._id.slice(-4)}</i>
          </Text>
        </Stack>
      </Box>
    </Center>
  );
};

export default DriverOrderCard;
