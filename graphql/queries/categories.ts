import { gql } from '@apollo/client';
import { CATEGORY_FRAGMENT, META_FRAGMENT } from '../fragments/common';

// Get all categories
export const GET_CATEGORIES = gql`
  query GetCategories(
    $pagination: PaginationArg
    $sort: [String]
    $filters: CategoryFiltersInput
  ) {
    categories(pagination: $pagination, sort: $sort, filters: $filters) {
      data {
        ...CategoryFragment
      }
      meta {
        ...MetaFragment
      }
    }
  }
  ${CATEGORY_FRAGMENT}
  ${META_FRAGMENT}
`;

// Get a single category by ID
export const GET_CATEGORY_BY_ID = gql`
  query GetCategoryById($id: ID!) {
    category(id: $id) {
      data {
        ...CategoryFragment
      }
    }
  }
  ${CATEGORY_FRAGMENT}
`;

// Get a single category by slug
export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: String!) {
    categories(filters: { slug: { eq: $slug } }) {
      data {
        ...CategoryFragment
      }
    }
  }
  ${CATEGORY_FRAGMENT}
`;

// Get categories with post count
export const GET_CATEGORIES_WITH_POST_COUNT = gql`
  query GetCategoriesWithPostCount($pagination: PaginationArg) {
    categories(pagination: $pagination, sort: ["name:asc"]) {
      data {
        ...CategoryFragment
        attributes {
          posts {
            data {
              id
            }
          }
        }
      }
      meta {
        ...MetaFragment
      }
    }
  }
  ${CATEGORY_FRAGMENT}
  ${META_FRAGMENT}
`;

// Get featured categories
export const GET_FEATURED_CATEGORIES = gql`
  query GetFeaturedCategories($limit: Int = 5) {
    categories(
      pagination: { limit: $limit }
      sort: ["name:asc"]
      filters: { featured: { eq: true } }
    ) {
      data {
        ...CategoryFragment
      }
      meta {
        ...MetaFragment
      }
    }
  }
  ${CATEGORY_FRAGMENT}
  ${META_FRAGMENT}
`;
