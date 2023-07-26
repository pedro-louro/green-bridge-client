import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Text,
  Box,
  StackDivider,
  Badge,
  Image,
  HStack,
  Center,
  Avatar
} from '@chakra-ui/react';

const OrderCard = ({ order }) => {
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
  return (
    <Center
      py={6}
      p={2}
    >
      <Box
        maxW={'450px'}
        minw={'300px'}
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
            <Avatar src={order.store.img} />
            <Heading
              color={'black'}
              fontSize={'2xl'}
              fontFamily={'body'}
            >
              {order.store.name}
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
                  return (
                    <HStack
                      key={orderProduct.product._id}
                      pt='4'
                    >
                      <Image
                        boxSize='30px'
                        src={`${orderProduct.product.img}`}
                      />
                      <Text fontSize='md'>
                        {orderProduct.product.name} | {orderProduct.quantity} x{' '}
                        {orderProduct.product.price}€
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
export default OrderCard;
