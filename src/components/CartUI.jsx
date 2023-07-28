import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Icon
} from '@chakra-ui/react';
import { useRef } from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import Checkout from '../pages/Checkout';

const Cart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const handleOpenClose = command => {
    if (command === 'close') {
      return onClose;
    }
    if (command === 'open') {
      return onOpen;
    }
  };
  return (
    <>
      <Button
        ref={btnRef}
        bg='#F2B13A'
        _hover={{
          bg: '#fcfadb'
        }}
        onClick={onOpen}
        variant={'solid'}
        size={'sm'}
        mr={4}
        leftIcon={<Icon as={TiShoppingCart} />}
      >
        Cart
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg='#f2efda'>
            <Icon as={TiShoppingCart} /> Your Cart
          </DrawerHeader>

          <DrawerBody bg='#f2efda'>
            <Checkout handleOpenClose={handleOpenClose} />
          </DrawerBody>

          <DrawerFooter bg='#f2efda'>
            <Button
              variant='solid-rounded'
              mr={3}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.700'
              }}
              onClick={onClose}
            >
              Close Cart
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default Cart;
