import { gql, useQuery } from '@apollo/client';
import { IClient } from '../../../server/models/client';
import { IProject } from '../../../server/models/project';

interface ProjectProps extends IProject {
  client: IClient;
}

const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
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

export { useGetSingleProject };
