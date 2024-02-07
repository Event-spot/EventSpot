'use client'
import LoginPage from "@/components/login/login";
import RegisterPage from "@/components/zarejestruj/register";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Text } from '@mantine/core';
import styles from './Auth.module.scss';

const Auth = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const searchParams = useSearchParams()
    const search = searchParams.get('view')
    useEffect(() => {
        if(search ) {
            setIsLoginView(false);
        } else {
            setIsLoginView(true);
        }
    }, [search]);

  const handleChange = () => setIsLoginView(!isLoginView);

  return (
    <div className={styles.container}>
      {isLoginView ? (
        <>
          <LoginPage />
          <Text onClick={handleChange} classNames={{root: styles.text}} ta='center' size='sm'>Nie posiadasz konta? Zarejestruj je tutaj.</Text>
        </>
      ) : (
        <>
          <RegisterPage />
          <Text onClick={handleChange} classNames={{root: styles.text}} ta='center' size='sm'>Posiadasz już konto? Zaloguj się.</Text>
        </>
      )}
    </div>
  );
};

export default Auth;
