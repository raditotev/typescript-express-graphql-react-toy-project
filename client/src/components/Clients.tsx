import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Table, Thead, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react';

import { IClient } from '../../../server/models/client';
import ClientRow from './ClientRow';

const GET_CLIENTS = gql`
  query GetClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

const Clients = () => {
  const { data, loading, error } = useQuery(GET_CLIENTS);

  if (loading) return <p>Loading...</p>;
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
          {data.clients.map((client: IClient) => (
            <ClientRow key={client.id} client={client} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Clients;
