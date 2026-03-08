// src/lib/api/products.ts
import { DUMMY_PRODUCTS } from "../dummy/products";
import apiClient from "./client";
import {
  ApiResponse,
  ProductsResponse,
  Product,
  ProductFilters,
} from "@/app/types/product";

// ────────────────────────────────────────────────
//  CENTRAL DUMMY MODE CONTROL (change here only)
// ────────────────────────────────────────────────
const USE_DUMMY_DATA = false; // ← Set to false to use real backend
const API_DELAY_MS = 600; // realistic loading feel

const delay = () => new Promise((resolve) => setTimeout(resolve, API_DELAY_MS));

// Helper to create API request wrapper
const createApiRequest = <T>(data: T) => ({
  requestData: data,
  timestamp: Date.now(),
  requestId: Math.random().toString(36).substring(7),
});

export const productApi = {
  // ────────────────────────────────────────────────
  //  Get products (with filters & pagination) - PUBLIC ROUTE
  // ────────────────────────────────────────────────
  getProducts: async (
    filters: ProductFilters = {},
  ): Promise<ApiResponse<ProductsResponse>> => {
    // REAL API - Using public endpoint
    try {
      // Create request payload matching your backend ApiRequest structure
      const requestPayload = createApiRequest({
        page: filters.page ?? 0,
        size: filters.size ?? 10,
        sortBy: filters.sortBy,
        sortDirection: filters.sortDirection,
        categoryId: filters.category ? parseInt(filters.category) : undefined,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        color: filters.color,
        searchQuery: filters.search,
      });

      console.log(
        "📦 Sending request to public products endpoint:",
        requestPayload,
      );

      const response = await apiClient.post<ApiResponse<ProductsResponse>>(
        "/products/public/view-products",
        requestPayload,
      );

      console.log("📦 Received response:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Failed to fetch products:", error);
      throw error;
    }
  },

  // ────────────────────────────────────────────────
  //  Get single product by ID - PUBLIC ROUTE
  // ────────────────────────────────────────────────
  getProductById: async (id: number): Promise<ApiResponse<Product>> => {
    console.log("🔧 API - getProductById called with ID:", id);
    console.log("🔧 API - USE_DUMMY_DATA =", USE_DUMMY_DATA);

    if (USE_DUMMY_DATA) {
      // ... (keep your existing dummy data code)
      console.log("🔧 API - Using dummy data");
      // ... dummy data logic
    }

    // REAL API - Using public endpoint
    console.log("🔧 API - Using real API");
    try {
      const response = await apiClient.get<ApiResponse<Product>>(
        `/products/public/view-product/${id}`,
      );

      console.log("🔧 API - Real API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("🔧 API - Error calling real API:", error);
      throw error;
    }
  },

  // ────────────────────────────────────────────────
  //  Get products by category - PUBLIC ROUTE
  // ────────────────────────────────────────────────
  getProductsByCategory: async (
    categoryId: number,
    page = 0,
    size = 10,
  ): Promise<ApiResponse<ProductsResponse>> => {
    if (USE_DUMMY_DATA) {
      await delay();
      // ... dummy data logic
    }

    // REAL API
    try {
      const requestPayload = createApiRequest({
        page,
        size,
        categoryId,
      });

      const response = await apiClient.post<ApiResponse<ProductsResponse>>(
        "/products/public/view-products",
        requestPayload,
      );

      return response.data;
    } catch (error) {
      console.error("❌ Failed to fetch products by category:", error);
      throw error;
    }
  },

  // ────────────────────────────────────────────────
  //  Search products - PUBLIC ROUTE
  // ────────────────────────────────────────────────
  searchProducts: async (
    query: string,
    page = 0,
    size = 10,
  ): Promise<ApiResponse<ProductsResponse>> => {
    if (USE_DUMMY_DATA) {
      await delay();
      // ... dummy data logic
    }

    // REAL API
    try {
      const requestPayload = createApiRequest({
        page,
        size,
        searchQuery: query,
      });

      const response = await apiClient.post<ApiResponse<ProductsResponse>>(
        "/products/public/view-products",
        requestPayload,
      );

      return response.data;
    } catch (error) {
      console.error("❌ Failed to search products:", error);
      throw error;
    }
  },
};

// Helper function for dummy data (keep your existing dummy response structure)
const getDummyProductsResponse = (
  filtered: any[],
  page: number,
  size: number,
) => {
  const start = page * size;
  const paginated = filtered.slice(start, start + size);

  return {
    responseCode: "00",
    responseMessage: "Products retrieved successfully (dummy data)",
    responseData: {
      content: paginated,
      totalElements: filtered.length,
      totalPages: Math.ceil(filtered.length / size),
      number: page,
      size,
      numberOfElements: paginated.length,
      first: page === 0,
      last: start + size >= filtered.length,
      empty: paginated.length === 0,
      pageable: {
        offset: start,
        pageNumber: page,
        pageSize: size,
        paged: true,
        sort: { sorted: false, unsorted: true, empty: true },
        unpaged: false,
      },
      sort: { sorted: false, unsorted: true, empty: true },
    },
  };
};
