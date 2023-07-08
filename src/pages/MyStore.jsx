import AddStore from './AddStore';
import { getStore } from '../api/stores.api';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const MyStore = () => {
  const [myStore, setMyStore] = useState(null);
  const { user, authenticateUser } = useContext(AuthContext);
  console.log('user:');
  console.log(user);

  //TODO: fix store not rendeing conditionally unless there's a login
  //related to user
  const fetchStore = async () => {
    try {
      authenticateUser();
      const response = await getStore(user.store);
      setMyStore(response.data);
    } catch (error) {
      console.log('Error getting the Store');
    }
  };
  console.log(myStore);

  useEffect(() => {
    fetchStore();
  }, []);

  return (
    <div>
      <h2>My Store</h2>
      {!myStore && <AddStore />}
      {myStore && <h2>{myStore.name}</h2>}
    </div>
  );
};

export default MyStore;
