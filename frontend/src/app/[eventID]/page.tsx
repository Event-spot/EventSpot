'use client'
import { useState } from 'react';
import styles from './event.module.scss';
import Upbar from '../../components/Upbar/Upbar';
import Image from 'next/image';
import eventimage from '../../assets/images/isb.png';
import Participation from '../../components/Participation/Participation';
import Maps from '../../components/Maps/maps';
import Comments from '../../components/comments/comments';
import Details from '../../components/details/details'; // Zaimportuj komponent Details

export default function Event() {
  return (
    <div className={styles.main}>
      <div>
        <Upbar />
      </div>
      
      <div className={styles.up}>
        <Image
          className={styles.eventbanner}
          src={eventimage}
          alt={'Event Banner'}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.emptyDiv}></div> {/* Dodany pusty div o wysokości 100px */}
      <div className={styles.next}>
        <div className={styles.insidenext1}>
        <Participation/>
        </div>
        <div className={styles.insidenext2}>
        <Details/>
        </div>
        <div className={styles.insidenext3}>
        <Maps/>
        </div>
      </div>

      <div className={styles.afternext}>
        <div className={styles.komentarze}>
            <Comments />
          </div>
      </div>
    </div>
  );
}
