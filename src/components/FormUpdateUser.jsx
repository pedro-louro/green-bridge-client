import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  VStack,
  Avatar
} from '@chakra-ui/react';
import AddressSearchBar from './AddressSearchBar';
import { getUser, updateUser } from '../api/auth.api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [img, setImg] = useState(user.img);
  const [address, setAddress] = useState(user.address);
  const [formattedAddress, setFormattedAddress] = useState('');

  const fetchUser = async () => {
    const userDetails = await getUser(userId);
    setUser(userDetails.data);
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        userDetails.data.address.lat
      },${userDetails.data.address.lng}&key=${
        import.meta.env.VITE_GOOGLE_MAPS_API
      }`
    )
      .then(response => response.json())
      .then(responseJSON => {
        setFormattedAddress(responseJSON.results[0].formatted_address);
        console.log(formattedAddress);
      });
  };

  const handleName = event => {
    setName(event.target.value);
  };
  const handleEmail = event => {
    setEmail(event.target.value);
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
      const userUpdate = { _id: userId, email, name, address, img };
      await updateUser(userUpdate);
      navigate('/stores');
    } catch (error) {
      console.log('Error updating the user', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      {user && (
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
            // boxShadow={'lg'}
            p={6}
          >
            <VStack>
              <Heading
                lineHeight={1.1}
                fontSize={{ base: '2xl', sm: '3xl' }}
              >
                Update User Profile
              </Heading>
            </VStack>
            <FormControl id='userName'>
              <VStack spacing={6}>
                <Avatar
                  size='xl'
                  src={user.img}
                ></Avatar>
                <Button>Change Photo</Button>
              </VStack>
            </FormControl>
            <FormControl id='userName'>
              <FormLabel>User name</FormLabel>
              <Input
                defaultValue={user.name}
                type='text'
                onChange={handleName}
              />
            </FormControl>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input
                defaultValue={user.email}
                type='email'
                onChange={handleEmail}
              />
            </FormControl>
            <FormControl id='address'>
              <FormLabel>Address</FormLabel>
              <AddressSearchBar
                user={user}
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
      )}
    </div>
  );
};

export default UpdateUser;
