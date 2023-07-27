import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  Icon,
  Button,
  Tooltip
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';

const ProductCard = ({ product, handleOrder }) => {
  return (
    <Flex
      maxHeight='xs'
      minW={'240px'}
      w='full'
      alignItems='center'
      justifyContent='center'
      pt={5}
    >
      <Box
        bg={'white'}
        maxW='sm'
        minW={'240px'}
        maxHeight='xs'
        borderWidth='1px'
        rounded='lg'
        shadow='lg'
        position='relative'
        alignSelf={'center'}
      >
        <Image
          src={product.img}
          alt={`Picture of ${product.name}`}
          roundedTop='lg'
          objectFit='cover'
          alignSelf={'center'}
        />

        <Box
          p='6'
          bg='#ebf2e8'
        >
          <Box
            d='flex'
            alignItems='baseline'
          ></Box>
          <Flex
            mt='1'
            justifyContent='space-between'
            alignContent='center'
          >
            <Box
              fontSize='2xl'
              fontWeight='semibold'
              as='h4'
              lineHeight='tight'
              isTruncated
            >
              {product.name}
            </Box>
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
          </Flex>

          <Flex
            justifyContent='space-between'
            alignContent='center'
          >
            <Box
              fontSize='2xl'
              color={useColorModeValue('gray.800', 'white')}
            >
              <Box
                as='span'
                color={'gray.600'}
                fontSize='lg'
              >
                €
              </Box>
              {product.price}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default ProductCard;
