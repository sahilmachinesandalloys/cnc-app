import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts($subCategory: String!) {
    products(
      filters: { Category: { Slug: { eq: $subCategory } } }
      sort: ["position:asc"]
    ) {
      data {
        id
        attributes {
          Title
          Thumbnail {
            data {
              attributes {
                url
              }
            }
          }
          Slug
          Description
        }
      }
    }
  }
`;

export interface Product {
  id: string;
  attributes: {
    Title: string;
    Thumbnail: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    Slug: string;
    Description: string;
  };
}

export interface ProductsData {
  products: {
    data: Product[];
  };
}
