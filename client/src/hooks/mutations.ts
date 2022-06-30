import { gql, useMutation } from '@apollo/client';

import { IProject } from '../../../server/models/project';

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

const DELETE_PROJECT = gql`
  mutation ($id: ID!) {
    deleteProject(id: $id) {
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

const useDeleteProject = ({ id }: { id: string }) => {
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id },
    // refetchQueries: ['GetProjects'],
    update(cache, { data: { deleteProject } }) {
      cache.modify({
        fields: {
          projects: (projects) =>
            projects.filter(
              (project: IProject) => project.id !== deleteProject.id
            ),
        },
      });
    },
    optimisticResponse({ id }) {
      return {
        __typename: 'Mutation',
        deleteProject: {
          __typename: 'Project',
          id,
        },
      };
    },
  });

  return { deleteProject };
};

export { useDeleteClient, useAddClient, useAddProject, useDeleteProject };
