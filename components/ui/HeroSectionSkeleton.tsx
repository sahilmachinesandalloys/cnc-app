import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Skeleton } from './index';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth - (SPACING.md * 2);

const HeroSectionSkeleton: React.FC = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.card}>
        {/* Background Skeleton */}
        <Skeleton 
          width="100%" 
          height={280} 
          borderRadius={BORDER_RADIUS.xl}
          style={styles.backgroundSkeleton}
        />
        
        {/* Overlay Content */}
        <View style={styles.overlay}>
          {/* Popular Tag Skeleton */}
          <View style={styles.popularTag}>
            <Skeleton width={60} height={24} borderRadius={BORDER_RADIUS.md} />
          </View>

          {/* Content Skeleton */}
          <View style={styles.contentContainer}>
            {/* Title Skeleton */}
            <Skeleton 
              width="80%" 
              height={24} 
              borderRadius={BORDER_RADIUS.sm}
              style={styles.titleSkeleton}
            />
            
            {/* Subtitle Skeleton */}
            <Skeleton 
              width="90%" 
              height={16} 
              borderRadius={BORDER_RADIUS.sm}
              style={styles.subtitleSkeleton}
            />
            
            {/* Button Skeleton */}
            <Skeleton 
              width={120} 
              height={40} 
              borderRadius={BORDER_RADIUS.lg}
              style={styles.buttonSkeleton}
            />
          </View>

          {/* Icon Skeleton */}
          <View style={styles.iconContainer}>
            <Skeleton width={48} height={48} borderRadius={24} />
          </View>

          {/* Pagination Dots Skeleton */}
          <View style={styles.pagination}>
            <Skeleton width={24} height={8} borderRadius={4} />
            <Skeleton width={8} height={8} borderRadius={4} />
            <Skeleton width={8} height={8} borderRadius={4} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  card: {
    width: cardWidth,
    height: 280,
    borderRadius: BORDER_RADIUS.xl,
    position: 'relative',
    overflow: 'hidden',
    ...SHADOWS.lg,
  },
  backgroundSkeleton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: SPACING.lg,
    justifyContent: 'space-between',
  },
  popularTag: {
    alignSelf: 'flex-start',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  titleSkeleton: {
    marginBottom: SPACING.xs,
  },
  subtitleSkeleton: {
    marginBottom: SPACING.lg,
  },
  buttonSkeleton: {
    alignSelf: 'flex-start',
  },
  iconContainer: {
    position: 'absolute',
    bottom: SPACING.xl + 40,
    right: SPACING.md,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.sm,
    position: 'absolute',
    bottom: SPACING.md,
    left: 0,
    right: 0,
  },
});

export default HeroSectionSkeleton;
