import AddStore from './AddStore';
import { getStore } from '../api/stores.api';
import { useState, useEffect } from 'react';
import { getUser } from '../api/auth.api';
import CreateProduct from './CreateProduct';
import { updateProduct } from '../api/product.api';
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
  Avatar,
  HStack,
  VStack,
  Spinner,
  AbsoluteCenter
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
      // update product status to "delete" to soft delete the product
      await updateProduct({ _id: productId, status: 'deleted' });
      await fetchStore();
      console.log(myStore);
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
      {!fetchedStore && (
        <AbsoluteCenter>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='#2F8559'
            size='xl'
          />
        </AbsoluteCenter>
      )}

      <Stack>
        {myStore && (
          <VStack>
            <HStack
              pt={8}
              pb={2}
            >
              <Avatar
                src={myStore.img}
                size={'lg'}
              />
              <Heading p={6}>{myStore.name}</Heading>
            </HStack>
          </VStack>
        )}
        {myStore && (
          <Tabs
            isFitted
            variant='enclosed-colored'
            colorScheme='green'
          >
            <TabList mb='1em'>
              <Tab
                bg={'#fcfadb'}
                color={'black'}
                _selected={{
                  color: 'black',
                  bg: '#F2B13A',
                  boxShadow: '2xl',
                  fontWeight: 'bold'
                }}
                onClick={() => {
                  setCurrentTab('products');
                }}
              >
                Products
              </Tab>
              <Tab
                bg={'#fcfadb'}
                color={'black'}
                _selected={{
                  color: 'black',
                  bg: '#F2B13A',
                  boxShadow: '2xl',
                  fontWeight: 'bold'
                }}
                onClick={() => {
                  setCurrentTab('orders');
                }}
              >
                Orders
              </Tab>
              <Tab
                bg={'#fcfadb'}
                color={'black'}
                _selected={{
                  color: 'black',
                  bg: '#F2B13A',
                  boxShadow: '2xl',
                  fontWeight: 'bold'
                }}
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
                  spacing={5}
                  columns={[1, null, 2, null, 3]}
                  bg='#f2efda'
                  p={'5%'}
                  pl={'10%'}
                  pr={'10%'}
                  minW={'240px'}
                  h='100%'
                >
                  {myStore &&
                    myStore.products.map(product => {
                      if (product.status !== 'deleted') {
                        return (
                          <Container key={product._id}>
                            <StoreProductCard
                              product={product}
                              removeProduct={removeProduct}
                            />
                          </Container>
                        );
                      }
                    })}
                </SimpleGrid>
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
