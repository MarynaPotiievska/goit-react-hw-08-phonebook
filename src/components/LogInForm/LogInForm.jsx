import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { logIn } from 'redux/auth/operations';

import { Box } from '@mui/system';
import { Button, Container, TextField, Typography } from '@mui/material';

const registerSchema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,12}$/,
      'Password must consist of 6-12 characters including at least 1 uppercase, 1 lowercase, 1 number and 1 symbol (!@#$%^&*_=+-)'
    )
    .required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};

const LogInForm = () => {
  const [values, setValues] = useState(initialValues);
  const dispatch = useDispatch();

  const handleChange = value => {
    setValues(value);
  };

  const handleFormSubmit = values => {
    dispatch(logIn(values));
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
        Log in
      </Typography>
      <Box
        component="form"
        autoComplete="off"
        name="Login Form"
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
          name="email"
          label="User email"
          type="email"
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

export default LogInForm;
