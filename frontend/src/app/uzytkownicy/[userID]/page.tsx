'use client'
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graphql/schema";
import styles from './profile.module.scss';
import Image from "next/image";
import Profile_Background from '../../../assets/images/profile_background.png';
import Question from '../../../assets/images/question.png'


type User = {
  id: number; 
  firstname: string;
  lastname: string;
};

type Params = {
  params: {
    userID: string;
  };
};

export default function Profile({ params: { userID } }: Params) {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.users.find((user: User) => user.id === parseInt(userID, 10));

  if (!user) return <p>User not found</p>;

  return (
    <div className={styles.main}>
      <div className={styles.up}>
        <Image
          className={styles.profileBanner}
          src={Profile_Background}
          alt={'Profile Banner'}
          layout="fill"
          objectFit="cover"
        />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.profileDiv}>
        <div className={styles.profileLeft}>
          <div className={styles.profileSquare}>
          <Image priority={true} className={styles.avatar} src={Question} alt={'Person Avatar'}/>
          </div>
          <div className={styles.profileName}>
          <p>{user.firstname}</p>
          <p>{user.lastname}</p>
          </div>
        </div>
        <div>
          <h1>siema</h1>
        </div>
      </div>
      

      <div className={styles.next}>
        <div className={styles.insidenext1}>
        <h1>inside1</h1>
        </div>
        <div className={styles.insidenext2}>
         <h2>inside2</h2>
        </div>
        <div className={styles.insidenext3}></div>
      </div>

      <div className={styles.afternext}>
        <div className={styles.komentarze}></div>
      </div>
    </div>
  );
}












    
{/* <div className={styles["event-container"]}>
      <Image
        loading="lazy"
        src= { Profile_Background} className={styles["event-image"]}
        alt="Event Image"
        width={1000}
        height={300}
      />
      <div className={styles["event-info"]}>
        <div className={styles["info-column"]}>
          <span className={styles["info-label"]}>Informacje</span>
          <div className={styles["info-item"]}>
            <span className={styles["label"]}>Lokalizacja:</span>
            <span className={styles["value"]}>Bytom</span>
          </div>
          <div className={styles["info-item"]}>
            <span className={styles["label"]}>Zorganizowane wydarzenia:</span>
            <span className={styles["value"]}>32</span>
          </div>
        </div>
      </div>
    </div> */}









//     <div className={styles.main}>
//       <div className={styles.header}>
//       <Image priority={true} className={styles.header_img} src={Profile_Background} alt={'Profile Background'}/>  
//       {/* <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/90823df5189b5075c476622f72bbfcea8c0a9efbc2be8bba5eddf8f9f4e90a4f?apiKey=6af31a49a00741fea57d0c082109faff&" class="header-img" /> */}
//       </div>
//     {/* <div className={styles.img}>
//     <Image priority={true} className={styles.avatar} src={Profile_Background} alt={'Profile Background'}/>  
//     </div> */}

//     <div className={styles.user}>
//     <div className={styles.pages}>
//         <div className={styles.container}>
//             <div>
//               <h1>User Details</h1>
//               <p>First Name: {user.firstname}</p>
//               <p>Last Name: {user.lastname}</p>
//             </div>
//         </div>
//       </div>
//     </div>
// </div>
  //);
//}