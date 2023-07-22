import { Link, useParams } from 'react-router-dom';
import { getStore } from '../api/stores.api';
import { useEffect, useRef, useState } from 'react';
import UpdateOrderModal from '../components/UpdateOrderModal';
import { updateOrder } from '../api/order.api';

const StoreOrders = ({ storeId }) => {
  // const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [orders, setOrders] = useState(null);
  const [pastOrders, setPastOrders] = useState(null);
  const [statusChanged, setStatusChanged] = useState(false);

  const fetchStore = async () => {
    if (storeId) {
      try {
        const response = await getStore(storeId);
        setStore(response.data);

        const activeOrders = response.data.orders.filter(
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
        const nonActiveOrders = response.data.orders.filter(
          order => order.status === 'delivered' || order.status === 'canceled'
        );
        setPastOrders(nonActiveOrders);
        setStatusChanged(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const refreshStores = () => {
    setStatusChanged(true);
  };

  const changeOrderStatus = (orderId, newStatus) => {
    try {
      const response = updateOrder({ _id: orderId, status: newStatus });
    } catch (error) {
      console.log(error);
    }
  };

  const getProductName = productId => {
    const product = store.products.filter(
      element => element._id.toString() === productId.toString()
    );
    return product[0].name;
  };

  useEffect(() => {
    fetchStore();
  }, [statusChanged, storeId]);
  return (
    <div>
      {orders && <h1>Open Orders</h1>}
      {orders &&
        orders.map(order => {
          return (
            <div key={order._id}>
              <h3>
                <u style={{ textTransform: 'capitalize', color: 'green' }}>
                  {order.status}
                </u>{' '}
                order
              </h3>

              <UpdateOrderModal
                orderDetails={order}
                updateStatus={changeOrderStatus}
                refreshStores={refreshStores}
              />
              <p>Order Details: </p>
              {order.products &&
                order.products.map(orderProduct => {
                  return (
                    <p key={orderProduct._id}>
                      <b>{getProductName(orderProduct.product)}</b> |{' '}
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
                      <b>{getProductName(orderProduct.product)}</b> |{' '}
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

export default StoreOrders;
