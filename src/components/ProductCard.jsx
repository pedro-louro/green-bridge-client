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
    // <Flex
    //   maxHeight='xs'
    //   minW={'240px'}
    //   w='full'
    //   alignItems='center'
    //   justifyContent='center'
    //   pt={5}
    // >
    //   <Box
    //     bg={'white'}
    //     maxW='xs'
    //     // minW={'240px'}
    //     maxHeight='xs'
    //     borderWidth='1px'
    //     rounded='lg'
    //     shadow='lg'
    //     position='relative'
    //     alignSelf={'center'}
    //   >
    //     <Image
    //       src={product.img}
    //       alt={`Picture of ${product.name}`}
    //       roundedTop='lg'
    //       objectFit='cover'
    //       alignSelf={'center'}
    //       maxHeight='xs'
    //     />

    //     <Box
    //       p='6'
    //       bg='#ebf2e8'
    //     >
    //       <Box
    //         d='flex'
    //         alignItems='baseline'
    //       ></Box>
    //       <Flex
    //         mt='1'
    //         justifyContent='space-between'
    //         alignContent='center'
    //       >
    //         <Box
    //           fontSize='lg'
    //           fontWeight='semibold'
    //           lineHeight='tight'
    //           maxW='xs'
    //         >
    //           {product.name}
    //         </Box>
    //         <Tooltip
    //           label='Add to cart'
    //           bg='white'
    //           placement={'top'}
    //           color={'gray.800'}
    //           fontSize={'1.2em'}
    //         >
    //           <Button
    //             onClick={() => {
    //               handleOrder(product);
    //             }}
    //             display={'flex'}
    //             bg={'blue.200'}
    //             _hover={{
    //               bg: 'green.500'
    //             }}
    //           >
    //             <Icon
    //               as={FiShoppingCart}
    //               h={7}
    //               w={7}
    //               alignSelf={'center'}
    //             />
    //           </Button>
    //         </Tooltip>
    //       </Flex>

    //       <Flex
    //         justifyContent='space-between'
    //         alignContent='center'
    //       >
    //         <Box
    //           fontSize='2xl'
    //           color={useColorModeValue('gray.800', 'white')}
    //         >
    //           <Box
    //             as='span'
    //             color={'gray.600'}
    //             fontSize='lg'
    //           >
    //             €
    //           </Box>
    //           {product.price}
    //         </Box>
    //       </Flex>
    //     </Box>
    //   </Box>
    // </Flex>
  );
};

export default ProductCard;
