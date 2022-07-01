import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Container,
  Textarea,
  Select,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

import { useGetClients } from '../hooks/queries';
import { useAddProject } from '../hooks/mutations';

import {
  InputFieldAttributesProps,
  TextareaFieldAttributesProps,
  SelectFieldAttributesProps,
} from '../types';
import OverlaySpinner from './OverlaySpinner';

const ProjectForm = () => {
  const navigate = useNavigate();
  const { loading, error, clients } = useGetClients();
  const { addProject } = useAddProject({
    name: '',
    description: '',
    status: '',
    client: '',
  });

  const projectValidationSchema = yup.object({
    name: yup
      .string()
      .min(2, 'Must be at least 2 characters long')
      .required('Required'),
    description: yup
      .string()
      .min(2, 'Must beat least 2 characters')
      .required('Required'),
    status: yup
      .string()
      .matches(/(new|progress|done)/)
      .required('Required'),
    client: yup.string().required('Required'),
  });

  if (loading) {
    if (loading) return <OverlaySpinner />;

    if (error)
      return (
        <p>
          Error :<br />
          <pre>{error.message}</pre>
        </p>
      );
  }

  return (
    <Container mt={10}>
      <Formik
        initialValues={{
          name: '',
          description: '',
          status: 'new',
          client: '',
        }}
        validationSchema={projectValidationSchema}
        initialStatus={false}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          addProject({
            variables: values,
          });
          setSubmitting(false);
          resetForm();
          navigate('/');
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form>
            <Field name="name">
              {({ field, form }: InputFieldAttributesProps) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="name">Project Name</FormLabel>
                  <Input id="name" type="text" {...field} />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="description">
              {({ field, form }: TextareaFieldAttributesProps) => (
                <FormControl
                  mt={2}
                  isInvalid={
                    form.errors.description && form.touched.description
                  }
                >
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Textarea id="description" {...field} />
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="status">
              {({ field, form }: SelectFieldAttributesProps) => (
                <FormControl
                  mt={2}
                  isInvalid={form.errors.status && form.touched.status}
                >
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <Select id="status" {...field}>
                    <option value="new">New Project</option>
                    <option value="progress">In Progress</option>
                    <option value="done">Done</option>
                  </Select>
                  <FormErrorMessage>{form.errors.status}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            {clients.length > 0 ? (
              <Field name="client">
                {({ field, form }: SelectFieldAttributesProps) => (
                  <FormControl
                    mt={2}
                    isInvalid={form.errors.client && form.touched.client}
                  >
                    <FormLabel htmlFor="client">Select client</FormLabel>
                    <Select id="client" {...field}>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{form.errors.client}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            ) : (
              <Link to="client/new">Create client</Link>
            )}
            <Flex justifyContent="flex-end">
              <Button
                type="submit"
                disabled={!(isValid && dirty)}
                colorScheme="pink"
                mt={5}
                isLoading={isSubmitting}
                spinner={<Spinner />}
                spinnerPlacement="end"
                loadingText="Creating"
              >
                Create
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ProjectForm;
