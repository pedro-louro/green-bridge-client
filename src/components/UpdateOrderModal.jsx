import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Select
} from '@chakra-ui/react';
import { useState } from 'react';

function UpdateOrderModal({ orderDetails, updateStatus, refreshStores }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status, setStatus] = useState(orderDetails.status);

  return (
    <>
      <Button
        color={'white'}
        bg={'green.500'}
        _hover={{
          bg: 'green.700'
        }}
        onClick={onOpen}
      >
        Change Order Status
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              placeholder={orderDetails.status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value='preparing'>Preparing</option>
              <option value='ready'>Ready For Delivering</option>
              <option value='canceled'>Cancel</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant='solid'
              color={'white'}
              bg={'green.500'}
              _hover={{
                bg: 'green.700'
              }}
              onClick={() => {
                updateStatus(orderDetails._id, status);
                onClose();
                refreshStores();
              }}
            >
              Update Order
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateOrderModal;
