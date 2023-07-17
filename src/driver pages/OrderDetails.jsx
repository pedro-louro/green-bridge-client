import { Link, useParams } from 'react-router-dom';
import { getOrder, updateOrder } from '../api/order.api';
import { useEffect, useState } from 'react';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isDelivered, setIsDelivered] = useState(false);

  const fetchOrder = async () => {
    const response = await getOrder(orderId);
    setOrder(response.data);
  };
  const orderDelivered = async () => {
    try {
      const response = await updateOrder({
        _id: orderId,
        status: 'delivered'
      });
      setIsDelivered(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [isDelivered]);

  return (
    <div>
      <h1>Order details</h1>
      {order && (
        <div>
          <p>From: {order.store.name} Store | Address: ....</p>
          <p>To Deliver to: {order.user.name} | Address: ....</p>
          {order.products &&
            order.products.map(orderProduct => {
              return (
                <p key={orderProduct.product._id}>
                  <b>{orderProduct.product.name}</b> | {orderProduct.quantity} x{' '}
                  {orderProduct.product.price}€
                </p>
              );
            })}
          <p>
            <b>Total: {order.total}€</b>
          </p>
          <button
            onClick={() => {
              orderDelivered();
            }}
          >
            Delivered
          </button>
        </div>
      )}
      {isDelivered && (
        <div>
          <h3>
            Order Delivered!{' '}
            <Link to='/driver/orders'>Find a new Order to Deliver</Link>
          </h3>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
