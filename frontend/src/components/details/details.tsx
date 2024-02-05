import React, { useState, useEffect } from 'react';
import styles from './details.module.scss';

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
    <div className={styles.details}>
      <div className={styles.tabHeaders}>
        <div
          className={`${styles.tabHeader} ${activeTab === 'informacje' ? styles.active : ''}`}
          onClick={() => handleTabClick('informacje')}
        >
          Informacje ogólne
        </div>
        <div
          className={`${styles.tabHeader} ${activeTab === 'konkursy' ? styles.active : ''}`}
          onClick={() => handleTabClick('konkursy')}
        >
          Konkursy
        </div>
        <div
          className={`${styles.tabHeader} ${activeTab === 'dojazd' ? styles.active : ''}`}
          onClick={() => handleTabClick('dojazd')}
        >
          Szczegóły dojazdu
        </div>
      </div>
      <div className={styles.tabContent}>
        {activeTab === 'informacje' && (
          <div className={styles.tabPanel}>
            {isEditing ? (
              <textarea
                className={styles.aboutTextArea}
                name="editedGeneral_information"
                value={localDetails.editedGeneral_information}
                onChange={handleChange}
              />
            ) : (
              informacje_ogolne
            )}
          </div>
        )}
        {activeTab === 'konkursy' && (
          <div className={styles.tabPanel}>
            {isEditing ? (
              <textarea
                className={styles.aboutTextArea}
                name="editedCompetitions"
                value={localDetails.editedCompetitions}
                onChange={handleChange}
              />
            ) : (
              konkursy
            )}
          </div>
        )}
        {activeTab === 'dojazd' && (
          <div className={styles.tabPanel}>
            {isEditing ? (
              <textarea
                className={styles.aboutTextArea}
                name="editedLocalization_details"
                value={localDetails.editedLocalization_details}
                onChange={handleChange}
              />
            ) : (
              szczegoly_dojazdu
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
