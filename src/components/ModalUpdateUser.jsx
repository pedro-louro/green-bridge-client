import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from '@chakra-ui/react';
import UpdateUser from './FormUpdateUser';

const OpenModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <p onClick={onOpen}>Trigger modal</p>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          {/* <ModalBody> */}
          <UpdateUser />
          {/* </ModalBody> */}
        </ModalContent>
      </Modal>
    </>
  );
};
export default OpenModal;
