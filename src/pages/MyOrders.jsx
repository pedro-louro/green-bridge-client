import { useEffect, useState } from 'react';
import { getOrderByUser } from '../api/order.api';
import { Link } from 'react-router-dom';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  SimpleGrid
} from '@chakra-ui/react';
import OrderCard from '../components/OrderCard';
// import useSwr from 'swr';

// const fetchOrders = () => {
//   fetch(`http://localhost:5005/api/orders/user/${userId}`, {
//     headers: {
//       'Content-type': 'application/json',
//       Authorization: `Bearer ${localStorage.getItem('authToken')}`
//     }
//   }).then(res => res.json());
// };

const MyOrders = () => {
  const userId = localStorage.getItem('userId');
  const [pastOrders, setPastOrders] = useState([]);
  const [orders, setOrders] = useState([]);

  /* const { data, isLoading, error } = useSwr(fetchOrders);
  console.log(data);
  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error :(</>;
  } */

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
  console.log(orders);

  return (
    <div>
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
            <VStack
              p={10}
              pt={20}
            >
              <SimpleGrid
                spacing={3}
                columns={[1, null, 2]}
                bg='#ebf2e8'
                pl={'120px'}
                pr={'120px'}
                pt={'70px'}
                pb={'70px'}
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
          </TabPanel>
          <TabPanel>
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
          </TabPanel>
        </TabPanels>
      </Tabs>
      {!orders && (
        <div>
          <h2>You don't have any open orders! </h2>
          <Link to={'/stores/'}>Find you Favorite Plants Store!</Link>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
