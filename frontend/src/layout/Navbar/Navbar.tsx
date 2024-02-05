'use client'

import {useEffect, useState} from 'react';
import Link from 'next/link';
import Menu from '@/layout/Menu/Menu';
import styles from './Navbar.module.scss';
import Hamburger from "@/layout/Hamburger/Hamburger";
import Overlay from "@/layout/Overlay/Overlay";
import LoginPopover from "@/layout/LoginPopover/LoginPopover";
import {useDisclosure} from "@mantine/hooks";
import {useAuth} from "@/context/AuthContext";
import LoggedUser from "@/layout/LoggedUser/LoggedUser";


export default function Navbar() {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [opened, {close, open}] = useDisclosure();
    const [isSticky, setIsSticky] = useState(false);
    const {currentUser} = useAuth();

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsSticky(scrollPosition > 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const ShowMenu = () => {
        setMenuIsOpen(!menuIsOpen);
    }

    const CloseMenu = () => {
        setMenuIsOpen(false);
    }

    return (
        <div className={`${styles.container} ${isSticky ? styles.sticky : ''}`}>
            <Link href='/'><span className={styles.logo}>EventSpot</span></Link>
            <Hamburger onClick={ShowMenu}/>
            <Menu className={menuIsOpen && styles.menuOpen}/>
            <ul className={styles.navigation}>
                <Link href={'/wydarzenia'}>
                    <li className={styles.option}>Wydarzenia</li>
                </Link>
                <Link href={'/createevent'}>
                    <li className={styles.option}>Utwórz Wydarzenie</li>
                </Link>
                <Link href={'/uzytkownicy'}>
                    <li className={styles.option}>Użytkownicy</li>
                </Link>
                <Link href={'/kontakt'}>
                    <li className={styles.option}>Kontakt</li>
                </Link>
            </ul>
            <ul className={styles.profileSection}>
                {currentUser ? <LoggedUser/> : <LoginPopover isOpened={opened} open={open} close={close}/>}
                <Overlay className={menuIsOpen && styles.overlayShow} onClick={CloseMenu}/>
            </ul>
        </div>
    );
}