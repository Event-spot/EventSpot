import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

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
  const [activeTab, setActiveTab] = useState('informacje');

  useEffect(() => {
    setLocalDetails({
      editedGeneral_information: informacje_ogolne,
      editedCompetitions: konkursy,
      editedLocalization_details: szczegoly_dojazdu,
    });
  }, [informacje_ogolne, konkursy, szczegoly_dojazdu]);

  const handleChange = (name: string, value: string) => {
    setLocalDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    handleDetailChange(name, value);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'informacje':
        return isEditing ? (
          <TextInput
            multiline
            style={styles.textArea}
            onChangeText={(text) => handleChange('editedGeneral_information', text)}
            value={localDetails.editedGeneral_information}
          />
        ) : (
          <Text>{informacje_ogolne}</Text>
        );
      case 'konkursy':
        return isEditing ? (
          <TextInput
            multiline
            style={styles.textArea}
            onChangeText={(text) => handleChange('editedCompetitions', text)}
            value={localDetails.editedCompetitions}
          />
        ) : (
          <Text>{konkursy}</Text>
        );
      case 'dojazd':
        return isEditing ? (
          <TextInput
            multiline
            style={styles.textArea}
            onChangeText={(text) => handleChange('editedLocalization_details', text)}
            value={localDetails.editedLocalization_details}
          />
        ) : (
          <Text>{szczegoly_dojazdu}</Text>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.details}>
      <View style={styles.tabHeaders}>
        <TouchableOpacity style={activeTab === 'informacje' ? styles.activeTab : styles.tab} onPress={() => setActiveTab('informacje')}>
          <Text>Informacje ogólne</Text>
        </TouchableOpacity>
        <TouchableOpacity style={activeTab === 'konkursy' ? styles.activeTab : styles.tab} onPress={() => setActiveTab('konkursy')}>
          <Text>Konkursy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={activeTab === 'dojazd' ? styles.activeTab : styles.tab} onPress={() => setActiveTab('dojazd')}>
          <Text>Szczegóły dojazdu</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tabContent}>{renderContent()}</View>
    </View>
  );
};

const colors = {
    lightGray: '#F5F5F5', // Przykładowy kolor, dostosuj do swoich potrzeb
    secondary: '#8A5FC0', // Przykładowy kolor, dostosuj do swoich potrzeb
    background: '#FFFFFF', // Przykładowy kolor, dostosuj do swoich potrzeb
  };
  
  export const styles = StyleSheet.create({
    details: {
      marginHorizontal: 'auto', // W React Native użyj justifyContent z flex w kontenerze nadrzędnym
      marginVertical: 10,
      borderRadius: 20,
      minHeight: 300,
      width: '80%',
      fontWeight: 'bold',
      // React Native nie obsługuje box-shadow w ten sam sposób co CSS, użyj elevation dla Androida i shadow properties dla iOS
      shadowColor: '#000',
      shadowOffset: {
        width: 5,
        height: 20,
      },
      shadowOpacity: 0.8,
      shadowRadius: 5,
      elevation: 5,
    },
    tabHeaders: {
      flexDirection: 'row',
      margin: 0,
    },
    tab: {
        padding: 10,
      },
    tabHeader: {
      flex: 1,
      textAlign: 'center',
      backgroundColor: colors.lightGray,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      borderTopWidth: 2,
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderBottomWidth: 2,
      borderColor: colors.secondary,
    },
    activeTab: {
        padding: 10,
        borderBottomWidth: 2,
        borderColor: '#000',
      },
    tabContent: {
      backgroundColor: colors.background,
      minHeight: 300,
      borderBottomWidth: 2,
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderColor: colors.secondary,
    },
    tabPanel: {
      backgroundColor: colors.background,
      padding: 10,
      borderRadius: 8,
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        minHeight: 150,
        padding: 10,
        textAlignVertical: 'top', // To ensure text starts from the top
      },
  });

  export default Detail;
