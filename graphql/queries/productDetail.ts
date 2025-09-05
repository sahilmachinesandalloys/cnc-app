import { gql } from '@apollo/client';
import { SEO_FRAGMENT } from '../fragments/common';

export const GET_PRODUCT_DETAIL = gql`
  query ProductDetailQuery($product: String!, $subCategory: String) {
    strapiProduct(Slug: { eq: $product }) {
      seo {
        ...SeoFragment
      }
      id: strapiId
      Title
      youtubePlaylist
      Thumbnail {
        url
      }
      Brochure {
        url
        name
      }
      subCategory: Category {
        Title
        Slug
        Category {
          Title
          Slug
        }
      }
      Images {
        id
        url
      }
      Description
      Specifications {
        id
        TableData {
          id
          Name
        }
        TableHeading
      }
      ComponentsAndAccessories {
        id
        Heading
        Content {
          id
          Title
          List {
            id
            Name
          }
        }
      }
    }
  }
  ${SEO_FRAGMENT}
`;

export interface ProductImage {
  id: string;
  url: string;
}

export interface TableData {
  id: string;
  Name: string;
}

export interface Specification {
  id: string;
  TableData: TableData[];
  TableHeading: string;
}

export interface ListItem {
  id: string;
  Name: string;
}

export interface ContentItem {
  id: string;
  Title: string;
  List: ListItem[];
}

export interface ComponentAccessory {
  id: string;
  Heading: string;
  Content: ContentItem[];
}

export interface ProductDetail {
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  id: string;
  Title: string;
  youtubePlaylist: string;
  Thumbnail: {
    url: string;
  };
  Brochure: {
    url: string;
    name: string;
  };
  subCategory: {
    Title: string;
    Slug: string;
    Category: {
      Title: string;
      Slug: string;
    };
  };
  Images: ProductImage[];
  Description: string;
  Specifications: Specification[];
  ComponentsAndAccessories: ComponentAccessory[];
}

export interface ProductDetailData {
  strapiProduct: ProductDetail;
}
