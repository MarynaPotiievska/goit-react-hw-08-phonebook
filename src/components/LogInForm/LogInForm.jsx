import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { logIn } from 'redux/auth/operations';

import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';

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
    <Box
      component="form"
      autoComplete="off"
      name="Login Form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <TextField
        name="email"
        label="User email"
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
        placeholder="******"
        required
        {...register('password')}
        error={errors.password ? true : false}
        helperText={errors.password?.message}
        value={values.password}
        onChange={e => handleChange({ ...values, password: e.target.value })}
      />
      <Button type="submit">Submit</Button>
    </Box>
  );
};

export default LogInForm;
