import { useState } from 'react';
import 'react-vertical-timeline-component/style.min.css';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import styles from './EventHistory.module.scss';
import Image from "next/image";
import eventimage from '../../assets/images/illegalzone.png'; 
import Link from 'next/link';

type Organizer = {
  id: number;
  avatarImage: string;
};
type Event = {
  id: number; 
  name:string;
  date:Date;
  localization:string;
  bannerImage:string;
  events:[];
  futureEvents: [];
  pastEvents:[];
  organizer: Organizer;
};


export default function EventHistory(props:{futureEvents:Event[], pastEvents:Event[]}) {  
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
           {props.futureEvents.map((futureEvents: Event, index: number) => (
                <VerticalTimelineElement
                  visible={true}
                  key={index}
                  date={futureEvents.date}
                  icon={<Link href={`../uzytkownicy/${futureEvents.organizer.id}`}>
                  <img 
                    src={futureEvents.organizer.avatarImage} 
                    style={{ 
                      width: 60, 
                      height: 60, 
                      borderRadius: '50%',
                      objectFit: 'cover' 
                    }} 
                    alt="Avatar" 
                  />
                  </Link>}
                >
                  <Image 
                    className={styles.eventbanner} 
                    src={futureEvents.bannerImage} 
                    alt={'Event Banner'}
                    width={500}
                    height={500}
                  />
                  <h3 className="vertical-timeline-element-title">{futureEvents.name}</h3>
                  <div className={styles.subtitle}>
                  <h4 className={styles.h4Subtitle}>{futureEvents.localization}</h4>
                  <Link href={`/wydarzenia/${futureEvents.id}`}>Pokaż więcej</Link>
                  </div>

                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        )}
        {activeTab === 'eventHistory' && (
          <div className={styles.tabPanel}>
                <VerticalTimeline>
                {props.pastEvents.map((pastEvents: Event, index: number) => (
                <VerticalTimelineElement
                  visible={true}
                  key={index}
                  date={pastEvents.date}
                  icon={<Link href={`../uzytkownicy/${pastEvents.organizer.id}`}>
                  <img 
                    src={pastEvents.organizer.avatarImage} 
                    style={{ 
                      width: 60, 
                      height: 60, 
                      borderRadius: '50%',
                      objectFit: 'cover' 
                    }} 
                    alt="Avatar" 
                  />
                  </Link>}
                >
                  <Image className={styles.eventbanner} src={eventimage} alt={'Event Banner'} />
                  <h3 className="vertical-timeline-element-title">{pastEvents.name}</h3>
                  <div className={styles.subtitle}>
                  <h4 className={styles.h4Subtitle}>{pastEvents.localization}</h4>
                  <Link href={`/wydarzenia/${pastEvents.id}`}>Pokaż więcej</Link>
                  </div>

                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        )}
      </div>
    </div>
  );
}

