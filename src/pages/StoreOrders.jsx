import { getStore } from '../api/stores.api';
import { useEffect, useState } from 'react';
import UpdateOrderModal from '../components/UpdateOrderModal';
import { updateOrder } from '../api/order.api';
import OrderCard from '../components/OrderCard';
import StoreOrderCard from '../components/StoreOrderCard';
import {
  Stack,
  VStack,
  SimpleGrid,
  Heading,
  Box,
  Divider,
  AbsoluteCenter,
  Spinner
} from '@chakra-ui/react';

const StoreOrders = ({ storeId }) => {
  // const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [orders, setOrders] = useState(null);
  const [pastOrders, setPastOrders] = useState(null);
  const [statusChanged, setStatusChanged] = useState(false);
  const [storeFetched, setStoreFetched] = useState(false);

  const fetchStore = async () => {
    if (storeId) {
      try {
        const response = await getStore(storeId);
        setStore(response.data);

        const activeOrders = response.data.orders.filter(
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
        const nonActiveOrders = response.data.orders.filter(
          order => order.status === 'delivered' || order.status === 'canceled'
        );
        if (nonActiveOrders.length) {
          // Reverse array to show more recent orders first
          setPastOrders(nonActiveOrders.reverse());
          setPastOrders(nonActiveOrders.reverse());
        } else {
          setPastOrders(null);
        }

        setStatusChanged(false);
      } catch (error) {
        console.log(error);
      }
    }
    setStoreFetched(true);
  };

  const refreshStores = () => {
    setStatusChanged(true);
  };

  const changeOrderStatus = (orderId, newStatus) => {
    try {
      const response = updateOrder({ _id: orderId, status: newStatus });
    } catch (error) {
      console.log(error);
    }
  };

  const getProductName = productId => {
    const product = store.products.filter(
      element => element._id.toString() === productId.toString()
    );
    return product[0].name;
  };

  useEffect(() => {
    fetchStore();
  }, [statusChanged, storeId]);

  return (
    <div>
      {!storeFetched && (
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
      <Box
        position='relative'
        p={20}
      >
        <Divider w={'100vw'} />
        <AbsoluteCenter
          bg='white'
          px='4'
          fontSize={'3xl'}
        >
          Open Orders
        </AbsoluteCenter>
      </Box>
      {!orders && storeFetched && (
        <div>
          <Heading size='md'>You don't have any open order! </Heading>
        </div>
      )}
      {orders && storeFetched && (
        <VStack>
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
            {orders &&
              orders.map(order => {
                return (
                  <Stack key={order._id}>
                    <StoreOrderCard
                      order={order}
                      store={store}
                    />

                    <UpdateOrderModal
                      orderDetails={order}
                      updateStatus={changeOrderStatus}
                      refreshStores={refreshStores}
                    />
                  </Stack>
                );
              })}
          </SimpleGrid>
        </VStack>
      )}
      <Box
        position='relative'
        p={10}
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
      {!pastOrders && storeFetched && (
        <div>
          <Heading size='md'>You don't have any past orders! </Heading>
        </div>
      )}
      {pastOrders && storeFetched && (
        <VStack
          p={10}
          pt={10}
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
                  <StoreOrderCard
                    key={pastOrder._id}
                    order={pastOrder}
                    store={store}
                  />
                );
              })}
          </SimpleGrid>
        </VStack>
      )}
    </div>
  );
};

export default StoreOrders;
