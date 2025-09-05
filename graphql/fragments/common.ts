import { gql } from '@apollo/client';

// Common fragments for reusable query parts
export const IMAGE_FRAGMENT = gql`
  fragment ImageFragment on UploadFileEntityResponse {
    data {
      id
      attributes {
        name
        alternativeText
        caption
        width
        height
        formats
        hash
        ext
        mime
        size
        url
        previewUrl
        provider
        createdAt
        updatedAt
      }
    }
  }
`;

export const SEO_FRAGMENT = gql`
  fragment SeoFragment on ComponentSharedSeo {
    metaTitle
    metaDescription
    keywords
  }
`;

export const PAGINATION_FRAGMENT = gql`
  fragment PaginationFragment on Pagination {
    page
    pageSize
    pageCount
    total
  }
`;

export const META_FRAGMENT = gql`
  fragment MetaFragment on ResponseCollectionMeta {
    pagination {
      ...PaginationFragment
    }
  }
  ${PAGINATION_FRAGMENT}
`;

// Base entity fragment with common fields
export const BASE_ENTITY_FRAGMENT = gql`
  fragment BaseEntityFragment on PostEntity {
    id
    attributes {
      createdAt
      updatedAt
      publishedAt
    }
  }
`;

// Post fragment with all fields
export const POST_FRAGMENT = gql`
  fragment PostFragment on PostEntity {
    id
    attributes {
      title
      content
      excerpt
      slug
      featuredImage {
        ...ImageFragment
      }
      createdAt
      updatedAt
      publishedAt
    }
  }
  ${IMAGE_FRAGMENT}
`;

// Category fragment
export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on CategoryEntity {
    id
    attributes {
      name
      slug
      description
      createdAt
      updatedAt
      publishedAt
    }
  }
`;

// Page fragment
export const PAGE_FRAGMENT = gql`
  fragment PageFragment on PageEntity {
    id
    attributes {
      title
      content
      slug
      seo {
        ...SeoFragment
      }
      createdAt
      updatedAt
      publishedAt
    }
  }
  ${SEO_FRAGMENT}
`;

// Response wrapper fragment
export const RESPONSE_FRAGMENT = gql`
  fragment ResponseFragment on PostEntityResponseCollection {
    data {
      ...PostFragment
    }
    meta {
      ...MetaFragment
    }
  }
  ${POST_FRAGMENT}
  ${META_FRAGMENT}
`;

// HomePageData fragment matching the web version
export const HOMEPAGE_DATA_FRAGMENT = gql`
  fragment HomePageData on StrapiHomePage {
    Banner {
      Title
      Description
      Background {
        url
        ext
      }
      ActionButton {
        Name
        URL
      }
      products {
        id
        Title
        Slug
        Thumbnail {
          url
        }
        SubCategory: Category {
          Title
          Category {
            Title
            Slug
          }
          Slug
        }
      }
    }
    CategorySection {
      Title
      Description
      id
      Categories {
        id
        Title
        ShortDescription
        PreviewIcon {
          url
        }
        Slug
      }
    }
    Discover {
      Title
      HighlightedText
      ContentBlock1 {
        Title
        Description
        RedirectURL
      }
      ContentBlock2 {
        Title
        Description
        RedirectURL
      }
      Stats {
        id
        Number
        Info
      }
    }
    WorkpieceByIndustriesSection {
      Title
      Description
      Image {
        url
      }
      Industries {
        id
        Title
        Description
        Slug
        Image {
          url
        }
      }
    }
    FAQSection {
      Title
      Thumbnail {
        url
      }
      Description
      faqs {
        id
        Question
        Answer
      }
    }
    Clients {
      id
      url
    }
    FooterContent
  }
`;
