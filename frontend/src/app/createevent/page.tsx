'use client'
import styles from './createevent.module.scss';
import {EventCreator} from '../../components/EventCreator/EventCreator';
import React from 'react';

 function CreateEvent(){
    return(
        <div className={styles.main}>
            <EventCreator/>
        </div>
    )
}

export default CreateEvent;