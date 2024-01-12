'use client'
import styles from './events.module.scss';
import eventy from './eventy.json';
import Upbar from '../../components/Upbar/Upbar';
import Event from '../../components/Event/Event';
import Pagination from '../../components/Pagination/Pagination';
import { useState } from 'react';


export default function wydarzenia() {

  const [currentPage, setCurrentPage] = useState(1);
  //const lastPage = 20; //Zmienić później tak aby pobierało z bazy danych.
  // Ograniczenie liczby osób na stronie
  const itemsPerPage = 6;
  // Obliczenie całkowitej liczby stron
  const totalNumOfPages = Math.ceil(eventy.length / itemsPerPage);
  // Obliczenie indeksów osób dla obecnej strony
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, eventy.length);
  // Wyświetlenie osób dla obecnej strony
  const currentEventy = eventy.slice(startIndex, endIndex);





  return (
<div className={styles.main}>

  <div>
    <Upbar/>
  </div>
  

  <div className={styles.container}>
            
                <div className={styles.container}>
                    {currentEventy.map((event, index) => (
                        <Event
                        key={index}
                        nazwa={event.nazwa}
                        
                        />))}
                    </div>
    
  </div>  

  <div className={styles.downbar}>
                <Pagination
                    currentPage={currentPage}
                    lastPage={totalNumOfPages}
                    maxLength={7}
                    setCurrentPage={setCurrentPage}
                />
            </div>
  
</div>


    
  );
};

