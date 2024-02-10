import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../../constants/colors';
import defaultImage from '../../assets/images/illegalzone.png';

interface Organizer {
  id: number;
  avatarImage: string;
}

interface Event {
  id: number;
  name: string;
  date: string;
  localization: string;
  bannerImage: string;
  organizer: Organizer;
}

interface Props {
  futureEvents: Event[];
  pastEvents: Event[];
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pl-PL', options);
};
type UserProfileNavigationProp = StackNavigationProp<RootStackParamList, 'EventDetails'>;
const EventHistory: React.FC<Props> = ({ futureEvents, pastEvents }) => {
  const [activeTab, setActiveTab] = useState<string>('upcomingEvents');
  const navigation = useNavigation<UserProfileNavigationProp>();
  const scrollViewRef = useRef<ScrollView | null>(null);
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  const renderEventItem = (event: Event) => (
    <View key={event.id} style={styles.eventItem}>
      <Image
        source={{ uri: event.bannerImage || Image.resolveAssetSource(defaultImage).uri}}
        style={styles.eventBanner}
      />
      <View style={styles.eventInfoContainer}>
        <View>
          <Text style={styles.eventTitle}>{event.name}</Text>
          <Text style={styles.eventLocalization}>{event.localization}</Text>
          <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EventDetails', { eventID: event.id })}
        >
          <Text style={styles.buttonText}>Szczegóły</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
    
  return (
    <View style={styles.container}>
      <View style={styles.tabHeaders}>
        <TouchableOpacity
          style={[styles.tabHeader, activeTab === 'upcomingEvents' ? styles.activeTab : {}]}
          onPress={() => handleTabClick('upcomingEvents')}
        >
          <Text>Nadchodzące Wydarzenia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabHeader, activeTab === 'eventHistory' ? styles.activeTab : {}]}
          onPress={() => handleTabClick('eventHistory')}
        >
          <Text>Historia Wydarzeń</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef}
        style={styles.tabContent}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={true}
      >
        {activeTab === 'upcomingEvents' ? futureEvents.map(renderEventItem) : pastEvents.map(renderEventItem)}
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
      // backgroundColor: '#fff',
    },
    tabHeaders: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
    },
    tabHeader: {
      padding: 10,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: colors.secondary,
    },
    tabContent: {
      flex: 1,
      padding: 5,
      backgroundColor: '#F0F0F0', // Light grey background for the content area
    },
    eventItem: {
      width: width - 80, // Odejmujemy marginesy, jeśli są potrzebne
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 15,
      marginBottom: 20,
      marginRight: 20, 
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    eventBanner: {
      width: '100%',
      height: 200,
      borderRadius: 10,
      marginBottom: 10,
    },
    eventInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      position: 'absolute',
      right: 2,
      bottom: 0,
      backgroundColor: '#FFF',
      borderColor: colors.primary,
      borderWidth: 2,
      borderRadius: 12,
      paddingVertical: 10, // Wewnętrzny odstęp pionowy
      paddingHorizontal: 20, // Wewnętrzny odstęp poziomy
      textAlign: 'center', // Wyśrodkowanie tekstu
    },
    buttonText: {
      color: colors.black, // Kolor tekstu
      fontSize: 14,
      fontWeight: 'bold',
    },
    eventTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5, // Space between title and localization
    },
    eventLocalization: {
      fontSize: 16,
      color: '#666666', // Dark grey for the event localization text
      marginBottom: 5, // Space between localization and date
    },
    eventDate: {
      fontSize: 14,
      color: '#999999', // Lighter grey for the date to differentiate from title and localization
    },
  });
  

export default EventHistory;
