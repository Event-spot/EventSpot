'use client'
import styles from './contactform.module.scss';
import { useForm } from 'react-hook-form'; 
import * as yup from 'yup';
import{yupResolver} from '@hookform/resolvers/yup';

const contactform = () => {

const { register } = useForm({
        
});
const onSubmit = (data: any) => {
    console.log(data);
}
return (

 

  <div className={styles.formularz}>
    <form onSubmit={(onSubmit)}>
    
        <div className={styles.upA}>
          <label htmlFor="numer-telefonu">Numer telefonu:</label>
          <input type="number"  pattern="[0-9]{9}" id="numer-telefonu" required  {...register("PhoneNumber")} />
        </div>
        <div className={styles.upB}>
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" required  {...register("Email")}/>
        </div>
        <div className={styles.upC}>
          <label htmlFor="temat">Temat rozmowy:</label>
          <input type="text" id="temat" required  {...register("Topic")}/>
        </div>
        <div className={styles.upD}>
          <button type="submit">Wyślij</button>
        </div>
      
    </form>
    </div>
    )
    }
export default contactform;