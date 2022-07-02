import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

import { useGetProjects } from '../hooks/get-projects.hook';
import ProjectItem from './ProjectItem';
import NotFound from './NotFound';

const Projects = () => {
  const { projects, loading, error } = useGetProjects();

  if (loading) return <Spinner size="xl" />;

  if (error)
    return (
      <p>
        Error :<br />
        <pre>{error.message}</pre>
      </p>
    );

  if (projects.length === 0) return <NotFound message="No projects found" />;

  return (
    <Flex gap={5} flexWrap="wrap" justifyContent={'center'}>
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </Flex>
  );
};

export default Projects;
