import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories(sort: ["position:asc"]) {
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

export interface Category {
  id: string;
  attributes: {
    Title: string;
    Slug: string;
  };
}

export interface CategoriesData {
  categories: {
    data: Category[];
  };
}
