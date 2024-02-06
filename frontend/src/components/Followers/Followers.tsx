import { useState } from 'react';
import styles from './Followers.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Question from '../../assets/images/question.png'; 

interface User {
  id: number;
  firstname: string;
  lastname: string;
  avatarImage: string;
}

type Props = {
  followers: User[];
  following: User[];
};

export default function Followers({ followers, following }: Props) {
// const {id,following,followers }= props.user;

  const [activeTab, setActiveTab] = useState('obserwujacy');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  
  return (
    <div className={styles.details}>
      <div className={styles.tabHeaders}>
        <div
          className={`${styles.tabHeader} ${activeTab === 'obserwujacy' ? styles.active : ''}`}
          onClick={() => handleTabClick('obserwujacy')}
        >
          Obserwujący
        </div>
        <div
          className={`${styles.tabHeader} ${activeTab === 'obserwowani' ? styles.active : ''}`}
          onClick={() => handleTabClick('obserwowani')}
        >
          Obserwowani
        </div>

      </div>
      <div className={styles.tabContent}>
        {activeTab === 'obserwujacy' && (
          <div className={styles.tabPanel}>
         {followers.map((follower, index) => (
            <div key={index} className={styles.followerItem}>
              <Link href={`../uzytkownicy/${follower.id}`}>
                
                  <Image 
                    className={styles.accountimage} 
                    src={follower.avatarImage || Question}  
                    alt={'Avatar Image'} 
                    width={25}
                    height={25}
                  />
                  <p>{follower.firstname} {follower.lastname}</p>
                
              </Link>
            </div>
          ))}
          </div>
        )}
        {activeTab === 'obserwowani' && (
          <div className={styles.tabPanel}>
           {following.map((following, index) => (
            <div key={index} className={styles.followerItem}>
              <Link href={`../uzytkownicy/${following.id}`}>
                
                  <Image 
                    className={styles.accountimage} 
                    src={following.avatarImage || Question}  
                    alt={'Avatar Image'} 
                    width={25}
                    height={25}
                  />
                  <p>{following.firstname} {following.lastname}</p>
                
              </Link>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
}

