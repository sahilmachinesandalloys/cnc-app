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
});

// Context link for headers
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
  },
});

// Create Apollo Client
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-and-network',
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    },
  },
});

export default apolloClient;
