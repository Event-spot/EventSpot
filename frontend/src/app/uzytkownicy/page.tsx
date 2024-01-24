'use client'
import styles from './users.module.scss';
import Person from '../../components/Person/Person';
import Pagination from '../../components/Pagination/Pagination';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from './graphql/schema';
import Upbar from '@/components/Upbar/Upbar';

interface Person {
    id: number;
    firstname: string;
    lastname: string;
    localization: string;
    spotsVisited: number;
    followers: number;
    following: number;
}

export default function Users() {
    const [currentPage, setCurrentPage] = useState(1);
    const {loading,error, data} = useQuery(GET_USERS);
    // Ograniczenie liczby osób na stronie
    const itemsPerPage = 10;
    const totalNumOfPages = Math.ceil((data?.users.length || 0) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data?.users.length);
    const currentOsoby = data?.users.slice(startIndex, endIndex) || [];


    return(
        <div className={styles.main}>
            <div>
            <Upbar pageType="uzytkownicy"/>
            </div>

            <div className={styles.users}>
            <div className={styles.pages}>
                <div className={styles.container}>
                    {!loading && data?.users &&
                        currentOsoby.map((osoba: Person, index: number) => (
                            <Person
                            id={osoba.id}
                            key={index}
                            imie={osoba.firstname}
                            nazwisko={osoba.lastname}
                            lokalizacja={osoba.localization}
                            odwiedzoneSpoty={osoba.spotsVisited}
                            obserwowani={1}
                            obserwujacy={1}
                            />
                        ))
                    }
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