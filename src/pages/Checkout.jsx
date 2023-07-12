import { useParams } from 'react-router-dom';

const Checkout = () => {
  const { storeId } = useParams;

  return (
    <div>
      Checkout
      {/* {cart &&
        cart.map(product => {
          return (
            <div>
              <p>{product.name}</p>
            </div>
          );
        })} */}
    </div>
  );
};

export default Checkout;
