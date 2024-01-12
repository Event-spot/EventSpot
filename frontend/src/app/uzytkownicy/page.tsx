'use client'
import styles from './users.module.scss';
import osoby from './osoby.json';
import Person from '../../components/Person/Person';
import Pagination from '../../components/Pagination/Pagination';
import { useState } from 'react';

export default function Users() {
    const [currentPage, setCurrentPage] = useState(1);
    //const lastPage = 20; //Zmienić później tak aby pobierało z bazy danych.
    // Ograniczenie liczby osób na stronie
    const itemsPerPage = 10;
    // Obliczenie całkowitej liczby stron
    const totalNumOfPages = Math.ceil(osoby.length / itemsPerPage);
    // Obliczenie indeksów osób dla obecnej strony
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, osoby.length);
    // Wyświetlenie osób dla obecnej strony
    const currentOsoby = osoby.slice(startIndex, endIndex);

    return(
        <div className={styles.main}>
            <div className={styles.upbar}>
             <div className={styles.search}>
                <input className={styles.searchinput} type="text" placeholder="Szukaj..."/>
                <svg className={styles.searchIconSvg} xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                </svg>
             </div>


             <div className={styles.filters}>
              <p>Filtry zaawansowane<svg className={styles.filtersIconSvg} xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
               <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/>
               </svg></p>
             
             </div>
        </div>

            <div className={styles.users}>
            <div className={styles.pages}>
                <div className={styles.container}>
                    {currentOsoby.map((osoba, index) => (
                        <Person
                        key={index}
                        imie={osoba.imie}
                        nazwisko={osoba.nazwisko}
                        lokalizacja={osoba.lokalizacja}
                        odwiedzoneSpoty={osoba.odwiedzoneSpoty}
                        obserwowani={osoba.obserwowani}
                        obserwujacy={osoba.obserwujacy}
                        />))}
                    </div>
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
       
    )
}