import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth.api';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import AddressSearchBar from '../components/AddressSearchBar';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [address, setAddress] = useState('');
  const [formattedAddress, setFormattedAddress] = useState('');

  const navigate = useNavigate();

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
  };
  const handleAddress = coordinates => {
    setAddress(coordinates);
  };

  const handleName = e => {
    setName(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const user = { email, password, name, address };
      await signup(user);
      navigate('/login');
    } catch (error) {
      console.log('Error sign up', error);
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <Flex
      direction={'column'}
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={'#f2efda'}
      bgImage="url('https://res.cloudinary.com/dbdzfjr4x/image/upload/v1690059727/green-bridge/imgbin_large-monstera-leaf-png_1_el0b7v.png')"
      bgRepeat='no-repeat'
    >
      <Box h='60px'></Box>
      <Stack
        spacing={8}
        mx={'auto'}
        maxW={'lg'}
        // py={12}
        // px={6}
      >
        <Stack align={'center'}>
          <Heading
            fontSize={'4xl'}
            textAlign={'center'}
          >
            Sign up
          </Heading>
          <Text
            fontSize={'lg'}
            color={'gray.600'}
          >
            and find your plants!
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={'gray.50'}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl
                  id='name'
                  isRequired
                >
                  <FormLabel>Name</FormLabel>
                  <Input
                    type='text'
                    onChange={handleName}
                    borderColor={'gray.300'}
                    w='xs'
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl
              id='email'
              isRequired
            >
              <FormLabel>Email address</FormLabel>
              <Input
                type='email'
                onChange={handleEmail}
                borderColor={'gray.300'}
                w='xs'
              />
            </FormControl>
            <FormControl
              id='password'
              isRequired
            >
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  onChange={handlePassword}
                  borderColor={'gray.300'}
                  w='xs'
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword(showPassword => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl
              isRequired
              w='xs'
            >
              <FormLabel>Address</FormLabel>
              <AddressSearchBar
                borderColor={'gray.300'}
                handleAddress={handleAddress}
                currentAddress={formattedAddress}
              />
            </FormControl>
            <Stack
              spacing={10}
              pt={2}
            >
              <Text>{errorMessage}</Text>
              <Button
                loadingText='Submitting'
                size='lg'
                bg={'green.500'}
                color={'white'}
                _hover={{
                  bg: 'green.700'
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                <Link
                  to='/login'
                  style={{ color: '#4399E1' }}
                >
                  <u>Login</u>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;
