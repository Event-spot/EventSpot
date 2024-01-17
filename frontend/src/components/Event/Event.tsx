import styles from './Event.module.scss';
import Image from "next/image";
import eventimage from '../../assets/images/illegalzone.png'; 
import eventimage2 from '../../assets/images/isb.png'; 
import Link from 'next/link';

type EventProps = {
  id: number;
  nazwa: string;
  
};
const Event: React.FC<EventProps> = ({ nazwa, id}) => {

  const truncatedName = nazwa.length > 27 ? `${nazwa.slice(0, 27)}...` : nazwa;

  return (
    <div className={styles.event}>
      
        <Image className={styles.eventbanner} src={eventimage} alt={'Event Banner'} />
      

      <div className={styles.down}>
          <div className={styles.name}>
            <p>{truncatedName}</p>
          </div>
          <div>
        <Link href={`/wydarzenia/[eventID]`} as={`/wydarzenia/${id}`}>
          <p className={styles.Button}>Zobacz więcej</p>
        </Link>
        </div>
      </div>
     
    </div>
    
  );
};

export default Event;