import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

const NotFound: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      my={25}
    >
      <Heading fontSize="xl" color="#df3ca6">
        {message}
      </Heading>
    </Flex>
  );
};

export default NotFound;
