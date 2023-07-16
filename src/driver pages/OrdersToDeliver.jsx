import { useEffect, useState } from 'react';
import { getOrderStatus, updateOrder } from '../api/order.api';

const OrdersToDeliver = () => {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const response = await getOrderStatus('ready');
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptOrder = orderId => {
    try {
      const response = updateOrder({ _id: orderId, status: 'delivering' });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div>
      <h1>Orders to Deliver</h1>
      {orders &&
        orders.map(order => {
          return (
            <div key={order._id}>
              <h3>Store: {order.store.name}</h3>
              <p>Store Address:</p>
              <p>To Deliver Address: </p>
              <button
                onClick={() => {
                  acceptOrder(order._id);
                }}
              >
                Accept Order
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default OrdersToDeliver;
