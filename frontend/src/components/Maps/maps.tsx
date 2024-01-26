'use client'
import React, {useEffect} from 'react';
import styles from './maps.module.scss';
import {Loader} from '@googlemaps/js-api-loader';

type MapProps ={
  lokalizacja:string;
  data:Date;
}

const Map: React.FC<MapProps> = ({lokalizacja,data}) => {




  const mapRef= React.useRef<HTMLDivElement>(null);  

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
      version: 'weekly',
    });

    console.log(process.env.NEXT_PUBLIC_MAPS_API_KEY)
  
    loader.load().then(() => {
      const google = window.google; // window.google będzie dostępne po załadowaniu skryptu
      const geocoder = new google.maps.Geocoder();
  
      geocoder.geocode({ address: lokalizacja }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          const position = results[0].geometry.location;
          if (mapRef.current) {
            const map = new google.maps.Map(mapRef.current, {
              center: position,
              zoom: 15,
            });
            new google.maps.Marker({
              map: map,
              position: position,
            });
          }
        } else {
          console.error('Geocoding failed: ' + status);
        }
      });
    });
  }, [lokalizacja]);
  

  const handleNavigation = () => {
    const encodedLocation = encodeURIComponent(lokalizacja);
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`;
    window.open(googleMapsUrl, '_blank');
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
<p>
  {data.getFullYear()}-{(data.getMonth() + 1).toString().padStart(2, '0')}-{data
    .getDate()
    .toString()
    .padStart(2, '0')}/{data.getHours().toString().padStart(2, '0')}:{data
    .getMinutes()
    .toString()
    .padStart(2, '0')}
</p>
      </div>
      <div className={styles.address}>
      <div className={styles.addressname}>{lokalizacja}</div>
      </div>
      <button className={styles.buttonnav} onClick={handleNavigation}><p>Nawiguj ></p></button>
      <div className={styles.mapa} ref={mapRef}>
      
        
      </div>
    </div>
  );
};

export default Map;
