import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  avatarImage: string;
}

interface Props {
  followers: User[];
  following: User[];
}
type UserProfileNavigationProp = StackNavigationProp<RootStackParamList, 'UserProfile'>;
const Followers: React.FC<Props> = ({ followers, following }) => {
  const [activeTab, setActiveTab] = useState<string>('obserwujacy');
  const navigation = useNavigation<UserProfileNavigationProp>();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const renderUserItem = (user: User) => (
    <TouchableOpacity
      key={user.id}
      style={styles.followerItem}
      onPress={() => navigation.navigate('UserProfile', { userID: user.id })}>
      <Image
        source={user.avatarImage ? { uri: user.avatarImage } : require('../../assets/images/question.png')}
        style={styles.accountImage}
      />
      <Text style={styles.userName}>{user.firstname} {user.lastname}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.details}>
      <View style={styles.tabHeaders}>
        <TouchableOpacity
          style={[styles.tabHeader, activeTab === 'obserwujacy' && styles.active]}
          onPress={() => handleTabClick('obserwujacy')}
        >
          <Text>Obserwujący</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabHeader, activeTab === 'obserwowani' && styles.active]}
          onPress={() => handleTabClick('obserwowani')}
        >
          <Text>Obserwowani</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.tabContent}>
        {activeTab === 'obserwujacy' ? followers.map(renderUserItem) : following.map(renderUserItem)}
      </ScrollView>
    </View>
  );
};

// const styles = StyleSheet.create({
//   details: {
//     flex: 1,
//     justifyContent: 'center',
//     margin: 10,
//   },
//   tabHeaders: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   tabHeader: {
//     // Your styles for tabHeader
//   },
//   active: {
//     // Your styles for active tabHeader
//   },
//   tabContent: {
//     // Your styles for tabContent
//   },
//   followerItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 5,
//   },
//   accountImage: {
//     width: 25,
//     height: 25,
//     borderRadius: 12.5,
//   },
//   userName: {
//     paddingLeft: 5,
//   },
//   // Define more styles as needed
// });
const styles = StyleSheet.create({
    details: {
      flex: 1,
      justifyContent: 'center',
      margin: 10,
      backgroundColor: '#fff', // Assuming a white background
    },
    tabHeaders: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#F5F5F5', // Light gray background for tab headers
    },
    tabHeader: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: '#E0E0E0', // Slightly darker gray for tab header
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      margin: 5,
      borderWidth: 2,
      borderColor: '#BDBDBD', // Secondary border color
    },
    active: {
      backgroundColor: '#9E9E9E', // Active tab background color
      borderBottomWidth: 0,
    },
    tabContent: {
      flex: 1,
      backgroundColor: '#ECEFF1', // Background color for the tab content
      borderColor: '#BDBDBD', // Border color for tab content
      borderWidth: 3,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      marginTop: -3, // Overlap the tabs slightly to hide the bottom border of the active tab
      maxHeight: 440,
      overflow: 'hidden',
    },
    followerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#CFD8DC', // Light border for items
    },
    accountImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    userName: {
      fontSize: 16,
      color: '#263238', // Text color
    },
  });

export default Followers;
