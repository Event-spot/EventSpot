import { useState } from 'react';
import timelineElements from "./timelineElements";
import 'react-vertical-timeline-component/style.min.css';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import styles from './EventHistory.module.scss';
import Image from "next/image";
import eventimage from '../../assets/images/illegalzone.png'; 



export default function EventHistory() {  
  const [activeTab, setActiveTab] = useState('upcomingEvents');
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.details}>
      <div className={styles.tabHeaders}>
        <div
          className={`${styles.tabHeader} ${activeTab === 'upcomingEvents' ? styles.active : ''}`}
          onClick={() => handleTabClick('upcomingEvents')}
        >
          Nadchodzące Wydarzenia
        </div>
        <div
          className={`${styles.tabHeader} ${activeTab === 'eventHistory' ? styles.active : ''}`}
          onClick={() => handleTabClick('eventHistory')}
        >
          Historia Wydarzeń
        </div>

      </div>
      <div className={styles.tabContent}>
        {activeTab === 'upcomingEvents' && (
          <div className={styles.tabPanel}>
           <VerticalTimeline>
              {timelineElements.map((event, index) => (
                <VerticalTimelineElement
                  visible={true}
                  key={index}
                  date={event.date}
                  iconStyle={{ background: 'blue', color: '#fff' }}
                  // icon={"a"}
                >
                  <Image className={styles.eventbanner} src={eventimage} alt={'Event Banner'} />
                  <h3 className="vertical-timeline-element-title">{event.title}</h3>
                  <div className={styles.subtitle}>
                  <h4 className={styles.h4Subtitle}>{event.location}</h4>
                  <a href='/'>Pokaż więcej</a>
                  </div>

                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        )}
        {activeTab === 'eventHistory' && (
          <div className={styles.tabPanel}>
           
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
           <p>asdasdasdasd</p>
          </div>
        )}
      </div>
    </div>
  );
}

