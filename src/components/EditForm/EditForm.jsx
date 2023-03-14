import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { editContact } from 'redux/contactsOperations';
import { contactSchema } from 'components/ContactForm/ContactForm';

import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';

const EditForm = ({ contact, setOpen }) => {
  const { id, name, number } = contact;

  const [values, setValues] = useState({ name, number });
  const dispatch = useDispatch();

  const handleChange = value => {
    setValues(value);
  };

  const handleFormSubmit = values => {
    const contactData = { id, name: values.name, number: values.number };
    dispatch(editContact(contactData));
    setOpen(false);
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
      name="Edit Contact Form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{
        width: '650px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        columnGap: '32px',
        border: `1px solid #093C01`,
        borderRadius: '4px',
        mb: '16px',
        padding: '8px',
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
        Edit
      </Button>
    </Box>
  );
};

EditForm.propTypes = {
  contact: PropTypes.exact({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
  }),
  setOpen: PropTypes.func,
};

export default EditForm;
