import styles from './Menu.module.scss';
import Link from 'next/link';

export default function Menu(props: {className: any}) {
    return(
        <ul className={`${styles.container} ${props.className}`}>
            <Link href={'/wydarzenia'}><li className={styles.option}>Wydarzenia</li></Link>
            <Link href={'/createevent'}><li className={styles.option}>Utwórz Wydarzenie</li></Link>
            <Link href={'/uzytkownicy'}><li className={styles.option}>Użytkownicy</li></Link>
            <Link href={'/kontakt'}><li className={styles.option}>Kontakt</li></Link>
            <li className={styles.option}>Zaloguj się</li>
        </ul>
    )
}