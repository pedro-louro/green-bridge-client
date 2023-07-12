import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getStore } from '../api/stores.api';
import Checkout from './CheckOut';
import { addOrder, updateOrder } from '../api/order.api';

const StoreDetails = () => {
  const [store, setStore] = useState(null);
  const { storeId } = useParams();
  const [orderDetails, setOrderDetails] = useState('');
  const [orderId, serOrderId] = useState('');
  const userId = localStorage.getItem('userId');

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
        products: product._id,
        status: 'cart',
        user: userId,
        store: storeId
      });
      serOrderId(response.data._id);
      setOrderDetails(response.data);
    } else {
      const addToOrder = await updateOrder({
        _id: orderId,
        products: product._id,
        status: 'cart'
      });
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
      <div hidden>
        <Checkout />
      </div>
    </div>
  );
};

export default StoreDetails;
