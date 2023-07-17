import { useEffect, useState } from 'react';
import { getOrderStatus, updateOrder } from '../api/order.api';
import { useNavigate } from 'react-router-dom';

const OrdersToDeliver = () => {
  const [orders, setOrders] = useState(null);
  const userId = localStorage.getItem('userId');
  const [numOrders, setNumOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await getOrderStatus('ready');
      if (response.data.length) {
        setOrders(response.data);
        setNumOrders(response.data.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const acceptOrder = async orderId => {
    try {
      const response = await updateOrder({
        _id: orderId,
        status: 'delivering',
        driver: userId
      });

      setNumOrders(prevNum => prevNum - 1);
      navigate(`/driver/orders/${orderId}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [numOrders]);
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
      {!orders && (
        <h2>There are not orders ready for delivering at the moment.</h2>
      )}
    </div>
  );
};

export default OrdersToDeliver;
