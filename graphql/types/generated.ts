// Generated TypeScript types for GraphQL responses
// These types represent common Strapi data structures

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity {
  id: number;
  attributes: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Common field types
export interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: {
      thumbnail?: StrapiImageFormat;
      small?: StrapiImageFormat;
      medium?: StrapiImageFormat;
      large?: StrapiImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

// Example content types - update these based on your Strapi schema
export interface Post {
  id: number;
  attributes: {
    title: string;
    content: string;
    excerpt?: string;
    slug: string;
    featuredImage?: StrapiImage;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Page {
  id: number;
  attributes: {
    title: string;
    content: string;
    slug: string;
    seo?: {
      metaTitle?: string;
      metaDescription?: string;
      keywords?: string;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Query response types
export interface PostsResponse {
  posts: StrapiResponse<Post[]>;
}

export interface PostResponse {
  post: StrapiResponse<Post>;
}

export interface CategoriesResponse {
  categories: StrapiResponse<Category[]>;
}

export interface CategoryResponse {
  category: StrapiResponse<Category>;
}

export interface PagesResponse {
  pages: StrapiResponse<Page[]>;
}

export interface PageResponse {
  page: StrapiResponse<Page>;
}

// Query variables types
export interface PostsVariables {
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  sort?: string[];
  filters?: Record<string, any>;
}

export interface PostVariables {
  id?: number;
  slug?: string;
}

export interface CategoriesVariables {
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  sort?: string[];
  filters?: Record<string, any>;
}

export interface CategoryVariables {
  id?: number;
  slug?: string;
}

export interface PagesVariables {
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  sort?: string[];
  filters?: Record<string, any>;
}

export interface PageVariables {
  id?: number;
  slug?: string;
}
