import { useState } from 'react';
import styles from './Followers.module.scss';
// import { useQuery } from '@apollo/client';
// import { gql } from '@apollo/client';

type User = {
  id: number; 
  firstname: string;
  lastname: string;
  following:User[];
  followers: User[];
};

export default function Followers(props:{user:User}) {
const {id,following,followers }= props.user;
//   const GET_ALL_FOLLOWS = gql`
//   query  {
//     userById(userId: ${userId}) {
//             following{
//                 id,
//                 firstname,
//                 lastname
//             }
//             followers{
//               id,
//               firstname,
//               lastname
//             }
//         }
//   }
// `;
  const [activeTab, setActiveTab] = useState('obserwujacy');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  
  // const { loading, data, error } = useQuery(GET_ALL_FOLLOWS, {
  //   variables: { userId },
  // });

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // const user = data.userById;
  // console.log(data)
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

