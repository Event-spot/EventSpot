'use client'
import styles from './faq.module.scss';
import React, {useState} from 'react';
const FAQ = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const handleAccordionClick = (index: any) => {
        setExpandedIndex((prevIndex: any) => (prevIndex === index ? null : index));
      };
return(
<div className={styles.faq}>
    <ul>
            <li>
              <div
                className={styles.faqItem}
                onClick={() => handleAccordionClick(0)}
              >
                <span className={styles.question}>Pytanie 1</span>
                {expandedIndex === 0 ? '▲' : '▼'}
              </div>
              {expandedIndex === 0 && (
                <div className={styles.answer}>Odpowiedź na pytanie 1.</div>
              )}
            </li>
            <li>
              <div
                className={styles.faqItem}
                onClick={() => handleAccordionClick(1)}
              >
                <span className={styles.question}>Pytanie 2</span>
                {expandedIndex === 1 ? '▲' : '▼'}
              </div>
              {expandedIndex === 1 && (
                <div className={styles.answer}>Odpowiedź na pytanie 2.</div>
              )}
            </li>
            {/* Dodaj więcej elementów FAQ według potrzeb */}
          </ul>
</div>
)
}
export default FAQ;