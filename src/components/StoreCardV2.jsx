import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Button
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NewStoreCard = ({ store, distance }) => {
  return (
    <Center
      py={6}
      p={2}
    >
      <Box
        maxW={'350px'}
        w={'full'}
        // bg='#ebf2e8'
        bg={'white'}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Box
          h={'210px'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}
        >
          <Center>
            <Image
              objectFit='cover'
              w={'full'}
              maxH={'210px'}
              src={store.img}
              alt={`${store.name} picture`}
              rounded='xl'
            />
          </Center>
        </Box>
        <Stack>
          <Heading
            color={'black'}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {store.name}
          </Heading>
          <Text color={'gray.500'}>{distance}Km from you</Text>
          <Link to={`/stores/${store._id}`}>
            <Button
              variant='outline'
              color={'green'}
              // bg={'green.500'}
              _hover={{
                bg: 'green.500',
                color: 'white'
              }}
            >
              Open Store
            </Button>
          </Link>
        </Stack>
      </Box>
    </Center>
  );
};
export default NewStoreCard;
