import { gql, useMutation } from '@apollo/client';
import { IProject } from '../../../server/models/project';

const UPDATE_PROJECT = gql`
  mutation (
    $id: ID!
    $name: String!
    $description: String!
    $status: ProjectStatusUpdate!
    $client: ID!
  ) {
    updateProject(
      id: $id
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

const useUpdateProject = ({
  id,
  name,
  description,
  status,
  client,
}: {
  id: string;
  name: string;
  description: string;
  status: string;
  client: string;
}) => {
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id,
      name,
      description,
      status,
      client,
    },
    // refetchQueries: ['GetProjects', 'GetClients'],
    update(cache, { data: { updateProject } }) {
      cache.modify({
        fields: {
          projects: (projects) =>
            projects.map((project: IProject) =>
              project.id === updateProject.id
                ? { ...project, ...updateProject }
                : project
            ),
        },
      });
    },
    optimisticResponse({ name, description, status, client }) {
      return {
        __typename: 'Mutation',
        updateProject: {
          __typename: 'Project',
          id,
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

  return { updateProject };
};

export { useUpdateProject };
