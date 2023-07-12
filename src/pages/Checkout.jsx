import { useParams } from 'react-router-dom';
import { getOrder } from '../api/order.api';
import { useEffect, useState } from 'react';

const Checkout = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);

  const fetchOrder = async () => {
    const response = await getOrder(orderId);
    setOrder(response.data);
    setProducts(response.data.products);
    console.log(products);
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div>
      <h2>My Cart</h2>
      {products &&
        products.map(product => {
          return (
            <div key={product._id}>
              <p>
                {product.name} {product.price}€
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default Checkout;
