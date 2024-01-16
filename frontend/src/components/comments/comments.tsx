// Comments.tsx
import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import styles from './comments.module.scss';

export default function Comments() {
  const [comment, setComment] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [comment]);

  return (
    <div className={styles.comments}>
      <div className={styles.write}>
        <textarea
          ref={textareaRef}
          placeholder='Napisz komentarz'
          value={comment}
          onChange={handleChange}
        />
      </div>
      <div className={styles.user}>
        <div className={styles.userimage}>asd</div>
        <div className={styles.usercomment}>
          <div className={styles.nickndate}>
            <div className={styles.username}>User123</div>
            <div className={styles.date}>01.01.2024/12:34</div>
          </div>
          <div className={styles.commentText}>{comment}</div>
        </div>
      </div>
    </div>
  );
}
