import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface EventProps {
  id: number;
  nazwa: string;
  lokalizacja: string;
  data: Date;
  bannerImage: string;
}

const Event: React.FC<EventProps> = ({ id, nazwa, lokalizacja, data, bannerImage }) => {
//   const navigation = useNavigation(); 

  const truncatedName = nazwa.length > 27 ? `${nazwa.slice(0, 27)}...` : nazwa;
  const defaultBanner = require('../../assets/images/illegalzone.png');

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}/${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.event}>
      <Image
        style={styles.eventbanner}
        source={bannerImage ? { uri: bannerImage } : defaultBanner}
        resizeMode="cover"
      />
      <View style={styles.down}>
        <View style={styles.down1}>
          <Text style={styles.localization}>{lokalizacja}</Text>
          <Text style={styles.date}>{formatDate(data)}</Text>
        </View>
        <View style={styles.down2}>
          <Text style={styles.name}>{truncatedName}</Text>
          <TouchableOpacity 
        //   onPress={() => navigation.navigate('EventDetails', { eventId: id })}
          >
            <Text style={styles.button}>Zobacz więcej</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Event;

const styles = StyleSheet.create({
    event: {
      borderRadius: 20,
      width: '100%',
      maxWidth: 370,
      margin: 15,
      backgroundColor: '#FFF', // Załóżmy, że $white to biały kolor
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5, // Dla Androida
    },
    eventbanner: {
      width: '100%',
      height: 215, // Ustawienie wysokości, `minHeight` nie jest dostępne w tym kontekście
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    down: {
      width: '100%',
      flex: 1, // Aby zająć pozostałą przestrzeń
      backgroundColor: '#FFF', // Ustaw tło na białe
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      padding: 10,
    },
    down1: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    localization: {
      fontWeight: 'bold',
      fontSize: 12,
      color: '#000', // Załóżmy, że $primary to czarny kolor
      padding: 10,
    },
    date: {
      fontWeight: 'bold',
      fontSize: 12,
      color: '#000', // Ustaw kolor tekstu
      padding: 10,
    },
    down2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', // Aby elementy były wyśrodkowane pionowo
      paddingTop: 10, // Dodaj trochę przestrzeni na górze
    },
    name: {
      fontWeight: 'bold',
      fontSize: 12,
      color: '#000',
      padding: 10,
    },
    button: {
      backgroundColor: '#FFF', // Ustaw tło na białe
      borderColor: '#000', // Załóżmy, że $primary to czarny kolor
      borderWidth: 2,
      borderRadius: 12,
      color: '#000', // Kolor tekstu
      fontSize: 14,
      fontWeight: 'bold',
      paddingVertical: 10, // Wewnętrzny odstęp pionowy
      paddingHorizontal: 20, // Wewnętrzny odstęp poziomy
      textAlign: 'center', // Wyśrodkowanie tekstu
    },
  });
  
