import React from 'react';
import { Tr, Td, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { useDeleteClient } from '../hooks/mutations';
import { IClient } from '../../../server/models/client';

interface ClientRowProps {
  client: IClient;
}

const ClientRow: React.FC<ClientRowProps> = ({ client }) => {
  const { id, name, email, phone } = client;
  const { deleteClient } = useDeleteClient({ id });

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
          onClick={() => deleteClient()}
        />
      </Td>
    </Tr>
  );
};

export default ClientRow;
