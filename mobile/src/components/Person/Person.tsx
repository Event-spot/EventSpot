import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
const defaultAvatar = require('../../assets/images/question.png');

interface PersonProps {
    id: number;
    imie: string;
    nazwisko: string;
    lokalizacja: string;
    odwiedzoneSpoty: number;
    obserwowani: number;
    obserwujacy: number;
    avatarImage: string;
  }
  type UserProfileNavigationProp = StackNavigationProp<RootStackParamList, 'UserProfile'>;
const Person: React.FC<PersonProps> = ({
  id,
  imie,
  nazwisko,
  lokalizacja,
  odwiedzoneSpoty,
  obserwowani,
  obserwujacy,
  avatarImage,
}) => {
  const navigation = useNavigation<UserProfileNavigationProp>();
  return (
    <View style={styles.person}>
      <Image
        style={styles.avatar}
        source={avatarImage ? { uri: avatarImage } : defaultAvatar}
      />
      <Text style={styles.name}>{`${imie} ${nazwisko}`}</Text>
      <Text style={styles.location}>{lokalizacja}</Text>
       <View style={styles.visitedSpots}>
          <Text style={styles.numbers}>{odwiedzoneSpoty}</Text>
          <Text style={styles.statName}>Odwiedzone spoty</Text>
        </View>
      <View style={styles.stats}>
        <View style={styles.following}>
          <Text style={styles.numbers}>{obserwowani}</Text>
          <Text style={styles.statName}>Obserwowani</Text>
        </View>
        <View style={styles.followers}>
          <Text style={styles.numbers}>{obserwujacy}</Text>
          <Text style={styles.statName}>Obserwujący</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('UserProfile', { userID: id })}
      >
        <Text style={styles.buttonText}>Zobacz Profil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  person: {
    width: 260,
    height: 340,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    padding: 5,
    margin: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.primary,
    padding: 5,
  },
  location: {
    fontWeight: 'bold',
    fontSize: 12,
    color: colors.secondary,
  },
  stats: {
    flexDirection: 'row',
    padding: 5,
    gap: 50,
  },
  statName: {
    color: colors.secondary,
  },
  numbers: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  visitedSpots: {
    fontWeight: 'bold',
    paddingTop: 10,
    alignItems: "center",

  },
  following: {
    alignItems: "center",
    padding: 5,
  },
  followers: {
    alignItems: "center",
    padding: 5,
  },
  button: {
    backgroundColor: colors.secondary, 
    width: 180,
    height: 37,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
    marginTop: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
  },
});

export default Person;
