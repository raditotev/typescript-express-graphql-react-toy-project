import { gql, useMutation } from '@apollo/client';

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
    optimisticResponse({ name, email, phone }) {
      return {
        __typename: 'Mutation',
        addClient: {
          __typename: 'Client',
          id: String(Math.random()),
          name,
          email,
          phone,
        },
      };
    },
  });

  return { addClient };
};

export { useAddClient };
