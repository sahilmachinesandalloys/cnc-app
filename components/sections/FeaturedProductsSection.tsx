import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions, Linking } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { ResponsiveText } from '../ui';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants';
import { useFeaturedProductsApollo } from '../../hooks/useGraphQL';
import FeaturedProductsSectionSkeleton from '../ui/FeaturedProductsSectionSkeleton';
import { useRouter } from 'expo-router';

interface ProductCardProps {
  id: number;
  image: any;
  category: string;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, category, onPress }) => {
  return (
    <TouchableOpacity style={styles.productCard} onPress={onPress}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.productImage} resizeMode="contain" />
      </View>
      
      {/* Product Info */}
      <View style={styles.productInfo}>
        <ResponsiveText size="bodySmall" color="textPrimary" weight="bold" style={styles.productTitle}>
          {category}
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

  // Fetch featured products from CMS
  const { featuredProducts, loading, error, isEmpty } = useFeaturedProductsApollo();



  // Fallback products if CMS data is not available
  const fallbackProducts = [
    {
      id: 1,
      image: require('../../assets/banner.png'),
      category: 'Milling',
      title: 'CNC Vertical Milling Machine',
    },
    {
      id: 2,
      image: require('../../assets/banner.png'),
      category: 'Boring',
      title: 'CNC Boring Milling Machine',
    },
    {
      id: 3,
      image: require('../../assets/banner.png'),
      category: 'Boring',
      title: 'CNC Floor Boring Machine',
    },
    {
      id: 4,
      image: require('../../assets/banner.png'),
      category: 'Lathe',
      title: 'CNC Lathe Bed Type Machine',
    },
  ];

  // Use CMS data if available, otherwise use fallback
  const products = featuredProducts.length > 0 ? featuredProducts : fallbackProducts;


  const handleProductPress = async (product: any) => {
    try {
      const productUrl = `https://www.sahilcnc.com/products/${product.slug}`;
      
      // Check if the URL can be opened
      const canOpen = await Linking.canOpenURL(productUrl);
      
      if (canOpen) {
        await Linking.openURL(productUrl);
      } else {
        console.log('Cannot open URL:', productUrl);
        // Fallback: open main website
        await Linking.openURL('https://www.sahilcnc.com');
      }
    } catch (error) {
      console.error('Error opening product URL:', error);
      // Fallback: open main website
      try {
        await Linking.openURL('https://www.sahilcnc.com');
      } catch (fallbackError) {
        console.error('Error opening fallback URL:', fallbackError);
      }
    }
  };

  const router = useRouter();

  const handleViewAllPress = () => {
    router.push('/categories');
  };

  const renderProductCard = ({ item }: { item: any }) => {
    // Handle both CMS data and fallback data
    const imageSource = item.thumbnailUrl 
      ? { uri: item.thumbnailUrl }
      : item.image || require('../../assets/banner.png');
    
    const category = item.category?.title || item.category || 'Uncategorized';

    return (
      <ProductCard
        id={item.id}
        image={imageSource}
        category={category}
        onPress={() => handleProductPress(item)}
      />
    );
  };

  // Show skeleton loading state
  if (loading) {
    return <FeaturedProductsSectionSkeleton />;
  }

  // Show error state
  if (error && isEmpty) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Ionicons name="alert-circle" size={48} color={COLORS.error} />
        <ResponsiveText size="bodyMedium" color="textSecondary" style={styles.errorText}>
          Unable to load featured products
        </ResponsiveText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <ResponsiveText size="titleMedium" color="textPrimary" weight="bold">
          Featured Products
        </ResponsiveText>
        
        <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllPress}>
                  <ResponsiveText size="bodySmall" color="primary" weight="medium">
          All Products
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
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
    ...SHADOWS.md, // Reduced shadow for subtle appearance
    borderWidth: 1,
    borderColor: COLORS.gray[100], // Subtle border
  },
  imageContainer: {
    position: 'relative',
    height: 120,
    paddingVertical: SPACING.sm, // Reduced vertical padding to allow more horizontal space
  },
  productImage: {
    width: '100%',
    height: '100%',
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
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl,
  },
  errorText: {
    marginTop: SPACING.sm,
  },
});

export default FeaturedProductsSection;
