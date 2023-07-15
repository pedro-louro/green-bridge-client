import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteOrder, getOrder, updateOrder } from '../api/order.api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Checkout = () => {
  const orderId = localStorage.getItem('orderId');
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    const response = await getOrder(orderId);
    setOrder(response.data);
    setProducts(response.data.products);

    const calcTotal = response.data.products.reduce((acc, curr) => {
      return acc + curr.quantity * curr.product.price;
    }, 0);
    setTotal(calcTotal);
  };

  const cancelOrder = async () => {
    await deleteOrder(orderId);
    toast.success('Order Canceled successfully');
    setOrder({});
    localStorage.removeItem('orderId');

    navigate('/stores');
  };

  const placeOrder = async () => {
    const response = await updateOrder({
      _id: orderId,
      status: 'new'
    });
    toast.success('The store received your order');
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  return (
    <div>
      <h2>My Cart</h2>
      {orderId && (
        <div>
          {products &&
            products.map(productInCart => {
              return (
                <div key={productInCart._id}>
                  <p>
                    <b>{productInCart.product.name}</b> |{' '}
                    {productInCart.quantity} x {productInCart.product.price}€
                  </p>
                </div>
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
        </div>
      )}
      {!orderId && (
        <div>
          <h3>Your cart is empty</h3>
          <Link to={'/stores/'}>Find you Favorite Plants Store!</Link>
        </div>
      )}
    </div>
  );
};

export default Checkout;
