import styles from './Person.module.scss';
import Image from "next/image";
import Question from '../../assets/images/question.png'; 
import Link from 'next/link';

type PersonProps = {
  id: number;
  imie: string;
  nazwisko: string;
  lokalizacja: string;
  odwiedzoneSpoty: number;
  obserwowani: number;
  obserwujacy: number;
};

const Person: React.FC<PersonProps> = ({
  id,
  imie,
  nazwisko,
  lokalizacja,
  odwiedzoneSpoty,
  obserwowani,
  obserwujacy,
}) => {
  return (
    <div className={styles.person}>
      <div>
      <Image priority={true} className={styles.avatar} src={Question} alt={'Person Avatar'}/>  
      </div>
      <div className={styles.name}>
        <p>{imie} {nazwisko}</p>
      </div>
      <div className={styles.location}>
        <p>{lokalizacja}</p>
      </div>
        <div className={styles.stats}>
            <div className={styles.following}>
                <span>{obserwowani}</span>
                <p>Obserwowani</p>
            </div>
            <div className={styles.visited_spots}>
            {odwiedzoneSpoty}
                <p>Odwiedzone spoty</p>
            </div>
            <div className={styles.followers}>
                <span>{obserwujacy}</span>
                <p>Obserwujący</p>
            </div>
        </div>
        <div>
        <Link href={`/uzytkownicy/[userID]`} as={`/uzytkownicy/${id}`}>
          <p className={styles.Button}>Zobacz Profil</p>
        </Link>
        </div>
    </div>
  );
};

export default Person;