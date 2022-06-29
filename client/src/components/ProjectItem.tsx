import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Button, Stack, Text } from '@chakra-ui/react';

import { IProject } from '../../../server/models/project';

interface ProjectItemProps {
  project: IProject;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const { name, status } = project;

  return (
    <Box borderWidth="1px" borderRadius="lg" p={5} minWidth="300px">
      <Flex alignItems={'center'} gap={5}>
        <Stack>
          <Heading>{name}</Heading>
          <Text fontSize="xs" color="#333">
            {status}
          </Text>
        </Stack>
        <Link to={`projects/${project.id}`}>
          <Button>VIEW</Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default ProjectItem;
