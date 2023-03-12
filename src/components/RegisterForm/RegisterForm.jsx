import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { signUp } from 'redux/auth/operations';

import { Box } from '@mui/system';
import { TextField } from '@mui/material';

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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,12}$/,
      'Password must consist of 6-12 characters including at least 1 uppercase, 1 lowercase, 1 number and 1 symbol (!@#$%^&*_=+-)'
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

  const handleFormSubmit = (e, values) => {
    const form = e.target;
    dispatch(signUp(values));
    form.reset();
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
      name="Register Form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <TextField
        name="name"
        label="User name"
        placeholder="Rob Stark"
        required
        {...register('name')}
        error={errors.name ? true : false}
        helperText={errors.name?.message}
        value={values.name}
        onChange={e => handleChange({ ...values, name: e.target.value })}
      />
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
    </Box>
  );
};

export default RegisterForm;
