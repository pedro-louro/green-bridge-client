import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStore } from '../api/stores.api';
import { addOrder, getOrder, updateOrder } from '../api/order.api';
import ProductCard from '../components/ProductCard';
import { SimpleGrid } from '@chakra-ui/react';

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
        console.log('Exists');
        console.log(productExists);

        if (productExists.length) {
          productToAdd.product = productExists[0].product._id;
          productToAdd.quantity = productExists[0].quantity + 1;

          console.log('To add');
          console.log(productToAdd);
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
      {store && <h2>{store.name}</h2>}
      <SimpleGrid
        spacing={4}
        templateColumns='repeat(3, minmax(200px, 1fr))'
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
