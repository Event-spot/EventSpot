'use client'
import styles from './events.module.scss';

import Upbar from '../../components/Upbar/Upbar';
import Event from '../../components/Event/Event';
import Pagination from '../../components/Pagination/Pagination';
import { useState } from 'react';
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

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('');
  const itemsPerPage = 6;
  const { loading, error, data } = useQuery(sortOption ? GET_SORTED_AND_PAGINATED_EVENTS : GET_EVENTS, {
    variables: sortOption ? { 
      sortOption,
      startIndex: (currentPage - 1) * itemsPerPage,
      itemsPerPage
    } : {},
  });
  const totalNumOfPages = Math.ceil((data?.totalEventsCount || 0) / itemsPerPage);
  const currentEventy = data?.events || [];
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data?.events.length);





  return (
<div className={styles.main}>

  <div>
    <Upbar pageType="wydarzenia" onSortChange={setSortOption}/>
  </div>
  

  <div className={styles.container}>
            
                <div className={styles.container}>
                {!loading && data?.events &&
                    currentEventy.map((event: Event, index: number) => (
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

