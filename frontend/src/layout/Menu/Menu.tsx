import styles from './Menu.module.scss';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Question from '../../assets/images/question.png'; 
import axios from 'axios';

interface MenuProps {
    className: string;
    onClose: () => void;

  }

export default function Menu({ className, onClose }: MenuProps) {
    const {currentUser} = useAuth();
    const {setCurrentUser} = useAuth();

    const logout = async ()=>{
        await axios.get("http://localhost:3001/auth/logout", {withCredentials:true}).then(response => setCurrentUser(null))
    }
        
    
    return(
        <ul className={`${styles.container} ${className}`}>
      {currentUser && (
        <li className={styles.user}>
            <Image 
                className={styles.accountimage} 
                src={currentUser.avatarImage || Question}  
                alt={'Avatar Image'} 
                width={25}
                height={25}
             />
          <Link onClick={onClose} href={`../uzytkownicy/${currentUser.id}` }> 
            <p>{currentUser.firstName}</p>
            <p>{currentUser.lastName}</p>
          </Link>  
        </li>
      )}
      <li className={styles.option} onClick={onClose}><Link href='/wydarzenia'>Wydarzenia</Link></li>
      <li className={styles.option} onClick={onClose}><Link href='/createevent'>Utwórz Wydarzenie</Link></li>
      <li className={styles.option} onClick={onClose}><Link href='/uzytkownicy'>Użytkownicy</Link></li>
      <li className={styles.option} onClick={onClose}><Link href='/kontakt'>Kontakt</Link></li>
      {currentUser ? (
        <li className={styles.option} onClick={() => { logout(); onClose(); }}>Wyloguj się</li> 
      ) : (
        <li className={styles.option} onClick={onClose}><Link href='/auth'>Zaloguj się</Link></li> 
      )}
    </ul>
    )
}