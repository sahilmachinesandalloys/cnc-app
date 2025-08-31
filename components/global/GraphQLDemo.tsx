import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ResponsiveText, AnimatedButton, Card } from '../ui';
import LoadingSpinner from './LoadingSpinner';
import { usePosts, useCategories, useGraphQLError } from '../../hooks/useGraphQL';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants';
import { Post, Category } from '../../graphql/types/generated';

const GraphQLDemo: React.FC = () => {
  // Example queries
  const { data: postsData, loading: postsLoading, error: postsError } = usePosts({
    pagination: { page: 1, pageSize: 3 },
    sort: ['publishedAt:desc'],
  });

  const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useCategories({
    pagination: { page: 1, pageSize: 5 },
    sort: ['name:asc'],
  });

  // Error handling
  const postsErrorInfo = useGraphQLError(postsError);
  const categoriesErrorInfo = useGraphQLError(categoriesError);

  const renderLoadingState = () => (
    <LoadingSpinner 
      size="large" 
      text="Loading data from Strapi CMS..." 
    />
  );

  const renderErrorState = (error: any) => (
    <View style={styles.errorContainer}>
      <ResponsiveText size="titleMedium" color="error" weight="medium">
        Error Loading Data
      </ResponsiveText>
      <ResponsiveText size="bodySmall" color="textSecondary" style={styles.errorText}>
        {error?.message || 'An error occurred while fetching data'}
      </ResponsiveText>
      <AnimatedButton
        title="Retry"
        onPress={() => {
          // Refetch data
          window.location.reload();
        }}
        variant="outline"
        size="small"
      />
    </View>
  );

  const renderPostsData = () => {
    if (postsLoading) return renderLoadingState();
    if (postsError) return renderErrorState(postsErrorInfo);

    const posts = postsData?.posts?.data || [];
    
    return (
      <View style={styles.section}>
        <ResponsiveText size="titleLarge" color="textPrimary" weight="medium">
          Recent Posts ({posts.length})
        </ResponsiveText>
        {posts.length > 0 ? (
          posts.map((post: Post) => (
            <Card key={post.id} variant="elevated" margin="sm">
              <ResponsiveText size="titleMedium" color="textPrimary" weight="medium">
                {post.attributes.title}
              </ResponsiveText>
              <ResponsiveText size="bodySmall" color="textSecondary" lineHeight="relaxed">
                {post.attributes.excerpt || 'No excerpt available'}
              </ResponsiveText>
              <ResponsiveText size="caption" color="textTertiary">
                Published: {new Date(post.attributes.publishedAt).toLocaleDateString()}
              </ResponsiveText>
            </Card>
          ))
        ) : (
          <ResponsiveText size="bodyMedium" color="textSecondary">
            No posts found
          </ResponsiveText>
        )}
      </View>
    );
  };

  const renderCategoriesData = () => {
    if (categoriesLoading) return renderLoadingState();
    if (categoriesError) return renderErrorState(categoriesErrorInfo);

    const categories = categoriesData?.categories?.data || [];
    
    return (
      <View style={styles.section}>
        <ResponsiveText size="titleLarge" color="textPrimary" weight="medium">
          Categories ({categories.length})
        </ResponsiveText>
        {categories.length > 0 ? (
          <View style={styles.categoriesGrid}>
            {categories.map((category: Category) => (
              <Card key={category.id} variant="outlined" padding="sm" style={styles.categoryCard}>
                <ResponsiveText size="bodyMedium" color="textPrimary" weight="medium">
                  {category.attributes.name}
                </ResponsiveText>
                {category.attributes.description && (
                  <ResponsiveText size="caption" color="textSecondary">
                    {category.attributes.description}
                  </ResponsiveText>
                )}
              </Card>
            ))}
          </View>
        ) : (
          <ResponsiveText size="bodyMedium" color="textSecondary">
            No categories found
          </ResponsiveText>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ResponsiveText size="headlineLarge" color="textPrimary" weight="bold">
        GraphQL Demo
      </ResponsiveText>
      <ResponsiveText size="bodyMedium" color="textSecondary" lineHeight="relaxed">
        This demonstrates fetching data from your Strapi CMS using GraphQL
      </ResponsiveText>
      
      {renderPostsData()}
      {renderCategoriesData()}
      
      <View style={styles.infoSection}>
        <ResponsiveText size="titleMedium" color="textPrimary" weight="medium">
          Setup Instructions
        </ResponsiveText>
        <ResponsiveText size="bodySmall" color="textSecondary" lineHeight="relaxed">
          1. Update the STRAPI_URL in graphql/config.ts{'\n'}
          2. Ensure your Strapi CMS has GraphQL enabled{'\n'}
          3. Create content types (posts, categories, pages){'\n'}
          4. Add some sample content{'\n'}
          5. Test the queries in your app
        </ResponsiveText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    gap: SPACING.xl,
  },
  section: {
    gap: SPACING.md,
  },
  errorContainer: {
    alignItems: 'center',
    padding: SPACING.lg,
    gap: SPACING.md,
    backgroundColor: COLORS.error + '10',
    borderRadius: BORDER_RADIUS.md,
  },
  errorText: {
    textAlign: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  categoryCard: {
    padding: SPACING.sm,
    backgroundColor: COLORS.primaryLight,
    borderRadius: BORDER_RADIUS.sm,
    minWidth: 120,
    alignItems: 'center',
    gap: SPACING.xs,
  },
  infoSection: {
    padding: SPACING.md,
    backgroundColor: COLORS.backgroundTertiary,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
});

export default GraphQLDemo;
