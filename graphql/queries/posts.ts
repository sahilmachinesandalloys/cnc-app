import { gql } from '@apollo/client';
import { POST_FRAGMENT, META_FRAGMENT } from '../fragments/common';

// Get all posts with pagination
export const GET_POSTS = gql`
  query GetPosts(
    $pagination: PaginationArg
    $sort: [String]
    $filters: PostFiltersInput
  ) {
    posts(pagination: $pagination, sort: $sort, filters: $filters) {
      data {
        ...PostFragment
      }
      meta {
        ...MetaFragment
      }
    }
  }
  ${POST_FRAGMENT}
  ${META_FRAGMENT}
`;

// Get a single post by ID
export const GET_POST_BY_ID = gql`
  query GetPostById($id: ID!) {
    post(id: $id) {
      data {
        ...PostFragment
      }
    }
  }
  ${POST_FRAGMENT}
`;

// Get a single post by slug
export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    posts(filters: { slug: { eq: $slug } }) {
      data {
        ...PostFragment
      }
    }
  }
  ${POST_FRAGMENT}
`;

// Get featured posts
export const GET_FEATURED_POSTS = gql`
  query GetFeaturedPosts($limit: Int = 3) {
    posts(
      pagination: { limit: $limit }
      sort: ["publishedAt:desc"]
      filters: { featured: { eq: true } }
    ) {
      data {
        ...PostFragment
      }
      meta {
        ...MetaFragment
      }
    }
  }
  ${POST_FRAGMENT}
  ${META_FRAGMENT}
`;

// Get posts by category
export const GET_POSTS_BY_CATEGORY = gql`
  query GetPostsByCategory($categorySlug: String!, $pagination: PaginationArg) {
    posts(
      pagination: $pagination
      sort: ["publishedAt:desc"]
      filters: { category: { slug: { eq: $categorySlug } } }
    ) {
      data {
        ...PostFragment
      }
      meta {
        ...MetaFragment
      }
    }
  }
  ${POST_FRAGMENT}
  ${META_FRAGMENT}
`;

// Get recent posts
export const GET_RECENT_POSTS = gql`
  query GetRecentPosts($limit: Int = 5) {
    posts(
      pagination: { limit: $limit }
      sort: ["publishedAt:desc"]
    ) {
      data {
        ...PostFragment
      }
      meta {
        ...MetaFragment
      }
    }
  }
  ${POST_FRAGMENT}
  ${META_FRAGMENT}
`;

// Search posts
export const SEARCH_POSTS = gql`
  query SearchPosts($searchTerm: String!, $pagination: PaginationArg) {
    posts(
      pagination: $pagination
      sort: ["publishedAt:desc"]
      filters: {
        or: [
          { title: { contains: $searchTerm } }
          { content: { contains: $searchTerm } }
          { excerpt: { contains: $searchTerm } }
        ]
      }
    ) {
      data {
        ...PostFragment
      }
      meta {
        ...MetaFragment
      }
    }
  }
  ${POST_FRAGMENT}
  ${META_FRAGMENT}
`;
