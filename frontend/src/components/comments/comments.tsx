// Comments.tsx
import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import styles from './comments.module.scss';
import Question from '../../assets/images/question.png'; 
import Image from 'next/image';

export default function Comments() {

  const textareaRef = useRef<HTMLTextAreaElement>(null);





  return (
    <div className={styles.comments}>
      <div className={styles.write}>
        <textarea
          ref={textareaRef}
          placeholder='Napisz komentarz'
          
          
        />
      </div>

      <div className={styles.user}>
        <div className={styles.userimage}> 
        <Image className={styles.accountimage} src={Question} alt={'account image'} />
        </div>
        <div className={styles.usercomment}>
          <div className={styles.nickndate}>
            <div className={styles.username}>User123</div>
            <div className={styles.date}>01.01.2024/12:34</div>
          </div>
          <div className={styles.commentText}></div>
        </div>
      </div>

      <div className={styles.user}>
        <div className={styles.userimage}>
        <Image className={styles.accountimage} src={Question} alt={'account image'} />
        </div>
        <div className={styles.usercomment}>
          <div className={styles.nickndate}>
            <div className={styles.username}>User123</div>
            <div className={styles.date}>01.01.2024/12:34</div>
          </div>
          <div className={styles.commentText}></div>
        </div>
      </div>
    </div>
  );
}
