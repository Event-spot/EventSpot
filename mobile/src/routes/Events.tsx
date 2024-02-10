import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import Upbar from '../components/Upbar/Upbar';
import Event from '../components/Event/Event';
import Pagination from '../components/Pagination/Pagination';
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from '../Types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../constants/colors';
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
type UserProfileNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export default function Wydarzenia() {
    const { loading, error, data } = useQuery<EventsQueryResponse>(GET_EVENTS);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [originalEvents, setOriginalEvents] = useState<Event[]>([]);
    const navigation = useNavigation<UserProfileNavigationProp>();
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
        <TouchableOpacity onPress={() => navigation.navigate("CreateEvent")}>
            <Text style={styles.createEventText}>Utwórz wydarzenie</Text>
        </TouchableOpacity>
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
  createEventText: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
    borderWidth: 2,
    borderRadius: 12,
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 10, 
    textAlign: 'center', 
    marginBottom: 10,
  },
});
