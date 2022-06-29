import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';

import AddClient from '../components/AddClient';
import Projects from '../components/Projects';
import Clients from '../components/Clients';

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} my={10}>
        Add Client
      </Button>
      <AddClient isOpen={isOpen} onClose={onClose} />
      <Projects />
      <Clients />
    </>
  );
};

export default HomePage;
