'use client'
import styles from './LoginPopover.module.scss';
import '@mantine/core/styles.css';
import {Button, PasswordInput, Popover, Text, TextInput} from '@mantine/core';
import {useDisclosure} from "@mantine/hooks";
import {SubmitHandler, useForm} from "react-hook-form";
import axios from 'axios';
import {useAuth} from "@/context/AuthContext";
import Link from "next/link";

type Inputs = {
    email: string;
    password: string;
}

export default function LoginPopover(props: { isOpened: boolean, open: () => void, close: () => void }) {
    const [visible, {toggle}] = useDisclosure(false);
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()
    const {setCurrentUser} = useAuth();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        axios.post('http://localhost:3001/auth/login', {
            email: data.email,
            password: data.password
        }, {withCredentials: true}).then(response => {
                setCurrentUser(response.data.user);
                props.close();
            }
        ).catch(error => console.log(error.message))
    }

    return (
        <Popover position='bottom' width={340} offset={25} opened={props.isOpened} withArrow onClose={props.close}
                 classNames={{
                     dropdown: styles.dropdown
                 }}>
            <Popover.Target>
                <Button classNames={{root: styles.loginButton}} onClick={props.open}>Zaloguj się</Button>
            </Popover.Target>
            <Popover.Dropdown classNames={{dropdown: styles.dropdown}}>
                <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                    <Text ta='center' fw={700}>Zaloguj się</Text>
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
                    {errors.password && <span className={styles.errorMsg}>To pole jest wymagane</span>}
                    <Button type='submit' classNames={{root: styles.button}}>Zaloguj się</Button>
                </form>
                <Link href={'/zarejestruj'} onClick={props.close} className={styles.registerLink}>
                    <Text classNames={{root: styles.text}} ta='center'
                          size='sm'>Nie posiadasz konta? Zarejestruj je tutaj.</Text>
                </Link>
            </Popover.Dropdown>
        </Popover>
    )
}