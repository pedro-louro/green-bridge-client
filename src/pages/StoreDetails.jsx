import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStore } from '../api/stores.api';
import { addOrder, getOrder, updateOrder } from '../api/order.api';
import ProductCard from '../components/ProductCard';
import { SimpleGrid, Heading, Avatar, Box } from '@chakra-ui/react';

const StoreDetails = () => {
  const [store, setStore] = useState(null);
  const { storeId } = useParams();
  const [orderDetails, setOrderDetails] = useState('');
  const userId = localStorage.getItem('userId');
  const orderId = localStorage.getItem('orderId');

  const fetchStore = async storeId => {
    try {
      const response = await getStore(storeId);
      setStore(response.data);
    } catch (error) {
      console.log('Something went wrong fetching the Store', error);
    }
  };

  const handleOrder = async product => {
    if (!orderId) {
      try {
        const response = await addOrder({
          products: { product: product._id, quantity: 1 },
          status: 'cart',
          user: userId,
          store: storeId
        });
        localStorage.setItem('orderId', response.data._id);

        setOrderDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const fetchOder = await getOrder(orderId);
        const orderProducts = fetchOder.data.products;

        let productExists = orderProducts.filter(
          current => current.product._id === product._id
        );
        let productToAdd = {};

        if (productExists.length) {
          productToAdd.product = productExists[0].product._id;
          productToAdd.quantity = productExists[0].quantity + 1;
        } else {
          productToAdd.product = product._id;
          productToAdd.quantity = 1;
        }

        const addToOrder = await updateOrder({
          _id: orderId,
          products: productToAdd,
          status: 'cart'
        });
        setOrderDetails(addToOrder.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchStore(storeId);
  }, []);

  return (
    <div>
      <Box h={'50px'}></Box>

      {store && (
        <Heading p={6}>
          <Avatar
            src={store.img}
            size={'lg'}
          />{' '}
          {store.name}
        </Heading>
      )}
      <SimpleGrid
        spacing={4}
        columns={[1, null, 2, null, 3]}
        p={'5%'}
        minW={'240px'}
        h='100%'
      >
        {store &&
          store.products.map(product => {
            return (
              <ProductCard
                key={product._id}
                product={product}
                handleOrder={handleOrder}
              />
            );
          })}
      </SimpleGrid>
    </div>
  );
};

export default StoreDetails;
