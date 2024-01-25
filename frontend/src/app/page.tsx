import styles from './page.module.scss'
import InfoCard from "@/components/InfoCard/InfoCard";
import Button from '@/components/Button/Button';
import Image from "next/image";
import Skyline from '../assets/images/skyline.png';

export default function Home() {
  return (
      <div className={styles.container}>
          <div className={styles.welcomeSection}>
              <div className={styles.btnContainer}>
              <Button/>
              </div>
              <Image className={styles.skyline} src={Skyline} alt={'Nissan Skyline R34 GT-R'}/>
              <svg className={styles.mobileShape} xmlns="http://www.w3.org/2000/svg" width="430" height="388" viewBox="0 0 430 388" fill="none">
                  <path d="M0 146.472L430 0V388H0V146.472Z" fill="#2E1A47"/>
              </svg>
              <svg id="wave" className={styles.desktopTopShape} viewBox="0 0 1440 490" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stopColor="rgba(46, 26, 71, 1)" offset="0%"></stop><stop stopColor="rgba(138, 95, 192, 1)" offset="100%"></stop></linearGradient></defs><path  fill="url(#sw-gradient-0)" d="M0,294L80,310.3C160,327,320,359,480,326.7C640,294,800,196,960,163.3C1120,131,1280,163,1440,196C1600,229,1760,261,1920,245C2080,229,2240,163,2400,130.7C2560,98,2720,98,2880,114.3C3040,131,3200,163,3360,220.5C3520,278,3680,359,3840,326.7C4000,294,4160,147,4320,138.8C4480,131,4640,261,4800,294C4960,327,5120,261,5280,269.5C5440,278,5600,359,5760,334.8C5920,310,6080,180,6240,130.7C6400,82,6560,114,6720,106.2C6880,98,7040,49,7200,24.5C7360,0,7520,0,7680,32.7C7840,65,8000,131,8160,130.7C8320,131,8480,65,8640,106.2C8800,147,8960,294,9120,302.2C9280,310,9440,180,9600,155.2C9760,131,9920,212,10080,269.5C10240,327,10400,359,10560,318.5C10720,278,10880,163,11040,106.2C11200,49,11360,49,11440,49L11520,49L11520,490L11440,490C11360,490,11200,490,11040,490C10880,490,10720,490,10560,490C10400,490,10240,490,10080,490C9920,490,9760,490,9600,490C9440,490,9280,490,9120,490C8960,490,8800,490,8640,490C8480,490,8320,490,8160,490C8000,490,7840,490,7680,490C7520,490,7360,490,7200,490C7040,490,6880,490,6720,490C6560,490,6400,490,6240,490C6080,490,5920,490,5760,490C5600,490,5440,490,5280,490C5120,490,4960,490,4800,490C4640,490,4480,490,4320,490C4160,490,4000,490,3840,490C3680,490,3520,490,3360,490C3200,490,3040,490,2880,490C2720,490,2560,490,2400,490C2240,490,2080,490,1920,490C1760,490,1600,490,1440,490C1280,490,1120,490,960,490C800,490,640,490,480,490C320,490,160,490,80,490L0,490Z"></path></svg>
              <div className={styles.content}>
                  <h1 className={styles.title}>EventSpot</h1>
                  <p className={styles.text}>Wszystkie wydarzenia w jednym miejscu.</p>
              </div>
          </div>
              <div className={styles.infoCardContainer}>

          <InfoCard/>
          <InfoCard/>
              </div>
      </div>
  )
}
