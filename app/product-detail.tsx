import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ResponsiveText, Header } from "../components";
import { QuoteModal } from "../components/ui";
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from "../constants";

// Calculate dynamic footer height
const calculateFooterHeight = (hasYouTubePlaylist: boolean) => {
  const topPadding = SPACING.md; // 16px (top padding)
  const bottomPadding = SPACING.xl; // 32px (bottom padding)
  const buttonHeight = SPACING.md + 20; // ~36px (padding + text height)
  const rowGap = SPACING.xs; // 4px
  const borderHeight = 1;

  // First row: 2 buttons
  const firstRowHeight = buttonHeight;
  // Second row: 1 button (if YouTube playlist exists)
  const secondRowHeight = hasYouTubePlaylist ? buttonHeight + rowGap : 0;

  const totalHeight =
    topPadding +
    bottomPadding +
    firstRowHeight +
    secondRowHeight +
    borderHeight;

  console.log("Footer height breakdown:", {
    topPadding,
    bottomPadding,
    firstRowHeight,
    secondRowHeight,
    borderHeight,
    totalHeight,
  });

  return totalHeight;
};
import { useLocalSearchParams, useRouter } from "expo-router";
import { getGraphQLUrl, getGraphQLHeaders } from "../graphql/config";

const ProductDetailScreen: React.FC = () => {
  const { productSlug } = useLocalSearchParams<{
    productSlug: string;
  }>();
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isQuoteModalVisible, setIsQuoteModalVisible] = useState(false);

  // Calculate dynamic footer height based on content
  // YouTube button is now in content, so footer only has 2 buttons
  const footerHeight = calculateFooterHeight(false);

  // Debug: Log the calculated values
  console.log("Footer height calculation:", {
    footerHeight,
    totalPadding: footerHeight + 100,
  });

  // Debug: Log the received parameters
  console.log("ProductDetailScreen - productSlug:", productSlug);

  const handleEnquire = () => {
    setIsQuoteModalVisible(true);
  };

  useEffect(() => {
    if (!productSlug) {
      setLoading(false);
      return;
    }

    const query = `
      query ProductDetailQuery($product: String!) {
        products(filters: { Slug: { eq: $product } }) {
          data {
            id
            attributes {
              Title
              Slug
              Description
              youtubePlaylist
              Thumbnail {
                data {
                  attributes {
                    url
                  }
                }
              }
              Category {
                data {
                  attributes {
                    Title
                    Slug
                    Category {
                      data {
                        attributes {
                          Title
                          Slug
                        }
                      }
                    }
                  }
                }
              }
              Images {
                data {
                  id
                  attributes {
                    url
                  }
                }
              }
              ComponentsAndAccessories {
                id
                Heading
                Content {
                  id
                  Title
                  List {
                    id
                    Name
                  }
                }
              }
            }
          }
        }
      }
    `;

    fetch(getGraphQLUrl(), {
      method: "POST",
      headers: getGraphQLHeaders(),
      body: JSON.stringify({
        query,
        variables: { product: productSlug },
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Product detail result:", result);
        setData(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product detail:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [productSlug]);

  // Get product title for header
  const productTitle =
    data?.products?.data?.[0]?.attributes?.Title || "Product Details";

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Loading..." showBackButton />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <ResponsiveText
            size="bodyMedium"
            color="textSecondary"
            style={styles.loadingText}
          >
            Loading product details...
          </ResponsiveText>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Error" showBackButton />
        <View style={styles.errorContainer}>
          <ResponsiveText
            size="bodyMedium"
            color="error"
            style={styles.errorText}
          >
            Error loading product details: {error}
          </ResponsiveText>
        </View>
      </SafeAreaView>
    );
  }

  const product = data?.products?.data?.[0]?.attributes;

  // Product not found
  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Product Not Found" showBackButton />
        <View style={styles.emptyContainer}>
          <ResponsiveText
            size="titleMedium"
            color="textSecondary"
            weight="medium"
          >
            Product Not Found
          </ResponsiveText>
          <ResponsiveText
            size="bodyMedium"
            color="textSecondary"
            style={styles.emptyText}
          >
            The requested product could not be found.
          </ResponsiveText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={productTitle} showBackButton />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.productDetailContainer,
            { paddingBottom: footerHeight },
          ]}
        >
          {/* Product Images */}
          {product.Images?.data && product.Images.data.length > 0 && (
            <View style={styles.imageGallery}>
              {product.Images.data.map((image: any) => (
                <Image
                  key={image.id}
                  source={{ uri: image.attributes.url }}
                  style={styles.detailImage}
                  resizeMode="contain"
                />
              ))}
            </View>
          )}

          {/* Product Description */}
          {product.Description && (
            <View style={styles.section}>
              <ResponsiveText
                size="titleMedium"
                color="textPrimary"
                weight="bold"
              >
                Description
              </ResponsiveText>
              <ResponsiveText
                size="bodyMedium"
                color="textSecondary"
                style={styles.descriptionText}
              >
                {product.Description}
              </ResponsiveText>
            </View>
          )}

          {/* YouTube Playlist Button */}
          {product.youtubePlaylist && (
            <View style={styles.youtubeButtonContainer}>
              <TouchableOpacity
                style={styles.youtubeButton}
                onPress={() => Linking.openURL(product.youtubePlaylist)}
              >
                <LinearGradient
                  colors={[COLORS.primary, COLORS.secondary, COLORS.accent]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.youtubeButtonGradient}
                >
                  <Ionicons
                    name="logo-youtube"
                    size={20}
                    color="white"
                    style={styles.youtubeIcon}
                  />
                  <ResponsiveText
                    size="bodyMedium"
                    color="white"
                    weight="medium"
                  >
                    Visit YouTube Playlist
                  </ResponsiveText>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {/* Components and Accessories */}
          {product.ComponentsAndAccessories &&
            product.ComponentsAndAccessories.length > 0 && (
              <View style={styles.section}>
                <ResponsiveText
                  size="titleMedium"
                  color="textPrimary"
                  weight="bold"
                >
                  Components & Accessories
                </ResponsiveText>
                {product.ComponentsAndAccessories.map((component: any) => (
                  <View key={component.id} style={styles.componentItem}>
                    <ResponsiveText
                      size="bodyMedium"
                      color="textPrimary"
                      weight="medium"
                    >
                      {component.Heading}
                    </ResponsiveText>
                    {component.Content.map((content: any) => (
                      <View key={content.id} style={styles.contentItem}>
                        <ResponsiveText
                          size="bodySmall"
                          color="textPrimary"
                          weight="medium"
                        >
                          {content.Title}
                        </ResponsiveText>
                        {content.List.map((item: any) => (
                          <ResponsiveText
                            key={item.id}
                            size="bodySmall"
                            color="textSecondary"
                            style={styles.listItem}
                          >
                            • {item.Name}
                          </ResponsiveText>
                        ))}
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
        </View>
      </ScrollView>

      {/* Fixed Footer with Action Buttons */}
      <View style={styles.fixedFooter}>
        <View style={styles.actionButtonsContainer}>
          {/* First Row - 2 buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                const product = data?.products?.data?.[0]?.attributes;
                if (product) {
                  const categorySlug =
                    product.Category?.data?.attributes?.Category?.data
                      ?.attributes?.Slug || "turning-machines";
                  const subcategorySlug =
                    product.Category?.data?.attributes?.Slug || "vtl";
                  const productSlug = product.Slug;
                  const websiteUrl = `https://www.sahilcnc.com/${categorySlug}/${subcategorySlug}/${productSlug}/`;
                  Linking.openURL(websiteUrl);
                } else {
                  Linking.openURL("https://sahilcnc.com");
                }
              }}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary, COLORS.accent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <ResponsiveText size="bodyMedium" color="white" weight="medium">
                  Visit Website
                </ResponsiveText>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleEnquire}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary, COLORS.accent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <ResponsiveText size="bodyMedium" color="white" weight="medium">
                  Enquire
                </ResponsiveText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Spacer to ensure content is not hidden behind footer */}
      </View>

      {/* Quote Modal */}
      <QuoteModal
        visible={isQuoteModalVisible}
        onClose={() => setIsQuoteModalVisible(false)}
      />
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
  productDetailContainer: {
    padding: SPACING.lg,
  },
  imageGallery: {
    marginBottom: SPACING.lg,
  },
  detailImage: {
    width: "100%",
    height: 250,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.gray[50],
    borderRadius: BORDER_RADIUS.md,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  descriptionText: {
    marginTop: SPACING.sm,
    lineHeight: 22,
  },
  componentItem: {
    marginTop: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.gray[50],
    borderRadius: BORDER_RADIUS.md,
  },
  contentItem: {
    marginTop: SPACING.sm,
  },
  listItem: {
    marginTop: SPACING.xs,
  },
  fixedFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
    ...SHADOWS.md,
    zIndex: 1000,
  },
  actionButtonsContainer: {
    gap: SPACING.xs,
  },
  buttonRow: {
    flexDirection: "row",
    gap: SPACING.xs,
  },
  actionButton: {
    flex: 1,
    borderRadius: BORDER_RADIUS.md,
    overflow: "hidden",
  },
  gradientButton: {
    padding: SPACING.md,
    alignItems: "center",
    justifyContent: "center",
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
  youtubeButtonContainer: {
    marginTop: -SPACING.xs, // Reduce gap above even more
    marginBottom: SPACING.lg, // More gap below
  },
  youtubeButton: {
    borderRadius: BORDER_RADIUS.md,
    overflow: "hidden",
  },
  youtubeButtonGradient: {
    padding: SPACING.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  youtubeIcon: {
    marginRight: SPACING.sm,
  },
});

export default ProductDetailScreen;
