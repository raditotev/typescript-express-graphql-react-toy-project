import React from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { Link, useParams } from 'react-router-dom';

import { useGetSingleProject } from '../hooks/queries';
import NotFound from '../components/NotFound';

const ProjectPage = () => {
  const { id } = useParams();

  const { loading, error, project } = useGetSingleProject({ id });

  if (loading)
    return (
      <Flex justifyContent="center" alignItems="center" height="50vh">
        <Spinner size="xl" />
      </Flex>
    );
  if (error)
    return (
      <p>
        Error :<br />
        <pre>{error.message}</pre>
      </p>
    );
  if (!project) return <NotFound message="No projects found" />;

  const { name, description, status, client } = project;

  return (
    <Flex flexDir="column" mt={10} borderWidth={1} borderRadius="lg" p={5}>
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
        <Button colorScheme="pink">DELETE</Button>
      </Stack>
    </Flex>
  );
};

export default ProjectPage;
