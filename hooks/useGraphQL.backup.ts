import { useQuery, useLazyQuery } from '@apollo/client/react';
import { 
  GET_POSTS, 
  GET_POST_BY_ID, 
  GET_POST_BY_SLUG,
  GET_FEATURED_POSTS,
  GET_RECENT_POSTS,
  SEARCH_POSTS,
  GET_CATEGORIES,
  GET_CATEGORY_BY_ID,
  GET_CATEGORY_BY_SLUG,
  GET_PAGES,
  GET_PAGE_BY_ID,
  GET_PAGE_BY_SLUG,
  GET_HOMEPAGE,
  GET_ABOUT_PAGE,
  GET_CONTACT_PAGE,
  GET_MOBILE_HERO_SECTIONS,
  GET_MOBILE_SERVICES,
  GET_SERVICE_BY_ID,
  
} from '../graphql/queries';
import { 
  PostsResponse, 
  PostResponse, 
  CategoriesResponse, 
  CategoryResponse,
  PagesResponse,
  PageResponse,
  PostsVariables,
  PostVariables,
  CategoriesVariables,
  CategoryVariables,
  PagesVariables,
  PageVariables
} from '../graphql/types/generated';
import { MobileHeroSectionsResponse } from '../graphql/queries/heroSection';
import {
  MobileServicesResponse,
  ServiceByIdResponse,
  ServicesVariables,
  ServiceByIdVariables
} from '../graphql/queries/services';
import { GET_MOBILE_FEATURED_PRODUCTS, MobileFeaturedProductsResponse } from '../graphql/queries/featuredProducts';
import React from 'react'; // Added for React.useState and React.useEffect
import { getGraphQLUrl, getGraphQLHeaders } from '../graphql/config';

// Posts hooks
export const usePosts = (variables?: PostsVariables) => {
  return useQuery<PostsResponse, PostsVariables>(GET_POSTS, {
    variables,
    errorPolicy: 'all',
  });
};

export const usePostById = (variables: PostVariables) => {
  return useQuery<PostResponse, PostVariables>(GET_POST_BY_ID, {
    variables,
    errorPolicy: 'all',
  });
};

export const usePostBySlug = (variables: PostVariables) => {
  return useQuery<PostsResponse, PostVariables>(GET_POST_BY_SLUG, {
    variables,
    errorPolicy: 'all',
  });
};

export const useFeaturedPosts = (limit: number = 3) => {
  return useQuery<PostsResponse>(GET_FEATURED_POSTS, {
    variables: { limit },
    errorPolicy: 'all',
  });
};

export const useRecentPosts = (limit: number = 5) => {
  return useQuery<PostsResponse>(GET_RECENT_POSTS, {
    variables: { limit },
    errorPolicy: 'all',
  });
};

export const useSearchPosts = () => {
  return useLazyQuery<PostsResponse, { searchTerm: string; pagination?: any }>(SEARCH_POSTS, {
    errorPolicy: 'all',
  });
};

// Categories hooks
export const useCategories = (variables?: CategoriesVariables) => {
  return useQuery<CategoriesResponse, CategoriesVariables>(GET_CATEGORIES, {
    variables,
    errorPolicy: 'all',
  });
};

export const useCategoryById = (variables: CategoryVariables) => {
  return useQuery<CategoryResponse, CategoryVariables>(GET_CATEGORY_BY_ID, {
    variables,
    errorPolicy: 'all',
  });
};

export const useCategoryBySlug = (variables: CategoryVariables) => {
  return useQuery<CategoriesResponse, CategoryVariables>(GET_CATEGORY_BY_SLUG, {
    variables,
    errorPolicy: 'all',
  });
};

// Pages hooks
export const usePages = (variables?: PagesVariables) => {
  return useQuery<PagesResponse, PagesVariables>(GET_PAGES, {
    variables,
    errorPolicy: 'all',
  });
};

export const usePageById = (variables: PageVariables) => {
  return useQuery<PageResponse, PageVariables>(GET_PAGE_BY_ID, {
    variables,
    errorPolicy: 'all',
  });
};

export const usePageBySlug = (variables: PageVariables) => {
  return useQuery<PagesResponse, PageVariables>(GET_PAGE_BY_SLUG, {
    variables,
    errorPolicy: 'all',
  });
};

export const useHomepage = () => {
  return useQuery<PagesResponse>(GET_HOMEPAGE, {
    errorPolicy: 'all',
  });
};

export const useAboutPage = () => {
  return useQuery<PagesResponse>(GET_ABOUT_PAGE, {
    errorPolicy: 'all',
  });
};

export const useContactPage = () => {
  return useQuery<PagesResponse>(GET_CONTACT_PAGE, {
    errorPolicy: 'all',
  });
};

// Hero Section hooks
export const useHeroSections = () => {
  const { data, loading, error, refetch } = useQuery<MobileHeroSectionsResponse>(
    GET_MOBILE_HERO_SECTIONS,
    {
      errorPolicy: 'all',
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    }
  );

  // Transform data for easier consumption
  const heroSections = data?.heroSections?.data?.map((item: { id: any; attributes: { Title: any; Description: any; publishedAt: any; }; }) => ({
    id: item.id,
    title: item.attributes.Title,
    subtitle: item.attributes.Description,
    publishedAt: item.attributes.publishedAt,
  })) || [];

  return {
    heroSections,
    loading,
    error,
    refetch,
    isEmpty: !loading && heroSections.length === 0,
    hasData: !loading && heroSections.length > 0,
  };
};

