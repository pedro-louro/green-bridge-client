import AddStore from './AddStore';
import { getStore } from '../api/stores.api';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { getUser } from '../api/auth.api';
import CreateProduct from './AddProduct';

const MyStore = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [myStore, setMyStore] = useState(`${user.store}`);

  //related to user
  const fetchStore = async () => {
    try {
      const fetchUser = await getUser(user._id);
      console.log('FetchUser');
      console.log(fetchUser);
      const response = await getStore(fetchUser.data.store);
      setMyStore(response.data);
    } catch (error) {
      console.log('Error getting the Store');
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  return (
    <div>
      <h2>My Store</h2>
      {myStore && <h2>{myStore.name}</h2>}
      <button>Add a new product</button>
      <CreateProduct />
      {!myStore && <AddStore />}
    </div>
  );
};

export default MyStore;
