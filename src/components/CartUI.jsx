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
  console.log(isOpen);

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
        colorScheme='teal'
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
          <DrawerHeader>
            <Icon /> Your Cart
          </DrawerHeader>

          <DrawerBody>
            <Checkout handleOpenClose={handleOpenClose} />
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant='outline'
              mr={3}
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
