import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ResponsiveText } from '../ui';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants';
import { useFAQSection } from '../../hooks/useGraphQL';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Fetch FAQ data from CMS
  const { faqData, loading, error } = useFAQSection();

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Show loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ResponsiveText size="bodyMedium" color="textSecondary">
            Loading FAQs...
          </ResponsiveText>
        </View>
      </View>
    );
  }

  // Show error state
  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <ResponsiveText size="bodyMedium" color="error">
            Unable to load FAQs
          </ResponsiveText>
        </View>
      </View>
    );
  }

  // Use CMS data
  const displayData = faqData;

  // Transform CMS data to component format
  const faqItems: FAQItem[] = displayData?.faqs?.map(faq => ({
    id: faq.id,
    question: faq.attributes?.Question || faq.Question || '',
    answer: faq.attributes?.Answer || faq.Answer || '',
  })) || [];

  // If no data, show empty state
  if (!displayData) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <ResponsiveText size="bodyMedium" color="textSecondary">
            No FAQ data available
          </ResponsiveText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <ResponsiveText size="titleMedium" color="textPrimary" weight="bold" style={styles.title}>
          {displayData.Title}
        </ResponsiveText>
        
        {displayData.Description && (
          <ResponsiveText size="bodySmall" color="textSecondary" style={styles.description}>
            {displayData.Description}
          </ResponsiveText>
        )}
      </View>

      {/* Thumbnail Image (if available) */}
      {displayData.Thumbnail && (
        <View style={styles.thumbnailContainer}>
          <Image 
            source={{ uri: displayData.Thumbnail }} 
            style={styles.thumbnail}
            resizeMode="cover"
          />
        </View>
      )}
      
      {/* FAQ List */}
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
  header: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  description: {
    textAlign: 'center',
    lineHeight: 18,
  },
  thumbnailContainer: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
    height: 300, // Increased container height
    overflow: 'hidden', // Clip the image to container
    borderRadius: BORDER_RADIUS.md,
  },
  thumbnail: {
    width: '100%',
    height: 400, // Even taller image to show more content
    borderRadius: BORDER_RADIUS.md,
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
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl,
  },
});

export default FAQSection;
