import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Skeleton } from './index';
import { SPACING, BORDER_RADIUS } from '../../constants';

const ServicesSectionSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Render 5 skeleton service cards */}
        {Array.from({ length: 5 }).map((_, index) => (
          <View key={index} style={styles.serviceCard}>
            {/* Icon skeleton */}
            <Skeleton 
              width={28} 
              height={28} 
              borderRadius={BORDER_RADIUS.sm}
              style={styles.iconSkeleton}
            />
            
            {/* Title skeleton */}
            <Skeleton 
              width={80} 
              height={16} 
              borderRadius={BORDER_RADIUS.xs}
              style={styles.titleSkeleton}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingTop: 0,
    paddingBottom: SPACING.lg,
  },
  scrollContent: {
    paddingRight: SPACING.md,
  },
  serviceCard: {
    width: 120,
    height: 120,
    borderRadius: BORDER_RADIUS.lg,
    marginRight: SPACING.md,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
  },
  iconSkeleton: {
    marginBottom: SPACING.md,
  },
  titleSkeleton: {
    marginTop: SPACING.xs,
  },
});

export default ServicesSectionSkeleton;
