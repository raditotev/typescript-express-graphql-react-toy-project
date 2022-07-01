import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

const OverlaySpinner = () => {
  return (
    <Flex justifyContent="center" alignItems="center" height="50vh">
      <Spinner size="xl" />
    </Flex>
  );
};

export default OverlaySpinner;
