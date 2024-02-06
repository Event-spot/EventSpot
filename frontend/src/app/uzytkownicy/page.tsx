'use client'
import styles from './users.module.scss';
import Person from '../../components/Person/Person';
import Pagination from '../../components/Pagination/Pagination';
import { useState, useEffect  } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from './graphql/schema';
import UpBar from '@/components/Upbar/Upbar';

interface Person {
    id: number;
    firstname: string;
    lastname: string;
    localization: string;
    eventsCount: number;
    followersCount: number;
    followingsCount: number;
    avatarImage: string;
}

export default function Users() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [currentOsoby, setCurrentOsoby] = useState<Person[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const {loading,error, data} = useQuery(GET_USERS);
    const [filterLocalization, setFilterLocalization] = useState('');
    // Ograniczenie liczby osób na stronie
    const itemsPerPage = 10;
    const totalNumOfPages = Math.ceil((data?.users.length || 0) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data?.users.length);
    // const currentOsoby = data?.users.slice(startIndex, endIndex) || [];
    useEffect(() => {
        let sortedOsoby = [...(data?.users.slice(startIndex, endIndex) || [])];
        if (filterLocalization) {
            sortedOsoby = sortedOsoby.filter(person => 
                person.localization.toLowerCase().includes(filterLocalization.toLowerCase())
            );
        }
        if (searchQuery) {
            sortedOsoby = sortedOsoby.filter(person =>
                (person.firstname.toLowerCase() + ' ' + person.lastname.toLowerCase()).includes(searchQuery.toLowerCase())
            );
        }
        
        switch (sortOption) {
            case 'odwiedzoneSpoty':
                sortedOsoby.sort((a, b) => b.eventsCount - a.eventsCount);
                break;
            case 'obserwujacy':
                sortedOsoby.sort((a, b) => b.followersCount - a.followersCount);
                break;
            case 'obserwowani':
                sortedOsoby.sort((a, b) => b.followingsCount - a.followingsCount);
                break;
            // Dodaj więcej opcji sortowania tutaj
            default:
                // Domyślne zachowanie, może być bez sortowania
                break;
        }
        setCurrentOsoby(sortedOsoby); // Użyj stanu do przechowywania posortowanych osób
    }, [sortOption, data?.users, currentPage,  filterLocalization, searchQuery]);

    return(
        <div className={styles.main}>
            <div className={styles.upbar}>
            <UpBar 
            pageType="uzytkownicy"
            onSearchQueryChange={(query) => setSearchQuery(query)}
            onLocalizationFilterChange={(newLocalization) => setFilterLocalization(newLocalization)}
             onSortChange={(selectedSort) => setSortOption(selectedSort)} />
            </div>
                <div className={styles.container}>
                    {!loading && data?.users &&
                        currentOsoby.map((osoba: Person, index: number) => (
                            <Person
                            id={osoba.id}
                            key={index}
                            imie={osoba.firstname}
                            nazwisko={osoba.lastname}
                            lokalizacja={osoba.localization || "Miejscowość"}
                            odwiedzoneSpoty={osoba.eventsCount}
                            obserwowani={osoba.followingsCount}
                            obserwujacy={osoba.followersCount}
                            avatarImage={osoba.avatarImage}
                            />
                        ))
                    }
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