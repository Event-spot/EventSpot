// Map.js
import React from 'react';
import styles from './maps.module.scss';

type MapProps ={
  lokalizacja:string;
  data:Date;
}

const Map: React.FC<MapProps> = ({

lokalizacja,
data
}) => {
  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    return ` ${day}.${month}.${year}, ${hours}:${minutes}`;
  };

  return (
  
    <div className={styles.maps}>
      
      <div className={styles.button}>
      <button className={styles.roundedButton}>Wezmę udział</button>
      </div>
      <div className={styles.date}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="14"
          viewBox="0 0 448 512"
        >
          <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
        </svg>
        {data}
      </div>
      <div className={styles.address}>
      <div className={styles.addressname}>{lokalizacja}</div>
      </div>
      <button className={styles.buttonnav}><p>Nawiguj ></p></button>
      <div className={styles.mapa}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d79938.5195540274!2d22.5378304!3d51.236044799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spl!2spl!4v1705355773795!5m2!1spl!2spl"
          width="100%"
          height="100%"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
