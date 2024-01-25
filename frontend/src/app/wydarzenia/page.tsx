'use client'
import styles from './events.module.scss';
import Upbar from '../../components/Upbar/Upbar';
import Event from '../../components/Event/Event';
import Pagination from '../../components/Pagination/Pagination';
import { useState, useEffect  } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EVENTS} from './graphql/schema';
import { GET_SORTED_AND_PAGINATED_EVENTS} from './graphql/schema2';

interface Event {
  id:number;
 name:string;
 localization:string;
 date:string;
}
export default function wydarzenia() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [currentEventy, setCurrentEventy] = useState<Event[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const {loading,error, data} = useQuery(GET_EVENTS);
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');
    const [filterLocalization, setFilterLocalization] = useState('');
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
}, [sortOption, data?.events, currentPage, filterStartDate, filterEndDate, filterLocalization, searchQuery]);





  return (
<div className={styles.main}>

  <div>
  <Upbar 
    pageType="wydarzenia" 
    onSearchQueryChange={(query) => setSearchQuery(query)}
    onLocalizationFilterChange={(newLocalization) => setFilterLocalization(newLocalization)}
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
                        // .sort((a:any, b:any) a.eventsCount - b.eventsCount)
                        <Event
                        id={event.id}
                        key={index}
                        lokalizacja={event.localization}
                        data={event.date}
                        nazwa={event.name}
                        
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

