import { useEffect, useState } from 'react';
import { getOrderByDriver } from '../api/order.api';
import { Link } from 'react-router-dom';

const DriverOrders = () => {
  const userId = localStorage.getItem('userId');
  const [orders, setOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);

  const fetchDriverOrders = async () => {
    try {
      const response = await getOrderByDriver(userId);
      console.log(response.data);

      const activeOrders = response.data.filter(
        order => order.status === 'delivering'
      );
      if (activeOrders.length) {
        setOrders(activeOrders);
      } else {
        setOrders(null);
      }
      // To render past orders
      const nonActiveOrders = response.data.filter(
        order => order.status === 'delivered'
      );
      setPastOrders(nonActiveOrders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDriverOrders();
  }, []);
  console.log(orders);
  return (
    <div>
      <h1>Driver Orders</h1>
      {orders && <h1>Open Orders</h1>}
      {orders &&
        orders.map(order => {
          return (
            <div key={order._id}>
              <Link to={`/driver/orders/${order._id}`}>
                <h3>
                  <u style={{ textTransform: 'capitalize', color: 'green' }}>
                    {order.status}
                  </u>{' '}
                  order for {order.user.name}
                </h3>
              </Link>

              <p>Order Details: </p>
              {order.products &&
                order.products.map(orderProduct => {
                  return (
                    <p key={orderProduct._id}>
                      <b>{orderProduct.product.name}</b> |{' '}
                      {orderProduct.quantity} x {orderProduct.product.price}€
                    </p>
                  );
                })}
              <p>
                <b>Total: {order.total}€</b>
              </p>
            </div>
          );
        })}
      {!orders && (
        <div>
          <h2>You don't have any open order! </h2>
        </div>
      )}
      <hr />
      {pastOrders && <h2>Past Orders</h2>}
      {pastOrders &&
        pastOrders.map(pastOrder => {
          return (
            <div key={pastOrder._id}>
              <h4>
                <u style={{ textTransform: 'capitalize', color: 'green' }}>
                  {pastOrder.status}
                </u>{' '}
                order from {pastOrder.store.name} store
              </h4>
              <p>Order Details: </p>
              {pastOrder.products &&
                pastOrder.products.map(orderProduct => {
                  return (
                    <p key={orderProduct._id}>
                      <b>{orderProduct.product.name}</b> |{' '}
                      {orderProduct.quantity} x {orderProduct.product.price}€
                    </p>
                  );
                })}
              <p>
                <b>Total: {pastOrder.total}€</b>
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default DriverOrders;
