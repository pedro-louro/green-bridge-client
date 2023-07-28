import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  VStack,
  Avatar,
  Text,
  AbsoluteCenter
} from '@chakra-ui/react';
import AddressSearchBar from './AddressSearchBar';
import { getUser, updateUser } from '../api/auth.api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../api/product.api';

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
    setImg(event.target.files[0]);
  };
  const handleAddress = coordinates => {
    setAddress(coordinates);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const userUpdate = { _id: userId, email, name, address };
      if (img) {
        console.log(img);
        //create new formData
        const uploadData = new FormData();

        //add image to form data
        uploadData.append('file', img);

        const ImageResponse = await uploadImage(uploadData);

        userUpdate.img = ImageResponse.data.img;
      }
      await updateUser(userUpdate);
      localStorage.setItem('userImg', userUpdate.img);

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
        >
          <AbsoluteCenter>
            <Stack
              spacing={4}
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
                  <Text>
                    <b>Change Photo:</b>
                    <input
                      type='file'
                      onChange={handleImg}
                    />
                  </Text>
                </VStack>
              </FormControl>
              <FormControl id='userName'>
                <FormLabel>
                  <b>User name</b>
                </FormLabel>
                <Input
                  defaultValue={user.name}
                  type='text'
                  onChange={handleName}
                  bg={'white'}
                />
              </FormControl>
              <FormControl id='email'>
                <FormLabel>
                  <b>Email address</b>
                </FormLabel>
                <Input
                  defaultValue={user.email}
                  type='email'
                  onChange={handleEmail}
                  bg={'white'}
                />
              </FormControl>
              <FormControl id='address'>
                <FormLabel>
                  <b>Delivery Address</b>
                </FormLabel>
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
          </AbsoluteCenter>
        </Flex>
      )}
    </div>
  );
};

export default UpdateUser;
