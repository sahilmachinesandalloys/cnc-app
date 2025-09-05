import { gql } from '@apollo/client';

// Featured Products query using the same structure as GraphQL playground

export const GET_MOBILE_FEATURED_PRODUCTS = gql`
  query GetMobileFeaturedProducts {
    homePage {
      data {
        id
        attributes {
          Banner {
            products {
              data {
                id
                attributes {
                  Title
                  Slug
                  Tag
                  Thumbnail {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                  Category {
                    data {
                      attributes {
                        Title
                        Slug
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// TypeScript interfaces
export interface FeaturedProduct {
  id: string;
  title: string;
  slug: string;
  thumbnailUrl?: string;
  category: {
    title: string;
    slug: string;
  };
}

export interface MobileFeaturedProductsResponse {
  homePage: {
    data: {
      id: string;
      attributes: {
        Banner: {
          products: {
            data: Array<{
              id: string;
              attributes: {
                Title: string;
                Slug: string;
                Tag: string | null;
                Thumbnail: {
                  data: {
                    attributes: {
                      url: string;
                    };
                  } | null;
                };
                Category: {
                  data: {
                    attributes: {
                      Title: string;
                      Slug: string;
                    };
                  } | null;
                };
              };
            }>;
          };
        };
      };
    };
  };
}
