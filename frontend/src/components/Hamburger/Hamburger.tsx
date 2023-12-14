import styles from './Hamburger.module.scss';

export default function Hamburger(props: {onClick: any}){
    return(
        <div className={styles.container} onClick={props.onClick}>
            <span className={styles.stripe}></span>
            <span className={styles.stripe}></span>
            <span className={styles.stripe}></span>
        </div>
    )
}