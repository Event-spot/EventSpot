import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../constants/colors';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const CREATE_EVENT_MUTATION = gql`
mutation AddEvent($addEventArgs: AddEventArgs!) {
  addEvent(addEventArgs: $addEventArgs)
}
`;
type DateTimePickerMode = 'date' | 'time';
export const EventCreator: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, setError, clearErrors, reset } = useForm();
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<DateTimePickerMode>('date');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [createEvent] = useMutation(CREATE_EVENT_MUTATION);
// const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string;
  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
    const tempDate = new Date(currentDate);
    const formatted = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()} ${tempDate.getHours()}:${tempDate.getMinutes()}`;
    setFormattedDate(formatted);
    clearErrors('EventDate');
  };

  const showMode = (modeToShow: 'date' | 'time') => {
    setShow(true);
    setMode(modeToShow);
  };
  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== 'web') {
  //       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== 'granted') {
  //         alert('Sorry, we need camera roll permissions to make this work!');
  //       }
  //     }
  //   })();
  // }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImage(uri);
    }
  };
  const uploadToCloudinary = async (uri: any) => {
    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dvqdz02cp/upload';

    try {
      const uploadResponse = await FileSystem.uploadAsync(cloudinaryUrl, uri, {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'file',
        parameters: {
          'upload_preset': 'EventSpot',
        },
      });

      const uploadResult = await JSON.parse(uploadResponse.body);
      return uploadResult.secure_url;
    } catch (e) {
      console.error('Upload to Cloudinary failed:', e);
      throw e;
    }
  };
  const onSubmit = async (data:any) => {
    // if (!currentUser) {
        // Alert.alert("Zaloguj się", "Musisz być zalogowany, aby utworzyć wydarzenie.");
    //   return;
    // }
      const isoFormattedDate = date.toISOString();
      let hasErrors = false;
  

      let bannerUrl;
      if (image) {
        bannerUrl = await uploadToCloudinary(image);
      }
      if (!formattedDate) {
        Alert.alert("Błąd", "Data wydarzenia jest wymagana.");
        hasErrors = true;
      }
      if (hasErrors) {
        return;
      }
      const eventData = {
          name: data.EventName,
          date: isoFormattedDate,
          localization: data.EventLocalization,
          general_information: data.EventGeneralInformation,
          competitions: data.EventCompetitions,
          localization_details: data.EventDriveTips,
          bannerImage: bannerUrl,
        //   organizerId: currentUser.id,
          organizerId: 1,
      };

      try {
    await createEvent({
      variables: { addEventArgs: eventData }
    });
    Alert.alert("Sukces", "Wydarzenie zostało utworzone pomyślnie.");
    setIsFormSubmitted(true);
    reset();
    setImage(null);
  } catch (error) {
    console.error("Błąd GraphQL:", error);
    Alert.alert("Błąd", "Nie udało się utworzyć wydarzenia.");
  }
  };
  
  return (
    <ScrollView>
    <View style={styles.container}>
    <Text style={styles.header}>Utwórz Wydarzenie</Text>
    <View style={styles.form}>
      <Controller
        name="EventName"
        control={control}
        rules={{ required: 'Nazwa wydarzenia jest wymagana.' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Nazwa wydarzenia"
            maxLength={40}
            selectionColor={colors.secondary}
          />
        )}
      />
        {errors.EventName?.message && (<Text style={styles.error}>{errors.EventName?.message.toString()}</Text>)}

      <View style={styles.dateButtons}>
        <TouchableOpacity style={styles.buttons} onPress={() => showMode('date')}>
            <Text style={styles.buttonsText}>Wybierz datę</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons} onPress={() => showMode('time')}>
            <Text style={styles.buttonsText}>Wybierz godzinę</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}
      <Text>Data wydarzenia: {formattedDate}</Text>
      
      <Controller
        name="EventLocalization"
        control={control}
        rules={{ required: 'Lokalizacja jest wymagana.' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Lokalizacja wydarzenia"
            maxLength={30}
            selectionColor={colors.secondary}
          />
        )}
        
      />
        {errors.EventLocalization?.message && (<Text style={styles.error}>{errors.EventLocalization?.message.toString()}</Text>)}

      <Controller
        name="EventGeneralInformation"
        control={control}
        rules={{ required: 'Informacje ogólne są wymagane.' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, styles.textArea]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Informacje ogólne"
            multiline={true}
            numberOfLines={4}
            maxLength={200}
            selectionColor={colors.secondary}
          />
        )}
      />
        {errors.EventGeneralInformation?.message && (<Text style={styles.error}>{errors.EventGeneralInformation?.message.toString()}</Text>)}
        
      <Controller
          name="EventCompetitions"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, styles.textArea]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value ?? ''}
              placeholder="Konkursy (opcjonalnie)"
              multiline={true}
              numberOfLines={4}
              maxLength={200}
              selectionColor={colors.secondary}
            />
          )}
        />

        <Controller
          name="EventDriveTips"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, styles.textArea]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value ?? ''}
              placeholder="Wskazówki dojazdu (opcjonalnie)"
              multiline={true}
              numberOfLines={4}
              maxLength={200}
              selectionColor={colors.secondary}
            />
          )}
        />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.buttonsSelectImageText}>Ustaw Banner Wydarzenia</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />}
        </View>

        <TouchableOpacity style={styles.buttonsSubmit} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonsText}>Utwórz wydarzenie</Text>
        </TouchableOpacity>
    </View>
  </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      },
      header: {
        fontSize: 20,
        marginBottom: 20,
      },
      form: {
        width: '100%',
      },
      input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
      },
      textArea: {
        height: 100,
        textAlignVertical: 'top',
      },
      error: {
        color: 'red',
        marginBottom: 10,
      },
      dateButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
      },
      buttons: {
        paddingVertical: 10,
        borderRadius: 10,
        margin: 5,
        borderWidth: 2,
        borderColor: colors.secondary,
        alignItems: 'center',
        backgroundColor: colors.secondary,
        width: '47%',
      },
      buttonsSubmit: {
        paddingVertical: 10,
        borderRadius: 10,
        margin: 5,
        borderWidth: 2,
        borderColor: colors.secondary,
        alignItems: 'center',
        backgroundColor: colors.secondary,
      },
      buttonsText: {
        color: colors.white,
        fontWeight: 'bold',
      },
      image: {
        width: 200,
        height: 200,
      },
      buttonsSelectImageText: {
        backgroundColor: '#FFF',
        borderColor: colors.secondary,
        borderWidth: 2,
        borderRadius: 12,
        color: colors.secondary,
        fontSize: 14,
        fontWeight: 'bold',
        paddingVertical: 10,
        paddingHorizontal: 20,
        textAlign: 'center',
        marginBottom:5,
      }
});

export default EventCreator;
