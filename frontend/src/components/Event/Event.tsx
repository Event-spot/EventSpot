import styles from './Event.module.scss'; // Import styli
import Image from "next/image";
import eventimage from '../../assets/images/illegalzone.png'; 
import eventimage2 from '../../assets/images/isb.png'; 

type EventProps = {
  nazwa: string;
  
};
const Event: React.FC<EventProps> = ({ nazwa }) => {
  // Ograniczanie długości tekstu do 35 znaków
  const truncatedName = nazwa.length > 27 ? `${nazwa.slice(0, 27)}...` : nazwa;

  return (
    <div className={styles.event}>
      
        <Image className={styles.eventbanner} src={eventimage} alt={'Event Banner'} />
      

      <div className={styles.down}>
          <div className={styles.name}>
            <p>{truncatedName}</p>
          </div>
          <div>
           <button className={styles.Button}>Zobacz Profil</button>
         </div>
      </div>
    </div>
  );
};

export default Event;