import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { useAddClient } from '../hooks/mutations';
import ClientForm from './ClientForm';

interface AddClientProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddClient: React.FC<AddClientProps> = ({ isOpen, onClose }) => {
  const { addClient } = useAddClient({ name: '', email: '', phone: '' });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Client</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ClientForm submitHandler={addClient} closeModal={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddClient;
