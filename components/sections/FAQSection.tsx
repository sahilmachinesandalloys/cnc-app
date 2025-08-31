import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ResponsiveText } from '../ui';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(1); // First item expanded by default

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: 'How can I optimize the performance of a CNC machining center?',
      answer: 'Optimization involves proper programming, tool selection, cutting parameters, workholding solutions, and regular calibration to maintain peak performance.',
    },
    {
      id: 2,
      question: 'What is CNC and how does it benefit manufacturing?',
      answer: 'CNC (Computer Numerical Control) is a manufacturing process that uses computerized controls to operate and manipulate machine tools. It provides precision, consistency, and efficiency in manufacturing operations.',
    },
    {
      id: 3,
      question: 'How do I improve machine performance and longevity?',
      answer: 'Regular maintenance, proper lubrication, timely calibration, and following manufacturer guidelines are key to improving machine performance and extending its lifespan.',
    },
    {
      id: 4,
      question: 'What are the CNC machine tolerance capabilities?',
      answer: 'CNC machines can achieve tolerances as tight as ±0.001 inches (0.025mm) depending on the machine type, material, and cutting conditions.',
    },
  ];

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <ResponsiveText size="titleMedium" color="textPrimary" weight="bold" style={styles.title}>
        Frequently Asked Questions
      </ResponsiveText>
      
      <View style={styles.faqList}>
        {faqItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.faqItem}
            onPress={() => toggleExpanded(item.id)}
            activeOpacity={0.7}
          >
            <View style={styles.questionRow}>
              <ResponsiveText size="bodySmall" color="textPrimary" weight="semiBold" style={styles.question}>
                {item.question}
              </ResponsiveText>
              <Ionicons
                name={expandedId === item.id ? 'chevron-up' : 'chevron-down'}
                size={16}
                color={COLORS.gray[500]}
              />
            </View>
            
            {expandedId === item.id && (
              <View style={styles.answerContainer}>
                <ResponsiveText size="caption" color="textSecondary" style={styles.answer}>
                  {item.answer}
                </ResponsiveText>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  title: {
    marginBottom: SPACING.md,
  },
  faqList: {
    gap: SPACING.sm,
  },
  faqItem: {
    backgroundColor: COLORS.gray[50],
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  question: {
    flex: 1,
    marginRight: SPACING.sm,
    lineHeight: 18,
  },
  answerContainer: {
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  answer: {
    lineHeight: 16,
  },
});

export default FAQSection;
