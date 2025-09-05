import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { getGraphQLUrl, getGraphQLHeaders, getGraphQLConfig } from '../config';

// Get GraphQL configuration
const config = getGraphQLConfig();

// HTTP Link for GraphQL requests
const httpLink = createHttpLink({
  uri: getGraphQLUrl(),
});

// Error handling link
const errorLink = onError((error) => {
  console.error('[GraphQL Error]:', error);
  
  // Log additional details in development
  if (config.LOGGING) {
    console.error('[GraphQL Error Details]:', {
      networkError: error.networkError,
      graphQLErrors: error.graphQLErrors,
      operation: error.operation,
    });
  }
});

// Context link for headers with authentication
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      ...getGraphQLHeaders(),
    },
  };
});

// Cache configuration
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // Add field policies here for specific queries
        // Example: posts: { merge: false } // Don't merge, replace
      },
    },
    HomePageEntity: {
      keyFields: ['id'], // Use 'id' as the unique identifier
      fields: {
        attributes: {
          merge: false, // Don't merge attributes, replace them
        },
      },
    },
    ComponentHomePageFaQsSection: {
      keyFields: ['__typename'], // Use __typename as key since it's a component
      fields: {
        faqs: {
          merge: false, // Don't merge faqs, replace them
        },
      },
    },
  },
});

// Create Apollo Client
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: config.QUERY.DEFAULT_ERROR_POLICY,
      fetchPolicy: config.QUERY.DEFAULT_FETCH_POLICY,
    },
    query: {
      errorPolicy: config.QUERY.DEFAULT_ERROR_POLICY,
      fetchPolicy: 'cache-first',
    },
  },
});

export default apolloClient;
