import { useParams } from 'react-router-dom';
import { getOrder } from '../api/order.api';
import { useEffect, useState } from 'react';

const Checkout = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchOrder = async () => {
    const response = await getOrder(orderId);
    setOrder(response.data);
    setProducts(response.data.products);

    const calcTotal = response.data.products.reduce((acc, curr) => {
      return acc + curr.quantity * curr.product.price;
    }, 0);
    setTotal(calcTotal);
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div>
      <h2>My Cart</h2>
      {products &&
        products.map(productInCart => {
          return (
            <div key={productInCart._id}>
              <p>
                <b>{productInCart.product.name}</b> | {productInCart.quantity} x{' '}
                {productInCart.product.price}€
              </p>
            </div>
          );
        })}
      <p>
        <b>Total: {total}€</b>
      </p>
    </div>
  );
};

export default Checkout;
