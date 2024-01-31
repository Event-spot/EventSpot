import styles from './Event.module.scss';
import Image from "next/image";
import eventimage from '../../assets/images/illegalzone.png'; 
import eventimage2 from '../../assets/images/isb.png'; 
import Link from 'next/link';

type EventProps = {
  id: number;
  nazwa: string;
  lokalizacja:string;
  data:Date;
  
};
const Event: React.FC<EventProps> = ({ nazwa, id, lokalizacja, data}) => {
  

  const truncatedName = nazwa.length > 27 ? `${nazwa.slice(0, 27)}...` : nazwa;

  return (
    <div className={styles.event}>
      
        <Image className={styles.eventbanner} src={eventimage} alt={'Event Banner'} />
      

      <div className={styles.down}>
          <div className={styles.down1}>
            <div className={styles.localization}><p>{lokalizacja}</p></div>
            <div className={styles.date}>
<p>
  {data.getFullYear()}-{(data.getMonth() + 1).toString().padStart(2, '0')}-{data
    .getDate()
    .toString()
    .padStart(2, '0')}/{data.getHours().toString().padStart(2, '0')}:{data
    .getMinutes()
    .toString()
    .padStart(2, '0')}
</p>
          </div>
          </div>
          <div className={styles.down2}>
            <div className={styles.name}><p>{truncatedName}</p></div>
          <div><Link href={`/wydarzenia/[eventID]`} as={`/wydarzenia/${id}`}><p className={styles.Button}>Zobacz więcej</p></Link></div>
          </div>
      </div>
     
    </div>
    
  );
};

export default Event;