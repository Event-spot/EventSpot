import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import { colors } from '../../constants/colors';

interface UpbarProps {
  pageType: 'wydarzenia' | 'uzytkownicy';
  onSortChange: (value: string) => void;
  onDateFilterChange?: (startDate: string, endDate: string) => void;
  onLocalizationFilterChange?: (localization: string) => void;
  onSearchQueryChange?: (query: string) => void;
  onOrganizerFilterChange?: (organizer: string) => void;
  sortOption: any;
}

const Upbar: React.FC<UpbarProps> = ({
    pageType,
    onSortChange,
    // onLocalizationFilterChange,
    onSearchQueryChange,
    sortOption,
  }) => {
    const { control, handleSubmit } = useForm();
  
    return (
      <View style={styles.Mainupbar}>
        {pageType === 'uzytkownicy' && (
          <>
            <TextInput
              style={styles.searchinput}
              placeholder="Szukaj po imieniu, nazwisku, lokalizacji..."
              onChangeText={onSearchQueryChange}
            />
            <Picker
              selectedValue={sortOption}
              onValueChange={(itemValue, itemIndex) => onSortChange(itemValue)}
            >
              <Picker.Item label="Sortowanie domyślne" value="" />
              <Picker.Item label="Sortuj wg. odwiedzonych spotów" value="odwiedzoneSpoty" />
              <Picker.Item label="Sortuj wg. obserwujących" value="obserwujacy" />
              <Picker.Item label="Sortuj wg. obserwowanych" value="obserwowani" />
            </Picker>
          </>
        )}
        {pageType === 'wydarzenia' && (
          <>
          <TextInput
            style={styles.searchinput}
            placeholder="Szukaj po imieniu, nazwisku organizatora, lokalizacji..."
            onChangeText={onSearchQueryChange}
          />
          <Picker
            selectedValue={sortOption}
            onValueChange={(itemValue) => onSortChange(itemValue)}
            // style={styles.picker}
          >
            <Picker.Item label="Sortowanie domyślne" value="" />
            <Picker.Item label="Sortuj wg. daty rosnąco" value="dateAsc" />
            <Picker.Item label="Sortuj wg. daty malejąco" value="dateDesc" />
            <Picker.Item label="Sortuj wg. lokalizacji" value="localization" />
          </Picker>
          </>
        )}
      </View>
    );
  };
  
  
  export default Upbar;

const styles = StyleSheet.create({
  Mainupbar: {
    // Twoje style...
  },
  upbar: {
    // Twoje style...
  },
  searchinput: {
    borderWidth: 2,
    borderColor: colors.secondary, 
    borderRadius: 10,
    padding: 5,
    width: '100%',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 5,
  },
  // Dodaj więcej stylów...
});

