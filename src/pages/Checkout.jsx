import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteOrder, getOrder, updateOrder } from '../api/order.api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { updateStore } from '../api/stores.api';
import { useDisclosure } from '@chakra-ui/react';
import {
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Heading,
  Text
} from '@chakra-ui/react';

const Checkout = ({ handleOpenClose }) => {
  const [orderId, setOrderId] = useState(localStorage.getItem('orderId'));
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const store = { _id: order.store, orders: order._id };

  const fetchOrder = async () => {
    if (orderId) {
      try {
        const response = await getOrder(orderId);
        setOrder(response.data);
        setProducts(response.data.products);

        const calcTotal = response.data.products.reduce((acc, curr) => {
          return acc + curr.quantity * curr.product.price;
        }, 0);
        setTotal(calcTotal);
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
    const response = await updateOrder({
      _id: orderId,
      status: 'new',
      total: total
    });
    console.log(response.data);
    await updateStore({ _id: order.store._id, orders: order._id });

    toast.success('The store received your order');
    localStorage.removeItem('orderId');
    setOrderId('');
  };
  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  return (
    <div>
      {orderId && (
        <Card bg='#ebf2e8'>
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
                        €
                      </Text>
                    </Box>
                  );
                })}
              <p>
                <b>Total: {total}€</b>
              </p>
              <div>
                <p>
                  Forgot something?{' '}
                  <Link to={`/stores/${order.store}`}>
                    <button>Back to Store</button>{' '}
                  </Link>
                </p>
              </div>
              <div>
                <button
                  onClick={() => {
                    cancelOrder();
                  }}
                >
                  Cancel Order
                </button>
                <button
                  onClick={() => {
                    placeOrder();
                  }}
                >
                  Place Order
                </button>
              </div>
            </Stack>
          </CardBody>
        </Card>
      )}
      {!orderId && (
        <div>
          <h3>Your cart is empty</h3>
          <Link
            to={'/stores/'}
            onClick={handleOpenClose('close')}
          >
            Find you Favorite Plants Store!
          </Link>
        </div>
      )}

      {/* {products &&
            products.map(productInCart => {
              return (
                <div key={productInCart._id}>
                  <p>
                    <b>{productInCart.product.name}</b> |{' '}
                    {productInCart.quantity} x {productInCart.product.price}€
                  </p>
                </div>
              );
            })} */}
    </div>
  );
};

export default Checkout;
