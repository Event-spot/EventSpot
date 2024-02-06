import styles from './Footer.module.scss';
import { RiFacebookBoxFill } from "react-icons/ri";
import { RiInstagramFill } from "react-icons/ri";
import { RiTiktokFill } from "react-icons/ri";
import { RiLinkedinBoxFill } from "react-icons/ri";
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function Footer() {

    // const {currentUser}=useAuth();

    return(
        <div className={styles.container}>
            <div className={styles.navigation}>
                <div className={styles.section1}>
                    <span className={styles.title}>EventSpot</span>
                    <ul className={styles.footerNav}>
                    <Link href='/'><li>Strona Główna</li></Link>
                    <Link href='/wydarzenia'><li>Wydarzenia</li></Link>
                    <Link href='/uzytkownicy'><li>Użytkownicy</li></Link>
                    </ul>
                </div>
                <div className={styles.section2}>
                    <span className={styles.title}>Użytkownik</span>
                    <ul className={styles.footerNav}>
                    {/* <Link href={`/uzytkownicy/${currentUser?.id}`}><li>Profil</li></Link> */}
                    </ul>
                </div>
                <div className={styles.section3}>
                    <span className={styles.title}>Wydarzenia</span>
                    <ul className={styles.footerNav}>
                    <Link href='/createevent'><li>Utwórz wydarzenie</li></Link>
                    </ul>
                </div>
                <div className={styles.section4}>
                    <span className={styles.title}>O nas</span>
                    <ul className={styles.footerNav}>
                    <Link href='/kontakt'><li>FAQ</li></Link>
                    </ul>
                </div>
                <div className={styles.contact}>
                    <span className={styles.title}>Kontakt</span>
                    <ul className={styles.footerNav}>
                        <li>eventspot.development@gmail.com</li>
                        <li>+48 123 456 789</li>
                        <li>xxxxxxxxxx, 32-500</li>
                        <li>Chrzanów</li>
                    </ul>
                </div>
            </div>
            <div className={styles.credentials}>
                <p className={styles.credit}>© 2023 EventSpot</p>
                <div className={styles.social}>
                    <RiFacebookBoxFill />
                    <RiInstagramFill />
                    <RiTiktokFill />
                    <RiLinkedinBoxFill />
                </div>
            </div>
        </div>
    )
}