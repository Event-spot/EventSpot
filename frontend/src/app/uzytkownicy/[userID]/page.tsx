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
import {useMutation, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import UploadForm from "@/components/UploadTest/Upload";
import { useAuth } from "@/context/AuthContext";
import { Notifications } from '@mantine/notifications';




type User = {
  id: number; 
  firstname: string;
  lastname: string;
  following: User[];
};
interface Follower {
  id: number;
  firstname: string;
  lastname: string;
}
interface Followersy {
  id: number;
  firstname: string;
  lastname: string;
}
type Params = {
  params: {
    userID: string;
  };
};

export default function Profile({ params: { userID } }: Params) {
  const defaultAvatar = Question;
  const defaultBanner = Profile_Background;
  const GET_USERS_EVENTS_FOLLOWINGS = gql`
  query  {
    userById(userId: ${userID}) {
            id,
            firstname,
            lastname,
            localization,
            description,
            facebook,
            instagram,
            tiktok,
            youtube,
            avatarImage,
            bannerImage,
            following{
                id,
                firstname,
                lastname,
                avatarImage,
            }
            followers{
              id,
              firstname,
              lastname,
              avatarImage,
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
        bannerImage,
        organizer {
          id,
          avatarImage
        }
      }
      pastEvents(userId: ${userID}) {
        id,
        name,
        date,
        localization,
        bannerImage,
        organizer {
          id,
          avatarImage
        }
      }
  }
`;
const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($updateUserArgs: UpdateUserArgs!) {
    updateUser(updateUserArgs: $updateUserArgs) 
  }
`;
const FOLLOW_USER_MUTATION = gql`
  mutation FollowUser($userId: Int!, $followingId: Int!) {
    follow(followInput: { userId: $userId, followingId: $followingId })
  }
  `;
  const UN_FOLLOW_USER_MUTATION = gql`
  mutation UnFollowUser($userId: Int!, $followingId: Int!){
    unfollow(followInput: { userId: $userId, followingId: $followingId })
  }
  `;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const {currentUser} = useAuth();
  const [state, setState] = useState({
    editedFirstName: '',
    editedLastName: '',
    editedDescription: '',
    editedFacebook: '',
    editedInstagram: '',
    editedTiktok: '',
    editedYoutube: '',
    editedLocalization: ''
  });
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const [followUser] = useMutation(FOLLOW_USER_MUTATION);
  const [unFollowUser] = useMutation(UN_FOLLOW_USER_MUTATION);
  const { loading, error, data, refetch } = useQuery(GET_USERS_EVENTS_FOLLOWINGS);
  const [isCurrentlyFollowing, setIsCurrentlyFollowing] = useState(false);
  // const [followers, setFollowers] = useState<Follower[]>([]);
  // const [following, setFollowing] = useState<Followersy[]>([]);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    if (data && data.userById) {
      // setFollowers(data.userById.followers || []);
      // setFollowing(data.userById.following || []);
      setFollowersCount(data.userById.followers.length || 0);
      const isFollowing = data.userById.followers.some((follower: any) => follower.id === currentUser?.id);
      setIsCurrentlyFollowing(isFollowing);
    }
  }, [data, currentUser?.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const user = data.userById;
  const futureEvents = data.futureEvents;
  const pastEvents = data.pastEvents;
  if (!user) return <p>User not found</p>;
  // const followingCount = data?.userById?.followers?.length || 0;
  // const isFollowing = user.followers.some((follower : any) => follower.id === currentUser?.id);
  // console.log(following)

  //Profile Edit
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };
  const handleBackgroundSelect = (file: File) => {
    setSelectedBackground(file);
  };
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setState({
      ...state,
      editedFirstName: user.firstname,
      editedLastName: user.lastname,
      editedDescription: user.description,
      editedFacebook: user.facebook,
      editedInstagram: user.instagram,
      editedTiktok: user.tiktok,
      editedYoutube: user.youtube,
      editedLocalization: user.localization
    });
  };

  // Handle save changes
  const handleSave = async () => {
    try {
    const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string;

    let newAvatarUrl: string | undefined, newBannerUrl: string | undefined;

    const uploadToCloudinary = async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', "EventSpot");

      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    };

    if (selectedFile) {
      const uploadResult = await uploadToCloudinary(selectedFile);
      newAvatarUrl = uploadResult.secure_url;
    }

    if (selectedBackground) {
      const backgroundResult = await uploadToCloudinary(selectedBackground);
      newBannerUrl = backgroundResult.secure_url;
    }

      const response = await updateUser({
        variables: {
          updateUserArgs: {
            id: parseInt(userID, 10),
            firstname: state.editedFirstName,
            lastname: state.editedLastName,
            description: state.editedDescription,
            facebook: state.editedFacebook,
            instagram: state.editedInstagram,
            tiktok: state.editedTiktok,
            youtube: state.editedYoutube,
            avatarImage: newAvatarUrl, 
            bannerImage: newBannerUrl,
            localization: state.editedLocalization
          }
        }
      });

      setIsEditing(false);
      await refetch();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const handleFollow = async () => {
    if (!currentUser) {
      Notifications.show({ title: 'Zaloguj się', message: 'Musisz być zalogowany, aby obserwować użytkownika.', color: 'red' });
      return;
    }
    try {
      if (isCurrentlyFollowing) {
        await unFollowUser({
          variables: {
            userId: currentUser.id,
            followingId: parseInt(userID, 10),
          }
        });
        Notifications.show({ title: 'Sukces', message: 'Przestałeś obserwować użytkownika.', color: 'green' });
      } else {
        await followUser({
          variables: {
            userId: currentUser.id,
            followingId: parseInt(userID, 10),
          },
        });
        Notifications.show({ title: 'Sukces', message: 'Zacząłeś obserwować użytkownika.', color: 'green' });
      }
      setIsCurrentlyFollowing(!isCurrentlyFollowing);
      refetch(); 
    } catch (error) {
      console.error('Error updating follow status:', error);
      Notifications.show({ title: 'Błąd', message: 'Nie udało się zaktualizować statusu obserwacji.', color: 'red' });
    }
  };
  

  return (
    <div className={styles.main}>
      <div className={styles.up}>
      {isEditing ? (
        <UploadForm onFileSelect={handleBackgroundSelect} />
      ) : (
        <div>
          <Image
            className={styles.profileBanner}
            src={user.bannerImage || defaultBanner}
            alt={'Profile Banner'}
            layout="fill"
            objectFit="cover"
          />
          <div className={styles.overlay}></div>
        </div>
      )}

      </div>

      <div className={styles.profileDiv}>
        <div className={styles.profileLeft}>
          <div className={styles.profileSquare}>
          {isEditing ? (
            <>
              <UploadForm onFileSelect={handleFileSelect} />
            </>
          ) : (
            <Image 
              priority={true} 
              className={styles.avatar} 
              src={user.avatarImage || defaultAvatar} 
              alt="Person Avatar" 
              width={100} 
              height={100} 
            />
          )}
          </div>
          <div className={styles.profileName}>
            {isEditing ? (
              <>
                <div> 
                  <input 
                    value={state.editedFirstName} 
                    onChange={(e) => setState({ ...state, editedFirstName: e.target.value })}
                  />
                  <input 
                    value={state.editedLastName} 
                    onChange={(e) => setState({ ...state, editedLastName: e.target.value })}
                  />
                </div>
                <div> 
                  <input 
                    value={state.editedLocalization} 
                    onChange={(e) => setState({ ...state, editedLocalization: e.target.value })}
                  />
                </div>
              </>
            ) : (
              <>
                <div className={styles.names}> 
                  <p>{user.firstname}</p>
                  <p>{user.lastname}</p>
                </div>
                <div className={styles.localization}> 
                  <p>{user.localization}</p>
                </div>
              </>
            )}
          </div>
          <div className={styles.followers}>
            <p>Obserwujących: {followersCount}</p>
          </div>
        </div>
        <div className={styles.divButton}>
        {currentUser?.id === user.id ? (
          isEditing ? (
            <>
              <button className={styles.button} onClick={handleSave}>Zapisz zmiany</button>
              <button className={styles.buttonCancel} onClick={cancelEdit}>Anuluj</button>
            </>
          ) : (
            <button className={styles.button} onClick={toggleEditMode}>Edytuj Profil</button>
          )
        ) : 
        (
          isCurrentlyFollowing  ? (
            <button className={styles.buttonCancel} onClick={handleFollow}>Przestań obserwować</button>
          ) : (
            <button className={styles.button} onClick={handleFollow}>Obserwuj</button>
          )
        )}
        </div>
      </div>
      
      <div className={styles.next}>
        <div className={styles.profileInfo}>
          <fieldset className={styles.description}>
            <legend>O mnie </legend>
            {isEditing ? (
              <>
                <textarea
                  className={styles.aboutTextArea}
                  value={state.editedDescription}
                  onChange={(e) => setState({ ...state, editedDescription: e.target.value })}
                />
              </>
            ) : (
              <>
                <p className={styles.paragrafAbout}>{user.description}</p>
              </>
            )}
          </fieldset>
            <div className={styles.contact}>
            {isEditing ? (
              <>
                <div className={styles.SocialInputContainer}>
                  <div className={styles.socialInput}>
                    <RiFacebookBoxFill color="#4968ad" />
                    <input
                      className={styles.socialFacebook}
                      value={state.editedFacebook}
                      onChange={(e) => setState({ ...state, editedFacebook: e.target.value })}
                    />
                  </div>
                  <div className={styles.socialInput}>
                    <RiInstagramFill color="#e1306c" />
                    <input
                      className={styles.socialInstagram}
                      value={state.editedInstagram}
                      onChange={(e) => setState({ ...state, editedInstagram: e.target.value })}
                    />
                  </div>
                  <div className={styles.socialInput}>
                    <RiTiktokFill color="rgb(30, 48, 80)" />
                    <input
                      className={styles.socialTiktok}
                      value={state.editedTiktok}
                      onChange={(e) => setState({ ...state, editedTiktok: e.target.value })}
                    />
                  </div>
                  <div className={styles.socialInput}>
                    <RiYoutubeFill color="#eb3223" />
                    <input
                      className={styles.socialYoutube}
                      value={state.editedYoutube}
                      onChange={(e) => setState({ ...state, editedYoutube: e.target.value })}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
            </div>
        </div>
            <div className={styles.eventHistory}>
            <EventHistory 
            futureEvents={futureEvents}
            pastEvents={pastEvents}
            />
            </div>
            <div className={styles.followersContainer}>
              <Followers 
              following={user.following}
              followers={user.followers}
              />
            </div>        
      </div>
    </div>
  );
}