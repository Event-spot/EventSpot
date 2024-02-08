'use client'
import { useQuery } from "@apollo/client";
import Attendee from "../../../components/attendeelist/attendeelist"
import styles from './event.module.scss';
import Image from 'next/image';
import eventimage from '../../../assets/images/isb.png';
import Question from '../../../assets/images/question.png'
import Map from '../../../components/Maps/maps';
import Comment from '../../../components/comments/comments';
import Detail from '../../../components/details/details';
import { useMutation, gql } from "@apollo/client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import UploadForm from "@/components/UploadTest/Upload";
import { useAuth } from "@/context/AuthContext";
import { Notifications } from '@mantine/notifications';
import { Button } from '@mantine/core';

type Event = {
  id:number;
 name:string;
 localization:string;
};
type Comment = {
  user: any;
  id:number;
  content:string;
  createDate: string;
  firstname: string;
  lastname:string;
};
type Attendee = {
  id:number;
  firstname:string;
  lastname:string;
  avatarImage: string;
};
type Detail = {
  general_information:string;
  competitions:string;
  localization_details:string;
}
type Map ={
  localization:string;
  date:Date;
}



type Params = {
  params: {
    eventID: string;
  };
};

export default function Event({ params: { eventID } }: Params) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const defaultBanner = eventimage;
  const defaultAvatar = Question;
const GET_EVENTS= gql`
query{
  eventById(eventId: ${eventID}){
    id,
    name,
    localization,
    date,
    general_information,
    competitions,
    localization_details,
    bannerImage,
    attendeesCount,
    organizer {
      id
      avatarImage
      firstname
      lastname
    }
    attendees{
      id,
      firstname,
      lastname,
      avatarImage
    }
    comments {
      id
      content
      createDate
      user {
        id
        firstname
        lastname
        avatarImage
      }
    }

  }
}
`;

const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateEvent($updateEventArgs: UpdateEventArgs!) {
    updateEvent(updateEventArgs: $updateEventArgs)
  }
