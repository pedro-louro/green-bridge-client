import { useEffect, useState } from 'react';
import { getOrderByDriver } from '../api/order.api';
import DriverOrderCard from './DriverOrderCard';
import {
  Center,
  Stack,
  Badge,
  VStack,
  Text,
  StackDivider,
  Image,
  Heading,
  Box,
  HStack,
  Icon,
  Divider,
  AbsoluteCenter
} from '@chakra-ui/react';
import { HiLink } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const DriverOrders = () => {
  const userId = localStorage.getItem('userId');
  const [orders, setOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);

  const fetchDriverOrders = async () => {
    try {
      const response = await getOrderByDriver(userId);
      console.log(response.data);

      const activeOrders = response.data.filter(
        order => order.status === 'delivering'
      );
      if (activeOrders.length) {
        setOrders(activeOrders);
      } else {
        setOrders(null);
      }
      // To render past orders
      const nonActiveOrders = response.data.filter(
        order => order.status === 'delivered'
      );
      setPastOrders(nonActiveOrders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDriverOrders();
  }, []);
  return (
    <div>
      {orders && <Heading size='md'>Open Orders</Heading>}
      {orders &&
        orders.map(order => {
          return (
            <Center
              py={6}
              p={2}
              key={order._id}
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

                    <Text
                      color={'grey'}
                      size='sm'
                    >
                      <b>To</b> {order.user.name}
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
                        <Link to={`/driver/orders/${order._id}`}>
                          <Icon as={HiLink} />
                          Order Details
                        </Link>{' '}
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
                  <Text>
                    Order ID <i>{order._id.slice(-4)}</i>
                  </Text>
                </Stack>
              </Box>
            </Center>
          );
        })}
      {!orders && (
        <Box pb={7}>
          <Heading size='md'>You don't have any open orders! </Heading>
        </Box>
      )}
      <Box
        position='relative'
        padding='10'
      >
        <Divider w={'100vw'} />
        <AbsoluteCenter
          bg='white'
          px='4'
          fontSize={'3xl'}
        >
          Past Orders
        </AbsoluteCenter>
      </Box>
      {pastOrders &&
        pastOrders.map(pastOrder => {
          return (
            <Center
              py={6}
              p={2}
              key={pastOrder._id}
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
                    {pastOrder.status}
                  </Badge>

                  <VStack
                    pt={1}
                    pb={2}
                  >
                    <Text
                      color={'grey'}
                      size='sm'
                    >
                      <b>From</b> {pastOrder.store.name} Store
                    </Text>

                    <Text
                      color={'grey'}
                      size='sm'
                    >
                      <b>To</b> {pastOrder.user.name}
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

                      {pastOrder.products &&
                        pastOrder.products.map(pastOrder => {
                          return (
                            <HStack
                              key={pastOrder.product._id}
                              pt='4'
                            >
                              <Image
                                boxSize='30px'
                                src={pastOrder.product.img}
                              />
                              <Text fontSize='md'>
                                {pastOrder.product.name} | {pastOrder.quantity}{' '}
                                x {pastOrder.product.price}€
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
                        {pastOrder.total}€
                      </Text>
                    </Box>
                  </Stack>
                  <Text>
                    Order ID <i>{pastOrder._id.slice(-4)}</i>
                  </Text>
                </Stack>
              </Box>
            </Center>
          );
        })}
    </div>
  );
};

export default DriverOrders;
