import AddStore from './AddStore';
import { getStore } from '../api/stores.api';
import { useState, useEffect } from 'react';
import { getUser } from '../api/auth.api';
import CreateProduct from './CreateProduct';
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
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Icon
} from '@chakra-ui/react';
import StoreProductCard from '../components/MyStoreProductCard';
import StoreOrders from './StoreOrders';
import UpdateStore from '../components/UpdateStoreForm';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const MyStore = () => {
  const [myStore, setMyStore] = useState('');
  const userId = localStorage.getItem('userId');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentTab, setCurrentTab] = useState('products');

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
  }, [currentTab]);

  return (
    <Stack>
      {myStore && <Heading p={6}>{myStore.name}</Heading>}

      <Tabs
        isFitted
        variant='solid-rounded'
        colorScheme='green'
      >
        <TabList mb='1em'>
          <Tab
            onClick={() => {
              setCurrentTab('products');
            }}
          >
            Products
          </Tab>
          <Tab
            onClick={() => {
              setCurrentTab('orders');
            }}
          >
            Orders
          </Tab>
          <Tab
            onClick={() => {
              setCurrentTab('updateStore');
            }}
          >
            Update Store Details
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box>
              <Button
                bg={'green.500'}
                color={'white'}
                _hover={{
                  bg: 'green.700'
                }}
                leftIcon={<Icon as={AiOutlinePlusCircle} />}
                onClick={onOpen}
              >
                Add a new Product
              </Button>
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
                    </Container>
                  );
                })}
            </SimpleGrid>{' '}
          </TabPanel>
          <TabPanel>
            <StoreOrders storeId={myStore._id} />
          </TabPanel>
          <TabPanel>
            <UpdateStore
              storeId={myStore._id}
              refreshStores={fetchStore}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {!myStore && <AddStore />}
    </Stack>
  );
};

export default MyStore;
