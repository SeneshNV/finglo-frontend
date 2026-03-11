// src/lib/api/products.ts
import apiClient from "./client";
import {
  ApiResponse,
  ProductsResponse,
  Product,
  ProductFilters,
} from "@/app/types/product";

// Helper to convert frontend sort to backend sort parameters
const mapSortToBackend = (
  sort?: string,
): { sortBy: string; sortDir: string } => {
  switch (sort) {
    case "price-low":
      return { sortBy: "proPrice", sortDir: "asc" };
    case "price-high":
      return { sortBy: "proPrice", sortDir: "desc" };
    case "popular":
      return { sortBy: "popular", sortDir: "desc" }; // You'll need to implement popularity tracking
    case "rating":
      return { sortBy: "rating", sortDir: "desc" }; // You'll need to implement ratings
    case "newest":
    default:
      return { sortBy: "proId", sortDir: "desc" };
  }
};

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
    try {
      const { sortBy, sortDir } = mapSortToBackend(filters.sort);

      // Create request payload matching backend ApiRequest structure
      const requestPayload = createApiRequest({
        page: filters.page ?? 0,
        size: filters.size ?? 12,
        sortBy: sortBy,
        sortDir: sortDir,
        categoryId: filters.category ? parseInt(filters.category) : undefined,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        color: filters.color,
        searchQuery: filters.search,
        inStock: filters.inStock,
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
    size = 12,
    sort?: string,
  ): Promise<ApiResponse<ProductsResponse>> => {
    try {
      const { sortBy, sortDir } = mapSortToBackend(sort);

      const requestPayload = createApiRequest({
        page,
        size,
        sortBy,
        sortDir,
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
    size = 12,
    sort?: string,
  ): Promise<ApiResponse<ProductsResponse>> => {
    try {
      const { sortBy, sortDir } = mapSortToBackend(sort);

      const requestPayload = createApiRequest({
        page,
        size,
        sortBy,
        sortDir,
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
