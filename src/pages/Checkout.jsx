import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteOrder, getOrder, updateOrder } from '../api/order.api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { updateStore } from '../api/stores.api';
// import { useDisclosure } from '@chakra-ui/react';
import { FiMinusCircle } from 'react-icons/fi';
import { FiPlusCircle } from 'react-icons/fi';

import {
  Card,
  CardHeader,
  CardBody,
  Icon,
  Stack,
  StackDivider,
  Box,
  Heading,
  Text,
  Button
} from '@chakra-ui/react';

const Checkout = ({ handleOpenClose }) => {
  const [orderId, setOrderId] = useState(localStorage.getItem('orderId'));
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    if (orderId) {
      try {
        const response = await getOrder(orderId);
        setOrder(response.data);
        setProducts(response.data.products);

        const calcTotal = response.data.products.reduce((acc, curr) => {
          return acc + curr.quantity * curr.product.price;
        }, 0);
        setTotal(calcTotal + response.data.shipping);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const cancelOrder = async () => {
    await deleteOrder(orderId);
    toast.success('Order Canceled successfully');
    setOrder({});
    localStorage.removeItem('orderId');
    setOrderId('');

    navigate('/stores');
  };

  const placeOrder = async () => {
    //update the order with the products, status and total
    const response = await updateOrder({
      _id: orderId,
      status: 'new',
      total: total
    });

    //update store to receive the order ID
    await updateStore({ _id: order.store._id, orders: order._id });

    toast.success('The store received your order');
    localStorage.removeItem('orderId');
    setOrderId('');
  };

  // to add/remove product quantity from within the cart
  const updateOrderQuantity = async (productID, operation) => {
    let existingProduct = products.filter(
      current => current.product._id === productID
    );

    if (operation === 'add') {
      existingProduct[0].quantity += 1;
    }
    if (operation === 'remove') {
      existingProduct[0].quantity -= 1;
    }

    const productToAdd = {
      product: productID,
      quantity: existingProduct[0].quantity
    };

    const response = await updateOrder({
      _id: orderId,
      products: productToAdd,
      status: 'cart'
    });
    fetchOrder();
  };
  useEffect(() => {
    fetchOrder();
  }, [orderId]);
  return (
    <Stack bg='#ebf2e8'>
      {orderId && (
        <Card>
          <CardHeader>
            <Heading size='sm'>Products in the Cart</Heading>
          </CardHeader>

          <CardBody>
            <Stack
              divider={<StackDivider />}
              spacing='4'
            >
              {products &&
                products.map(productInCart => {
                  return (
                    <Box key={productInCart._id}>
                      <Heading
                        size='xs'
                        textTransform='uppercase'
                      >
                        {productInCart.product.name}
                      </Heading>
                      <Text
                        pt='2'
                        fontSize='sm'
                      >
                        {productInCart.quantity} x {productInCart.product.price}
                        €{'   '}
                        <Button
                          bg={'green.500'}
                          color={'white'}
                          _hover={{
                            bg: 'green.700'
                          }}
                          size='xs'
                          onClick={() => {
                            updateOrderQuantity(
                              productInCart.product._id,
                              'remove'
                            );
                          }}
                        >
                          <Icon as={FiMinusCircle}></Icon>{' '}
                        </Button>
                        <Button
                          bg={'green.500'}
                          color={'white'}
                          _hover={{
                            bg: 'green.700'
                          }}
                          size='xs'
                          onClick={() => {
                            updateOrderQuantity(
                              productInCart.product._id,
                              'add'
                            );
                          }}
                        >
                          <Icon as={FiPlusCircle}></Icon>
                        </Button>
                      </Text>
                    </Box>
                  );
                })}
              {order && <p>Delivery Cost: {order.shipping}€</p>}
              <p>
                <b>Total: {total}€</b>
              </p>
              {order && (
                <div>
                  <p>
                    Forgot something?{' '}
                    <Link to={`/stores/${order.store._id}`}>
                      <Button
                        bg={'blue.200'}
                        color={'black'}
                        _hover={{
                          bg: 'blue.500'
                        }}
                        size='xs'
                        onClick={handleOpenClose('close')}
                      >
                        Back to Store
                      </Button>{' '}
                    </Link>
                  </p>
                </div>
              )}

              <div>
                <Button
                  bg={'red.300'}
                  color={'white'}
                  _hover={{
                    bg: 'green.500'
                  }}
                  size='xs'
                  onClick={() => {
                    cancelOrder();
                  }}
                >
                  Cancel Order
                </Button>
                <Button
                  bg={'green.500'}
                  color={'white'}
                  _hover={{
                    bg: 'green.700'
                  }}
                  size='xs'
                  onClick={() => {
                    placeOrder();
                  }}
                >
                  Place Order
                </Button>
              </div>
            </Stack>
          </CardBody>
        </Card>
      )}
      {!orderId && (
        <Box bg='#f2efda'>
          <Heading
            bg='#f2efda'
            size='sm'
            pb={4}
          >
            Your cart is empty
          </Heading>
          <Link
            to={'/stores/'}
            onClick={handleOpenClose('close')}
            bg='#f2efda'
          >
            <Button
              bg={'blue.200'}
              color={'black'}
              _hover={{
                bg: 'blue.500'
              }}
              size='xs'
              onClick={handleOpenClose('close')}
            >
              Find your Plants!
            </Button>
          </Link>
        </Box>
      )}
    </Stack>
  );
};

export default Checkout;
