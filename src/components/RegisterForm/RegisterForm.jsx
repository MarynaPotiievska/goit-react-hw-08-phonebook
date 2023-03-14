import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { signUp } from 'redux/auth/operations';

import { Box } from '@mui/system';
import { Button, Container, TextField, Typography } from '@mui/material';

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Name is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,12}$/,
      'Password must consist of 7-12 characters including at least 1 uppercase, 1 lowercase, 1 number and 1 symbol (!@#$%^&*_=+-)'
    )
    .required('Password is required'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const RegisterForm = () => {
  const [values, setValues] = useState(initialValues);
  const dispatch = useDispatch();

  const handleChange = value => {
    setValues(value);
  };

  const handleFormSubmit = values => {
    console.log('values', values);
    dispatch(signUp(values));
    setValues(initialValues);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  return (
    <Container sx={{ padding: '12px' }}>
      <Typography
        color="primary"
        variant="h5"
        sx={{
          textAlign: 'center',
          textDecoration: 'underline',
          fontWeight: 'bold',
        }}
      >
        Sign up
      </Typography>
      <Box
        component="form"
        autoComplete="off"
        name="Register Form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '12px',
          '& .MuiTextField-root': { display: 'block', m: 1, width: '25ch' },
        }}
      >
        <TextField
          name="name"
          label="User name"
          id="user-name"
          placeholder="Rob Stark"
          required
          autoFocus
          {...register('name')}
          error={errors.name ? true : false}
          helperText={errors.name?.message}
          value={values.name}
          onChange={e => handleChange({ ...values, name: e.target.value })}
        />
        <TextField
          name="email"
          label="User email"
          type="email"
          id="user-email"
          placeholder="mail@mail.com"
          required
          {...register('email')}
          error={errors.email ? true : false}
          helperText={errors.email?.message}
          value={values.email}
          onChange={e => handleChange({ ...values, email: e.target.value })}
        />
        <TextField
          name="password"
          label="User password"
          type="password"
          placeholder="******"
          required
          {...register('password')}
          error={errors.password ? true : false}
          helperText={errors.password?.message}
          value={values.password}
          onChange={e => handleChange({ ...values, password: e.target.value })}
        />
        <Button type="submit" variant="contained" sx={{ margin: '0 auto' }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterForm;
