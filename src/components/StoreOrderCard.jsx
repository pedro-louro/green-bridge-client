import {
  Heading,
  Stack,
  Text,
  Box,
  StackDivider,
  Badge,
  Image,
  HStack,
  Center
} from '@chakra-ui/react';
import { getUser } from '../api/auth.api';

const StoreOrderCard = ({ store, order }) => {
  const badgeColor = status => {
    if (status === 'new' || status === 'preparing') {
      return 'purple';
    } else if (status === 'ready') {
      return 'blue';
    } else if (status === 'delivering' || status === 'delivered') {
      return 'green';
    } else if (status === 'canceled') {
      return 'red';
    }
  };
  // returns the product name by comparing the product ID from the order Object with the product ID from the store
  const getProductName = productId => {
    const product = store.products.filter(
      element => element._id.toString() === productId.toString()
    );
    return product[0].name;
  };
  //Same as above but for getting the image
  const getProductImg = productId => {
    const product = store.products.filter(
      element => element._id.toString() === productId.toString()
    );
    return product[0].img;
  };

  return (
    <Center
      py={6}
      p={2}
    >
      <Box
        maxW={'350px'}
        minW={'240px'}
        w={'full'}
        bg={'white'}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Stack>
          <Badge
            size='xs'
            textTransform='uppercase'
            colorScheme={badgeColor(order.status)}
            alignSelf={'center'}
          >
            {order.status}
          </Badge>
          <HStack
            pt={1}
            pb={2}
          >
            <Heading
              color={'black'}
              fontSize={'2xl'}
              fontFamily={'body'}
            >
              Order ID <i>{order._id.slice(-4)}</i>
            </Heading>
          </HStack>

          <Stack
            divider={<StackDivider />}
            spacing='4'
            pt={2}
          >
            <Box>
              <Heading
                size='md'
                pb={2}
              >
                Order Details
              </Heading>

              {order.products &&
                order.products.map(orderProduct => {
                  console.log(order.products);
                  return (
                    <HStack
                      key={orderProduct.product._id}
                      pt='4'
                    >
                      <Image
                        boxSize='30px'
                        src={getProductImg(orderProduct.product)}
                      />
                      <Text fontSize='md'>
                        {getProductName(orderProduct.product)} |{' '}
                        {orderProduct.quantity} x {orderProduct.product.price}€
                      </Text>
                    </HStack>
                  );
                })}
            </Box>
            <Box>
              <Heading
                size='xs'
                textTransform='uppercase'
              >
                Total
              </Heading>
              <Text
                pt='2'
                fontSize='md'
              >
                {order.total}€
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};
export default StoreOrderCard;
