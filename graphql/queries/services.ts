import { gql } from '@apollo/client';

// Service Fragment for Strapi v4
export const SERVICE_FRAGMENT = gql`
  fragment ServiceFragment on ServiceEntity {
    id
    attributes {
      Title
      Icon {
        data {
          attributes {
            url
          }
        }
      }
      IconName
      Slug
      Description
      createdAt
      updatedAt
      publishedAt
    }
  }
`;

// Full query with pagination
export const GET_SERVICES = gql`
  query GetServices($limit: Int = 10, $sort: [String] = ["createdAt:desc"]) {
    services(pagination: { limit: $limit }, sort: $sort) {
      data {
        ...ServiceFragment
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
  ${SERVICE_FRAGMENT}
`;

// Mobile-optimized query (minimal fields)
export const GET_MOBILE_SERVICES = gql`
  query GetMobileServices {
    services(
      pagination: { limit: 10 }
      sort: ["createdAt:desc"]
    ) {
      data {
        id
        attributes {
          Title
          Icon {
            data {
              attributes {
                url
              }
            }
          }
          Description
          Slug
        }
      }
    }
  }
`;

// Single service by ID
export const GET_SERVICE_BY_ID = gql`
  query GetServiceById($id: ID!) {
    service(id: $id) {
      data {
        ...ServiceFragment
      }
    }
  }
  ${SERVICE_FRAGMENT}
`;

// TypeScript interfaces
export interface ServiceData {
  id: string;
  attributes: {
    Title: string;
    Icon?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
    IconName?: string;
    Slug: string;
    Description?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface ServicesResponse {
  services: {
    data: ServiceData[];
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

export interface MobileServicesResponse {
  services: {
    data: {
      id: string;
      attributes: {
        Title: string;
        Icon?: {
          data?: {
            attributes: {
              url: string;
            };
          };
        };
        Description?: string;
        Slug: string;
      };
    }[];
  };
}

export interface ServiceByIdResponse {
  service: {
    data: ServiceData;
  };
}

export interface ServicesVariables {
  limit?: number;
  sort?: string[];
}

export interface ServiceByIdVariables {
  id: string;
}
