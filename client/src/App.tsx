import React from 'react';
import Header from './components/Header';
import Clients from './components/Clients';
import { Container, Button, useDisclosure } from '@chakra-ui/react';
import AddClient from './components/AddClient';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Container centerContent minWidth="80vw">
      <Header />
      <Button onClick={onOpen} my={10}>
        Add Client
      </Button>
      <AddClient isOpen={isOpen} onClose={onClose} />
      <Clients />
    </Container>
  );
}

export default App;
