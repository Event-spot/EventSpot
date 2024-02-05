'use client'
import styles from './LoginPopover.module.scss';
import '@mantine/core/styles.css';
import {Popover, Button, TextInput, PasswordInput, Text} from '@mantine/core';
import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import axios from 'axios';
import {useAuth} from "@/context/AuthContext";

type Inputs = {
    email: string;
    password: string;
}

export default function LoginPopover(props: {isOpened: boolean, open: () => void, close: () => void}) {
    const [visible, {toggle}] = useDisclosure(false);
    const [loginEnabled, setLoginEnabled] = useState(true);
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()
    const {setCurrentUser} = useAuth();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        axios.post('http://localhost:3001/auth/login',  {email: data.email, password: data.password}, {withCredentials: true}).then(response => {
            setCurrentUser(response.data.user)
            }
        ).catch(error => console.log(error.message))
        }

    const ChangeLoginToRegister = () => {
        setLoginEnabled(!loginEnabled);
    }

    const Click = () => {
        loginEnabled ? console.log("Login") : console.log("Resgister");
    }

    return(
        <Popover position='bottom' width={340} offset={25} opened={props.isOpened} withArrow onClose={props.close}
        classNames={{
            dropdown: styles.dropdown
        }}>
            <Popover.Target>
                <Button classNames={{root: styles.loginButton}} onClick={props.open}>Zaloguj się</Button>
            </Popover.Target>
            <Popover.Dropdown>
                <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                <Text ta='center' fw={700}>{loginEnabled ? 'Zaloguj się' : 'Zarejestruj się'}</Text>
                <TextInput variant='unstyled' placeholder='Email' classNames={{
                    wrapper: styles.wrapper,
                    root: styles.root,
                    input: styles.input
                }} {...register('email', {required: true})}/>
                    {errors.email && <span className={styles.errorMsg}>To pole jest wymagane</span>}
                <PasswordInput variant='unstyled' placeholder='Hasło' visible={visible} onVisibilityChange={toggle}
                classNames={{
                    wrapper: styles.wrapper,
                    root: styles.root,
                    input: styles.passwordOuterInput,
                    innerInput: styles.passwordInput,
                }} {...register('password', {required: true})}/>
                {!loginEnabled &&
                    <PasswordInput variant='unstyled' placeholder='Hasło' visible={visible} onVisibilityChange={toggle}
                                   classNames={{
                                       wrapper: styles.wrapper,
                                       root: styles.root,
                                       input: styles.passwordOuterInput,
                                       innerInput: styles.passwordInput,
                                   }}/>}
                    {errors.password && <span className={styles.errorMsg}>To pole jest wymagane</span>}
                <Button type='submit' onClick={Click} classNames={{root: styles.button}}>{loginEnabled ? 'Zaloguj się' : 'Zarejestruj się'}</Button>
                </form>
                <Text onClick={ChangeLoginToRegister} classNames={{root: styles.text}} ta='center' size='sm'>{loginEnabled ? 'Nie posiadasz konta? Zarejestruj je tutaj.' : 'Posiadasz już konto? Zaloguj się tutaj.'}</Text>
            </Popover.Dropdown>
        </Popover>
    )
}