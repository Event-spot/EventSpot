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
import { useState } from "react";
import UploadForm from "@/components/UploadTest/Upload";



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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const isAuthorized = false;
  const isFollowing = false;
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
  
  

  const { loading, error, data, refetch } = useQuery(GET_USERS_EVENTS_FOLLOWINGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const user = data.userById;
  const futureEvents = data.futureEvents;
  const pastEvents = data.pastEvents;
  if (!user) return <p>User not found</p>;
  const followingCount = data?.userById?.followers?.length || 0;

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

  const handleFollow = () => {

  }

  const handleUnfollow = () => {
    
  }

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
                    value={state.editedLocalization} // Załóżmy, że dodasz to pole do stanu
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
            <p>Obserwujących: {followingCount}</p>
          </div>
        </div>
        <div className={styles.divButton}>
        {isAuthorized ? (
          isEditing ? (
            <>
              <button className={styles.button} onClick={handleSave}>Zapisz zmiany</button>
              <button className={styles.buttonCancel} onClick={cancelEdit}>Anuluj</button>
            </>
          ) : (
            <button className={styles.button} onClick={toggleEditMode}>Edytuj Profil</button>
          )
        ) : (
          isFollowing ? (
            <button className={styles.buttonCancel} onClick={handleUnfollow}>Przestań obserwować</button>
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
              <Followers user={user}/>
            </div>        
      </div>
    </div>
  );
}