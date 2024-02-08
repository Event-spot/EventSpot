import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import Upbar from '../components/Upbar/Upbar';
import Event from '../components/Event/Event';
import Pagination from '../components/Pagination/Pagination';

interface Event {
    id:number;
   name:string;
   localization:string;
   date:Date;
   bannerImage: string;
   organizer: {
    firstname: string;
    lastname: string
   }
  }

const GET_EVENTS = gql`
  query {
    events {
      id
      name
      localization
      date
      bannerImage
      organizer {
        firstname
        lastname
      }
    }
  }
`;
interface EventsQueryResponse {
    events: Event[];
}
export default function Wydarzenia() {
    const { loading, error, data } = useQuery<EventsQueryResponse>(GET_EVENTS);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [originalEvents, setOriginalEvents] = useState<Event[]>([]);
  
    useEffect(() => {
      if (data?.events) {
        // Przypisanie danych do stanu oryginalnych eventów
        setOriginalEvents(data.events);
      }
    }, [data?.events]);
  
    const lastPage = Math.ceil(originalEvents.length / itemsPerPage);
  
    const filteredAndSortedEvents = originalEvents
      .filter(event => {
        return event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.localization.toLowerCase().includes(searchQuery.toLowerCase()) ||
          `${event.organizer.firstname} ${event.organizer.lastname}`.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .sort((a, b) => {
        if (sortOption === 'dateAsc') {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        } else if (sortOption === 'dateDesc') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0; // Brak sortowania
      });
  
    const currentEvents = filteredAndSortedEvents.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.main}>
      <ScrollView>
        <Upbar
          pageType="wydarzenia"
          onSortChange={setSortOption}
          onSearchQueryChange={setSearchQuery}
          sortOption = {sortOption}
        />
        <View style={styles.container}>
          {currentEvents.map((event, index) => (
            <Event
              key={index}
              id={event.id}
              lokalizacja={event.localization}
              data={new Date(event.date)}
              nazwa={event.name}
              bannerImage={event.bannerImage}
            />
          ))}
        </View>
      </ScrollView>
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        maxLength={5}
        setCurrentPage={setCurrentPage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 10,
  },
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
