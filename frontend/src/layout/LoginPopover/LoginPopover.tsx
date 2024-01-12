import styles from './LoginPopover.module.scss';
import '@mantine/core/styles.css';
import {Popover, Button, TextInput, PasswordInput, Text, Modal} from '@mantine/core';
import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";

export default function LoginPopover(props: {isOpened: boolean, open: () => void, close: () => void}) {
    const [visible, {toggle}] = useDisclosure(false);
    const [loginEnabled, setLoginEnabled] = useState(true);

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
                <Text ta='center' fw={700}>{loginEnabled ? 'Zaloguj się' : 'Zarejestruj się'}</Text>
                <TextInput variant='unstyled' placeholder='Login' classNames={{
                    wrapper: styles.wrapper,
                    root: styles.root,
                    input: styles.input
                }}/>
                <PasswordInput variant='unstyled' placeholder='Hasło' visible={visible} onVisibilityChange={toggle}
                classNames={{
                    wrapper: styles.wrapper,
                    root: styles.root,
                    input: styles.passwordOuterInput,
                    innerInput: styles.passwordInput,
                }}/>
                {!loginEnabled &&
                    <PasswordInput variant='unstyled' placeholder='Hasło' visible={visible} onVisibilityChange={toggle}
                                   classNames={{
                                       wrapper: styles.wrapper,
                                       root: styles.root,
                                       input: styles.passwordOuterInput,
                                       innerInput: styles.passwordInput,
                                   }}/>}
                <Button onClick={Click} classNames={{root: styles.button}}>{loginEnabled ? 'Zaloguj się' : 'Zarejestruj się'}</Button>
                <Text onClick={ChangeLoginToRegister} classNames={{root: styles.text}} ta='center' size='sm'>{loginEnabled ? 'Nie posiadasz konta? Zarejestruj je tutaj.' : 'Posiadasz już konto? Zaloguj się tutaj.'}</Text>
            </Popover.Dropdown>
        </Popover>
    )
}