import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Spinner,
} from '@chakra-ui/react';

import { useGetClients } from '../hooks/queries';
import ClientRow from './ClientRow';

const Clients = () => {
  const { clients, loading, error } = useGetClients();

  if (loading) return <Spinner size="xl" />;
  if (error)
    return (
      <p>
        Error :<br />
        <pre>{error.message}</pre>
      </p>
    );

  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>E-mail</Th>
            <Th>Phone</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {clients.map((client) => (
            <ClientRow key={client.id} client={client} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Clients;
