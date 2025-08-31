import { gql } from '@apollo/client';
import { PAGE_FRAGMENT, META_FRAGMENT } from '../fragments/common';

// Get all pages
export const GET_PAGES = gql`
  query GetPages(
    $pagination: PaginationArg
    $sort: [String]
    $filters: PageFiltersInput
  ) {
    pages(pagination: $pagination, sort: $sort, filters: $filters) {
      data {
        ...PageFragment
      }
      meta {
        ...MetaFragment
      }
    }
  }
  ${PAGE_FRAGMENT}
  ${META_FRAGMENT}
`;

// Get a single page by ID
export const GET_PAGE_BY_ID = gql`
  query GetPageById($id: ID!) {
    page(id: $id) {
      data {
        ...PageFragment
      }
    }
  }
  ${PAGE_FRAGMENT}
`;

// Get a single page by slug
export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: String!) {
    pages(filters: { slug: { eq: $slug } }) {
      data {
        ...PageFragment
      }
    }
  }
  ${PAGE_FRAGMENT}
`;

// Get homepage
export const GET_HOMEPAGE = gql`
  query GetHomepage {
    pages(filters: { slug: { eq: "home" } }) {
      data {
        ...PageFragment
      }
    }
  }
  ${PAGE_FRAGMENT}
`;

// Get about page
export const GET_ABOUT_PAGE = gql`
  query GetAboutPage {
    pages(filters: { slug: { eq: "about" } }) {
      data {
        ...PageFragment
      }
    }
  }
  ${PAGE_FRAGMENT}
`;

// Get contact page
export const GET_CONTACT_PAGE = gql`
  query GetContactPage {
    pages(filters: { slug: { eq: "contact" } }) {
      data {
        ...PageFragment
      }
    }
  }
  ${PAGE_FRAGMENT}
`;

// Get footer pages
export const GET_FOOTER_PAGES = gql`
  query GetFooterPages {
    pages(
      filters: { 
        or: [
          { slug: { eq: "privacy-policy" } }
          { slug: { eq: "terms-of-service" } }
          { slug: { eq: "contact" } }
        ]
      }
      sort: ["title:asc"]
    ) {
      data {
        ...PageFragment
      }
    }
  }
  ${PAGE_FRAGMENT}
`;
