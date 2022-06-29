import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, useDisclosure } from '@chakra-ui/react';

import AddClient from '../components/AddClient';
import Projects from '../components/Projects';
import Clients from '../components/Clients';

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Stack direction="row" spacing={4} align="center">
        <Button onClick={onOpen} my={10}>
          Add Client
        </Button>
        <Button>
          <Link to="projects/new">Add Project</Link>
        </Button>
      </Stack>
      <AddClient isOpen={isOpen} onClose={onClose} />
      <Projects />
      <Clients />
    </>
  );
};

export default HomePage;
