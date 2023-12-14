import styles from './Overlay.module.scss';

export default function Overlay(props: {className: any, onClick: any}) {
    return(
        <div className={`${styles.overlay} ${props.className}`} onClick={props.onClick}>

        </div>
    )
}