import styles from './comments.module.scss';
import Question from '../../assets/images/question.png'; 
import Image from 'next/image';
import Link from 'next/link';

type CommentProps ={
  id:number;
  userId:number;
  content:string;
  createDate:string;
  imie:string;
  nazwisko:string;
  avatarImage:string;
}

const Comment: React.FC<CommentProps>=({
  id,
  content,
  createDate,
  imie,
  nazwisko,
  avatarImage,
  userId
})=>{
  const date = new Date(parseInt(createDate, 10));
  const formattedDate = date.toLocaleString('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
  return(
      <div className={styles.comments}>
      <div className={styles.user}>
        <div className={styles.userimage}> 
          <Link href={`../uzytkownicy/${userId}`}>
            <Image 
              className={styles.accountimage} 
              src={avatarImage || Question} 
              alt={'Avatar Image'} 
              width={50}
              height={50}
            />
          </Link>
        </div>
        <div className={styles.usercomment}>
          <div className={styles.nickndate}>
              <div className={styles.username}>
                <Link href={`../uzytkownicy/${userId}`}>
                  {imie} {nazwisko}
                </Link>
              </div>
            <div className={styles.date}>{formattedDate}</div>
          </div>
          <div className={styles.commentText}>{content}</div>
        </div>
      </div>
    </div>
  )
}
export default Comment;
