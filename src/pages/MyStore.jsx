import AddStore from './AddStore';
import { getStore } from '../api/stores.api';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { getUser } from '../api/auth.api';
import CreateProduct from './AddProduct';

const MyStore = () => {
  const { user } = useContext(AuthContext);
  const [myStore, setMyStore] = useState('');
  const { myProducts, setMyProducts } = useState([]);
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
      setMyProducts(response.data.products);
    } catch (error) {
      console.log('Error getting the Store');
    }
  };

  useEffect(() => {
    fetchStore();
  }, [myStore]);

  return (
    <div>
      <h2>My Store</h2>
      {!myStore && <AddStore />}

      <button
        onClick={() => {
          setHiddenForm('');
        }}
      >
        Add a new product
      </button>
      {!hiddenForm && <CreateProduct hideForm={hideForm} />}
      {myStore && <h2>{myStore.name}</h2>}
      {myStore &&
        myStore.products.map(product => {
          return (
            <div key={product._id}>
              <h4>{product.name}</h4>
              <p>Price: {product.price}€</p>
            </div>
          );
        })}
    </div>
  );
};

export default MyStore;
