'use client'
import React, {useState} from 'react';
import styles from './EventCreator.module.scss';
import { useForm } from 'react-hook-form'; 
import { gql, useMutation } from "@apollo/client";
import UploadForm from '../UploadTest/Upload';
import { useAuth } from "@/context/AuthContext";
import { Notifications } from '@mantine/notifications';


const CREATE_EVENT_MUTATION = gql `
    
mutation AddEvent($addEventArgs: AddEventArgs!) {
    addEvent(addEventArgs: $addEventArgs)
}
`;


export const EventCreator = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState<File | null>(null);
  const getMinDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };
  const {currentUser} = useAuth();



    const handleBackgroundSelect = (file: File) => {
        setSelectedBackground(file);
      };

    const { register, handleSubmit } = useForm({
    });

    

    const [createEvent] = useMutation(CREATE_EVENT_MUTATION);
    
    const onSubmit = async (data:any) => {
      if (!currentUser) {
        Notifications.show({ title: 'Zaloguj się', message: 'Musisz być zalogowany, aby utworzyć wydarzenie.', color: 'red' });
        return;
      }

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

        const eventData = {
            name: data.EventName,
            date: data.EventDate,
            localization: data.EventLocalization,
            general_information: data.EventGeneralInformation,
            competitions: data.EventCompetitions,
            localization_details: data.EventDriveTips,
            bannerImage: newBannerUrl,
            organizerId: currentUser.id,
        };

        createEvent({ variables: { addEventArgs: eventData } })
            .then(response => {
            })
            .catch(error => {
                console.error("Błąd GraphQL:", error);
            });
            setIsFormSubmitted(true);
    };
      



  


 
   

    return (
        <div className={styles.Main}>
            <p className={styles.topic}>Utwórz Wydarzenie</p>
            {isFormSubmitted && <p className={styles.aprove}>Wydarzenie zostało pomyślnie utworzone!</p>}
        <form id="EventCreator" className={styles.form} onSubmit={handleSubmit(onSubmit)}><div className={styles.MainForm}>
              <div className={styles.up}>
                    <div className={styles.upA}><p>Nazwa wydarzenia:</p><input type="text" required placeholder="Nazwa wydarzenia..." {...register("EventName")}/></div>
                    <div className={styles.upB}><p>Data wydarzenia:</p><input type="datetime-local" required min={getMinDateTime()} {...register("EventDate")}/></div>
                    <div className={styles.upD}><p>Adres wydarzenia:</p><input type="text" required placeholder="Adres wydarzenia..." {...register("EventLocalization")}/>
                    </div>
                </div>
                <div className={styles.mid}>
                    <div className={styles.midA}><p>Informacje ogólne:</p><textarea form="EventCreator" required placeholder="Informacje ogólne..."{...register("EventGeneralInformation")}/></div>
                    <div className={styles.midB}><p>Konkursy:</p><textarea form="EventCreator" placeholder="Konkursy..."{...register("EventCompetitions")}/></div>
                    <div className={styles.midC}><p>Szczegóły dojazdu:</p><textarea form="EventCreator"placeholder="Szczegóły dojazdu..."{...register("EventDriveTips")}/></div>
                </div>
                <div className={styles.down}>
                    <div className={styles.downA}>
                        <p>Dodaj zdjęcie tła</p>
                        <UploadForm  onFileSelect={handleBackgroundSelect} />
                    </div>
                    <div className={styles.downB}>
                    </div >
                    <div className={styles.Submit}>
                    <input type="submit" />
                    </div>
                   
                </div>
                </div>
        </form>
        
        </div>
        
    );
}

