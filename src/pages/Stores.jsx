import { Link } from 'react-router-dom';
import { getAllStores } from '../api/stores.api';
import { useState, useEffect } from 'react';

const Stores = () => {
  const [stores, setStores] = useState([]);

  const getStores = async () => {
    try {
      const response = await getAllStores();
      setStores(response.data);
    } catch (error) {
      console.log('Error getting the Stores');
    }
  };

  useEffect(() => {
    getStores();
  }, []);
  return (
    <div>
      <h2>Stores</h2>
      {stores &&
        stores.map(store => {
          return (
            <div key={store._id}>
              <h3>{store.name}</h3>
              <Link to={`/stores/${store._id}`}>See details</Link>
            </div>
          );
        })}
    </div>
  );
};

export default Stores;