export const useHeroSection = (index: number = 0) => {
  const { heroSections, loading, error } = useHeroSections();
  
  const currentHero = heroSections[index] || null;
  
  return {
    hero: currentHero,
    loading,
    error,
    totalCount: heroSections.length,
    currentIndex: index,
    hasNext: index < heroSections.length - 1,
    hasPrevious: index > 0,
  };
};

// Services hooks
export const useServices = (variables?: ServicesVariables) => {
  const { data, loading, error, refetch } = useQuery<MobileServicesResponse>(
    GET_MOBILE_SERVICES,
    {
      variables,
      errorPolicy: 'all',
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    }
  );

  // Transform data for easier consumption
  const services = data?.services?.data?.map((item) => ({
    id: item.id,
    title: item.attributes.Title,
    icon: getDefaultIcon(item.attributes.Title), // Use default icon mapping
    slug: item.attributes.Slug,
    iconUrl: item.attributes.Icon?.data?.attributes?.url,
  })) || [];



  return {
    services,
    loading,
    error,
    refetch,
    isEmpty: !loading && services.length === 0,
    hasData: !loading && services.length > 0,
  };
};

export const useServiceById = (variables: ServiceByIdVariables) => {
  return useQuery<ServiceByIdResponse, ServiceByIdVariables>(GET_SERVICE_BY_ID, {
    variables,
    errorPolicy: 'all',
  });
};

// Helper function to map service titles to default Ionicons
const getDefaultIcon = (title: string): string => {
  const iconMap: { [key: string]: string } = {
    'Spare Parts': 'construct',
    'Laser Calibration': 'settings',
    'CNC Training': 'school',
    'IoT Solutions': 'wifi',
    'Maintenance': 'cart',
    'Repair': 'build',
    'Installation': 'hammer',
    'Consultation': 'chatbubbles',
    'Support': 'help-circle',
    'Parts': 'construct',
    'Calibration': 'settings',
    'Training': 'school',
    'Solutions': 'wifi',
    'Service': 'cart',
  };

  // Try exact match first
  if (iconMap[title]) {
    return iconMap[title];
  }

  // Try partial match
  for (const [key, icon] of Object.entries(iconMap)) {
    if (title.toLowerCase().includes(key.toLowerCase())) {
      return icon;
    }
  }

  // Default fallback
  return 'construct';
};

// Featured Products hooks - WORKING VERSION (BACKUP)
export const fetchFeaturedProducts = async () => {
  const endpoint = getGraphQLUrl();
  const headers = getGraphQLHeaders();

  const query = `
    query MyQuery {
      homePage {
        data {
          id
          attributes {
            Banner {
              products {
                data {
                  id
                  attributes {
                    Title
                    Slug
                    Tag
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
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL Errors:", result.errors);
      return [];
    }

    console.log("GraphQL Response:", result.data);
    console.log("HomePage data:", JSON.stringify(result.data.homePage?.data, null, 2));
    console.log("Attributes:", JSON.stringify(result.data.homePage?.data?.attributes, null, 2));
    return result.data.homePage?.data ? [result.data.homePage] : [];
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
};

export const useFeaturedProducts = () => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<any>(null);
  const [featuredProducts, setFeaturedProducts] = React.useState<any[]>([]);

  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchFeaturedProducts();
      
      // Debug the data structure
      console.log("Data array:", data);
      console.log("First item:", data?.[0]);
      console.log("Attributes:", data?.[0]?.data?.attributes);
      console.log("Banner:", data?.[0]?.data?.attributes?.Banner);
      console.log("Products:", data?.[0]?.data?.attributes?.Banner?.products);
      
      // Transform the data to match our expected format
      const transformedProducts = data?.[0]?.data?.attributes?.Banner?.products?.data?.map((item: any) => ({
        id: item.id,
        title: item.attributes.Title,
        slug: item.attributes.Slug,
        tag: item.attributes.Tag,
        category: {
          id: item.attributes.Category?.data?.attributes?.Slug || 'default',
          title: item.attributes.Category?.data?.attributes?.Title || 'Uncategorized',
          slug: item.attributes.Category?.data?.attributes?.Slug || '',
        },
      })) || [];

      console.log('Transformed featuredProducts:', transformedProducts);
      setFeaturedProducts(transformedProducts);
    } catch (err) {
      console.error('Error fetching featured products:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = React.useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    featuredProducts,
    loading,
    error,
    refetch,
    isEmpty: !loading && featuredProducts.length === 0,
    hasData: !loading && featuredProducts.length > 0,
  };
};

// Utility hook for error handling
export const useGraphQLError = (error: any) => {
  if (error) {
    console.error('GraphQL Error:', error);
    
    // You can add custom error handling logic here
    // For example, showing toast notifications, logging to analytics, etc.
    
    return {
      message: error.message || 'An error occurred',
      code: error.graphQLErrors?.[0]?.extensions?.code || 'UNKNOWN_ERROR',
      isNetworkError: !!error.networkError,
    };
  }
  
  return null;
};
