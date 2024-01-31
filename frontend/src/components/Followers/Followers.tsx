import { useState } from 'react';
import styles from './Followers.module.scss';

type User = {
  id: number; 
  firstname: string;
  lastname: string;
  following:User[];
  followers: User[];
};

export default function Followers(props:{user:User}) {
const {id,following,followers }= props.user;

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
         {props.user.followers.map((followers:User, index: number)=>(
             <p key={index}>{followers.firstname} {followers.lastname}</p>
           ))}
          </div>
        )}
        {activeTab === 'obserwowani' && (
          <div className={styles.tabPanel}>
           {props.user.following.map((following:User, index: number)=>(
             <p key={index}>{following.firstname} {following.lastname}</p>
           ))}
          </div>
        )}
      </div>
    </div>
  );
}

