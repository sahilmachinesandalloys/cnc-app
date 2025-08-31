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
  GET_CONTACT_PAGE
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
