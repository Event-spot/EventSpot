'use client'
import React, { useRef, useState } from 'react';
import styles from './contactform.module.scss';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const ContactForm = () => {
  const schema = yup.object().shape({
    PhoneNumber: yup.string().matches(/^\d{9}$/, "Numer telefonu musi składać się z 9 cyfr").required("To pole jest wymagane"),
    Email: yup.string().email("Podaj poprawny adres e-mail").required("To pole jest wymagane"),
    Topic: yup.string().required("To pole jest wymagane"),
    Details: yup.string().required("To pole jest wymagane"),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const eventRef = useRef<React.BaseSyntheticEvent>();

  const onSubmit = (data: any) => {
    console.log(data);
    setIsFormSubmitted(true);
    reset(); // Resetuje wartości pól formularza
    // Tutaj możesz korzystać z eventRef.current
  };

  return (
    <div className={styles.formularz}>
      {isFormSubmitted && <p className={styles.aprove}>Formularz został pomyślnie wysłany!</p>}
      <form
        onSubmit={(e) => {
          eventRef.current = e;
          handleSubmit(onSubmit)(e);
        }}
      >
        <div className={styles.upA}>
          <label htmlFor="numer-telefonu">Numer telefonu:</label>
          <input
            type="tel"
            id="numer-telefonu"
            {...register("PhoneNumber")}
          />
          {errors.PhoneNumber && <p>{errors.PhoneNumber.message}</p>}
        </div>

        <div className={styles.upB}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            {...register("Email")}
          />
          {errors.Email && <p>{errors.Email.message}</p>}
        </div>

        <div className={styles.upC}>
          <label htmlFor="temat">Temat rozmowy:</label>
          <input
            type="text"
            id="temat"
            {...register("Topic")}
          />
          {errors.Topic && <p>{errors.Topic.message}</p>}
        </div>
        <div className={styles.upD}>
         <label htmlFor="opis">Wprowadź swój opis:</label>
          <textarea id="opis"{...register("Details")}/>
          {errors.Details && <p>{errors.Details.message}</p>}
        </div>
        <div className={styles.upE}>
          <button type="submit">Wyślij</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;