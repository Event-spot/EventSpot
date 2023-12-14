'use client'

import Link from 'next/link';
import Menu from '@/layout/Menu/Menu';
import styles from './Navbar.module.scss';
import Hamburger from "@/layout/Hamburger/Hamburger";
import { useState } from 'react';
import Overlay from "@/layout/Overlay/Overlay";
import { IoMdSettings } from "react-icons/io";

export default function Navbar(){
    const [menuIsOpen, setMenuIsOpen] = useState(false);

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
                <li className={styles.option}>Zaloguj się</li>
                <li className={styles.option}><IoMdSettings className={styles.icon} /></li>
            </ul>
            <Overlay className={menuIsOpen && styles.overlayShow} onClick={CloseMenu}/>
        </div>
    )
}