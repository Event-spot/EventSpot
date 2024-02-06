import styles from './Menu.module.scss';
import Link from 'next/link';

interface MenuProps {
    className: string;
    onClose: () => void;
  }

export default function Menu({ className, onClose }: MenuProps) {
    return(
        <ul className={`${styles.container} ${className}`}>
            <li className={styles.option} onClick={onClose}><Link href='/wydarzenia'>Wydarzenia</Link></li>
            <li className={styles.option} onClick={onClose}><Link href='/createevent'>Utwórz Wydarzenie</Link></li>
            <li className={styles.option} onClick={onClose}><Link href='/uzytkownicy'>Użytkownicy</Link></li>
            <li className={styles.option} onClick={onClose}><Link href='/kontakt'>Kontakt</Link></li>
            <li className={styles.option} onClick={onClose}><Link href='/login'>Zaloguj się</Link></li>
        </ul>
    )
}