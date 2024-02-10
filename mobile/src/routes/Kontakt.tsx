import React from 'react';
import { View, Text, StyleSheet, Linking, ScrollView, TouchableOpacity, Platform} from 'react-native';
import ContactForm from '../components/ContactForm/ContactForm';
import FAQ from '../components/Faq/Faq';
import { colors } from '../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
const Kontakt: React.FC = () => {
    const handlePhonePress = () => {
        Linking.openURL('tel:+48123456789');
      };

      const handleEmailPress = () => {
        Linking.openURL('mailto:eventspot.development@gmail.com');
      };
    
      const handleAddressPress = () => {
        const url = Platform.select({
          ios: 'maps:0,0?q=32-500+Chrzanów',
          android: 'geo:0,0?q=32-500+Chrzanów'
        });
        Linking.openURL(url!);
      };
      const handleIconPress = (url:string) => {
        if (url) {
            Linking.openURL(url);
          }
    };
  return (
    <ScrollView style={styles.kontakt}>
      <View style={styles.form}>
        <Text style={styles.header}>Formularz Kontaktowy</Text>
        <ContactForm />
      </View>

      <View style={styles.faq}>
        <Text style={styles.header}>FAQ</Text>
        <FAQ />
      </View>

      <View style={styles.dane}>
      <View style= {styles.socialIcons}>
            <TouchableOpacity onPress={() => handleIconPress("https://www.facebook.com/")}>
                <Icon name="logo-facebook" size={40} color="#4968ad" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIconPress("https://www.instagram.com/")}>
                <Icon name="logo-instagram" size={40} color="#e1306c" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIconPress("https://www.tiktok.com/")}>
                <Icon name="logo-tiktok" size={40} color="rgb(30, 48, 80)" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIconPress("https://www.linkedin.com/")}>
                <Icon name="logo-linkedin" size={40} color="#0077B5" />
            </TouchableOpacity>
        </View>
        <View style={styles.daneKontaktowe}>
            <Text style={styles.header}>Numer telefonu</Text>
            <TouchableOpacity onPress={handlePhonePress}>
                <Text style={styles.paragraph}>+48 123 456 789</Text>
            </TouchableOpacity>
            <Text style={styles.header}>Adres e-mail</Text>
            <TouchableOpacity onPress={handleEmailPress}>
                <Text style={styles.paragraph}>eventspot.development@gmail.com</Text>
            </TouchableOpacity>
            <Text style={styles.header}>Adres</Text>
            <TouchableOpacity onPress={handleAddressPress}>
                <Text style={styles.paragraph}>32-500 Chrzanów</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.mapContainer}>
            <MapView
                style={styles.map}
                initialRegion={{
                latitude: 50.1354928, 
                longitude: 19.402071, 
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
                }}
            >
            </MapView>
        </View>
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  kontakt: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  faq: {
    marginBottom: 5,
    padding: 5,
  },
  form: {
    marginBottom: 5,
  },
  dane: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: 300,
  },
  daneKontaktowe: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    color: colors.primary,
  },
  paragraph: {
    fontSize: 16,
    color: colors.secondary, 
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 10,
  },
  mapContainer: {
    height: 200,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary, 
    marginBottom: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Kontakt;
