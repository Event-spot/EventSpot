import styles from './attendee.module.scss';
import Image from "next/image";
import Question from '../../assets/images/question.png'; 

type EventAttendeeProps = {
    id: number;
    imie: string;
    nazwisko: string;
   
  };
  
  const Attendee: React.FC<EventAttendeeProps> = ({
    id,
    imie,
    nazwisko,
  })=> {
    return(
 <div className={styles.tableContent}>
      <div className={styles.row}>
          <div className={styles.account}>
          <Image className={styles.accountimage} src={Question} alt={'Event Banner'} />
          </div>
          <div className={styles.cell}><p>{imie} {nazwisko}</p></div>
        </div>
       </div> 
       );
    };

       export default Attendee;