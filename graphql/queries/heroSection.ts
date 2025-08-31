import { gql } from '@apollo/client';

// Hero Section Fragment
export const HERO_SECTION_FRAGMENT = gql`
  fragment HeroSectionFragment on HeroSectionEntity {
    id
    attributes {
      Title
      Description
      createdAt
      updatedAt
      publishedAt
    }
  }
`;

// Query to get all hero sections
export const GET_HERO_SECTIONS = gql`
  query GetHeroSections($limit: Int = 10, $sort: [String] = ["createdAt:desc"]) {
    heroSections(pagination: { limit: $limit }, sort: $sort) {
      data {
        ...HeroSectionFragment
      }
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
    }
  }
  ${HERO_SECTION_FRAGMENT}
`;

// Query to get a single hero section by ID
export const GET_HERO_SECTION_BY_ID = gql`
  query GetHeroSectionById($id: ID!) {
    heroSection(id: $id) {
      data {
        ...HeroSectionFragment
      }
    }
  }
  ${HERO_SECTION_FRAGMENT}
`;

// Query to get hero sections for mobile app (optimized)
export const GET_MOBILE_HERO_SECTIONS = gql`
  query GetMobileHeroSections {
    heroSections(
      pagination: { limit: 5 }
      sort: ["createdAt:desc"]
    ) {
      data {
        id
        attributes {
          Title
          Description
          publishedAt
        }
      }
    }
  }
`;

// Types for TypeScript
export interface HeroSectionData {
  id: string;
  attributes: {
    Title: string;
    Description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface HeroSectionsResponse {
  heroSections: {
    data: HeroSectionData[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  };
}

export interface MobileHeroSectionsResponse {
  heroSections: {
    data: {
      id: string;
      attributes: {
        Title: string;
        Description: string;
        publishedAt: string;
      };
    }[];
  };
}

export interface HeroSectionVariables {
  limit?: number;
  sort?: string[];
}

export interface HeroSectionByIdVariables {
  id: string;
}
