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
}

export interface ProductImage {
  publicId: string;
  imageUrl: string;
  displayOrder: number;
  isPrimary: boolean;
}

export interface Product {
  proId: number;
  proCode: string;
  proName: string;
  proDescription: string;
  sareeFabricType: string | null;
  sareeLengthMeters: number | null;
  blouseFabricType: string | null;
  blouseLengthMeters: number | null;
  proColor: string;
  proPrice: number;
  categories: Category[];
  status: Status;
  images: ProductImage[];
  availableStock: number;
  createdAt: string;
  updatedAt: string;
}

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: any[];
  unpaged: boolean;
}

export interface ProductsResponse {
  content: Product[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: any[];
  totalElements: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  responseCode: string;
  responseMessage: string;
  responseData: T;
}

export interface ProductFilters {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  category?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
