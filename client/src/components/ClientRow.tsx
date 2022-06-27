import React from 'react';
import { Tr, Td, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { IClient } from '../../../server/models/client';

interface ClientRowProps {
  client: IClient;
}

const ClientRow: React.FC<ClientRowProps> = ({ client }) => {
  const { name, email, phone } = client;
  return (
    <Tr>
      <Td>{name}</Td>
      <Td>{email}</Td>
      <Td>{phone}</Td>
      <Td>
        <IconButton
          variant="outline"
          colorScheme="red"
          aria-label="Delete client"
          size="sm"
          icon={<DeleteIcon />}
        />
      </Td>
    </Tr>
  );
};

export default ClientRow;
