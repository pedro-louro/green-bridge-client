import { addStore } from '../api/stores.api';
import { updateUser } from '../api/auth.api';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../api/product.api';
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
import AddressSearchBar from '../components/AddressSearchBar';

const AddStore = ({ refreshStore }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [img, setImg] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formattedAddress, setFormattedAddress] = useState('');

  const handleName = event => {
    setName(event.target.value);
  };

  const handleAddress = coordinates => {
    setAddress(coordinates);
  };
  const handleImg = event => {
    setImg(event.target.files[0]);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const newStore = { name, address, admin: user._id };

      if (img) {
        //create new formData
        const uploadData = new FormData();

        //add image to form data
        uploadData.append('file', img);

        const response = await uploadImage(uploadData);

        newStore.img = response.data.img;
      }

      const createdStore = await addStore(newStore);
      const userData = { _id: user._id, store: createdStore.data._id };
      const addToUser = await updateUser(userData);

      await toast.success('Store added successfully');
      refreshStore();
    } catch (error) {
      toast.error('Something went wrong, try again later');
      console.log(error);
    }
    setName('');
    setAddress('');
    setImg('');

    navigate(`/myStore/`);
  };

  return (
    <div>
      {/* <h2>You don't have a store yet! Create a new Store</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={handleName}
        />
        <label>Address:</label>
        <input
          type='text'
          name='address'
          value={address}
          onChange={handleAddress}
        ></input>

        <label>Image</label>
        <input
          type='file'
          onChange={handleImg}
        />
        <button type='submit'>Create Store</button>
      </form> */}
      <Flex
        align={'center'}
        justify={'center'}
      >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          rounded={'xl'}
          // boxShadow={'lg'}
          p={6}
        >
          <VStack>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl' }}
            >
              Create a new Store
            </Heading>
          </VStack>
          <FormControl id='name'>
            <FormLabel>Store name</FormLabel>
            <Input
              type='text'
              onChange={handleName}
            />
          </FormControl>
          <FormControl id='address'>
            <FormLabel>Address</FormLabel>
            <AddressSearchBar
              user={user}
              handleAddress={handleAddress}
              currentAddress={'Search for an Address'}
            />
          </FormControl>
          <FormControl id='image'>
            <FormLabel>Store Image</FormLabel>
            <Input
              type='file'
              onChange={handleImg}
              borderStyle='none'
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
              color={'white'}
              w='full'
              bg={'green.500'}
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
    </div>
  );
};

export default AddStore;
