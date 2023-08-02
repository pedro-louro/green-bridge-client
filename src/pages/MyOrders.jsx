import { useEffect, useState } from 'react';
import { getOrderByUser } from '../api/order.api';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  SimpleGrid,
  Box,
  Link,
  Heading,
  Icon,
  AbsoluteCenter,
  Spinner
} from '@chakra-ui/react';
import OrderCard from '../components/OrderCard';
import { PiPottedPlant } from 'react-icons/pi';

const MyOrders = () => {
  const userId = localStorage.getItem('userId');
  const [pastOrders, setPastOrders] = useState(null);
  const [orders, setOrders] = useState(null);
  const [ordersFetched, setOrdersFetched] = useState(false);

  const fetchUserOrders = async () => {
    try {
      const response = await getOrderByUser(userId);

      // TO render ongoing orders
      const activeOrders = response.data.filter(
        order =>
          order.status === 'new' ||
          order.status === 'preparing' ||
          order.status === 'ready' ||
          order.status === 'delivering'
      );
      if (activeOrders.length) {
        setOrders(activeOrders);
      } else {
        setOrders(null);
      }
      // To render past orders
      const nonActiveOrders = response.data.filter(
        order => order.status === 'delivered' || order.status === 'canceled'
      );
      if (nonActiveOrders.length) {
        setPastOrders(nonActiveOrders.reverse());
      } else {
        setPastOrders(null);
      }
      // Reverse the order of the array to show more recent orders first
      setOrdersFetched(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <div>
      <Box h={'60px'}></Box>
      {!ordersFetched && (
        <AbsoluteCenter>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='#2F8559'
            size='xl'
          />
        </AbsoluteCenter>
      )}
      <Tabs
        p={6}
        isFitted
        variant='enclosed-colored'
        colorScheme='green'
      >
        <TabList>
          <Tab
            bg={'#fcfadb'}
            color={'black'}
            _selected={{
              color: 'black',
              bg: '#F2B13A',
              boxShadow: '2xl',
              fontWeight: 'bold'
            }}
          >
            Open Orders
          </Tab>
          <Tab
            bg={'#fcfadb'}
            color={'black'}
            _selected={{
              color: 'black',
              bg: '#F2B13A',
              boxShadow: '2xl',
              fontWeight: 'bold'
            }}
          >
            Orders History
          </Tab>
        </TabList>
        <TabPanels p={4}>
          <TabPanel>
            {!orders && ordersFetched && (
              <VStack>
                <Heading
                  size='lg'
                  mb={5}
                >
                  You don't have any open orders!{' '}
                </Heading>
                <Link
                  href={'/stores/'}
                  color='white'
                  size='lg'
                  bg='green.700'
                  p={3}
                  rounded={'xl'}
                >
                  <Icon
                    as={PiPottedPlant}
                    size='md'
                  />
                  {'  '}
                  Find you Favorite Plants Store here!
                </Link>
              </VStack>
            )}
            {orders && ordersFetched && (
              <VStack
                p={10}
                pt={20}
              >
                <SimpleGrid
                  spacing={3}
                  columns={[1, null, 2, null, 3]}
                  bg='#f2efda'
                  p={'5%'}
                  pl={'10%'}
                  pr={'10%'}
                  minW={'240px'}
                  h='100%'
                >
                  {orders &&
                    orders.map(order => {
                      return (
                        <OrderCard
                          key={order._id}
                          order={order}
                        />
                      );
                    })}
                </SimpleGrid>
              </VStack>
            )}
          </TabPanel>

          <TabPanel>
            {!pastOrders && ordersFetched && (
              <VStack>
                <Heading
                  size='lg'
                  mb={5}
                >
                  You don't have any Past orders!{' '}
                </Heading>
                <Link
                  to={'/stores/'}
                  color='white'
                  size='lg'
                  bg='green.700'
                  p={3}
                  rounded={'xl'}
                >
                  <Icon
                    as={PiPottedPlant}
                    size='md'
                  />
                  {'  '}
                  Find you Favorite Plants Store here!
                </Link>
              </VStack>
            )}
            {pastOrders && ordersFetched && (
              <VStack
                p={10}
                pt={20}
              >
                <SimpleGrid
                  spacing={3}
                  columns={[1, null, 2, null, 3]}
                  bg='#f2efda'
                  p={'5%'}
                  pl={'10%'}
                  pr={'10%'}
                  minW={'240px'}
                  h='100%'
                >
                  {pastOrders &&
                    pastOrders.map(pastOrder => {
                      return (
                        <OrderCard
                          key={pastOrder._id}
                          order={pastOrder}
                        />
                      );
                    })}
                </SimpleGrid>
              </VStack>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default MyOrders;
