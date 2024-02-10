import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Linking, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';

type MapProps = {
  lokalizacja: string;
  data: Date;
  isEditing: boolean;
  handleDetailChange: (name: string, value: string ) => void;
};

const Map: React.FC<MapProps> = ({ lokalizacja, data, isEditing, handleDetailChange }) => {
  const [editedDate, setEditedDate] = useState(data);
  const [editedLocalization, setEditedLocalization] = useState(lokalizacja);
  const onDateChange = ( selectedDate: any) => {
    const currentDate = selectedDate || editedDate;
    setEditedDate(currentDate);
    handleDetailChange('data', currentDate);
  };
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const onLocalizationChange = (text:string ) => {
    setEditedLocalization(text);
    handleDetailChange('lokalizacja', text);
  };
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      geocodeLocation(lokalizacja);
    })();
  }, [lokalizacja]);

  const geocodeLocation = async (locationName: string) => {
    try {
      const geocode = await Location.geocodeAsync(locationName);
      if (geocode.length > 0) {
        const { latitude, longitude } = geocode[0];
        setRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } else {
        console.log('Nie znaleziono lokalizacji.');
      }
    } catch (error) {
      console.error("Błąd geokodowania:", error);
    }
  };

  const handleNavigationPress = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(region.latitude)},${encodeURIComponent(region.longitude)}`;
    Linking.openURL(googleMapsUrl);
  };

  return (
    <View style={styles.container}>



<View style={styles.date}>
      {isEditing ? (
          <>
          <DateTimePicker
                testID="dateTimePicker"
                value={editedDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onDateChange}
                style={styles.input}
              />
            <TextInput
            style={styles.input}
            value={editedLocalization}
            onChangeText={onLocalizationChange}
            placeholder="Lokalizacja"
          />
          </>
        ) : (
          <>
            <Text>{`${data.getFullYear()}-${(data.getMonth() + 1).toString().padStart(2, '0')}-${data.getDate().toString().padStart(2, '0')} ${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')}`}</Text>
            <View style={styles.address}>
              <View style={styles.addressName}><Text>{lokalizacja}</Text></View>
            </View>
          </>
        )}
         <TouchableOpacity style={styles.buttonnav} onPress={handleNavigationPress}>
            <Text>Nawiguj {'>'}</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.mapContainer}>
          <MapView style={styles.map} region={region}>
            <Marker coordinate={region} />
          </MapView>
         
        </View>
    </View>
  );
};
  

  const colors = {
    background: '#FFFFFF', // Zastąp rzeczywistymi wartościami z pliku colors
    secondary: '#8A5FC0',  // Zastąp rzeczywistymi wartościami z pliku colors
    primary: '#007BFF',    // Zastąp rzeczywistymi wartościami z pliku colors
    white: '#FFFFFF'       // Zastąp rzeczywistymi wartościami z pliku colors
  };
  
  export const styles = StyleSheet.create({
    container:{ 
    padding: '1%',
    fontWeight: 'bold',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 10,},

    date:{
    alignItems:'center',
    marginBottom: 20,
    },
    input:{ },
    address:{
      marginBottom: 5,
      width: '100%',
    },
    addressName:{
      alignItems:'center',
  
    },
    mapContainer:{
      borderWidth:2,
    },
    map: {
    width: '100%',
    height: 200,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 10, 
    },
    buttonnav: {
      marginTop:10,
      color: colors.primary,
      borderWidth: 2,
      borderColor: colors.secondary,
      paddingHorizontal: 10,
      borderRadius: 30,
      alignSelf: 'center',
    },
  
  });


  export default Map;
  