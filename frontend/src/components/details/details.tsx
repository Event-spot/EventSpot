
import { useState } from 'react';
import styles from './details.module.scss';

export default function Details() {

  
  const [activeTab, setActiveTab] = useState('informacje');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // Dodaj emisję zdarzenia resize przy zmianie zakładki
    window.dispatchEvent(new Event('resize'));
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
           
          </div>
        )}
        {activeTab === 'konkursy' && (
          <div className={styles.tabPanel}>
           
          </div>
        )}
        {activeTab === 'dojazd' && (
          <div className={styles.tabPanel}>
           
          </div>
        )}
      </div>
    </div>
  );
}
