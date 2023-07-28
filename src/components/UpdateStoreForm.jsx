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
import { uploadImage } from '../api/product.api';
import { toast } from 'react-toastify';

const UpdateStore = ({ storeId, refreshStores }) => {
  const [store, setStore] = useState('');
  const [name, setName] = useState(store.name);
  const [img, setImg] = useState('');
  const [address, setAddress] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState('');

  const fetchStore = async () => {
    if (storeId) {
      try {
        const response = await getStore(storeId);
        setStore(response.data);
        setAddress(response.data.address);

        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
            response.data.address.lat
          },${response.data.address.lng}&key=${
            import.meta.env.VITE_GOOGLE_MAPS_API
          }`
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
    setImg(event.target.files[0]);
  };
  const handleAddress = coordinates => {
    setAddress(coordinates);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const storeUpdate = { _id: storeId, name, address };

      if (img) {
        console.log(img);
        //create new formData
        const uploadData = new FormData();

        //add image to form data
        uploadData.append('file', img);

        const ImageResponse = await uploadImage(uploadData);

        storeUpdate.img = ImageResponse.data.img;
      }
      const response = await toast.promise(updateStore(storeUpdate), {
        pending: 'We are working on your request, please wait',
        success: 'Store Details Updated',
        error: 'Something went wrong - try again later'
      });
      setStore(response.data);
      refreshStores();
      fetchStore();
    } catch (error) {
      console.log('Error updating the user', error);
    }
  };

  useEffect(() => {
    fetchStore();
  }, [storeId, formattedAddress]);

  return (
    <div>
      {store && (
        <Flex
          align={'center'}
          justify={'center'}
        >
          <Stack
            // spacing={4}
            w={'full'}
            maxW={'xl'}
            rounded={'xl'}
            p={20}
            bg='#f2efda'
          >
            <VStack>
              <Heading
                lineHeight={1.1}
                fontSize={{ base: '2xl', sm: '3xl' }}
                pb={7}
              >
                Update Store Details
              </Heading>
            </VStack>
            <form onSubmit={handleSubmit}>
              <FormControl id='storeName'>
                <FormLabel>Store name</FormLabel>
                <Input
                  defaultValue={store.name}
                  type='text'
                  onChange={handleName}
                  bg={'white'}
                />
              </FormControl>
              <FormControl pb={7}>
                <FormLabel>Image</FormLabel>
                <input
                  type='file'
                  onChange={handleImg}
                />
              </FormControl>
              <FormControl
                id='address'
                pb={7}
              >
                <FormLabel>Address:</FormLabel>

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
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </Stack>
        </Flex>
      )}
    </div>
  );
};

export default UpdateStore;
