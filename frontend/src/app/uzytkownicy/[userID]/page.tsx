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
      }
      pastEvents(userId: ${userID}) {
        id,
        name,
        date,
        localization
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
  const [state, setState] = useState({
    editedFirstName: '',
    editedLastName: '',
    editedDescription: '',
    editedFacebook: '',
    editedInstagram: '',
    editedTiktok: '',
    editedYoutube: ''
  });
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  
  

  const { loading, error, data } = useQuery(GET_USERS_EVENTS_FOLLOWINGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const user = data.userById;
  const futureEvents = data.futureEvents;
  const pastEvents = data.pastEvents;
  if (!user) return <p>User not found</p>;
  const followingCount = data?.userById?.followers?.length || 0;

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // opcjonalnie aktualizuj preview
  };
  const handleBackgroundSelect = (file: File) => {
    setSelectedBackground(file);
    // const fileUrl = URL.createObjectURL(file);
    // setBackgroundImage(fileUrl);
  };
  //Profile Edit
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
      editedYoutube: user.youtube
    });
  };

  // Handle save changes
  const handleSave = async () => {
    try {

      let newAvatarUrl, newBannerUrl;

    if (selectedFile) {
      const formDataAvatar = new FormData();
      formDataAvatar.append('file', selectedFile);
      const uploadResponse = await fetch('/api/upload', { method: 'POST', body: formDataAvatar });
      if (!uploadResponse.ok) throw new Error(await uploadResponse.text());
      const uploadResult = await uploadResponse.json();
      newAvatarUrl = uploadResult.fileUrl; // Załóżmy, że API zwraca URL pliku
    }

    if (selectedBackground) {
      const formDataBackground = new FormData();
      formDataBackground.append('file', selectedBackground);
      const backgroundResponse = await fetch('/api/upload', { method: 'POST', body: formDataBackground });
      if (!backgroundResponse.ok) throw new Error(await backgroundResponse.text());
      const backgroundResult = await backgroundResponse.json();
      newBannerUrl = backgroundResult.fileUrl;
    }

      // Call the mutation function
      const response = await updateUser({
        variables: {
          updateUserArgs: {
            id: parseInt(userID, 10), // Convert userID to an integer
            firstname: state.editedFirstName,
            lastname: state.editedLastName,
            description: state.editedDescription,
            facebook: state.editedFacebook,
            instagram: state.editedInstagram,
            tiktok: state.editedTiktok,
            youtube: state.editedYoutube,
            avatarImage: newAvatarUrl, 
            bannerImage: newBannerUrl,
          }
        }
      });

  
      // Check if the mutation was successful and returned the updated user data
      if (response && response.data && response.data.updateUser) {
        const updatedUser = response.data.updateUser;
        
  
        // Optionally, if you're maintaining separate states for display and edit, update them too
        // setEditedFirstName(updatedUser.firstname);
        // setEditedLastName(updatedUser.lastname);
        setState({
          // ...state,
          editedFirstName:updatedUser.firstname,
          editedLastName:updatedUser.lastname,
          editedDescription:updatedUser.description,
          editedFacebook:updatedUser.facebook,
          editedInstagram:updatedUser.instagram,
          editedTiktok:updatedUser.tiktok,
          editedYoutube:updatedUser.youtube,

        })
      }
      
      // revalidatePath('/uzytkownicy/[userID]');
      window.location.reload();

      // Toggle editing mode off
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error appropriately
    }
  };

  const cancelEdit = () => {
    // Reset edited values to the original
    setState({
      ...state,
      editedFirstName: user.firstname,
      editedLastName: user.lastname,
      editedDescription: user.description,
      editedFacebook: user.facebook,
      editedInstagram: user.instagram,
      editedTiktok: user.tiktok,
      editedYoutube: user.youtube
    })

    // Set isEditing to false to exit edit mode
    setIsEditing(false);
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
            src={Profile_Background}
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
            <Image priority={true} className={styles.avatar} src={Question} alt={'Person Avatar'}/>
          )}
          </div>
          <div className={styles.profileName}>
            {isEditing ? (
          <>
            <input 
              value={state.editedFirstName} 
              onChange={(e) => setState({ ...state, editedFirstName: e.target.value })}
            />
            <input 
              value={state.editedLastName} 
              onChange={(e) => setState({ ...state, editedLastName: e.target.value })}
            />
          </>
        ) : (
          <>
            <p>{user.firstname}</p>
            <p>{user.lastname}</p>
          </>
        )}
          </div>
          <div className={styles.followers}>
            <p>Obserwujących: {followingCount}</p>
          </div>
        </div>
        <div className={styles.divButton}>
          {isEditing ? (
          <>
            <button className={styles.button} onClick={handleSave}>Zapisz zmiany</button>
            <button className={styles.button} onClick={cancelEdit}>Anuluj</button>
          </>
        ) : (
          <button className={styles.button} onClick={toggleEditMode}>Edytuj Profil</button>
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
                <p>{user.description}</p>
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