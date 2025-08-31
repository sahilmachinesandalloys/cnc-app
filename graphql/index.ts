// Main GraphQL exports
export { apolloClient } from './client/apollo-client';
export * from './types/generated';
export * from './queries';
export * from './fragments/common';
export * from './config';

// Re-export hooks
export * from '../hooks/useGraphQL';
