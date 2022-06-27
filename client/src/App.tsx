import React from 'react';
import Header from './components/Header';
import Clients from './components/Clients';
import { Container } from '@chakra-ui/react';

function App() {
  return (
    <Container centerContent minWidth="80vw">
      <Header />
      <Clients />
    </Container>
  );
}

export default App;
