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
      status
    }
  }
`;

const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      name
      description
      status
      client {
        name
        email
        phone
      }
    }
  }
`;

interface ProjectProps extends IProject {
  client: IClient;
}

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

const useGetSingleProject = ({ id }: { id: string | undefined }) => {
  const { data, loading, error } = useQuery<{ project: ProjectProps }>(
    GET_PROJECT,
    {
      variables: { id },
    }
  );
  const { project } = data || { project: null };

  return { loading, error, project };
};

export { useGetClients, useGetProjects, useGetSingleProject };
