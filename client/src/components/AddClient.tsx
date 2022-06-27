import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useAddClient } from '../hooks/mutations';

interface AddClientProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddClient: React.FC<AddClientProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { addClient } = useAddClient({ name, email, phone });

  const clickHandler = () => {
    addClient();

    setName('');
    setEmail('');
    setPhone('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Client</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={(e) => e.preventDefault()}>
            <FormControl as="fieldset">
              <FormLabel htmlFor="name">Name address</FormLabel>
              <Input
                id="name"
                type="name"
                value={name}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setName(e.currentTarget.value)
                }
              />
            </FormControl>
            <FormControl as="fieldset">
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setEmail(e.currentTarget.value)
                }
              />
            </FormControl>
            <FormControl as="fieldset">
              <FormLabel htmlFor="phone">Phone number</FormLabel>
              <Input
                id="phone"
                type="phone"
                value={phone}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setPhone(e.currentTarget.value)
                }
              />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="pink" onClick={clickHandler}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddClient;
