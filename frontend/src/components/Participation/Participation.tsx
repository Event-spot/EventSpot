// participantsTable.js
import React from 'react';
import styles from './participation.module.scss';

const Participation = () => {

 
  return (
  <div className={styles.participantscomp}>
    <div className={styles.participantsHeader}>
      Wezmą udział
    </div>
    <div className={styles.participantsTable}>
     
      <div className={styles.tableContent}>
        <div className={styles.row}>
          <div className={styles.cell}>Imię</div>
          <div className={styles.cell}>Nazwisko</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>Imię</div>
          <div className={styles.cell}>Nazwisko</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>Imię</div>
          <div className={styles.cell}>Nazwisko</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>Imię</div>
          <div className={styles.cell}>Nazwisko</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>Imię</div>
          <div className={styles.cell}>Nazwisko</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>Imię</div>
          <div className={styles.cell}>Nazwisko</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>Imię</div>
          <div className={styles.cell}>Nazwisko</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>Imię</div>
          <div className={styles.cell}>Nazwisko</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>Imię</div>
          <div className={styles.cell}>Nazwisko</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>Imię</div>
          <div className={styles.cell}>Nazwisko</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>Imię</div>
          <div className={styles.cell}>Nazwisko</div>
        </div>
        {/* Tutaj możesz mapować listę uczestników i generować wiersze dla każdego z nich */}
      </div>
    </div>
    </div>
  );
};

export default Participation;
