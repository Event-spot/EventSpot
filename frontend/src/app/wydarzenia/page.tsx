'use client'
import styles from './events.module.scss';
import Upbar from '../../components/Upbar/Upbar';
import Event from '../../components/Event/Event';
import {gql} from "@apollo/client";
import Pagination from '../../components/Pagination/Pagination';
import { useState, useEffect  } from 'react';
import { useQuery } from '@apollo/client';

interface Event {
  id:number;
 name:string;
 localization:string;
 date:Date;
 bannerImage: string;
 organizer: string;
}
export default function wydarzenia() {
    const GET_EVENTS=gql`query {
        events {
          id
          name
          localization
          date
          bannerImage
          organizer{
            firstname
            lastname
          }
        }
    }` 
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [currentEventy, setCurrentEventy] = useState<Event[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const {loading,error, data} = useQuery(GET_EVENTS);
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');
    const [filterLocalization, setFilterLocalization] = useState('');
    const [filterOrganizer, setFilterOrganizer] = useState('');
    
    // Ograniczenie liczby osób na stronie
    const itemsPerPage = 6;
    const totalNumOfPages = Math.ceil((data?.events.length || 0) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data?.events.length);
    // const currentEventy = data?.events.slice(startIndex, endIndex) || [];
   
    
    
    useEffect(() => {

      let sortedEventy = [...(data?.events.slice(startIndex, endIndex) || [])];

      if (filterStartDate && filterEndDate) {
          sortedEventy = sortedEventy.filter(event => {
              const eventDate = new Date(event.date);
              return eventDate >= new Date(filterStartDate) && eventDate <= new Date(filterEndDate);
          });
      }
        if (filterLocalization) {
            sortedEventy = sortedEventy.filter(event => 
                event.localization.toLowerCase().includes(filterLocalization.toLowerCase())
            );
        }
        if (filterOrganizer) {
            sortedEventy = sortedEventy.filter(event => {
                const organizerFullName = `${event.organizer.firstname} ${event.organizer.lastname}`.toLowerCase();
                return organizerFullName.includes(filterOrganizer.toLowerCase());
            });
        }


    if (searchQuery) {
      sortedEventy = sortedEventy.filter(event =>
          event.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }
      switch (sortOption) {
          case 'date-':
              sortedEventy.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
              break;
          case 'date+':
              sortedEventy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
              break;
          case 'location':
              sortedEventy.sort((a, b) => a.localization.localeCompare(b.localization));
              break;





          default:
              // Domyślne zachowanie, może być bez sortowania
              break;
      }
      setCurrentEventy(sortedEventy);
}, [sortOption, data?.events, currentPage, filterStartDate, filterEndDate, filterLocalization,filterOrganizer, searchQuery]);

  return (
<div className={styles.main}>

  <div className={styles.upbar}>
  <Upbar 
    pageType="wydarzenia" 
    onSearchQueryChange={(query) => setSearchQuery(query)}
    onLocalizationFilterChange={(newLocalization) => setFilterLocalization(newLocalization)}
    onOrganizerFilterChange={(newOrganizer) => setFilterOrganizer(newOrganizer)}
    onSortChange={(selectedSort) => setSortOption(selectedSort)} 
    onDateFilterChange={(start, end) => {
        setFilterStartDate(start);
        setFilterEndDate(end);
        
    }}/>
  </div>
  

  <div className={styles.container}>
            
                <div className={styles.container}>
                {!loading && data?.events &&
                    currentEventy.map((event: Event, index: number) => (
                        <Event
                        id={event.id}
                        key={index}
                        lokalizacja={event.localization}
                        data={new Date(event.date)}
                        nazwa={event.name}
                        bannerImage={event.bannerImage}
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

