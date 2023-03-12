import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'yup-phone';

import { addContact } from 'redux/contactsOperations';
import { selectContacts } from 'redux/selectors';

// import {
//   AddContactForm,
//   Button,
//   ContactInput,
//   Label,
// } from './ContactForm.styled';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';

const contactSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Name is required'),
  number: yup
    .string()
    .phone('UA', 'Number must be a valid phone number for region UA.')
    .required('Phone is required'),
});

const initialValues = {
  name: '',
  number: '',
};

const ContactForm = () => {
  const [values, setValues] = useState(initialValues);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleChange = value => {
    setValues(value);
  };

  const handleFormSubmit = (e, values) => {
    const form = e.target;
    const isInContacts = contacts.find(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );
    if (isInContacts === undefined) {
      dispatch(addContact(values));
    } else {
      alert(`${values.name} is already in contacts.`);
    }

    form.reset();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  return (
    <Box
      component="form"
      autoComplete="off"
      name="Add Contact Form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <TextField
        name="name"
        label="Name"
        placeholder="Rob Stark"
        required
        {...register('name')}
        error={errors.name ? true : false}
        helperText={errors.name?.message}
        value={values.name}
        onChange={e => handleChange({ ...values, name: e.target.value })}
      />
      <TextField
        name="number"
        label="Phone number"
        placeholder="+380 00 000 00 00"
        required
        {...register('number')}
        error={errors.number ? true : false}
        helperText={errors.number?.message}
        value={values.number}
        onChange={e => handleChange({ ...values, number: e.target.value })}
      />
    </Box>

    // <Formik
    //   initialValues={{ name: '', number: '' }}
    //   validationSchema={contactSchema}
    //   onSubmit={handleSubmit}
    // >
    //   <AddContactForm autoComplete="off">
    //     <Label>
    //       Name
    //       <ContactInput
    //         type="text"
    //         name="name"
    //         pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
    //         title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    //       />
    //       <ErrorMessage
    //         name="name"
    //         component={Error}
    //         message="Name must be at least 2 characters"
    //       />
    //     </Label>
    //     <Label>
    //       Phone
    //       <ContactInput
    //         type="tel"
    //         name="number"
    //         title="Phone number must be digits and can contain spaces, dashes, parentheses and must start with +"
    //       />
    //       <ErrorMessage
    //         name="number"
    //         component={Error}
    //         message="Number must be a valid phone number for region UA."
    //       />
    //     </Label>
    //     <Button type="submit">Add contact</Button>
    //   </AddContactForm>
    // </Formik>
  );
};

export default ContactForm;
