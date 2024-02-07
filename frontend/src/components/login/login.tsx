'use client'
import {Button, PasswordInput, TextInput} from "@mantine/core";
import React from "react";
import styles from './login.module.scss';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {gql, useMutation} from "@apollo/client";
import axios from "axios";
import {useAuth} from '../../context/AuthContext';
import { useRouter } from 'next/navigation';


type Inputs = {
    email: string;
    password: string;
}

const schema = yup.object({
    email: yup.string().email().required('Email wymagany'),
    password: yup.string().min(3, 'Hasło musi posiadać min. 3 znaki').required('Hasło wymagane'),
})

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Inputs>({resolver: yupResolver(schema)})
    const {setCurrentUser} = useAuth();
    const router = useRouter();



    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
      await axios.post("http://localhost:3001/auth/login", { email: data.email, password: data.password }, { withCredentials: true })
          .then(response => {
              setCurrentUser(response.data.user);
          });
          await router.push('/');
    
  };

    return (
        <div className={styles.container}>
            <h1>Zaloguj się</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <TextInput variant='unstyled' classNames={{
                    wrapper: styles.wrapper,
                    root: styles.root,
                    input: styles.input
                }}
                           placeholder={'Email'}
                           {...register('email')}/>
                <p className={styles.error}>{errors.email?.message}</p>
                
                <PasswordInput variant='unstyled' classNames={{
                    wrapper: styles.wrapper,
                    root: styles.root,
                    input: styles.passwordOuterInput,
                    innerInput: styles.passwordInput,
                }}
                               placeholder={'Hasło'}
                               {...register('password')}/>
                <p className={styles.error}>{errors.password?.message}</p>
                
                <Button type={'submit'} classNames={{root: styles.button}}>Zaloguj się</Button>
            </form>
        </div>
    )
}