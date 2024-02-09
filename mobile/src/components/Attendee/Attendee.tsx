import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { RootStackParamList } from '../../Types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';// Zakładając, że używasz react-navigation

// Przykładowe ścieżki, dostosuj do swojej struktury projektu
const QuestionImage = require('../../assets/images/question.png');

type EventAttendeeProps = {
  id: number;
  imie: string;
  nazwisko: string;
  avatarImage: string;
};
type UserProfileNavigationProp = StackNavigationProp<RootStackParamList, 'UserProfile'>;
const Attendee: React.FC<EventAttendeeProps> = ({
  id,
  imie,
  nazwisko,
  avatarImage,
}) => {
    const navigation = useNavigation<UserProfileNavigationProp>();

  // Funkcja do obsługi nawigacji
  


  return (
    <View style={styles.tableContent}>
      <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { userID: id })} style={styles.row}>
        <View style={styles.account}>
          <Image 
            style={styles.accountimage}
            source={avatarImage ? { uri: avatarImage } : QuestionImage}
          />
        </View>
        <View style={styles.cell}>
          <Text>{imie} {nazwisko}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    overflow: 'hidden',
  },
  tableContent: {

  },
  account: {
    
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountimage: {
    marginTop: 5,
    borderRadius: 50, // React Native używa pikseli, nie procentów dla borderRadius, ale 50% w CSS odpowiada dużemu borderRadius w RN, by uzyskać efekt koła
    width: 20, // Musisz zdefiniować zarówno szerokość, jak i wysokość w React Native
    height: 20,
  },
  cell: {
    width: '80%',
    padding: 5,
    justifyContent: 'flex-start', // W React Native "justifyContent: left" nie jest poprawne, używamy "flex-start"
    textAlign: 'left', // textAlign jest stosowany bezpośrednio do tekstu wewnątrz komponentów <Text>
    // Stylizacja dla tagów <a> z CSS nie jest bezpośrednio przekładalna na RN. Możesz użyć TouchableOpacity z onPress do nawigacji
  },
  // W React Native nie ma bezpośredniego odpowiednika dla :hover czy innych pseudoklas CSS
  // Tekst musi być umieszczony w komponentach <Text>, które mogą być stylizowane oddzielnie
});

export default Attendee;