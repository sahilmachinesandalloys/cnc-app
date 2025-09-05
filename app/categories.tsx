import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ResponsiveText, Header } from '../components';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants';
import { useQuery } from '@apollo/client/react';
import { useRouter } from 'expo-router';
import { GET_CATEGORIES, Category, CategoriesData } from '../graphql/queries/categories';

const CategoriesScreen: React.FC = () => {
  const { loading, error, data } = useQuery<CategoriesData>(GET_CATEGORIES);
  const router = useRouter();

  const handleCategoryPress = (categorySlug: string) => {
    router.push(`/subcategory?categorySlug=${categorySlug}`);
  };

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Product Categories" showBackButton />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <ResponsiveText size="bodyMedium" color="textSecondary" style={styles.loadingText}>
            Loading categories...
          </ResponsiveText>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Product Categories" showBackButton />
        <View style={styles.errorContainer}>
          <ResponsiveText size="bodyMedium" color="error" style={styles.errorText}>
            Error loading categories: {error.message}
          </ResponsiveText>
        </View>
      </SafeAreaView>
    );
  }

  const categories = data?.categories?.data || [];
  
  // Debug: Log the data to see what's coming from the API
  console.log('Categories data:', data);
  console.log('Categories array:', categories);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Product Categories" showBackButton />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <ResponsiveText size="titleLarge" color="textPrimary" weight="bold">
            Explore Our Products
          </ResponsiveText>
          <ResponsiveText size="bodyMedium" color="textSecondary" style={styles.subtitle}>
            Discover our comprehensive range of high-quality machine tools and equipment
          </ResponsiveText>
        </View>

                 <View style={styles.categoriesGrid}>
           {categories.map((category: Category) => (
                           <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category.attributes.Slug)}
                activeOpacity={0.8}
              >
                <View style={styles.categoryContent}>
                  <View style={styles.categoryInfo}>
                    <ResponsiveText size="titleMedium" color="textPrimary" weight="bold">
                      {category.attributes.Title || 'Unnamed Category'}
                    </ResponsiveText>
                    <ResponsiveText size="bodySmall" color="textSecondary" style={styles.description}>
                      Explore our {category.attributes.Title?.toLowerCase() || 'products'} collection
                    </ResponsiveText>
                  </View>
                  <View style={styles.arrowContainer}>
                    <ResponsiveText size="display" color="primary" weight="bold">
                      ›
                    </ResponsiveText>
                  </View>
                </View>
              </TouchableOpacity>
           ))}
         </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  headerSection: {
    padding: SPACING.lg,
    alignItems: 'center',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: SPACING.sm,
    textAlign: 'center',
    lineHeight: 22,
  },
  categoriesGrid: {
    padding: SPACING.lg,
    gap: SPACING.lg,
  },
  categoryCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  categoryContent: {
    padding: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
  },
  description: {
    marginTop: SPACING.xs,
    lineHeight: 18,
  },
  arrowContainer: {
    marginLeft: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  loadingText: {
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  errorText: {
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default CategoriesScreen;
