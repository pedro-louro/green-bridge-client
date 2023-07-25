import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  VStack,
  Icon
} from '@chakra-ui/react';
import AddressSearchBar from './AddressSearchBar';
import { useState, useEffect } from 'react';
import { getStore, updateStore } from '../api/stores.api';
import { useNavigate } from 'react-router-dom';
import { GiPositionMarker } from 'react-icons/gi';

const UpdateStore = ({ storeId, refreshStores }) => {
  const [store, setStore] = useState('');
  const [name, setName] = useState(store.name);
  const [img, setImg] = useState(store.img);
  const [address, setAddress] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState('');

  const fetchStore = async () => {
    if (storeId) {
      try {
        const response = await getStore(storeId);
        setStore(response.data);
        setAddress(response.data.address);

        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${response.data.address.lat},${response.data.address.lng}&key=AIzaSyBVp_Q1EgrDgWrR2h635oY6UXEphO0jrLg`
        )
          .then(response => response.json())
          .then(responseJSON => {
            setFormattedAddress(responseJSON.results[0].formatted_address);
            console.log(formattedAddress);
          });
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
      fetchStore();
    } catch (error) {
      console.log('Error updating the user', error);
    }
  };

  useEffect(() => {
    fetchStore();
  }, [storeId]);

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
              <FormLabel>Address:</FormLabel>
              {/* <p>
                <Icon as={GiPositionMarker}></Icon> {formattedAddress}
              </p> */}
              <AddressSearchBar
                handleAddress={handleAddress}
                currentAddress={formattedAddress}
              />
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
