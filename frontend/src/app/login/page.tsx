'use client'
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { Button, TextInput, PasswordInput, Text } from '@mantine/core';
import { useAuth } from '@/context/AuthContext'; // Załóżmy, że ścieżka do kontekstu Auth jest prawidłowa
import styles from './Login.module.scss'; // Utwórz odpowiedni plik CSS lub SCSS dla tej strony

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [loginEnabled, setLoginEnabled] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const { setCurrentUser } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const url = loginEnabled ? 'http://localhost:3001/auth/login' : 'http://localhost:3001/auth/register'; // Załóżmy, że rejestracja odbywa się pod podobnym endpointem
    axios.post(url, data, { withCredentials: true })
      .then(response => {
        setCurrentUser(response.data.user);
      })
      .catch(error => console.log(error.message));
  };

  const toggleLoginRegister = () => {
    setLoginEnabled(!loginEnabled);
  };

  return (
    <div className={styles.loginPage}>
      <Text align='center' weight={700} size='xl' className={styles.title}>
        {loginEnabled ? 'Zaloguj się' : 'Zarejestruj się'}
      </Text>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          variant='filled'
          label='Email'
          placeholder='Twój email'
          {...register('email', { required: 'Email jest wymagany' })}
        />
        {errors.email && <span className={styles.errorMsg}>{errors.email.message}</span>}
        <PasswordInput
          variant='filled'
          label='Hasło'
          placeholder='Twoje hasło'
          {...register('password', { required: 'Hasło jest wymagane' })}
        />
        {errors.password && <span className={styles.errorMsg}>{errors.password.message}</span>}
        <Button type='submit' className={styles.submitButton}>
          {loginEnabled ? 'Zaloguj się' : 'Zarejestruj się'}
        </Button>
      </form>
      <Text align='center' size='sm' className={styles.toggleLink} onClick={toggleLoginRegister}>
        {loginEnabled ? 'Nie posiadasz konta? Zarejestruj je tutaj.' : 'Posiadasz już konto? Zaloguj się tutaj.'}
      </Text>
    </div>
  );
};

export default LoginPage;
