import { useEffect, useState } from 'react';
import { getOrderStatus, updateOrder } from '../api/order.api';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../api/auth.api';
import AddressSearchBar from '../components/AddressSearchBar';

const OrdersToDeliver = () => {
  const [orders, setOrders] = useState(null);
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState(null);
  const [numOrders, setNumOrders] = useState([]);
  const [address, setAddress] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState('');
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
  const fetchUser = async () => {
    const userDetails = await getUser(userId);
    setUser(userDetails.data);
  };
  const handleAddress = coordinates => {
    setAddress(coordinates);
  };

  //Functions to calculate the distance between two coordinates

  // Convert from degrees to radians
  const degreesToRadians = degrees => {
    const radians = (degrees * Math.PI) / 180;
    return radians;
  };

  // Function takes two objects, that contain coordinates to a starting and destination location.
  const calcDistance = (startingCoords, destinationCoords) => {
    const startingLat = degreesToRadians(startingCoords.lat);
    const startingLong = degreesToRadians(startingCoords.lng);
    const destinationLat = degreesToRadians(destinationCoords.lat);
    const destinationLong = degreesToRadians(destinationCoords.lng);

    // Radius of the Earth in kilometers
    const radius = 6571;

    // Haversine equation
    const distanceInKilometers =
      Math.acos(
        Math.sin(startingLat) * Math.sin(destinationLat) +
          Math.cos(startingLat) *
            Math.cos(destinationLat) *
            Math.cos(startingLong - destinationLong)
      ) * radius;
    return Math.floor(distanceInKilometers);
  };

  useEffect(() => {
    fetchOrders();
    fetchUser();
  }, [numOrders]);

  // Sort orders to get closests first
  if (orders && address) {
    orders.sort(
      (a, b) =>
        calcDistance(a.store.address, address) -
        calcDistance(b.store.address, address)
    );
  }

  return (
    <div>
      <h1>Orders to Deliver</h1>{' '}
      <Link to='/driver/myorders'>
        <button>My orders</button>
      </Link>
      <AddressSearchBar
        handleAddress={handleAddress}
        currentAddress={formattedAddress}
      />
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
