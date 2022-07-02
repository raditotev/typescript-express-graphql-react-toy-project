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

import { useGetClients } from '../hooks/get-clients.hook';
import ClientRow from './ClientRow';
import NotFound from './NotFound';

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

  if (clients.length === 0) return <NotFound message="No clients found" />;

  return (
    <TableContainer my={10}>
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
