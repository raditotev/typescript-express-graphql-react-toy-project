import { gql, useMutation } from '@apollo/client';

import { IClient } from '../../../server/models/client';

const DELETE_CLIENT = gql`
  mutation ($id: ID!) {
    deleteClient(id: $id) {
      id
    }
  }
`;

const ADD_CLIENT = gql`
  mutation ($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

const useDeleteClient = ({ id }: { id: string }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id },
    // refetchQueries: ['GetClients'],
    update(cache, { data: { deleteClient } }) {
      cache.modify({
        fields: {
          clients: (clients) =>
            clients.filter((client: IClient) => client.id !== deleteClient.id),
        },
      });
    },
  });

  return { deleteClient };
};

const useAddClient = ({
  name,
  email,
  phone,
}: {
  name: string;
  email: string;
  phone: string;
}) => {
  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      cache.modify({
        fields: {
          clients: (clients) => [...clients, addClient],
        },
      });
    },
  });

  return { addClient };
};

export { useDeleteClient, useAddClient };
