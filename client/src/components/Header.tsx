import React from 'react';
import { Flex, Heading, Image } from '@chakra-ui/react';

import logo from '../assets/logo.png';

const Header: React.FC = () => {
  return (
    <Flex alignItems="center" height="40px" gap="10px" mb="3rem">
      <Image src={logo} alt="Logo" boxSize="30px" />
      <Heading fontSize="20px" color="#df3ca6">
        ProjectManagement
      </Heading>
    </Flex>
  );
};

export default Header;
