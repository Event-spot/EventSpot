import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { gql, useMutation } from "@apollo/client";
import { colors } from '../../constants/colors';

const ADD_CONTACT_MUTATION = gql`
mutation addContact($title: String!, $email: String!, $number: Int!, $message: String!){
  addContact(addContactArgs:{title:$title, email:$email, number:$number, message:$message})
}
`;

interface FormData {
  PhoneNumber: string;
  Email: string;
  Topic: string;
  Details: string;
}

const schema = yup.object().shape({
  PhoneNumber: yup.string().matches(/^\d{9}$/, "Numer telefonu musi składać się z 9 cyfr").required("To pole jest wymagane"),
  Email: yup.string().email("Podaj poprawny adres e-mail").required("To pole jest wymagane"),
  Topic: yup.string().required("To pole jest wymagane"),
  Details: yup.string().required("To pole jest wymagane"),
});

const ContactForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [addContact] = useMutation(ADD_CONTACT_MUTATION);

  const onSubmit = (data: FormData) => {
    const number = parseInt(data.PhoneNumber, 10);
    addContact({
      variables: {
        title: data.Topic,
        email: data.Email,
        number: number,
        message: data.Details,
      },
    }).then(() => {
      setIsFormSubmitted(true);
      reset();
      Alert.alert("Formularz został pomyślnie wysłany!");
    }).catch((error) => {
      console.error("Błąd przy wysyłaniu formularza:", error);
    });
  };

  return (
    <View style={styles.form}>
      {isFormSubmitted && <Text style={styles.approve}>Formularz został pomyślnie wysłany!</Text>}
      <View style={styles.inputGroup}>
        <Text style={styles.titleText}>Numer telefonu:</Text>
        <Controller
          control={control}
          name="PhoneNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="phone-pad"
              maxLength={9}
              selectionColor={colors.secondary}
            />
          )}
        />
        {errors.PhoneNumber && <Text style={styles.errorText}>{errors.PhoneNumber.message}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.titleText}>E-mail:</Text>
        <Controller
          control={control}
          name="Email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              maxLength={40}
              selectionColor={colors.secondary}
            />
          )}
        />
        {errors.Email && <Text style={styles.errorText}>{errors.Email.message}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.titleText}>Temat rozmowy:</Text>
        <Controller
          control={control}
          name="Topic"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              maxLength={50}
              selectionColor={colors.secondary}
            />
          )}
        />
        {errors.Topic && <Text style={styles.errorText}>{errors.Topic.message}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.titleText}>Wprowadź swój opis:</Text>
        <Controller
          control={control}
          name="Details"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, styles.textarea]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline={true}
              numberOfLines={4}
              maxLength={200}
              selectionColor={colors.secondary}
            />
          )}
        />
        {errors.Details && <Text style={styles.errorText}>{errors.Details.message}</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Wyślij</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 10,
  },
  titleText: {
    color: colors.primary,
  },
  errorText: {
    color: colors.red,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: 10,
    borderRadius: 5,
    height: 50,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  approve: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ContactForm;
