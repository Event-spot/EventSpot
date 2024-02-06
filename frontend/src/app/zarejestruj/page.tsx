'use client'
import {Button, PasswordInput, TextInput} from "@mantine/core";
import React from "react";
import styles from './zarejestruj.module.scss';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {gql, useMutation} from "@apollo/client";
import axios from "axios";
import {useAuth} from '../../context/AuthContext';

const CREATE_USER = gql`
    mutation addUser($addUserArgs: AddUserArgs!) {
        addUser(addUserArgs: $addUserArgs)
    }
`

type Inputs = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    retypePassword: string;
}

const schema = yup.object({
    email: yup.string().email().required('Email wymagany'),
    firstName: yup.string().required('Imię wymagane'),
    lastName: yup.string().required('Nazwisko wymagane'),
    password: yup.string().min(3, 'Hasło musi posiadać min. 3 znaki').required('Hasło wymagane'),
    retypePassword: yup.string().required('Wymagane powtórzenie hasła')
        .test('password-match ', 'Hasła się nie zgadzają', function (value) {
            return this.parent.password === value
        })
})

export default function Zarejestruj() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Inputs>({resolver: yupResolver(schema)})
    const {setCurrentUser} = useAuth();

    const [createUser] = useMutation(CREATE_USER)



    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const userData = {
            email: data.email,
            firstname: data.firstName,
            lastname: data.lastName,
            password: data.password
        }

        await createUser({variables: {addUserArgs: userData}}).catch(error => {
            console.error("Błąd GraphQL:", error);
        });

        await axios.post('http://localhost:3001/auth/login', {email: userData.email, password: userData.password}, {withCredentials: true})
            .then(response => setCurrentUser(response.data.user));

    }

    return (
        <div className={styles.container}>
            <h1>Utwórz konto</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <TextInput variant='unstyled' classNames={{
                    wrapper: styles.wrapper,
                    root: styles.root,
                    input: styles.input
                }}
                           placeholder={'Email'}
                           {...register('email')}/>
                <p className={styles.error}>{errors.email?.message}</p>
                <TextInput variant='unstyled' classNames={{
                    wrapper: styles.wrapper,
                    root: styles.root,
                    input: styles.input
                }}
                           placeholder={'Imię'}
                           {...register('firstName')}/>
                <p className={styles.error}>{errors.firstName?.message}</p>
                <TextInput variant='unstyled' classNames={{
                    wrapper: styles.wrapper,
                    root: styles.root,
                    input: styles.input
                }}
                           placeholder={'Nazwisko'}
                           {...register('lastName')}/>
                <p className={styles.error}>{errors.lastName?.message}</p>
                <PasswordInput variant='unstyled' classNames={{
                    wrapper: styles.wrapper,
                    root: styles.root,
                    input: styles.passwordOuterInput,
                    innerInput: styles.passwordInput,
                }}
                               placeholder={'Hasło'}
                               {...register('password')}/>
                <p className={styles.error}>{errors.password?.message}</p>
                <PasswordInput variant='unstyled' classNames={{
                    wrapper: styles.wrapper,
                    root: styles.root,
                    input: styles.passwordOuterInput,
                    innerInput: styles.passwordInput,
                }}
                               placeholder={'Powtórz hasło'}
                               {...register('retypePassword')}/>
                <p className={styles.error}>{errors.retypePassword?.message}</p>
                <Button type={'submit'} classNames={{root: styles.button}}>Utwórz konto</Button>
            </form>
        </div>
    )
}