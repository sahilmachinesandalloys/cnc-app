// GraphQL Configuration
export const GRAPHQL_CONFIG = {
  // Strapi GraphQL endpoint - update this with your actual Strapi URL
  STRAPI_URL: process.env.EXPO_PUBLIC_STRAPI_URL || 'https://your-strapi-cms.com/graphql',
  
  // API timeout in milliseconds
  TIMEOUT: 30000,
  
  // Cache settings
  CACHE: {
    // Maximum number of items in cache
    MAX_SIZE: 100,
    // Time to live for cached items (in milliseconds)
    TTL: 5 * 60 * 1000, // 5 minutes
  },
  
  // Pagination defaults
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },
  
  // Error handling
  ERROR_HANDLING: {
    // Retry failed requests
    RETRY_ATTEMPTS: 3,
    // Delay between retries (in milliseconds)
    RETRY_DELAY: 1000,
    // Show error messages to users
    SHOW_ERRORS: true,
  },
  
  // Query settings
  QUERY: {
    // Default fetch policy
    DEFAULT_FETCH_POLICY: 'cache-and-network' as const,
    // Default error policy
    DEFAULT_ERROR_POLICY: 'all' as const,
  },
};

// Environment-specific configurations
export const getGraphQLConfig = () => {
  const isDevelopment = __DEV__;
  
  return {
    ...GRAPHQL_CONFIG,
    // Development-specific settings
    ...(isDevelopment && {
      ERROR_HANDLING: {
        ...GRAPHQL_CONFIG.ERROR_HANDLING,
        SHOW_ERRORS: true,
      },
      // Enable detailed logging in development
      LOGGING: true,
    }),
    // Production-specific settings
    ...(!isDevelopment && {
      ERROR_HANDLING: {
        ...GRAPHQL_CONFIG.ERROR_HANDLING,
        SHOW_ERRORS: false,
      },
      // Disable detailed logging in production
      LOGGING: false,
    }),
  };
};

// Helper function to get the full GraphQL URL
export const getGraphQLUrl = () => {
  const config = getGraphQLConfig();
  return `${config.STRAPI_URL}`;
};

// Helper function to get headers
export const getGraphQLHeaders = () => {
  return {
    'Content-Type': 'application/json',
    // Add any additional headers here if needed
  };
};
