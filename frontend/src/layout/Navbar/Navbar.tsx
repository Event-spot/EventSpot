'use client'

import Link from 'next/link';
import Menu from '@/layout/Menu/Menu';
import styles from './Navbar.module.scss';
import Hamburger from "@/layout/Hamburger/Hamburger";
import { useState } from 'react';
import Overlay from "@/layout/Overlay/Overlay";
import { IoMdSettings } from "react-icons/io";
import LoginPopover from "@/layout/LoginPopover/LoginPopover";
import { useDisclosure } from "@mantine/hooks";

export default function Navbar(){
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [opened, {close, open}] = useDisclosure(false);

    const ShowMenu = () => {
        setMenuIsOpen(!menuIsOpen);
    }

    const CloseMenu = () => {
        setMenuIsOpen(false);
    }
    
    return(
        <div className={styles.container}>
            <Link href='/'><span className={styles.logo}>EventSpot</span></Link>
            <Hamburger onClick={ShowMenu}/>
            <Menu className={menuIsOpen && styles.menuOpen}/>
            <ul className={styles.navigation}>
                <Link href={'/wydarzenia'}><li className={styles.option}>Wydarzenia</li></Link>
                <Link href={'/organizatorzy'}><li className={styles.option}>Organizatorzy</li></Link>
                <Link href={'/uzytkownicy'}><li className={styles.option}>Użytkownicy</li></Link>
                <Link href={'/kontakt'}><li className={styles.option}>Kontakt</li></Link>
            </ul>
            <ul className={styles.profileSection}>
                <LoginPopover isOpened={opened} open={open} close={close}/>
                <li className={styles.option} onClick={open}><IoMdSettings className={styles.icon} /></li>
            </ul>
            <Overlay className={menuIsOpen && styles.overlayShow} onClick={CloseMenu}/>
        </div>
    )
}