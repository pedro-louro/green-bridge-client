import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getStore } from '../api/stores.api';
import Checkout from './CheckOut';
import { addOrder, getOrder, updateOrder } from '../api/order.api';

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
      const response = await addOrder({
        products: { product: product._id, quantity: 1 },
        status: 'cart',
        user: userId,
        store: storeId
      });
      setOrderDetails(response.data);
      localStorage.setItem('orderId', response.data._id);
    } else {
      const fetchOder = await getOrder(orderId);
      console.log(fetchOder);

      // TODO: finish adding the quantity logic
      const productExists = fetchOder.data.products.filter(
        existingProduct => existingProduct === product._id
      );

      console.log(productExists);

      const addToOrder = await updateOrder({
        _id: orderId,
        products: { product: product._id, quantity: 1 },
        status: 'cart'
      });
      setOrderDetails(addToOrder.data);
    }
  };

  useEffect(() => {
    fetchStore(storeId);
  }, [storeId, orderDetails]);

  return (
    <div>
      {store && <h2>{store.name}</h2>}
      {store &&
        store.products.map(product => {
          return (
            <div key={product._id}>
              <h4>{product.name}</h4>
              <p>Price: {product.price}€</p>
              <p>{product.stock} available!</p>
              <button
                onClick={() => {
                  handleOrder(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default StoreDetails;
