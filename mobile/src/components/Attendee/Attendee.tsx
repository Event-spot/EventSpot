import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { RootStackParamList } from '../../Types/navigationTypes';
import { colors } from '../../constants/colors';
import { StackNavigationProp } from '@react-navigation/stack';

const QuestionImage = require('../../assets/images/question.png');
type AttendeeType = {
  id: number;
  firstname: string;
  lastname: string;
  localization:string;
  avatarImage: string;
};

type AttendeeProps = {
  data: AttendeeType[];
};
type UserProfileNavigationProp = StackNavigationProp<RootStackParamList, 'UserProfile'>;
const Attendee: React.FC<AttendeeProps> = ({ data }) => {
  const navigation = useNavigation<UserProfileNavigationProp>();

  const renderUserItem = ({ item }: { item: AttendeeType }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('UserProfile', { userID: item.id })}>
      <Image
        style={styles.userImage}
        source={item.avatarImage ? { uri: item.avatarImage } : QuestionImage}
      />
      <View style={styles.cardFooter}>
        <Text style={styles.name}>{item.firstname} {item.lastname}</Text>
        <Text style={styles.lokalization}>{item.localization}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      scrollEnabled={data.length > 1}
      data={data}
      renderItem={renderUserItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal={true}
    />
  );
};
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth / 2) - 15;


const styles = StyleSheet.create({
 
  details: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  tabHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F5F5F5',
  },
  tabHeader: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    margin: 5,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  active: {
    backgroundColor: colors.secondary,
    color: colors.white,
  },
  listContainer: {

  },
  card: {
    shadowColor: '#00000021',
    width: cardWidth,
    elevation: 12,
    marginVertical: 5,
    backgroundColor: 'white',
    flexBasis: '46%',
    marginHorizontal: 5,
    alignItems: 'center',
    padding: 10,
  },
  account: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeader: {

  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 60,
    borderColor: colors.secondary,
    borderWidth: 2,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    marginTop:5,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  cardFooter: {
  },
  lokalization: {
    color: colors.black,
    alignSelf: 'center',
  }
});

export default Attendee;