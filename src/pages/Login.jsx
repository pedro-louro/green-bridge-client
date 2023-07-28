import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth.api';
import { AuthContext } from '../context/auth.context';
import { toast } from 'react-toastify';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const user = { email, password };
      // const response = await login(user);
      const response = await toast.promise(login(user), {
        pending: 'We are working on your request, please wait'
      });

      //Store the login token in the local storage (function from the auth context)
      storeToken(response.data.authToken);

      //verify the token
      authenticateUser();

      navigate('/');
    } catch (error) {
      console.log('Error logging in', error);
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={'#f2efda'}
      bgImage="url('https://res.cloudinary.com/dbdzfjr4x/image/upload/v1690059727/green-bridge/imgbin_large-monstera-leaf-png_1_el0b7v.png')"
      bgRepeat='no-repeat'
    >
      <Stack
        spacing={8}
        mx={'auto'}
        maxW={'lg'}
        py={12}
        px={6}
      >
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Log into your account</Heading>
          <Text
            fontSize={'lg'}
            color={'green.400'}
          >
            and connect with all the green out there!
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={'gray.50'}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id='email'>
              <FormLabel color={'black'}>Email address</FormLabel>
              <Input
                type='email'
                value={email}
                onChange={handleEmail}
                borderColor={'gray.300'}
              />
            </FormControl>
            <FormControl id='password'>
              <FormLabel color={'black'}>Password</FormLabel>
              <Input
                type='password'
                value={password}
                onChange={handlePassword}
                borderColor={'gray.300'}
              />
            </FormControl>
            <Stack spacing={5}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              ></Stack>
              <Text>{errorMessage}</Text>
              <Button
                bg={'green.500'}
                type='submit'
                color={'white'}
                _hover={{
                  bg: 'green.700'
                }}
                onClick={handleSubmit}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
