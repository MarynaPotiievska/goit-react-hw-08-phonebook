import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'yup-phone';

import { addContact } from 'redux/contactsOperations';
import { selectContacts } from 'redux/selectors';

import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';

export const contactSchema = yup.object().shape({
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

  const handleFormSubmit = values => {
    const isInContacts = contacts.find(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );
    if (isInContacts === undefined) {
      dispatch(addContact(values));
    } else {
      alert(`${values.name} is already in contacts.`);
    }
    setValues(initialValues);
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
      sx={{
        width: '700px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        columnGap: '32px',
        border: `1px solid #093C01`,
        borderRadius: '4px',
        mb: '16px',
        padding: '24px',
        '& .MuiTextField-root': { display: 'block', m: 0.5, width: '25ch' },
      }}
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
        size="small"
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
        size="small"
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ margin: '0 auto', width: '25ch' }}
      >
        Add contact
      </Button>
    </Box>
  );
};

export default ContactForm;
