import React from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { useGetSingleProject } from '../hooks/queries';
import NotFound from '../components/NotFound';
import { useDeleteProject } from '../hooks/mutations';
import OverlaySpinner from '../components/OverlaySpinner';

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, project } = useGetSingleProject({ id });
  const { deleteProject } = useDeleteProject({ id: '' });

  if (loading) return <OverlaySpinner />;
  if (error)
    return (
      <p>
        Error :<br />
        <pre>{error.message}</pre>
      </p>
    );
  if (!project) return <NotFound message="No projects found" />;

  const { name, description, status, client } = project;

  const deleteHandler = () => {
    if (!!id) {
      deleteProject({ variables: { id } });
      navigate('/');
    }
  };

  return (
    <Flex
      w="100%"
      flexDir="column"
      mt={10}
      borderWidth={1}
      borderRadius="lg"
      p={5}
    >
      <Button alignSelf="flex-end">
        <Link to="/">BACK</Link>
      </Button>
      <Heading>{name}</Heading>
      <Text fontSize="sm" color="#333">
        {status}
      </Text>
      <Text mt={5}>{description}</Text>
      <Flex alignItems="center" my={10}>
        <Divider />
        <Heading fontSize="medium" ml={5} fontWeight="bold">
          Client
        </Heading>
      </Flex>
      <Box textAlign="left" alignSelf="flex-end">
        <Heading fontSize="lg" textAlign="right">
          {client.name}
        </Heading>
        <Text my={1}>
          <EmailIcon mr={2} />
          {client.email}
        </Text>
        <Text>
          <PhoneIcon mr={2} />
          {client.phone}
        </Text>
      </Box>
      <Stack direction="row" spacing={4} alignSelf="flex-end" mt={10}>
        <Button>EDIT</Button>
        <Button colorScheme="pink" onClick={deleteHandler}>
          DELETE
        </Button>
      </Stack>
    </Flex>
  );
};

export default ProjectPage;
