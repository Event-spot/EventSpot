import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, TextInput, StyleSheet, Linking } from 'react-native';
import { colors } from '../../constants/colors';
type DetailProps = {
 
  informacje_ogolne: string;
  konkursy: string;
  szczegoly_dojazdu: string;
  isEditing: boolean;
  handleDetailChange: (name: string, value: string) => void;
};

const Detail: React.FC<DetailProps> = ({
 
  informacje_ogolne,
  konkursy,
  szczegoly_dojazdu,
  isEditing,
  handleDetailChange,
}) => {
  const [localDetails, setLocalDetails] = useState({
    editedGeneral_information: informacje_ogolne,
    editedCompetitions: konkursy,
    editedLocalization_details: szczegoly_dojazdu,
  });

  useEffect(() => {
    setLocalDetails({
      editedGeneral_information: informacje_ogolne,
      editedCompetitions: konkursy,
      editedLocalization_details: szczegoly_dojazdu,
    });
  }, [informacje_ogolne, konkursy, szczegoly_dojazdu]);


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
    handleDetailChange(name, value);
  };
  const [activeTab, setActiveTab] = useState('informacje');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
    <View style={styles.tabHeaders}>
      <TouchableOpacity
        style={[styles.tabHeader, activeTab === 'informacje' ? styles.active : {}]}
        onPress={() => handleTabClick('informacje')}
      >
        <Text>Informacje ogólne</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabHeader, activeTab === 'konkursy' ? styles.active : {}]}
        onPress={() => handleTabClick('konkursy')}
      >
        <Text>Konkursy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabHeader, activeTab === 'dojazd' ? styles.active : {}]}
        onPress={() => handleTabClick('dojazd')}
      >
        <Text>Szczegóły dojazdu</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.tabContent}>
      {activeTab === 'informacje' && (
        <View style={styles.tabPanel}>
          {isEditing ? (
            <TextInput
              style={styles.aboutTextArea}
              multiline
              numberOfLines={4} // Dostosuj zgodnie z potrzebami
              onChangeText={(text) => handleChange}
              value={localDetails.editedGeneral_information}
            />
          ) : (
            <Text>{informacje_ogolne}</Text>
          )}
        </View>
      )}
      {activeTab === 'konkursy' && (
        <View style={styles.tabPanel}>
          {isEditing ? (
            <TextInput
              style={styles.aboutTextArea}
              multiline
              numberOfLines={4} // Dostosuj zgodnie z potrzebami
              onChangeText={(text) => handleChange}
              value={localDetails.editedCompetitions}
            />
          ) : (
            <Text>{konkursy}</Text>
          )}
        </View>
      )}
      {activeTab === 'dojazd' && (
        <View style={styles.tabPanel}>
          {isEditing ? (
            <TextInput
              style={styles.aboutTextArea}
              multiline
              numberOfLines={4} // Dostosuj zgodnie z potrzebami
              onChangeText={(text) => handleChange}
              value={localDetails.editedLocalization_details}
            />
          ) : (
            <Text>{szczegoly_dojazdu}</Text>
          )}
        </View>
      )}
    </View>
  </View>
  );
};

const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    // backgroundColor: '#fff',
  },
  // Styl dla zawartości ScrollView
  contentContainer: {
    justifyContent: 'center', // Przykład, dostosuj do swoich potrzeb
    alignItems: 'center', // Przykład, jeśli chcesz centrować zawartość
    padding: 10, // Dostosuj według potrzeb
  },
  // Pozostałe style jak wcześniej
  details: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 20,
    minHeight: 300,
    width: '80%',
    fontWeight: 'bold',
    // Usuń justifyContent z tego stylu, jeśli był wcześniej tutaj
  },
  tabHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tabHeader: {
    padding: 10,
  },
  active: {
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
  },
  tabContent: {
    flex: 1,
    padding: 5,
    backgroundColor: colors.background,
    minHeight: 300,
    borderColor:colors.secondary,
    borderWidth:2,
    borderRadius:20,
 
  },
  tabPanel: {
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 8,
  },
  aboutTextArea: {
    fontWeight: 'normal',
    borderRadius: 5,
    minHeight: 270,
    height: '100%',
    width: '100%',
  },
});

export default Detail;
