import { useEffect, useState } from 'react';
import { getOrderByUser } from '../api/order.api';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const userId = localStorage.getItem('userId');
  const [pastOrders, setPastOrders] = useState([]);
  const [orders, setOrders] = useState(null);

  const fetchUserOrders = async () => {
    try {
      const response = await getOrderByUser(userId);

      // TO render ongoing orders
      const activeOrders = response.data.filter(
        order =>
          order.status === 'new' ||
          order.status === 'preparing' ||
          order.status === 'ready' ||
          order.status === 'delivering'
      );
      if (activeOrders.length) {
        setOrders(activeOrders);
      } else {
        setOrders(null);
      }
      // To render past orders
      const nonActiveOrders = response.data.filter(
        order => order.status === 'delivered' || order.status === 'canceled'
      );
      setPastOrders(nonActiveOrders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [orders]);

  return (
    <div>
      {orders && <h1>Open Order</h1>}
      {orders &&
        orders.map(order => {
          return (
            <div key={order._id}>
              <h3>
                <u style={{ textTransform: 'capitalize', color: 'green' }}>
                  {order.status}
                </u>{' '}
                order from {order.store.name} store
              </h3>
              <p>Order Details: </p>
              {order.products &&
                order.products.map(orderProduct => {
                  return (
                    <p key={orderProduct.product._id}>
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
          <Link to={'/stores/'}>Find you Favorite Plants Store!</Link>
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
                    <p key={orderProduct.product._id}>
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

export default MyOrders;