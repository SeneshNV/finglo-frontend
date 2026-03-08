// src/app/types/product.ts

export interface ProductFilters {
  page?: number;
  size?: number;
  sort?: string; // 'newest', 'price-low', 'price-high', 'popular', 'rating'
  category?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  inStock?: boolean;
}

export interface ProductImage {
  publicId: string;
  imageUrl: string;
  displayOrder: number;
  isPrimary: boolean;
}

export interface Status {
  stId: number;
  stCode: string;
  stDescription: string;
}

export interface Category {
  catId: number;
  catCode: string;
  catName: string;
  catDescription: string;
  status: Status;
  createdAt?: string;
  updatedAt?: string;
  productCount?: string;
}

export interface Product {
  proId: number;
  proCode: string;
  proName: string;
  proDescription?: string;
  sareeFabricType?: string | null;
  sareeLengthMeters?: number | null;
  blouseFabricType?: string | null;
  blouseLengthMeters?: number | null;
  proColor?: string;
  proPrice: number;
  availableStock: number;
  categories: Category[];
  images: ProductImage[];
  status: Status;
  createdAt?: string;
  updatedAt?: string;
}

export interface PageableSort {
  ascending: boolean;
  descending: boolean;
  direction: string;
  ignoreCase: boolean;
  nullHandling: string;
  property: string;
}

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: PageableSort[];
  unpaged: boolean;
}

export interface ProductsResponse {
  content: Product[];
  totalElements: number;
  totalPages: number;
  number: number; // current page
  size: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  pageable: Pageable;
  sort: PageableSort[];
}

export interface ApiResponse<T> {
  responseCode: string;
  responseMessage: string;
  responseData: T;
}
