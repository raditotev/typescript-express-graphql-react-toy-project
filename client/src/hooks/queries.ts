import { gql, useQuery } from '@apollo/client';

import { IClient } from '../../../server/models/client';
import { IProject } from '../../../server/models/project';

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

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

const useGetClients = () => {
  const { data, loading, error } = useQuery(GET_CLIENTS);
  const { clients }: { clients: IClient[] } = data || [];

  return { loading, error, clients };
};

const useGetProjects = () => {
  const { data, loading, error } = useQuery(GET_PROJECTS);
  const { projects }: { projects: IProject[] } = data || [];

  return { loading, error, projects };
};

export { useGetClients, useGetProjects };
