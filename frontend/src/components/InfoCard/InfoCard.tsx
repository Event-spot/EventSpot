import styles from './InfoCard.module.scss';

export default function InfoCard() {
    return(
        <div className={styles.container}>
            <div className={styles.title}>
                Organizator
            </div>
            <div className={styles.content}>
                <p className={styles.option}>Buduj swoją społeczność</p>
                <div className={styles.stripe}></div>
                <p className={styles.option}>Organizuj zloty</p>
                <div className={styles.stripe}></div>
                <p className={styles.option}>Publikuj wyniki konkursów</p>
                <div className={styles.stripe}></div>
                <p className={styles.option}>Zapraszaj kierowców na zloty zamknięte</p>
                <div className={styles.stripe}></div>
                <p className={styles.option}>Wybieraj kategorię oraz tematykę zlotu</p>
            </div>
            <button className={styles.btn}>Zostań organizatorem</button>
        </div>
    )
}