import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Text,
  useColorModeValue,
  Link
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const handleName = e => {
    setName(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const user = { email, password, name };
      await signup(user);
      navigate('/login');
    } catch (error) {
      console.log('Error sign up', error);
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    // <div className='SignupPage'>
    //   <h1>Sign Up</h1>

    //   <form onSubmit={handleSubmit}>
    //     <label>Email:</label>
    //     <input
    //       type='email'
    //       name='email'
    //       value={email}
    //       onChange={handleEmail}
    //     />

    //     <label>Password:</label>
    //     <input
    //       type='password'
    //       name='password'
    //       value={password}
    //       onChange={handlePassword}
    //     />

    //     <label>Name:</label>
    //     <input
    //       type='text'
    //       name='name'
    //       value={name}
    //       onChange={handleName}
    //     />

    //     <button type='submit'>Sign Up</button>
    //   </form>

    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('green.50', 'gray.800')}
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
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
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
            <Stack
              spacing={10}
              pt={2}
            >
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
                Already a user? <Link color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>

    // {errorMessage && <p className='error-message'>{errorMessage}</p>}

    // <p>Already have account?</p>
    // <Link to={'/login'}> Login</Link>
    // </div>
  );
};

export default Signup;
