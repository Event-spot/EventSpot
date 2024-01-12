import styles from './wydarzenia.module.scss';
import Slider from '@/components/Slider/Slider';
import Upbar from '../../components/Upbar/Upbar';



export default function wydarzenia() {
  return (
<div className={styles.main}>


  <div className={styles.upmenu}>
    <Upbar/>
  </div>

  <div className={styles.events}>
    <p>2</p>
  </div>

  <div className={styles.downbar}>
    <p>3</p>
  </div>

</div>
    
  );
};

