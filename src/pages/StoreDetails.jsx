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
      localStorage.setItem('orderId', response.data._id);

      setOrderDetails(response.data);
    } else {
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
    }
  };

  useEffect(() => {
    fetchStore(storeId);
  }, [storeId, orderDetails, orderId]);

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
