'use client'
import {useAuth} from "@/context/AuthContext";
import {Avatar, Menu} from "@mantine/core";
import styles from './LoggedUser.module.scss';
import {useState} from "react";
import {IoPerson} from 'react-icons/io5';
import {FaLock} from 'react-icons/fa';
import Link from "next/link";
import axios from "axios";

export default function LoggedUser() {
    const [opened, setOpened] = useState(false);
    const {currentUser, setCurrentUser} = useAuth()

    const logout = async () => {
        await axios.get('http://localhost:3001/auth/logout', {withCredentials: true}).then(response => console.log(response));
        setCurrentUser(null);
    }

    return (
        <Menu opened={opened} onChange={setOpened}>
            <Menu.Target>
                <button className={styles.container}>
                    <span>{currentUser?.firstName} {currentUser?.lastName}</span>
                    <Avatar src={currentUser?.avatarImage}/>
                </button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item leftSection={<IoPerson/>} component={Link}
                           href={`/uzytkownicy/${currentUser.id}`}>Profil</Menu.Item>
                <Menu.Item leftSection={<FaLock/>} component='button' onClick={logout}>Wyloguj się</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )

}