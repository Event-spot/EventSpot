'use client'
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graphql/schema";
import styles from './profile.module.scss';
import Image from "next/image";
import Profile_Background from '../../../assets/images/profile_background.png';
import Question from '../../../assets/images/question.png'
import { RiFacebookBoxFill } from "react-icons/ri";
import { RiInstagramFill } from "react-icons/ri";
import { RiTiktokFill } from "react-icons/ri";
import { RiYoutubeFill } from "react-icons/ri";
import Followers from "../../../components/Followers/Followers";
import EventHistory from "../../../components/EventHistory/EventHistory";



type User = {
  id: number; 
  firstname: string;
  lastname: string;
  followers: string;
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
          <div className={styles.followers}>
            <p>Obserwujących: {user.followers}</p>
          </div>
        </div>
        <div className={styles.divButton}>
          <button className={styles.button}>+ Obserwuj</button>
        </div>
      </div>
      
      <div className={styles.next}>
        <div className={styles.profileInfo}>
          <fieldset className={styles.description}>
            <legend>O mnie </legend>
          </fieldset>
          <div className={styles.contact}>
            <RiFacebookBoxFill color="#4968ad" />
            <RiInstagramFill color="#e1306c" />
            <RiTiktokFill color="rgb(30, 48, 80)" />
            <RiYoutubeFill color="#eb3223" />
          </div>
        </div>
          <div className={styles.insidenext2}>
          <EventHistory userId={userID}/>
          </div>
          <div className={styles.followersContainer}>
            <Followers userId={userID}/>
          </div>
      </div>
    </div>
  );
}