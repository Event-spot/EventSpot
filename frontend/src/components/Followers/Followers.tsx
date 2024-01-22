import { useState } from 'react';
import styles from './Followers.module.scss';
import { useQuery } from '@apollo/client';
import { GET_USERS } from './graphql/schema';

type User = {
  id: number; 
  firstname: string;
};


export default function Followers({ userId }: { userId: any }) {

  
  const [activeTab, setActiveTab] = useState('obserwujacy');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
   
    //window.dispatchEvent(new Event('resize'));
  };
  
  const { loading, data, error } = useQuery(GET_USERS, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.users.find((user: User) => user.id === parseInt(userId, 10));

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
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           
           


          </div>
        )}
        {activeTab === 'obserwowani' && (
          <div className={styles.tabPanel}>
           <h2>User: {user.firstname}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

