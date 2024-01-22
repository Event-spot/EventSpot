
import React from 'react';
import styles from './kontakt.module.scss';
import FAQ from '../../components/faq/faq';
import ContactForm from '../../components/contactform/contactform';

const Kontakt = () => {
   
    return(
<div className={styles.kontakt}>
         <div className={styles.form}> 
         <h3>Formularz Kontaktowy</h3>
            <ContactForm/>
         </div>
      <div className={styles.faq}>
        <h3>FAQ</h3>
        <FAQ/>
      </div>
    <div className={styles.Dane}>
   
      <div className={styles.DaneKontaktowe}>
        <h3>Numer telefonu</h3>
        <p>+48 123 456 789</p>
        <h3>Adres e-mail</h3>
        <p>kontakt@eventspot.com</p>
        <h3>Adres</h3>
        <p>xxxxxxxxxx, 32-500 Chrzanów</p>
      </div>
        <div className={styles.mapa}>
      <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d81847.39811349454!2d19.276298076841172!3d50.128751847240615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716ebdd9d1e2a0b%3A0x5761d70c6361a3f4!2zQ2hyemFuw7N3!5e0!3m2!1spl!2spl!4v1705959029883!5m2!1spl!2spl"
          width="100%"
          height="100%"
          loading="lazy"
        ></iframe>
        </div>
      
    </div>
</div>
    
  );
};

export default Kontakt;
