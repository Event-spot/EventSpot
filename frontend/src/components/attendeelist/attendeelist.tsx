import styles from './attendee.module.scss';
import Image from "next/image";
import Question from '../../assets/images/question.png'; 
import Link from 'next/link';

type EventAttendeeProps = {
    id: number;
    imie: string;
    nazwisko: string;
    avatarImage: string;
   
  };
  
  const Attendee: React.FC<EventAttendeeProps> = ({
    id,
    imie,
    nazwisko,
    avatarImage,
  })=> {
    // console.log(avatarImage)
    return(
 <div className={styles.tableContent}>
      <div className={styles.row}>
          <div className={styles.account}>
          <Link href={`../uzytkownicy/${id}`}>
            <Image 
              className={styles.accountimage} 
              src={avatarImage || Question}  
              alt={'Avatar Image'} 
              width={25}
              height={25}
            />
          </Link>
          </div>
          <div className={styles.cell}>
            <Link href={`../uzytkownicy/${id}`}>
              <p>{imie} {nazwisko}</p>
            </Link>
          </div>
        </div>
        
       </div> 
       );
    };

       export default Attendee;