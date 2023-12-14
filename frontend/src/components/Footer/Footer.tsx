import styles from './Footer.module.scss';
import { RiFacebookBoxFill } from "react-icons/ri";
import { RiInstagramFill } from "react-icons/ri";
import { RiTiktokFill } from "react-icons/ri";
import { RiLinkedinBoxFill } from "react-icons/ri";

export default function Footer() {
    return(
        <div className={styles.container}>
            <div className={styles.navigation}>
                <div className={styles.section1}>
                    <span className={styles.title}>EventSpot</span>
                    <ul className={styles.footerNav}>
                        <li>Strona Główna</li>
                        <li>Wydarzenia</li>
                        <li>Organizatorzy</li>
                        <li>Użytkownicy</li>
                    </ul>
                </div>
                <div className={styles.section2}>
                    <span className={styles.title}>Użytkownik</span>
                    <ul className={styles.footerNav}>
                        <li>Profil</li>
                        <li>Ustawienia</li>
                    </ul>
                </div>
                <div className={styles.section3}>
                    <span className={styles.title}>Wydarzenia</span>
                    <ul className={styles.footerNav}>
                        <li>Utwórz wydarzenie</li>
                        <li>Edytuj wydarzenie</li>
                    </ul>
                </div>
                <div className={styles.section4}>
                    <span className={styles.title}>O nas</span>
                    <ul className={styles.footerNav}>
                        <li>O firmie</li>
                        <li>FAQ</li>
                    </ul>
                </div>
                <div className={styles.contact}>
                    <span className={styles.title}>Kontakt</span>
                    <ul className={styles.footerNav}>
                        <li>kontakt@eventspot.com</li>
                        <li>+48 777-777-777</li>
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