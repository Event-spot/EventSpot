import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../Types/navigationTypes';
import defaultImage from '../../assets/images/question.png';
import { colors } from '../../constants/colors';
import { Dimensions } from 'react-native';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  avatarImage: string;
  localization: string;
}

interface Props {
  followers: User[];
  following: User[];
}

type UserProfileNavigationProp = StackNavigationProp<RootStackParamList, 'UserProfile'>;

const Followers: React.FC<Props> = ({ followers, following }) => {
  const [activeTab, setActiveTab] = useState<string>('obserwujacy');
  const navigation = useNavigation<UserProfileNavigationProp>();
  const flatListRef = useRef<FlatList<User> | null>(null);
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() => navigation.navigate('UserProfile', { userID: item.id })}>
      <Image
        style={styles.userImage}
        source={{ uri: item.avatarImage || Image.resolveAssetSource(defaultImage).uri}}
      />
      <View style={styles.cardFooter}>
        <Text style={styles.name}>{item.firstname} {item.lastname}</Text>
        <Text style={styles.lokalization}>{item.localization}</Text>
        {/* You can add follow button or other interactive elements here */}
      </View>
    </TouchableOpacity>
  );
  

  const data = activeTab === 'obserwujacy' ? followers : following;

  return (
    <View style={styles.details}>
      <View style={styles.tabHeaders}>
        <TouchableOpacity
          style={[styles.tabHeader, activeTab === 'obserwujacy' && styles.active]}
          onPress={() => handleTabClick('obserwujacy')}>
          <Text style={[styles.buttonText, activeTab === 'obserwujacy' && styles.active]}>Obserwujący</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabHeader, activeTab === 'obserwowani' && styles.active]}
          onPress={() => handleTabClick('obserwowani')}>
          <Text style={[styles.buttonText, activeTab === 'obserwowani' && styles.active]}>Obserwowani</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        scrollEnabled={data.length > 1}
        ref={flatListRef}
        data={data}
        horizontal
        renderItem={renderUserItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth / 2) - 40;
// Updated styles to include grid layout styles
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
  buttonText: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContainer: {
    // alignItems: 'center',
  },
  card: {
    shadowColor: '#00000021',
    width: cardWidth,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginVertical: 5,
    backgroundColor: 'white',
    flexBasis: '46%',
    marginHorizontal: 5,
    alignItems: 'center',
    padding: 10,
  },
  cardHeader: {
    // Adjust cardHeader styles as needed
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 60,
    alignSelf: 'center',
    borderColor: colors.secondary,
    borderWidth: 2,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    alignSelf: 'center',
    color: colors.secondary,
    fontWeight: 'bold',
  },
  cardFooter: {
    // Adjust cardFooter styles as needed
  },
  lokalization: {
    color: colors.black,
    alignSelf: 'center',
  }
});

export default Followers;
