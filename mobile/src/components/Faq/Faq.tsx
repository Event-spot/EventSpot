import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

interface FAQItemProps {
  question: string;
  answer: string;
  onPress: () => void;
  expanded: boolean;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, onPress, expanded }) => (
    <View>
    <TouchableOpacity onPress={onPress} style={styles.faqItemHeader}>
      <Text style={styles.question}>{question}</Text>
      <Text style={styles.icon}>{expanded ? '▲' : '▼'}</Text>
    </TouchableOpacity>
    {expanded && (
      <View style={styles.answerContainer}>
        <Text>{answer}</Text>
      </View>
    )}
  </View>
);

const FAQ: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <View style={styles.faq}>
      <FAQItem
        question="Pytanie 1"
        answer="Odpowiedź na pytanie 1."
        onPress={() => handleAccordionClick(0)}
        expanded={expandedIndex === 0}
      />
      <FAQItem
        question="Pytanie 2"
        answer="Odpowiedź na pytanie 2."
        onPress={() => handleAccordionClick(1)}
        expanded={expandedIndex === 1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  faq: {
    // Tutaj dodaj globalne style dla FAQ, jeśli są potrzebne
  },
  faqItemHeader: {
    borderRadius: 20,
    backgroundColor: colors.secondary,
    padding: 10,
    marginBottom: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  answerContainer: {
    // backgroundColor: colors.lightGray, 
    padding: 10,
    borderWidth: 2,
    borderColor: colors.secondary, 
    borderRadius: 10,
    marginBottom: 10,
  },
  question: {
    flex: 1,
    fontSize: 18,
    color: colors.white,
  },
  icon: {
    color: colors.white,
  }
});

export default FAQ;
