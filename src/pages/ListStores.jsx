import { getAllStores } from '../api/stores.api';
import { useState, useEffect } from 'react';
import StoreCard from '../components/StoreCard';
import { Box, Center, Stack } from '@chakra-ui/react';
// import AddressSearchBar from '../components/testAutocomplete';

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
      <Center>
        <Stack
          w='50%'
          p='20px'
          spacing='3vh'
        >
          {stores &&
            stores.map(store => {
              return (
                <Box
                  key={store._id}
                  boxShadow='lg green'
                >
                  <StoreCard
                    w='60%'
                    store={store}
                  />
                </Box>
              );
            })}
        </Stack>
      </Center>
      {/* <AddressSearchBar /> */}
    </div>
  );
};

export default Stores;
