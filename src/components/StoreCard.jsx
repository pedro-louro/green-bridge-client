import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Icon,
  HStack
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdDeliveryDining } from 'react-icons/md';

const StoreCard = ({ store, distance, shipping }) => {
  return (
    <Center
      py={6}
      p={2}
      minW={'240px'}
    >
      <Box
        minW={'240px'}
        w={'full'}
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
          <HStack alignSelf={'center'}>
            <Icon
              as={MdDeliveryDining}
              color={'#00923A'}
              boxSize={6}
            />
            <Text color={'gray.700'}>{shipping}€</Text>
          </HStack>
          <Text color={'gray.700'}>{distance}Km from you</Text>

          <Link to={`/stores/${store._id}`}>
            <Button
              variant='outline'
              color={'green'}
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
export default StoreCard;
