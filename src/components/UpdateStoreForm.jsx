import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  VStack
} from '@chakra-ui/react';
import AddressSearchBar from './AddressSearchBar';
import { useState, useEffect } from 'react';
import { getStore, updateStore } from '../api/stores.api';
import { useNavigate } from 'react-router-dom';

const UpdateStore = ({ storeId, refreshStores }) => {
  const [store, setStore] = useState('');
  const [name, setName] = useState(store.name);
  const [img, setImg] = useState(store.img);
  const [address, setAddress] = useState(store.address);

  const fetchStore = async () => {
    if (storeId) {
      try {
        const response = await getStore(storeId);
        setStore(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleName = event => {
    setName(event.target.value);
  };

  const handleImg = event => {
    setImg(event.target.value);
  };
  const handleAddress = coordinates => {
    setAddress(coordinates);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const storeUpdate = { _id: storeId, name, address, img };
      const response = await updateStore(storeUpdate);
      setStore(response.data);
      refreshStores();
    } catch (error) {
      console.log('Error updating the user', error);
    }
  };

  useEffect(() => {
    fetchStore();
  }, [storeId, name, img, address]);
  console.log(address);

  return (
    <div>
      {store && (
        <Flex
          align={'center'}
          justify={'center'}
          // bg={useColorModeValue('gray.50', 'gray.800')}
        >
          <Stack
            spacing={4}
            w={'full'}
            maxW={'md'}
            rounded={'xl'}
            p={6}
          >
            <VStack>
              <Heading
                lineHeight={1.1}
                fontSize={{ base: '2xl', sm: '3xl' }}
              >
                Update Store Details
              </Heading>
            </VStack>
            <FormControl id='storeName'></FormControl>
            <FormControl id='storeName'>
              <FormLabel>Store name</FormLabel>
              <Input
                defaultValue={store.name}
                type='text'
                onChange={handleName}
              />
            </FormControl>
            <FormControl id='image'>
              <FormLabel>Store Image</FormLabel>
              <input
                type='file'
                onChange={handleImg}
              />
            </FormControl>
            <FormControl id='address'>
              <FormLabel>Address</FormLabel>
              <AddressSearchBar handleAddress={handleAddress} />
            </FormControl>
            <Stack
              spacing={6}
              direction={['column', 'row']}
            >
              <Button
                bg={'red.400'}
                color={'white'}
                w='full'
                _hover={{
                  bg: 'red.500'
                }}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                bg={'green.500'}
                color={'white'}
                w='full'
                _hover={{
                  bg: 'green.700'
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      )}
    </div>
  );
};

export default UpdateStore;
