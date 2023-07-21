import AddStore from './AddStore';
import { getStore } from '../api/stores.api';
import { useState, useEffect } from 'react';
import { getUser } from '../api/auth.api';
import CreateProduct from './CreateProduct';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../api/product.api';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Container,
  SimpleGrid,
  Box,
  Stack,
  Heading
} from '@chakra-ui/react';
import StoreProductCard from '../components/MyStoreProductCard';

const MyStore = () => {
  const [myStore, setMyStore] = useState('');
  const userId = localStorage.getItem('userId');
  const { isOpen, onOpen, onClose } = useDisclosure();

  //related to user
  const fetchStore = async () => {
    try {
      const fetchUser = await getUser(userId);
      const response = await getStore(fetchUser.data.store);
      setMyStore(response.data);
    } catch (error) {
      console.log('Error getting the Store');
    }
  };
  const removeProduct = async productId => {
    try {
      await deleteProduct(productId);
      await fetchStore();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  return (
    <Stack>
      {myStore && <Heading>{myStore.name}</Heading>}
      <hr />
      <Box>
        <Button onClick={onOpen}>Add a new Product</Button>
        <Modal
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CreateProduct
                refreshStores={fetchStore}
                myStore={myStore}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Link to={`/mystore/${myStore._id}/orders`}>
          <button>Store Orders</button>
        </Link>
      </Box>
      <SimpleGrid
        spacing={4}
        templateColumns='repeat(3, minmax(200px, 1fr))'
      >
        {myStore &&
          myStore.products.map(product => {
            return (
              <Container key={product._id}>
                <StoreProductCard
                  product={product}
                  removeProduct={removeProduct}
                />
                {/* <button
                  onClick={() => {
                    removeProduct(product._id);
                  }}
                >
                  Delete Product
                </button> */}
              </Container>
            );
          })}
      </SimpleGrid>
      {!myStore && <AddStore />}
    </Stack>
  );
};

export default MyStore;
