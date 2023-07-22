import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  VStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import AddressSearchBar from './AddressSearchBar';

const UpdateUser = () => {
  return (
    <Flex
      align={'center'}
      justify={'center'}
      // bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
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
          <VStack
            // direction={['row', 'column']}
            spacing={6}
          >
            <Avatar
              size='xl'
              src='https://bit.ly/sage-adebayo'
            ></Avatar>
            <Button>Change Photo</Button>
          </VStack>
        </FormControl>
        <FormControl id='userName'>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder='UserName'
            _placeholder={{ color: 'gray.500' }}
            type='text'
          />
        </FormControl>
        <FormControl id='email'>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder='your-email@example.com'
            _placeholder={{ color: 'gray.500' }}
            type='email'
          />
        </FormControl>
        <FormControl id='address'>
          <FormLabel>Address</FormLabel>
          <AddressSearchBar />
          {/* <Input
            placeholder='password'
            _placeholder={{ color: 'gray.500' }}
            type='password'
          /> */}
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
            bg={'blue.400'}
            color={'white'}
            w='full'
            _hover={{
              bg: 'blue.500'
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default UpdateUser;
