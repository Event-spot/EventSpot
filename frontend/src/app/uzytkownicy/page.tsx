'use client'
import styles from './users.module.scss';
import Person from '../../components/Person/Person';
import Pagination from '../../components/Pagination/Pagination';
import { useState, useEffect  } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from './graphql/schema';
import UpBar2 from '@/components/Upbar/Upbar2';

interface Person {
    id: number;
    firstname: string;
    lastname: string;
    localization: string;
    eventsCount: number;
    followersCount: number;
    followingsCount: number;
}

export default function Users() {
    const [sortOption, setSortOption] = useState('');
    const [currentOsoby, setCurrentOsoby] = useState<Person[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const {loading,error, data} = useQuery(GET_USERS);
    // Ograniczenie liczby osób na stronie
    const itemsPerPage = 10;
    const totalNumOfPages = Math.ceil((data?.users.length || 0) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data?.users.length);
    // const currentOsoby = data?.users.slice(startIndex, endIndex) || [];
    useEffect(() => {
        let sortedOsoby = [...(data?.users.slice(startIndex, endIndex) || [])];
        switch (sortOption) {
            case 'odwiedzoneSpoty':
                sortedOsoby.sort((a, b) => a.eventsCount - b.eventsCount);
                break;
            case 'obserwujacy':
                sortedOsoby.sort((a, b) => b.followersCount - a.followersCount);
                break;
            // Dodaj więcej opcji sortowania tutaj
            default:
                // Domyślne zachowanie, może być bez sortowania
                break;
        }
        setCurrentOsoby(sortedOsoby); // Użyj stanu do przechowywania posortowanych osób
    }, [sortOption, data?.users, currentPage]);

    return(
        <div className={styles.main}>
            <div>
            <UpBar2 onSortChange={(selectedSort) => setSortOption(selectedSort)} />
            {/* <UpBar 
            // ageType="uzytkownicy"
            /> */}
            </div>

            <div className={styles.users}>
            <div className={styles.pages}>
                <div className={styles.container}>
                    {!loading && data?.users &&
                        currentOsoby.map((osoba: Person, index: number) => (
                            // .sort((a:any, b:any) => a.eventsCount - b.eventsCount)
                            <Person
                            id={osoba.id}
                            key={index}
                            imie={osoba.firstname}
                            nazwisko={osoba.lastname}
                            lokalizacja={osoba.localization}
                            odwiedzoneSpoty={osoba.eventsCount}
                            obserwowani={osoba.followingsCount}
                            obserwujacy={osoba.followersCount}
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