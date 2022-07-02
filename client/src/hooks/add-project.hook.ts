import { gql, useMutation } from '@apollo/client';

const ADD_PROJECT = gql`
  mutation (
    $name: String!
    $description: String!
    $status: ProjectStatus!
    $client: ID!
  ) {
    addProject(
      name: $name
      description: $description
      status: $status
      client: $client
    ) {
      id
      name
      description
      status
      client {
        id
      }
    }
  }
`;

const useAddProject = ({
  name,
  description,
  status,
  client,
}: {
  name: string;
  description: string;
  status: string;
  client: string;
}) => {
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name,
      description,
      status,
      client,
    },
    update(cache, { data: { addProject } }) {
      cache.modify({
        fields: {
          projects: (projects) => [...projects, addProject],
        },
      });
    },
    optimisticResponse({ name, description, status, client }) {
      return {
        __typename: 'Mutation',
        addProject: {
          __typename: 'Project',
          id: String(Math.random()),
          name,
          description,
          status,
          client: {
            __typename: 'Client',
            id: client,
          },
        },
      };
    },
  });

  return { addProject };
};

export { useAddProject };
