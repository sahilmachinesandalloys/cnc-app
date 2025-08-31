import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ResponsiveText } from '../ui';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants';

interface ProductCardProps {
  id: number;
  image: any;
  category: string;
  title: string;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, category, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.productCard} onPress={onPress}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.productImage} resizeMode="cover" />
        
        {/* Category Tag Overlay */}
        <View style={styles.categoryTag}>
          <LinearGradient
            colors={[COLORS.gradientStart, COLORS.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientTag}
          >
            <ResponsiveText size="caption" color="textInverse" weight="medium">
              {category}
            </ResponsiveText>
          </LinearGradient>
        </View>
      </View>
      
      {/* Product Info */}
      <View style={styles.productInfo}>
        <ResponsiveText size="bodySmall" color="textPrimary" weight="bold" style={styles.productTitle}>
          {title}
        </ResponsiveText>
        
        <TouchableOpacity style={styles.detailsLink}>
          <ResponsiveText size="caption" color="primary" weight="medium">
            Details
          </ResponsiveText>
          <Ionicons name="arrow-forward" size={12} color={COLORS.primary} style={styles.arrow} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const FeaturedProductsSection: React.FC = () => {
  const { width: screenWidth } = Dimensions.get('window');
  const cardWidth = (screenWidth - (SPACING.md * 3)) / 2; // 2 columns with margins

  const products = [
    {
      id: 1,
      image: require('../../assets/banner.png'), // Using existing banner as placeholder
      category: 'Milling',
      title: 'CNC Vertical Milling Machine',
    },
    {
      id: 2,
      image: require('../../assets/banner.png'), // Using existing banner as placeholder
      category: 'Boring',
      title: 'CNC Boring Milling Machine',
    },
    {
      id: 3,
      image: require('../../assets/banner.png'), // Using existing banner as placeholder
      category: 'Boring',
      title: 'CNC Floor Boring Machine',
    },
    {
      id: 4,
      image: require('../../assets/banner.png'), // Using existing banner as placeholder
      category: 'Lathe',
      title: 'CNC Lathe Bed Type Machine',
    },
  ];

  const handleProductPress = (productId: number) => {
    console.log('Product pressed:', productId);
    // TODO: Navigate to product details
  };

  const handleViewAllPress = () => {
    console.log('View All pressed');
    // TODO: Navigate to all products page
  };

  const renderProductCard = ({ item }: { item: any }) => (
    <ProductCard
      id={item.id}
      image={item.image}
      category={item.category}
      title={item.title}
      onPress={() => handleProductPress(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <ResponsiveText size="titleMedium" color="textPrimary" weight="bold">
          Featured Products
        </ResponsiveText>
        
        <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllPress}>
          <ResponsiveText size="bodySmall" color="primary" weight="medium">
            View All
          </ResponsiveText>
          <Ionicons name="arrow-forward" size={14} color={COLORS.primary} style={styles.viewAllArrow} />
        </TouchableOpacity>
      </View>

      {/* Products Grid */}
      <FlatList
        data={products}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false} // Since it's in a ScrollView
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm, // Reduced top padding to decrease gap
    paddingBottom: SPACING.lg,
    backgroundColor: '#f8f9fa', // Extreme light gray background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md, // Reduced margin
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  viewAllArrow: {
    marginLeft: SPACING.xs,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: SPACING.sm, // Reduced margin
  },
  productCard: {
    width: (Dimensions.get('window').width - (SPACING.md * 3)) / 2,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.lg, // Enhanced shadow for better card appearance
    borderWidth: 1,
    borderColor: COLORS.gray[100], // Subtle border
  },
  imageContainer: {
    position: 'relative',
    height: 100, // Reduced height
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  categoryTag: {
    position: 'absolute',
    top: SPACING.xs, // Reduced padding
    left: SPACING.xs, // Reduced padding
    borderRadius: BORDER_RADIUS.sm, // Smaller radius
    overflow: 'hidden',
  },
  gradientTag: {
    paddingHorizontal: SPACING.xs, // Reduced padding
    paddingVertical: SPACING.xs / 2, // Reduced padding
  },
  productInfo: {
    padding: SPACING.sm, // Reduced padding
  },
  productTitle: {
    marginBottom: SPACING.xs, // Reduced margin
    lineHeight: 16, // Reduced line height
  },
  detailsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs / 2, // Reduced gap
  },
  arrow: {
    marginLeft: SPACING.xs / 2, // Reduced margin
  },
});

export default FeaturedProductsSection;