`;
const JOIN_EVENT_MUTATION = gql`
  mutation joinEvent($eventId: Int!, $userId: Int!){
    joinEvent(eventId: $eventId, userId: $userId)
  }
  `;
  const LEAVE_EVENT_MUTATION = gql`
  mutation leaveEvent($eventId: Int!, $userId: Int!){
    leaveEvent(eventId: $eventId, userId: $userId)
  }
  `;
  const ADD_COMMENT_MUTATION = gql`
  mutation addComment($userId: Int!, $eventId: Int!, $content: String!){
    addComment(addCommentInput:{user:$userId, event: $eventId, content: $content})
  }
  `;
  const { loading, error, data, refetch } = useQuery(GET_EVENTS);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState<File | null>(null);
  const [eventDetails, setEventDetails] = useState({
    editedName: '',
    editedLocalization: '',
    editedDate: '', 
    editedGeneral_information: '',
    editedCompetitions: '',
    editedLocalization_details: ''
  });
  const { currentUser } = useAuth();
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [isAlreadyIn, setIsAlreadyIn] = useState(false);
  const [updateEvent] = useMutation(UPDATE_EVENT_MUTATION);
  const [joinEvent] = useMutation(JOIN_EVENT_MUTATION);
  const [leaveEvent] = useMutation(LEAVE_EVENT_MUTATION);
  const [addComment ] = useMutation(ADD_COMMENT_MUTATION);

  useEffect(() => {
    if (data && data.eventById && currentUser) {
      setIsOrganizer(data.eventById.organizer.id === currentUser.id);
      const isParticipant = data.eventById.attendees.some((attendee: any)=> attendee.id === currentUser.id);
      setIsAlreadyIn(isParticipant);
    }
  }, [data, currentUser]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const event = data.eventById;
  if (!event) return <p>Event not found</p>;
  
  const handleDetailChange = (name: string, value: string) => {
    setEventDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  const handleBackgroundSelect = (file: File) => {
    setSelectedBackground(file);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setEventDetails({
      ...eventDetails,
      editedName: event.name,
      editedLocalization: event.localization,
      editedDate: event.date,
      editedGeneral_information: event.general_information,
      editedCompetitions: event.competitions,
      editedLocalization_details: event.localization_details
    });
  };

  const handleSave = async () => {
    try {

      const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string;

      let newBannerUrl: string | undefined;

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

      if (selectedBackground) {
        const backgroundResult = await uploadToCloudinary(selectedBackground);
        newBannerUrl = backgroundResult.secure_url;
      }

      const response = await updateEvent({
        variables: {
          updateEventArgs: {
            id: parseInt(eventID, 10),
            name: eventDetails.editedName,
            localization: eventDetails.editedLocalization,
            date: eventDetails.editedDate,
            general_information: eventDetails.editedGeneral_information,
            competitions: eventDetails.editedCompetitions,
            localization_details: eventDetails.editedLocalization_details,
            bannerImage: newBannerUrl,
          },
        },
      });
      setIsEditing(false);
      await refetch();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };
  const cancelEdit = () => {
    setIsEditing(false);
  };

  const handleJoin = async () => {
    if (!currentUser) {
      Notifications.show({ title: 'Zaloguj się', message: 'Musisz być zalogowany, aby dołączyć do wydarzenia.', color: 'red' });
      return;
    }
  
    try {
      await joinEvent({
        variables: {
          eventId: parseInt(eventID, 10),
          userId: currentUser.id, 
        }
      });
      Notifications.show({ title: 'Sukces', message: 'Dołączyłeś do wydarzenia.', color: 'green' });
      refetch(); 
    } catch (error) {
      console.error('Error joining event:', error);
      Notifications.show({ title: 'Błąd', message: 'Nie udało się dołączyć do wydarzenia.', color: 'red' });
    }
  };

  const handleLeave = async () => {
    if (!currentUser) {
      Notifications.show({ title: 'Zaloguj się', message: 'Musisz być zalogowany, aby opuścić wydarzenie.', color: 'red' });
      return;
    }
  
    try {
      await leaveEvent({
        variables: {
          eventId: parseInt(eventID, 10),
          userId: currentUser.id, 
        }
      });
      Notifications.show({ title: 'Sukces', message: 'Opuściłeś wydarzenie.', color: 'green' });
      refetch(); 
    } catch (error) {
      console.error('Error leaving event:', error);
      Notifications.show({ title: 'Błąd', message: 'Nie udało się opuścić wydarzenia.', color: 'red' });
    }
  };

  const handleSubmitComment = async () => {
    const comment = textareaRef.current?.value;
    if (comment && currentUser) {
      try {
        await addComment({
          variables: {
            eventId: event.id,
            userId: currentUser.id,
            content: comment,
          },
        });
        
        refetch();
        
        if (textareaRef.current) {
          textareaRef.current.value = '';
        }
        
        Notifications.show({ title: 'Sukces', message: 'Komentarz został dodany.', color: 'green' });
      } catch (error) {
        console.error('Error submitting comment:', error);
        Notifications.show({ title: 'Błąd', message: 'Nie udało się dodać komentarza.', color: 'red' });
      }
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
            className={styles.eventbanner}
            src={event.bannerImage || defaultBanner}
            alt={'Event Banner'}
            layout="fill"
            objectFit="cover"
          />
          <div className={styles.overlay}></div>
        </div>
      )}
      </div>

      
      <div className={styles.eventDiv}>
        <div className={styles.eventLeft}>
          <div className={styles.eventSquare}>
            <Link href={`../uzytkownicy/${event.organizer.id}`}>
                <Image 
                  priority={true} 
                  className={styles.avatar} 
                  src={event.organizer.avatarImage || defaultAvatar} 
                  alt="Person Avatar" 
                  width={100} 
                  height={100} 
                />
            </Link>
          </div>
          <div className={styles.eventName}>
            <p>{event.organizer.firstname}</p>
            <p>{event.organizer.lastname}</p>
          </div>
        </div>

        <div className={styles.eventName}>
        {isEditing ? (
          <>
            <input 
              placeholder="Nazwa wydarzenia"
              value={eventDetails.editedName} 
              onChange={(e) => setEventDetails({ ...eventDetails, editedName: e.target.value })}
            />
          </>
        ) : (
          <>
            <p>{event.name}</p>
          </>
        )}
        </div>
        <div>
        <div className={styles.divButton}>
        {isOrganizer ? (
          isEditing ? (
            <>
              <button className={styles.button} onClick={handleSave}>Zapisz zmiany</button>
              <button className={styles.buttonCancel} onClick={cancelEdit}>Anuluj</button>
            </>
          ) : (
            <button className={styles.button} onClick={toggleEditMode}>Edytuj Event</button>
          )
        ) : isAlreadyIn ? (
          <button className={styles.buttonCancel} onClick={handleLeave}>Opuść</button>
        ) : (
          <button className={styles.button} onClick={handleJoin}>Dołącz</button>
        )}
        </div>
        </div>
       
      </div>


      <div className={styles.next}>
        <div className={styles.insidenext1}>
        
        <div className={styles.participantscomp}>
          <div className={styles.participantsHeader}>
            Wezmą udział: {event.attendeesCount}
          </div>
          <div className={styles.participantsTable}>
          {event.attendees?.map((attendee: Attendee, index: number) => (
          <Attendee
                key={index}
                id={attendee.id}
                imie={attendee.firstname}
                nazwisko={attendee.lastname}
                avatarImage={attendee.avatarImage}
              />
            ))
          }
        </div>
        </div>
        </div>

        <div className={styles.insidenext2}>
     
          <Detail
          informacje_ogolne={event.general_information}
          konkursy={event.competitions}
          szczegoly_dojazdu={event.localization_details}
          isEditing={isEditing}
          handleDetailChange={handleDetailChange}
            />
        </div>

        <div className={styles.insidenext3}>
        <Map
          lokalizacja={event.localization}        
          data={new Date(event.date)}
          isEditing={isEditing}
          handleDetailChange={handleDetailChange}
        />
        </div>
      </div>

        <div className={styles.afternext}>
          <div className={styles.komentarze}>
            {currentUser && (
              <div className={styles.write}>
                <textarea
                  ref={textareaRef}
                  placeholder='Napisz komentarz'
                />
                <Button fullWidth onClick={handleSubmitComment} color="#8A5FC0" radius="xl">Wyślij</Button>
              </div>
            )}
            {event.comments?.map((comment: Comment, index: number) => (
              <Comment
                key={index}
                id={comment.id}
                userId={comment.user.id}
                imie={comment.user.firstname}
                nazwisko={comment.user.lastname}
                content={comment.content}
                createDate={comment.createDate}
                avatarImage={comment.user.avatarImage}
              />
                ))
              }
          </div>
        </div>
    </div>
  );
}
