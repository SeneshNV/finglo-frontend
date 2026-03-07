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
  // Add image field (optional since it might come from API or be generated)
  imageUrl?: string;
  imageAlt?: string;
}

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort[];
  unpaged: boolean;
}

export interface Sort {
  ascending: boolean;
  descending: boolean;
  direction: string;
  ignoreCase: boolean;
  nullHandling: string;
  property: string;
}

export interface CategoryResponse {
  responseCode: string;
  responseMessage: string;
  responseData: {
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
  };
}
