import React from 'react';
import { Container, Heading } from '@chakra-ui/react';

import ProjectForm from '../components/ProjectForm';

const NewProjectPage = () => {
  return (
    <Container>
      <Heading textAlign="center">Create new project</Heading>
      <ProjectForm />
    </Container>
  );
};

export default NewProjectPage;
