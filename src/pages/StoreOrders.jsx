import { getStore } from '../api/stores.api';
import { useEffect, useState } from 'react';
import UpdateOrderModal from '../components/UpdateOrderModal';
import { updateOrder } from '../api/order.api';
import OrderCard from '../components/OrderCard';
import StoreOrderCard from '../components/StoreOrderCard';
import { Stack, VStack, SimpleGrid, Heading } from '@chakra-ui/react';

const StoreOrders = ({ storeId }) => {
  // const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [orders, setOrders] = useState(null);
  const [pastOrders, setPastOrders] = useState(null);
  const [statusChanged, setStatusChanged] = useState(false);

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
        setPastOrders(nonActiveOrders);
        setStatusChanged(false);
      } catch (error) {
        console.log(error);
      }
    }
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
      {orders && <Heading>Open Orders</Heading>}
      <VStack
        p={10}
        pt={20}
      >
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

      {!orders && (
        <div>
          <Heading>You don't have any open order! </Heading>
        </div>
      )}
      <hr />
      {pastOrders && <Heading>Past Orders</Heading>}
      <VStack
        p={10}
        pt={20}
      >
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
    </div>
  );
};

export default StoreOrders;
