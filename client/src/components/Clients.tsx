import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { IClient } from '../../../server/models/client';

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
    <ul>
      {data.clients.map((client: IClient) => (
        <li key={client.id}>
          {client.name} - {client.email} - {client.phone}
        </li>
      ))}
    </ul>
  );
};

export default Clients;
