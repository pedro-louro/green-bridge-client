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
  HStack
} from '@chakra-ui/react';
import { MdLocationOn } from 'react-icons/md';
import { toast } from 'react-toastify';

const StoreDetails = () => {
  const [store, setStore] = useState(null);
  const { storeId } = useParams();
  const [orderDetails, setOrderDetails] = useState('');
  const userId = localStorage.getItem('userId');
  const orderId = localStorage.getItem('orderId');
  const [storeAddress, setStoreAddress] = useState('');

  const fetchStore = async storeId => {
    try {
      const response = await getStore(storeId);
      setStore(response.data);
      getAddress(response.data.address);
    } catch (error) {
      console.log('Something went wrong fetching the Store', error);
    }
  };

  const handleOrder = async product => {
    if (!orderId) {
      try {
        const response = await addOrder({
          products: { product: product._id, quantity: 1 },
          status: 'cart',
          user: userId,
          store: storeId
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
      } catch (error) {
        console.log(error);
      }
    }
  };

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
            return (
              <ProductCard
                key={product._id}
                product={product}
                handleOrder={handleOrder}
              />
            );
          })}
      </SimpleGrid>
    </div>
  );
};

export default StoreDetails;
