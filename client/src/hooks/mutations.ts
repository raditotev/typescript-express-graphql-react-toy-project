import { gql, useMutation } from '@apollo/client';

import { IClient } from '../../../server/models/client';
import { GET_CLIENTS } from './queries';

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
    }
  }
`;

const useDeleteClient = ({ id }: { id: string }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id },
    // refetchQueries: ['GetClients'],
    update(cache, { data: { deleteClient } }) {
      cache.updateQuery({ query: GET_CLIENTS }, ({ clients }) => {
        return {
          clients: clients.filter(
            (client: IClient) => client.id !== deleteClient.id
          ),
        };
      });
    },
  });

  return { deleteClient };
};

export { useDeleteClient };
