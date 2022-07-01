import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Heading, Text } from '@chakra-ui/react';

import ProjectForm from '../components/ProjectForm';
import { useGetSingleProject } from '../hooks/queries';
import OverlaySpinner from '../components/OverlaySpinner';

const EditProjectPage = () => {
  const { id: paramsId } = useParams();
  const { loading, error, project } = useGetSingleProject({ id: paramsId });

  if (loading) return <OverlaySpinner />;
  if (error)
    return (
      <Box>
        Error :<br />
        <pre>{error.message}</pre>
      </Box>
    );

  return (
    <Container>
      <Heading textAlign="center">Edit project</Heading>
      {project ? (
        <ProjectForm project={project} />
      ) : (
        <Text fontSize={'3xl'}>
          Could not find project with this id {paramsId}
        </Text>
      )}
    </Container>
  );
};

export default EditProjectPage;
