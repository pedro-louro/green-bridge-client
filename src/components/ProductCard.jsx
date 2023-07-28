import {
  Box,
  Image,
  Icon,
  Button,
  Tooltip,
  Center,
  Heading,
  Stack,
  Text
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';

const ProductCard = ({ product, handleOrder }) => {
  return (
    <Center>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        bg='#f2efda'
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
            <Tooltip
              label='Add to cart'
              bg='white'
              placement={'top'}
              color={'gray.800'}
              fontSize={'1.2em'}
            >
              <Button
                onClick={() => {
                  handleOrder(product);
                }}
                display={'flex'}
                bg={'blue.200'}
                _hover={{
                  bg: 'green.500'
                }}
              >
                <Icon
                  as={FiShoppingCart}
                  h={7}
                  w={7}
                  alignSelf={'center'}
                />
              </Button>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default ProductCard;
