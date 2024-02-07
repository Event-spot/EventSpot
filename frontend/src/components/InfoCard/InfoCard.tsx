import React from 'react';
import styles from './InfoCard.module.scss';
import Link from 'next/link';

interface InfoCardProps {
    type: 'user' | 'event';
}

interface InfoData {
    title: string;
    options: string[];
    buttonText: string;
}

const data: Record<InfoCardProps['type'], InfoData> = {
    user: {
        title: "Użytkownik",
        options: [
            "Bądź częścią społeczności",
            "Organizuj zloty",
            "Dziel się swoją pasją",
            "Poznaj nowych przyjaciół"
        ],
        buttonText: "Dołącz teraz"
    },
    event: {
        title: "Wydarzenia",
        options: [
            "Przeglądaj nadchodzące wydarzenia",
            "Znajdź wydarzenia w twojej okolicy",
            "Spotkaj się z miłośnikami motoryzacji",
            "Dołącz do uczestników",
        ],
        buttonText: "Odkryj wydarzenia"
    }
};

export default function InfoCard({type}: InfoCardProps) {
    const content = data[type];

    return (
        <div className={styles.container}>
            <div className={styles.title}>{content.title}</div>
            <div className={styles.content}>
                {content.options.map((option, index) => (
                    <p key={index} className={styles.option}>{option}</p>
                ))}
            </div>
            {type === 'event' ? (
                <Link href="/wydarzenia" passHref>
                    <li className={styles.btn}>{content.buttonText}</li>
                </Link>
            ) : type === 'user' ?  (
                <Link href="/auth?view=register" passHref>
                <li className={styles.btn}>{content.buttonText}</li>
                </Link>
            ): (
                <i>błąd</i>
            )}
        </div>
    );
}