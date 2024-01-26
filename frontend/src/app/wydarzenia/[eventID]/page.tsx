'use client'
import { useQuery } from "@apollo/client";
import Attendee from "../../../components/attendeelist/attendeelist"
import styles from './event.module.scss';
import Image from 'next/image';
import eventimage from '../../../assets/images/isb.png';
import Map from '../../../components/Maps/maps';
import Comment from '../../../components/comments/comments';
import Detail from '../../../components/details/details';
import { gql } from "@apollo/client";
import { useRef } from "react";

type Event = {
  id:number;
 name:string;
 localization:string;
};
type Comment = {
  user: any;
  id:number;
  content:string;
  createDate:string;
  firstname: string;
  lastname:string;
};
type Attendee = {
  id:number;
  firstname:string;
  lastname:string;
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
const GET_EVENTS= gql`
query{
  eventById(eventId: ${eventID}){
    id,
    name,
    localization,
    date
    general_information
    competitions
    localization_details
    attendees{
      firstname,
      lastname
    }
    comments {
      id
      content
      createDate
      user {
        id
        firstname
        lastname
      }
    }

  }
}
`
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const event = data.eventById;
  if (!event) return <p>Event not found</p>;
  return (
    <div className={styles.main}>
    
      
      <div className={styles.up}>
        <Image
          className={styles.eventbanner}
          src={eventimage}
          alt={'Event Banner'}
          layout="fill"
          objectFit="cover"
        />
      </div>

      
      <div className={styles.eventDiv}>
        <div className={styles.eventLeft}>
          <div className={styles.eventSquare}>
         
          </div>
          <div className={styles.eventName}>
          <p>{event.name}</p>
          </div>
        </div>
       
      </div>


      <div className={styles.next}>
        <div className={styles.insidenext1}>
        
        <div className={styles.participantscomp}>
          <div className={styles.participantsHeader}>
            Wezmą udział
          </div>
          <div className={styles.participantsTable}>
          {event.attendees?.map((attendee: Attendee, index: number) => (
          <Attendee
                key={index}
                id={attendee.id}
                imie={attendee.firstname}
                nazwisko={attendee.lastname}
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
            />
        </div>

        <div className={styles.insidenext3}>
        <Map
          data={event.date}
          lokalizacja={event.localization}        
        />
        </div>
      </div>

      <div className={styles.afternext}>
        <div className={styles.komentarze}>
        <div className={styles.write}>
        <textarea
          ref={textareaRef}
          placeholder='Napisz komentarz'/>
      </div>
        {event.comments?.map((comment: Comment, index: number) => (
          <Comment
          key={index}
          id={comment.id}
          imie={comment.user.firstname}
          nazwisko={comment.user.lastname}
          content={comment.content}
          createDate={comment.createDate}/>
            ))
          }
          </div>
      </div>
    </div>
  );
}
