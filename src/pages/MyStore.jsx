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
  Icon,
  Avatar
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
  const [fetchedStore, setFectchedStore] = useState(false);

  //related to user
  const fetchStore = async () => {
    try {
      const fetchUser = await getUser(userId);
      const response = await getStore(fetchUser.data.store);
      setMyStore(response.data);
      setFectchedStore(true);
    } catch (error) {
      console.log('Error getting the Store');
      setFectchedStore(true);
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
    <div>
      <Box h={'50px'}></Box>

      <Stack>
        {myStore && (
          <Heading p={6}>
            <Avatar
              src={myStore.img}
              size={'lg'}
            />{' '}
            {myStore.name}
          </Heading>
        )}
        {myStore && (
          <Tabs
            isFitted
            variant='enclosed-colored'
            colorScheme='green'
          >
            <TabList mb='1em'>
              <Tab
                _selected={{ color: 'white', bg: 'green.500' }}
                onClick={() => {
                  setCurrentTab('products');
                }}
              >
                Products
              </Tab>
              <Tab
                _selected={{ color: 'white', bg: 'green.500' }}
                onClick={() => {
                  setCurrentTab('orders');
                }}
              >
                Orders
              </Tab>
              <Tab
                _selected={{ color: 'white', bg: 'green.500' }}
                onClick={() => {
                  setCurrentTab('updateStore');
                }}
              >
                Update Store Details
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box pb={5}>
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
                  spacing={3}
                  columns={[1, null, 2, null, 3]}
                  bg='#ebf2e8'
                  p={'5%'}
                  minW={'240px'}
                  h='100%'
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
        )}

        {!myStore && fetchedStore && <AddStore refreshStore={fetchStore} />}
      </Stack>
    </div>
  );
};

export default MyStore;
