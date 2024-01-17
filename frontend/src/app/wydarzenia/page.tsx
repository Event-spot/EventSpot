'use client'
import styles from './events.module.scss';

import Upbar from '../../components/Upbar/Upbar';
import Event from '../../components/Event/Event';
import Pagination from '../../components/Pagination/Pagination';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EVENTS} from './graphql/schema';

interface Event {
  id:number;
 name:string;
}
export default function wydarzenia() {

  const [currentPage, setCurrentPage] = useState(1);
  const {loading,error, data} = useQuery(GET_EVENTS);
  const itemsPerPage = 6;
  const totalNumOfPages = Math.ceil((data?.events.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data?.events.length);
  const currentEventy = data?.events.slice(startIndex, endIndex) || [];





  return (
<div className={styles.main}>

  <div>
    <Upbar/>
  </div>
  

  <div className={styles.container}>
            
                <div className={styles.container}>
                {!loading && data?.events &&
                    currentEventy.map((event: Event, index: number) => (
                        <Event
                        id={event.id}
                        key={index}
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

