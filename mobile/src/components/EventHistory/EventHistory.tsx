import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';

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

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const renderEventItem = (event: Event) => (
    <TouchableOpacity
      key={event.id}
      style={styles.eventItem}
      onPress={() => navigation.navigate('EventDetails', { eventId: event.id })}>
      <Image
        source={{ uri: event.bannerImage }}
        style={styles.eventBanner}
      />
      <Text style={styles.eventTitle}>{event.name}</Text>
      <Text style={styles.eventLocalization}>{event.localization}</Text>
      <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
    </TouchableOpacity>
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
      <ScrollView style={styles.tabContent}>
        {activeTab === 'upcomingEvents' ? futureEvents.map(renderEventItem) : pastEvents.map(renderEventItem)}
      </ScrollView>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     margin: 10,
//   },
//   tabHeaders: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 10,
//   },
//   tabHeader: {
//     padding: 10,
//   },
//   activeTab: {
//     borderBottomWidth: 2,
//     borderBottomColor: '#000', // Example active color
//   },
//   tabContent: {
//     // Add your styles here
//   },
//   eventItem: {
//     marginBottom: 20,
//   },
//   eventBanner: {
//     width: '100%',
//     height: 200, // Adjust based on your needs
//     resizeMode: 'cover',
//   },
//   eventTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 5,
//   },
//   eventLocalization: {
//     fontSize: 16,
//     color: '#666', // Example color
//   },
//   eventDate: {
//     fontSize: 14,
//     color: '#999', // Example color
//   },
//   // Add more styles as needed
// });

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
      backgroundColor: '#fff', // Assuming a white background for the container
    },
    tabHeaders: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
    },
    tabHeader: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#E0E0E0', // Light grey background for tabs
      borderRadius: 10, // Rounded corners for the tab headers
    },
    activeTab: {
      borderBottomWidth: 3,
      borderBottomColor: '#007BFF', // Bright blue to indicate active tab
      backgroundColor: '#007BFF', // Same color for the active tab background
      color: '#ffffff', // White text color for active tab
    },
    tabContent: {
      flex: 1,
      padding: 5,
      backgroundColor: '#F0F0F0', // Light grey background for the content area
    },
    eventItem: {
      backgroundColor: '#FFFFFF', // White background for each event item
      borderRadius: 10,
      padding: 15,
      marginBottom: 20,
      shadowColor: '#000', // Shadow for elevation effect
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, // For Android shadow effect
    },
    eventBanner: {
      width: '100%',
      height: 200,
      borderRadius: 10, // Rounded corners for the banner image
      marginBottom: 10, // Margin bottom for spacing between the image and the text
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
