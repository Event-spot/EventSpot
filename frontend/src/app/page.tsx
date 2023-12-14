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
              <svg className={styles.desktopTopShape} xmlns="http://www.w3.org/2000/svg" width="1920" height="435" viewBox="0 0 1920 435" fill="none">
                  <path d="M0 234C0 234 514.5 458.499 963.5 161.5C1412.5 -135.5 1920 68.9997 1920 68.9997V435H0V234Z" fill="url(#paint0_linear_92_3)"/>
                  <defs>
                      <linearGradient id="paint0_linear_92_3" x1="960" y1="0.367187" x2="960" y2="435" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#2E1A47"/>
                          <stop offset="0.0001" stopColor="#8A5FC0"/>
                          <stop offset="1" stopColor="#2E1A47"/>
                      </linearGradient>
                  </defs>
              </svg>
              <div className={styles.content}>
                  <h1 className={styles.title}>EventSpot</h1>
                  <p className={styles.text}>Wszystkie wydarzenia w jednym miejscu.</p>
              </div>
          </div>
              <div className={styles.infoCardContainer}>
                  <svg className={styles.desktopBottomShape} xmlns="http://www.w3.org/2000/svg" width="1920" height="128" viewBox="0 0 1920 128" fill="none">
                      <path d="M1920 64.4999C1920 64.4999 1731 128 1247.5 128C764 128 0 128 0 128V-1.52588e-05H1920V64.4999Z" fill="#2E1A47"/>
                  </svg>
          <InfoCard/>
          <InfoCard/>
              </div>
      </div>
  )
}
