import { gql, useMutation } from '@apollo/client';
import { IProject } from '../../../server/models/project';

const DELETE_PROJECT = gql`
  mutation ($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

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

export { useDeleteProject };
