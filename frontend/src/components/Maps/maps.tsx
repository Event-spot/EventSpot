'use client'
import React, { useState, useEffect, useRef} from 'react';
import styles from './maps.module.scss';
import {Loader} from '@googlemaps/js-api-loader';

type MapProps ={
  lokalizacja:string;
  data:Date;
  isEditing: boolean;
  handleDetailChange: (name: string, value: string) => void;
}

const Map: React.FC<MapProps> = ({lokalizacja, data, isEditing, handleDetailChange}) => {
  const [editedLocalization, setEditedLocalization] = useState(lokalizacja);
  const [editedDate, setEditedDate] = useState(data.toISOString().slice(0, 16));
  const mapRef = useRef<HTMLDivElement>(null);
  const getMinDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (!isEditing) {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: 'weekly',
      });
  
      loader.load().then(() => {
        const google = window.google;
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: editedLocalization }, (results, status) => {
          if (status === 'OK' && results != null && results.length > 0) {
            const position = results[0].geometry.location;
            if (mapRef.current) {
              // Assign the map instance to a variable
              const map = new google.maps.Map(mapRef.current, {
                center: position,
                zoom: 15,
              });
              // Use the map variable when creating the marker
              new google.maps.Marker({
                position,
                map: map, // Correctly pass the map instance here
              });
            }
          } else {
            console.error(`Geocoding failed: ${status}`);
          }
        });
      });
    }
  }, [editedLocalization, isEditing]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "editedLocalization") {
      setEditedLocalization(value);
    } else if (name === "editedDate") {
      setEditedDate(value);
    }
    // Assuming the parent component can handle these updates appropriately.
    handleDetailChange(name, value);
  };
  

  const handleNavigation = () => {
    const encodedLocation = encodeURIComponent(lokalizacja);
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
  
    <div className={styles.maps}>
      <div className={styles.date}>
      {isEditing ? (
          <>
            <input 
              type="datetime-local"
              name="editedDate"
              value={editedDate}
              required min={getMinDateTime()}
              onChange={handleChange}
            />
            <input 
              type="text"
              placeholder="Lokalizacja"
              name="editedLocalization"
              value={editedLocalization}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <p>{`${data.getFullYear()}-${(data.getMonth() + 1).toString().padStart(2, '0')}-${data.getDate().toString().padStart(2, '0')} ${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')}`}</p>
            <div className={styles.address}>
              <div className={styles.addressName}>{lokalizacja}</div>
            </div>
          </>
        )}
      </div>
     
      <button className={styles.buttonnav} onClick={handleNavigation}><p>Nawiguj &gt;</p></button>
      <div className={styles.mapa} ref={mapRef}>
      
        
      </div>
    </div>
  );
};

export default Map;
