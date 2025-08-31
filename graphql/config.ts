import Constants from 'expo-constants';

// GraphQL Configuration for Strapi CMS
export const GRAPHQL_CONFIG = {
  // Strapi GraphQL endpoint - matches web version GATSBY_API_URL
  STRAPI_URL: Constants.expoConfig?.extra?.EXPO_PUBLIC_STRAPI_URL || 'https://admin.sahilcnc.com/graphql',
  
  // Strapi API token for authentication - matches web version API_KEY
  API_TOKEN: Constants.expoConfig?.extra?.EXPO_PUBLIC_API_KEY || '642fa036209462c2f72a0f8087f0a81149b54c4ed6842e2368ee365a18aa0449b6b0282bc705887ac161a5217747037b55ce31613dd202be56ae07c70aa3f3325ec8767e6e84795d88f98927df7901c6ba1dbf751ddb1928177c7e219d26866add3a8f223faa07527f2f1338999e6fa40420a3e9044816055760e48e8871ba36',
  
  // Strapi API secret for form submissions - matches web version GATSBY_API_SECRET
  API_SECRET: Constants.expoConfig?.extra?.EXPO_PUBLIC_API_SECRET || 'cf1158adcc93715bbc6000c40ce3d1ec1ef0908204e7cd542254a2fbbb4fcbcb537a9991abafb2bcf901ad02cbdbdc827c925d84ed38d7138a94bd2c97f8ee334910b7f9dd0f553fd6677cc294d232d3fcd1f1e4e229a491b35a62562f8ec795d572268c4819094ee2c5ba929b3761cd904f12e64be659ee27ae0249fd3d1d82',
  
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

// Helper function to get headers with authentication
export const getGraphQLHeaders = () => {
  const config = getGraphQLConfig();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add API token if available (for read operations)
  if (config.API_TOKEN) {
    headers['Authorization'] = `Bearer ${config.API_TOKEN}`;
  }

  return headers;
};

// Helper function to get headers for form submissions
export const getFormSubmissionHeaders = () => {
  const config = getGraphQLConfig();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add API secret for form submissions (matches web version)
  if (config.API_SECRET) {
    headers['Authorization'] = `Bearer ${config.API_SECRET}`;
  }

  return headers;
};
