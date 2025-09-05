import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ResponsiveText, Header } from "../components";
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from "../constants";
import { useQuery } from "@apollo/client/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  GET_PRODUCTS,
  Product,
  ProductsData,
} from "../graphql/queries/products";

const ProductsScreen: React.FC = () => {
  const { subcategorySlug, subcategoryTitle: urlSubcategoryTitle } =
    useLocalSearchParams<{
      subcategorySlug: string;
      subcategoryTitle: string;
    }>();
  const router = useRouter();

  // Debug: Log the received parameters
  console.log("ProductsScreen - subcategorySlug:", subcategorySlug);
  console.log("ProductsScreen - subcategoryTitle:", urlSubcategoryTitle);

  // Use Apollo Client for GraphQL query
  const { loading, error, data } = useQuery<ProductsData>(GET_PRODUCTS, {
    variables: { subCategory: subcategorySlug || "" },
    skip: !subcategorySlug,
  });

  const handleProductPress = (productSlug: string) => {
    // Navigate to product detail screen
    router.push(`/product-detail?productSlug=${productSlug}`);
  };

  // Use the title from URL parameter, fallback to "Products" if not available
  const subcategoryTitle = urlSubcategoryTitle
    ? urlSubcategoryTitle.length > 37
      ? urlSubcategoryTitle.substring(0, 37) + "..."
      : urlSubcategoryTitle
    : "Products";

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={subcategoryTitle} showBackButton />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <ResponsiveText
            size="bodyMedium"
            color="textSecondary"
            style={styles.loadingText}
          >
            Loading products...
          </ResponsiveText>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={subcategoryTitle} showBackButton />
        <View style={styles.errorContainer}>
          <ResponsiveText
            size="bodyMedium"
            color="error"
            style={styles.errorText}
          >
            Error loading products: {error.message}
          </ResponsiveText>
        </View>
      </SafeAreaView>
    );
  }

  const products = data?.products?.data || [];

  // Empty state
  if (products.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={subcategoryTitle} showBackButton />
        <View style={styles.emptyContainer}>
          <ResponsiveText
            size="titleMedium"
            color="textSecondary"
            weight="medium"
          >
            No Products Found
          </ResponsiveText>
          <ResponsiveText
            size="bodyMedium"
            color="textSecondary"
            style={styles.emptyText}
          >
            There are no products available in this category at the moment.
          </ResponsiveText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={subcategoryTitle} showBackButton />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.productsGrid}>
          {products.map((product: Product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => handleProductPress(product.attributes.Slug)}
              activeOpacity={0.8}
            >
              <View style={styles.thumbnailContainer}>
                {product.attributes.Thumbnail?.data?.attributes?.url ? (
                  <Image
                    source={{
                      uri: product.attributes.Thumbnail.data.attributes.url,
                    }}
                    style={styles.thumbnail}
                    resizeMode="contain"
                  />
                ) : (
                  <View style={styles.placeholderThumbnail}>
                    <ResponsiveText size="bodySmall" color="textSecondary">
                      No Image
                    </ResponsiveText>
                  </View>
                )}
              </View>

              <View style={styles.productInfo}>
                <ResponsiveText
                  size="titleMedium"
                  color="textPrimary"
                  weight="bold"
                  numberOfLines={2}
                >
                  {product.attributes.Title || "Unnamed Product"}
                </ResponsiveText>

                {product.attributes.Description && (
                  <ResponsiveText
                    size="bodySmall"
                    color="textSecondary"
                    style={styles.description}
                    numberOfLines={3}
                  >
                    {product.attributes.Description}
                  </ResponsiveText>
                )}

                <View style={styles.productMeta}>
                  <ResponsiveText
                    size="bodySmall"
                    color="primary"
                    weight="medium"
                  >
                    View Details
                  </ResponsiveText>
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
  productsGrid: {
    padding: SPACING.lg,
    gap: SPACING.lg,
  },
  productCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    overflow: "hidden",
    ...SHADOWS.md,
  },
  thumbnailContainer: {
    height: 200,
    backgroundColor: COLORS.gray[50],
    justifyContent: "center",
    alignItems: "center",
    paddingTop: SPACING.md,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  placeholderThumbnail: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.gray[100],
    justifyContent: "center",
    alignItems: "center",
  },
  productInfo: {
    padding: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  description: {
    marginTop: SPACING.sm,
    lineHeight: 18,
  },
  productMeta: {
    marginTop: SPACING.xs,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
  loadingText: {
    marginTop: SPACING.md,
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
  errorText: {
    textAlign: "center",
    lineHeight: 22,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
  emptyText: {
    marginTop: SPACING.md,
    textAlign: "center",
    lineHeight: 22,
  },
});

export default ProductsScreen;
