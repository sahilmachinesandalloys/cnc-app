import { gql } from "@apollo/client";

export const GET_SUBCATEGORIES = gql`
  query GetSubcategories($category: String!) {
    subCategories(
      filters: { Category: { Slug: { eq: $category } } }
      sort: ["position:asc"]
    ) {
      data {
        id
        attributes {
          Title
          Slug
        }
      }
    }
  }
`;

export interface Subcategory {
  id: string;
  attributes: {
    Title: string;
    Slug: string;
  };
}

export interface SubcategoriesData {
  subCategories: {
    data: Subcategory[];
  };
}
