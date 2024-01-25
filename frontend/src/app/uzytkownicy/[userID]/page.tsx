'use client'
import { useQuery } from "@apollo/client";
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
import { gql } from "@apollo/client";




type User = {
  id: number; 
  firstname: string;
  lastname: string;
  following: User[];
};

type Params = {
  params: {
    userID: string;
  };
};

export default function Profile({ params: { userID } }: Params) {

  const GET_USERS_EVENTS_FOLLOWINGS = gql`
  query  {
    userById(userId: ${userID}) {
            id,
            firstname,
            lastname,
            spotsVisited,
            localization,
            description,
            facebook,
            instagram,
            tiktok,
            youtube,
            following{
                id,
                firstname,
                lastname,
            }
            followers{
              id,
              firstname,
              lastname,
            }
            events {
              id,
              name,
              date,
              localization,
            }
      }
      futureEvents(userId: ${userID}) {
        id,
        name,
        date,
        localization,
      }
      pastEvents(userId: ${userID}) {
        id,
        name,
        date,
        localization
      }
  }
`;
  
  const { loading, error, data } = useQuery(GET_USERS_EVENTS_FOLLOWINGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const user = data.userById;
  const futureEvents = data.futureEvents;
  const pastEvents = data.pastEvents;
  if (!user) return <p>User not found</p>;
  const followingCount = data?.userById?.followers?.length || 0;
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
        <div className={styles.overlay}>
        </div>
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
            <p>Obserwujących: {followingCount}</p>
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
            {user.description}
          </fieldset>
            <div className={styles.contact}>
              <a href={user.facebook} target="_blank" rel="noopener noreferrer">
                <RiFacebookBoxFill color="#4968ad" />
              </a>
              <a href={user.instagram} target="_blank" rel="noopener noreferrer">
              <RiInstagramFill color="#e1306c" />
              </a>
              <a href={user.tiktok} target="_blank" rel="noopener noreferrer">
              <RiTiktokFill color="rgb(30, 48, 80)" />
              </a>
              <a href={user.youtube} target="_blank" rel="noopener noreferrer">
              <RiYoutubeFill color="#eb3223" />
              </a>
            </div>
        </div>
            <div className={styles.eventHistory}>
            <EventHistory 
            futureEvents={futureEvents}
            pastEvents={pastEvents}
            />
            </div>
            <div className={styles.followersContainer}>
              <Followers user={user}/>
            </div>
        
      </div>
    </div>
  );
}