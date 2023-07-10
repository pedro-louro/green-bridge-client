import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getStore } from '../api/stores.api';

const StoreDetails = () => {
  const [store, setStore] = useState(null);
  const { storeId } = useParams();
  const [cart, setCart] = useState([]);

  const fetchStore = async storeId => {
    try {
      const response = await getStore(storeId);
      setStore(response.data);
    } catch (error) {
      console.log('Something went wrong fetching the Store', error);
    }
  };

  useEffect(() => {
    fetchStore(storeId);
  }, [storeId, cart]);
  console.log(cart);

  return (
    <div>
      {store && <h2>{store.name}</h2>}
      {store &&
        store.products.map(product => {
          return (
            <div key={product._id}>
              <h4>{product.name}</h4>
              <p>Price: {product.price}</p>
              <p>${product.stock} availabel!</p>
              <button
                onClick={() => {
                  setCart(prevCart => [...prevCart, product]);
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
