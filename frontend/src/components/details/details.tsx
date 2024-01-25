import React, { useState } from 'react';
import styles from './details.module.scss';

type DetailProps = {
 
  informacje_ogolne: string;
  konkursy: string;
  szczegoly_dojazdu: string;
};

const Detail: React.FC<DetailProps> = ({
 
  informacje_ogolne,
  konkursy,
  szczegoly_dojazdu,
}) => {
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
          <div className={styles.tabPanel}>{informacje_ogolne}</div>
        )}
        {activeTab === 'konkursy' && (
          <div className={styles.tabPanel}>{konkursy}</div>
        )}
        {activeTab === 'dojazd' && (
          <div className={styles.tabPanel}>{szczegoly_dojazdu}</div>
        )}
      </div>
    </div>
  );
};

export default Detail;
