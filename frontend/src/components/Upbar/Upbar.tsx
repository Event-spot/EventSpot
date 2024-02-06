'use client'
import React, { useState, useEffect } from 'react';
import styles from './Upbar.module.scss';
import { useForm } from 'react-hook-form'; 
import * as yup from 'yup';
import{yupResolver} from '@hookform/resolvers/yup';

interface UpbarProps {
  pageType: 'wydarzenia' | 'uzytkownicy';
  onSortChange: (value: string) => void;
  onDateFilterChange?: (startDate: string, endDate: string) => void;
  onLocalizationFilterChange?: (localization: string) => void;
  onSearchQueryChange?: (query: string) => void;
  onOrganizerFilterChange?: (organizer: string) => void;
}
const Upbar: React.FC<UpbarProps> = ({ pageType, onSortChange, onDateFilterChange, onLocalizationFilterChange,onOrganizerFilterChange,  onSearchQueryChange }) =>  {
  const [rotation, setRotation] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [actualDate, setActualDate] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchQueryChange) {
        onSearchQueryChange(event.target.value);
    }
};

 
const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  aktualizujMinDate();
  handleDateChange();
};
const handleEndDateChange = () => {
  handleDateChange();
};

const handleDateChange = () => {
  const startInput = document.getElementById('pierwszaData') as HTMLInputElement;
  const endInput = document.getElementById('drugaData') as HTMLInputElement;
  const startDate = startInput.value;
  const endDate = endInput.value;

  if (onDateFilterChange) {
      onDateFilterChange(startDate, endDate);
  }
};
const handleLocalizationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (onLocalizationFilterChange) {
      onLocalizationFilterChange(event.target.value);
  }
};

const handleOrganizatorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (onOrganizerFilterChange) {
    onOrganizerFilterChange(event.target.value);
  }
};
const handleuserLocalizationChange = (person: React.ChangeEvent<HTMLInputElement>) => {
  if (onLocalizationFilterChange) {
      onLocalizationFilterChange(person.target.value);
  }
};

const { register } = useForm({
        
});
const onSubmit = (e: { preventDefault: () => void; }) => {
  
};

  useEffect(() => {
    setActualDate(new Date().toISOString().split("T")[0]);
  }, []);

  const aktualizujMinDate = () => {
    const pierwszaDataInput = document.getElementById('pierwszaData') as HTMLInputElement;
    const drugaDataInput = document.getElementById('drugaData') as HTMLInputElement;

    if (pierwszaDataInput && drugaDataInput) {
      const aktualnaPierwszaData = pierwszaDataInput.value;
      drugaDataInput.min = aktualnaPierwszaData;
    }
  };
const rotate = () => {
    const newRotation = clickCount % 2 === 0 ? rotation + 360 : rotation - 360;
    setRotation(newRotation);
    setClickCount(prevCount => prevCount + 1);

    if (clickCount % 2 === 0) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

 

  const renderSubPageSortList = () => {
    if (pageType === 'wydarzenia') {
      return (
        <form className={styles.sortlist}>
          <select onChange={(e) => onSortChange(e.target.value)}>
            <option value="">Sortowanie domyślne</option>
            <option value="date+">Sortuj wg. daty do najbliższej</option>
            <option value="date-">Sortuj wg. daty do najdalszej</option>
            <option  value="location">Sortuj po lokalizacji </option>
            
          </select>
        </form>
      );
    } else if (pageType === 'uzytkownicy') {
      return (
        <form className={styles.sortlist}>
          <select  onChange={(e) => onSortChange(e.target.value)}>
            <option value="">Sortowanie domyślne</option>
            <option value="odwiedzoneSpoty">Sortuj wg. odwiedzonych spotów</option>
            <option value="obserwujacy">Sortuj wg. obserwujących</option>
            <option value="obserwowani">Sortuj wg. obserwowanych</option>
          </select>
        </form>
      );
    }
    return null;
  };
  const renderSubPageContent = () => {
    if (pageType === 'wydarzenia') {
      return (
        <div className={styles.filtersbar}>

          <form onSubmit={(onSubmit)}>
          <div className={styles.inputs}>
              <div className={styles.inputsdowndate}>
                <p>Wprowadź daty wydarzenia</p>
                <input type="date" placeholder="Wpisz datę początkową" id="pierwszaData" min={actualDate} onChange={handleStartDateChange} />
                <input type="date" placeholder="Wpisz datę końcową" min={actualDate} id="drugaData" onChange={handleEndDateChange}/>
              </div>
              <div className={styles.inputsdownorganise}>
                <p>Wprowadź nazwę organizatora</p>
                <input type="text" placeholder="Wpisz nazwę organizatora" {...register("Nazwa_Organizatora_Eventy")} onChange={handleOrganizatorChange} />
              </div>
              <div className={styles.inputsdownlocalization}>
                <p>Wprowadź nazwę lokalizacji</p>
                <input type="text" placeholder="Wpisz nazwę lokalizacji"  {...register("Nazwa_Lokalizacji_Eventy")}  onChange={handleLocalizationChange}/>
              </div>
            </div>
          </form>
        </div>
      );
    } else if (pageType === 'uzytkownicy') {
      return (
        <div className={styles.filtersbar}>
          <form onSubmit={(onSubmit)}>
            <div className={styles.inputslocalization}>
              <p>Wprowadź nazwę lokalizacji</p>
              <input type="text" placeholder="Wpisz nazwę lokalizacji"  {...register("Nazwa_Lokalizacji_Uzytkownicy")} onChange={handleuserLocalizationChange} />
            </div>
          </form>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.Mainupbar}>
      <div className={styles.upbar}>
        <div className={styles.search}>
          <input className={styles.searchinput} type="text" placeholder="Szukaj..."  onChange={handleSearchChange}  />
          <svg
            className={styles.searchIconSvg}
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="16"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </div>
       
        
        
        <div className={styles.filters}>
        {renderSubPageSortList()}
          <button onClick={rotate}>
            Filtry zaawansowane
            <svg
              className={styles.filtersIconSvg}
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
            </svg>
          </button>
          
          
          
        </div>
        
      </div>
      
      {isExpanded && renderSubPageContent()}
     
    </div>
  );
};

export default Upbar;

