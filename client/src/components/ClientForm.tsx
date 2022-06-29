import React from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import * as Yup from 'yup';

interface FieldAttributesProps {
  field: React.HTMLAttributes<HTMLInputElement>;
  form: HTMLFormElement;
}

interface FormValueProps {
  name: string;
  email: string;
  phone: string;
}

interface ClientFormProps {
  submitHandler: ({ variables }: { variables: FormValueProps }) => void;
  closeModal?: () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({
  submitHandler,
  closeModal,
}) => {
  const AddClientSchema = Yup.object({
    name: Yup.string().min(2).required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    phone: Yup.string().min(5).required('Required'),
  });

  return (
    <Formik
      initialValues={{ name: '', email: '', phone: '' }}
      validationSchema={AddClientSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        submitHandler({ variables: { ...values } });
        setSubmitting(false);
        resetForm();
        closeModal && closeModal();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="name">
            {({ field, form }: FieldAttributesProps) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" type="text" {...field} />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="email">
            {({ field, form }: FieldAttributesProps) => (
              <FormControl isInvalid={form.errors.email && form.touched.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" {...field} />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="phone">
            {({ field, form }: FieldAttributesProps) => (
              <FormControl isInvalid={form.errors.phone && form.touched.phone}>
                <FormLabel htmlFor="phone">Phone</FormLabel>
                <Input id="phone" type="tel" {...field} />
                <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            colorScheme="pink"
            type="submit"
            disabled={isSubmitting}
            mt={4}
          >
            Add
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ClientForm;
