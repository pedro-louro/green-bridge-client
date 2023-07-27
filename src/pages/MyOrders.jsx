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
  Icon
} from '@chakra-ui/react';
import OrderCard from '../components/OrderCard';
import { PiPottedPlant } from 'react-icons/pi';

const MyOrders = () => {
  const userId = localStorage.getItem('userId');
  const [pastOrders, setPastOrders] = useState([]);
  const [orders, setOrders] = useState([]);

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
      setPastOrders(nonActiveOrders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <div>
      <Box h={'50px'}></Box>
      <Tabs
        p={6}
        isFitted
        variant='enclosed-colored'
        colorScheme='green'
      >
        <TabList>
          <Tab _selected={{ color: 'white', bg: 'green.500' }}>Open Orders</Tab>
          <Tab _selected={{ color: 'white', bg: 'green.500' }}>Past Orders</Tab>
        </TabList>
        <TabPanels p={4}>
          <TabPanel>
            {!orders && (
              <VStack>
                <Heading
                  size='lg'
                  mb={5}
                >
                  You don't have any open orders!{' '}
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
            {orders && (
              <VStack
                p={10}
                pt={20}
              >
                <SimpleGrid
                  spacing={3}
                  columns={[1, null, 2]}
                  bg='#ebf2e8'
                  p={'5%'}
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
            {pastOrders && (
              <VStack
                p={10}
                pt={20}
              >
                <SimpleGrid
                  spacing={5}
                  columns={[1, null, 2]}
                  bg='#ebf2e8'
                  pl={'120px'}
                  pr={'120px'}
                  pt={'70px'}
                  pb={'70px'}
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
