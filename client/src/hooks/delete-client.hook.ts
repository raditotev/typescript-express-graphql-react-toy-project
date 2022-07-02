import { gql, useMutation } from '@apollo/client';

export const DELETE_CLIENT = gql`
  mutation ($id: ID!) {
    deleteClient(id: $id) {
      id
    }
  }
`;

const useDeleteClient = ({ id }: { id: string }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id },
    refetchQueries: ['GetClients', 'GetProjects'],
  });

  return { deleteClient };
};

export { useDeleteClient };
