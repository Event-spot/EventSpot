import { useState } from 'react';
import styles from './Followers.module.scss';

interface User {
  id: number;
  firstname: string;
  lastname: string;
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
         {followers.map((followers, index: number)=>(
             <p key={index}>{followers.firstname} {followers.lastname}</p>
           ))}
          </div>
        )}
        {activeTab === 'obserwowani' && (
          <div className={styles.tabPanel}>
           {following.map((following, index: number)=>(
             <p key={index}>{following.firstname} {following.lastname}</p>
           ))}
          </div>
        )}
      </div>
    </div>
  );
}

