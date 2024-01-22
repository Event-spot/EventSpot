import { useState } from 'react';
import timelineElements from "./timelineElements";
import 'react-vertical-timeline-component/style.min.css';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import styles from './EventHistory.module.scss';
import Image from "next/image";
import eventimage from '../../assets/images/illegalzone.png'; 
import { useQuery } from '@apollo/client';
import { GET_EVENTS_TO_USERS} from '../../graphql/schema';

type User = {
  id: number; 
};
type Event = {
  id: number; 
  name:string;
  date:Date;
  localization:string;
};


export default function EventHistory({ userId }: { userId: any }) {  
  const [activeTab, setActiveTab] = useState('upcomingEvents');
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  const { loading, data, error } = useQuery(GET_EVENTS_TO_USERS, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.users.find((user: User) => user.id === parseInt(userId, 10));


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
           {user.events.map((event: Event, index: number) => (
                <VerticalTimelineElement
                  visible={true}
                  key={index}
                  date={event.date}
                  iconStyle={{ background: 'blue', color: '#fff' }}
                  // icon={"a"}
                >
                  <Image className={styles.eventbanner} src={eventimage} alt={'Event Banner'} />
                  <h3 className="vertical-timeline-element-title">{event.name}</h3>
                  <div className={styles.subtitle}>
                  <h4 className={styles.h4Subtitle}>{event.localization}</h4>
                  <a href={`/wydarzenia/${event.id}`}>Pokaż więcej</a>
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

