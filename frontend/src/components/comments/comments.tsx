// Comments.tsx
import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import styles from './comments.module.scss';
import Question from '../../assets/images/question.png'; 
import Image from 'next/image';

type CommentProps ={
  id:number;
  content:string;
  createDate:string;
  imie:string;
  nazwisko:string;
}

const Comment: React.FC<CommentProps>=({
  id,
  content,
  createDate,
  imie,
  nazwisko,
})=>{
 
  return(
      <div className={styles.comments}>
    

      <div className={styles.user}>
        <div className={styles.userimage}> 
        <Image className={styles.accountimage} src={Question} alt={'account image'} />
        </div>
        <div className={styles.usercomment}>
          <div className={styles.nickndate}>
            <div className={styles.username}>{imie} {nazwisko}</div>
            <div className={styles.date}>{createDate}</div>
          </div>
          <div className={styles.commentText}>{content}</div>
        </div>
      </div>
    </div>
  )
}
export default Comment;
