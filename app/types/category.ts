// src/app/types/category.ts

export interface CategoryViewRequest {
  page: number;
  size: number;
  sortBy?: string;
  sortDir?: string;
  status?: string; // Optional status filter
}

export interface ApiRequest<T> {
  requestId: string;
  timestamp: string;
  requestData: T;
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
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface Sort {
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
  sort: Sort[];
  unpaged: boolean;
}

export interface CategoryResponseData {
  content: Category[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort[];
  totalElements: number;
  totalPages: number;
}

export interface CategoryResponse {
  responseCode: string;
  responseMessage: string;
  responseData: CategoryResponseData;
}