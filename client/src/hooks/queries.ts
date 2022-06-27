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

const useGetClients = () => {
  const { data, loading, error } = useQuery(GET_CLIENTS);
  const { clients }: { clients: IClient[] } = data || [];

  return { loading, error, clients };
};

export { useGetClients, GET_CLIENTS };
