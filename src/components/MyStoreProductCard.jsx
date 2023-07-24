import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Icon
} from '@chakra-ui/react';
import { PiTrash } from 'react-icons/pi';

const StoreProductCard = ({ product, removeProduct }) => {
  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        bg='#ebf2e8'
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${product.img})`,
            filter: 'blur(15px)',
            zIndex: -1
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)'
            }
          }}
        >
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={product.img}
          />
        </Box>
        <Stack
          pt={10}
          align={'center'}
        >
          <Text
            color={'gray.500'}
            fontSize={'sm'}
            textTransform={'uppercase'}
          >
            Brand
          </Text>
          <Heading
            fontSize={'2xl'}
            fontFamily={'body'}
            fontWeight={500}
          >
            {product.name}
          </Heading>
          <Stack
            direction={'row'}
            align={'center'}
          >
            <Text
              fontWeight={800}
              fontSize={'xl'}
            >
              {product.price}€
            </Text>
            <Text color={'gray.600'}>{product.stock} units in Stock</Text>
            <Button
              size={'sm'}
              bg={'green.500'}
              color={'white'}
              _hover={{
                bg: 'green.700'
              }}
              onClick={() => {
                removeProduct(product._id);
              }}
            >
              <Icon as={PiTrash} />
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default StoreProductCard;
