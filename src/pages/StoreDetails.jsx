import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStore } from '../api/stores.api';
import { addOrder, getOrder, updateOrder } from '../api/order.api';
import ProductCard from '../components/ProductCard';
import {
  SimpleGrid,
  Heading,
  Avatar,
  Box,
  VStack,
  Text,
  Icon,
  HStack,
  calc
} from '@chakra-ui/react';
import { MdLocationOn } from 'react-icons/md';
import { toast } from 'react-toastify';
import { getUser } from '../api/auth.api';

const StoreDetails = () => {
  const [store, setStore] = useState(null);
  const { storeId } = useParams();
  const [orderDetails, setOrderDetails] = useState('');
  const userId = localStorage.getItem('userId');
  const orderId = localStorage.getItem('orderId');
  const [storeAddress, setStoreAddress] = useState('');
  const [user, setUser] = useState('');

  const fetchStore = async storeId => {
    try {
      const response = await getStore(storeId);
      setStore(response.data);
      getAddress(response.data.address);
    } catch (error) {
      console.log('Something went wrong fetching the Store', error);
    }
  };
  const fetchUser = async () => {
    const response = await getUser(userId);
    setUser(response.data);
  };

  const handleOrder = async product => {
    const distance = calcDistance(store.address, user.address);
    let shipping = 0;

    // Calculate the shipping cost
    if (distance < 11) {
      shipping = 1;
    } else if (distance >= 11 && distance < 21) {
      shipping = 2;
    } else if (distance >= 21 && distance < 31) {
      shipping = 4;
    } else if (distance >= 31 && distance < 41) {
      shipping = 5;
    } else if (distance >= 41 && distance < 51) {
      shipping = 7;
    } else {
      shipping = 10;
    }

    if (!orderId) {
      try {
        const response = await addOrder({
          products: { product: product._id, quantity: 1 },
          status: 'cart',
          user: userId,
          store: storeId,
          shipping: shipping
        });
        localStorage.setItem('orderId', response.data._id);
        toast.success('Product added to cart!', {
          position: 'top-center',
          autoClose: 3000
        });

        setOrderDetails(response.data);
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong', {
          position: 'top-center',
          autoClose: 3000
        });
      }
    } else {
      try {
        const fetchOder = await getOrder(orderId);
        const orderProducts = fetchOder.data.products;

        let productExists = orderProducts.filter(
          current => current.product._id === product._id
        );
        let productToAdd = {};

        if (productExists.length) {
          productToAdd.product = productExists[0].product._id;
          productToAdd.quantity = productExists[0].quantity + 1;
        } else {
          productToAdd.product = product._id;
          productToAdd.quantity = 1;
        }

        const addToOrder = await updateOrder({
          _id: orderId,
          products: productToAdd,
          status: 'cart'
        });
        setOrderDetails(addToOrder.data);
        toast.success('Product added to cart!', {
          position: 'top-center',
          autoClose: 3000
        });
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong', {
          position: 'top-center',
          autoClose: 3000
        });
      }
    }
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

  //Get Human readable address
  const getAddress = async coordinates => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        coordinates.lat
      },${coordinates.lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API}`
    )
      .then(response => response.json())
      .then(responseJSON => {
        setStoreAddress(responseJSON.results[0].formatted_address.toString());
      });
  };

  useEffect(() => {
    fetchStore(storeId);
    fetchUser();
  }, []);

  return (
    <div>
      <Box h={'50px'}></Box>

      {store && (
        <VStack>
          <HStack
            pt={8}
            pb={2}
          >
            <Avatar
              src={store.img}
              size={'lg'}
            />
            <Heading>{store.name}</Heading>
          </HStack>
          <Text color={'gray.700'}>
            <Icon as={MdLocationOn} /> {storeAddress}
          </Text>
        </VStack>
      )}
      <SimpleGrid
        spacingX={'1%'}
        spacingY={'30%'}
        columns={[1, null, 2, null, 3]}
        p={'5%'}
        minW={'240px'}
        h='100%'
      >
        {store &&
          store.products.map(product => {
            if (product.status !== 'deleted') {
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  handleOrder={handleOrder}
                />
              );
            }
          })}
      </SimpleGrid>
    </div>
  );
};

export default StoreDetails;
