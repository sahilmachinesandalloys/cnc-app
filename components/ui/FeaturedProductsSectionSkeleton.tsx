import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ResponsiveText } from './ResponsiveText';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants';
import Skeleton from './Skeleton';

const FeaturedProductsSectionSkeleton: React.FC = () => {
  const { width: screenWidth } = Dimensions.get('window');
  const cardWidth = (screenWidth - (SPACING.md * 3)) / 2;

  const renderProductCardSkeleton = () => (
    <View style={[styles.productCard, { width: cardWidth }]}>
      {/* Image skeleton */}
      <Skeleton 
        width="100%" 
        height={100} 
        borderRadius={BORDER_RADIUS.lg}
      />
      
      {/* Product info skeleton */}
      <View style={styles.productInfo}>
        <Skeleton 
          width="80%" 
          height={16} 
          borderRadius={4}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <Skeleton 
          width={150} 
          height={24} 
          borderRadius={4}
        />
        <Skeleton 
          width={80} 
          height={20} 
          borderRadius={4}
        />
      </View>

      {/* Products Grid */}
      <View style={styles.grid}>
        <View style={styles.row}>
          {renderProductCardSkeleton()}
          {renderProductCardSkeleton()}
        </View>
        <View style={styles.row}>
          {renderProductCardSkeleton()}
          {renderProductCardSkeleton()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.lg,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  grid: {
    gap: SPACING.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.gray[100],
  },

  productInfo: {
    padding: SPACING.sm,
  },
});

export default FeaturedProductsSectionSkeleton;
