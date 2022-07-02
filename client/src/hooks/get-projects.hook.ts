import { gql, useQuery } from '@apollo/client';
import { IProject } from '../../../server/models/project';

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      status
    }
  }
`;

const useGetProjects = () => {
  const { data, loading, error } = useQuery(GET_PROJECTS);
  const { projects }: { projects: IProject[] } = data || [];

  return { loading, error, projects };
};

export { useGetProjects };
