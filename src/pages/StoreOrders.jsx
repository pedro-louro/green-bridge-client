import { Link, useParams } from 'react-router-dom';
import { getStore } from '../api/stores.api';
import { useEffect, useState } from 'react';

const StoreOrders = () => {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [orders, SetOrders] = useState(null);
  const [pastOrders, setPastOrders] = useState(null);

  const fetchStore = async () => {
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
        SetOrders(activeOrders);
      } else {
        setOrders(null);
      }
      // To render past orders
      const nonActiveOrders = response.data.orders.filter(
        order => order.status === 'delivered' || order.status === 'canceled'
      );
      setPastOrders(nonActiveOrders);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductName = productId => {
    const product = store.products.filter(
      element => element._id.toString() === productId.toString()
    );
    console.log(product);
    return product[0].name;
  };
  useEffect(() => {
    fetchStore();
  }, []);

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

export default StoreOrders;
