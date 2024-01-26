'use client'
import React, {useState} from 'react';
import styles from './EventCreator.module.scss';
import { useForm } from 'react-hook-form'; 
import * as yup from 'yup';
import { gql, useMutation } from "@apollo/client";
import{yupResolver} from '@hookform/resolvers/yup';


const CREATE_EVENT_MUTATION = gql `
    
mutation AddEvent($addEventArgs: AddEventArgs!) {
    addEvent(addEventArgs: $addEventArgs)
}
`;


export const EventCreator = () => {
  const actualDate = new Date().toISOString().split("T")[0];
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const combineDateAndTime = (date:any, time:any) => {
    const dateTime = new Date(date + 'T' + time);
    return dateTime.toISOString();};
    
    
//     const schema = yup.object().shape({
//         EventName: yup.string().required("Wymagana jest nazwa wydarzenia,"),
//         EventDate: yup.string().required("wymagana jest data wydarzenia,") .test('is-future-date', 'Nie można wybrać przeszłej daty.', function (value) {
//             const selectedDate = new Date(value);
//             return selectedDate >= actualDate;
//         }),
//         EventTime:yup.string().required("Wymagana jest godzina wydarzenia"),
//         EventLocalization: yup.string().required("Wymagana jest lokalizacja wydarzenia,"),
//         EventGeneralInformation: yup.string().required("Wymagany jest opis wydarzenia"),
//         EventCompetitions:yup.string().nullable(),
//         EventDriveTips:yup.string().nullable(),
//         EventAvatarImg: yup.mixed().nullable(),
//         EventBackgroundImg:yup.mixed().nullable()

//     }) 
    const { register, handleSubmit } = useForm({
        // resolver: yupResolver(schema),
    });

    

    const [createEvent] = useMutation(CREATE_EVENT_MUTATION);
    
    const onSubmit = (data) => {
        const eventData = {
            name: data.EventName,
            date: combineDateAndTime(data.EventDate, data.EventTime),
            localization: data.EventLocalization,
            general_information: data.EventGeneralInformation,
            competitions: data.EventCompetitions,
            localization_details: data.EventDriveTips,
            // Uwaga: Obrazy będą wymagały specjalnego traktowania
        };
    
        createEvent({ variables: { addEventArgs: eventData } })
            .then(response => {
                // Obsługa odpowiedzi
            })
            .catch(error => {
                console.error("Błąd GraphQL:", error);
            });
            setIsFormSubmitted(true);
            console.log(eventData)  ;
    };
      

    

  


 
   

    return (
        <div className={styles.Main}>

            <p className={styles.topic}>Utwórz Wydarzenie</p>
            {/* <p className={styles.error}>{errors.EventName?.message} {errors.EventDate?.message} {errors.EventTime?.message} {errors.EventLocalization?.message} {errors.EventGeneralInformation?.message}</p> */}
            {isFormSubmitted && <p className={styles.aprove}>Wydarzenie zostało pomyślnie utworzone!</p>}
        <form id="EventCreator" className={styles.form} onSubmit={handleSubmit(onSubmit)}><div className={styles.MainForm}>
              <div className={styles.up}>
                    <div className={styles.upA}><p>Nazwa wydarzenia:</p><input type="text" required placeholder="Nazwa wydarzenia..." {...register("EventName")}/></div>
                    <div className={styles.upB}><p>Data wydarzenia:</p><input type="date" required min={actualDate} {...register("EventDate")}/></div>
                    <div className={styles.upC}><p>Godzina wydarzenia:</p><input type="time" required {...register("EventTime")} /></div>
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
                        <p>Dodaj zdjęcie avataru</p>
                    <input type="file" id="avatar"  accept="image/png, image/jpeg" {...register("EventAvatarImg")}/>
                    </div>
                    <div className={styles.downB}>
                        <p>Dodaj zdjęcie tła</p>
                        <input type="file" id="background"  accept="image/png, image/jpeg"{...register("EventBackgroundImg")} />
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

