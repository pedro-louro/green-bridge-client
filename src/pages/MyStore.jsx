import AddStore from './AddStore';
import { getStore } from '../api/stores.api';
import { useState, useEffect, useContext } from 'react';
import { getUser } from '../api/auth.api';
import CreateProduct from './CreateProduct';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../api/product.api';

const MyStore = () => {
  const [myStore, setMyStore] = useState('');
  const { numProducts, setNumProducts } = useState(0);
  const userId = localStorage.getItem('userId');
  const [hiddenForm, setHiddenForm] = useState('hidden');

  const hideForm = () => {
    setHiddenForm('hidden');
  };

  //related to user
  const fetchStore = async () => {
    try {
      const fetchUser = await getUser(userId);
      const response = await getStore(fetchUser.data.store);
      setMyStore(response.data);
      setNumProducts(response.data.products.length);
    } catch (error) {
      console.log('Error getting the Store');
    }
  };
  const removeProduct = async productId => {
    try {
      await deleteProduct(productId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  return (
    <div>
      <h2>My Store</h2>
      <button
        onClick={() => {
          setHiddenForm('');
        }}
      >
        Add a new product
      </button>{' '}
      <Link to={`/mystore/${myStore._id}/orders`}>
        <button>Store Orders</button>
      </Link>
      {!hiddenForm && (
        <CreateProduct
          hideForm={hideForm}
          refreshStores={fetchStore}
          myStore={myStore}
        />
      )}
      {myStore && <h2>{myStore.name}</h2>}
      {myStore &&
        myStore.products.map(product => {
          return (
            <div key={product._id}>
              <h4>{product.name}</h4>
              <p>
                Price: {product.price}€ | {product.stock} units in Stock
              </p>
              <button
                onClick={() => {
                  removeProduct(product._id);
                }}
              >
                Delete Product
              </button>
            </div>
          );
        })}
      {!myStore && <AddStore />}
    </div>
  );
};

export default MyStore;
