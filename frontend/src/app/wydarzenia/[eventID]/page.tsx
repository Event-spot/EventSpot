'use client'

import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../graphql/schema";
import { useState } from 'react';
import Attendee from "../../../components/attendeelist/attendeelist"
import styles from './event.module.scss';
import Image from 'next/image';
import eventimage from '../../../assets/images/isb.png';
import Maps from '../../../components/Maps/maps';
import Comments from '../../../components/comments/comments';
import Details from '../../../components/details/details';

type Event = {
  id:number,
 name:string;
};
type Attendee = {
  id:number,
 name:string;
firstname:string;
lastname:string;
};


type Params = {
  params: {
    eventID: string;
  };
};

export default function Event({ params: { eventID } }: Params) {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const event = data.events.find((event: Event) => event.id === parseInt(eventID, 10));

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
          {!loading && data?.events &&
           event.attendees.map((attendee: Attendee, index: number) => (
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
          <Details/>

        </div>


        <div className={styles.insidenext3}>
        <Maps/>
        </div>
      </div>

      <div className={styles.afternext}>
        <div className={styles.komentarze}>
            <Comments />
          </div>
      </div>
    </div>
  );
}
