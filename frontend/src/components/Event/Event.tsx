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
  bannerImage: string;
  
};
const Event: React.FC<EventProps> = ({ nazwa, id, lokalizacja, data, bannerImage}) => {
  

  const truncatedName = nazwa.length > 27 ? `${nazwa.slice(0, 27)}...` : nazwa;
  const defaultBanner = eventimage;

  return (
    <div className={styles.event}>
      <div>
      <Image
          className={styles.eventbanner}
          src={bannerImage || defaultBanner}
          alt={'Event Banner'}
          width={500}
          height={500}
        />
      </div>
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