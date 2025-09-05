import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ResponsiveText, Header } from "../components";
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from "../constants";
import { useQuery } from "@apollo/client/react";
import {
  GET_SUBCATEGORIES,
  Subcategory,
  SubcategoriesData,
} from "../graphql/queries/subcategories";

const SubcategoryScreen: React.FC = () => {
  const { categorySlug } = useLocalSearchParams<{ categorySlug: string }>();
  const router = useRouter();

  // Debug: Log the received parameters
  console.log("SubcategoryScreen - categorySlug:", categorySlug);

  // Use Apollo Client for GraphQL query
  const { loading, error, data } = useQuery<SubcategoriesData>(
    GET_SUBCATEGORIES,
    {
      variables: { category: categorySlug || "" },
      skip: !categorySlug,
    }
  );

  const handleSubcategoryPress = (
    subcategorySlug: string,
    subcategoryTitle: string
  ) => {
    router.push(
      `/products?subcategorySlug=${subcategorySlug}&subcategoryTitle=${encodeURIComponent(
        subcategoryTitle
      )}`
    );
  };

  // Format category slug for display
  const formatCategoryTitle = (slug: string) => {
    if (!slug) return "Category";
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const categoryTitle = formatCategoryTitle(categorySlug || "Category");

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={categoryTitle} showBackButton />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <ResponsiveText
            size="bodyMedium"
            color="textSecondary"
            style={styles.loadingText}
          >
            Loading subcategories...
          </ResponsiveText>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={categoryTitle} showBackButton />
        <View style={styles.errorContainer}>
          <ResponsiveText
            size="bodyMedium"
            color="error"
            style={styles.errorText}
          >
            Error loading subcategories: {error.message}
          </ResponsiveText>
        </View>
      </SafeAreaView>
    );
  }

  const subcategories = data?.subCategories?.data || [];

  return (
    <SafeAreaView style={styles.container}>
      <Header title={categoryTitle} showBackButton />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.subcategoriesGrid}>
          {subcategories.map((subcategory: any) => (
            <TouchableOpacity
              key={subcategory.attributes.Slug}
              style={styles.subcategoryCard}
              onPress={() =>
                handleSubcategoryPress(
                  subcategory.attributes.Slug,
                  subcategory.attributes.Title
                )
              }
              activeOpacity={0.8}
            >
              <View style={styles.subcategoryContent}>
                <View style={styles.subcategoryInfo}>
                  <ResponsiveText
                    size="titleMedium"
                    color="textPrimary"
                    weight="bold"
                  >
                    {subcategory.attributes.Title || "Unnamed Subcategory"}
                  </ResponsiveText>
                  <ResponsiveText
                    size="bodySmall"
                    color="textSecondary"
                    style={styles.description}
                  >
                    Explore our{" "}
                    {subcategory.attributes.Title?.toLowerCase() || "products"}{" "}
                    collection
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
    alignItems: "center",
    textAlign: "center",
  },
  subtitle: {
    marginTop: SPACING.sm,
    textAlign: "center",
    lineHeight: 22,
  },
  subcategoriesGrid: {
    padding: SPACING.lg,
    gap: SPACING.lg,
  },
  subcategoryCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    overflow: "hidden",
    ...SHADOWS.md,
  },
  subcategoryContent: {
    padding: SPACING.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subcategoryInfo: {
    flex: 1,
  },
  description: {
    marginTop: SPACING.xs,
    lineHeight: 18,
  },
  arrowContainer: {
    marginLeft: SPACING.md,
    justifyContent: "center",
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
});

export default SubcategoryScreen;
