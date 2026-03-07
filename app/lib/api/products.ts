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
const USE_DUMMY_DATA = true; // ← set to false when real backend is ready
const API_DELAY_MS = 600; // realistic loading feel

const delay = () => new Promise((resolve) => setTimeout(resolve, API_DELAY_MS));

export const productApi = {
  // ────────────────────────────────────────────────
  //  Get products (with filters & pagination)
  // ────────────────────────────────────────────────
  getProducts: async (
    filters: ProductFilters = {},
  ): Promise<ApiResponse<ProductsResponse>> => {
    if (USE_DUMMY_DATA) {
      await delay();

      let filtered = [...DUMMY_PRODUCTS.responseData.content];

      // Simple client-side filtering (simulates backend)
      if (filters.category) {
        filtered = filtered.filter((p) =>
          p.categories?.some((c) => c.catId === Number(filters.category)),
        );
      }
      if (filters.color) {
        filtered = filtered.filter((p) =>
          p.proColor?.toLowerCase().includes(filters.color!.toLowerCase()),
        );
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.proName.toLowerCase().includes(q) ||
            p.proDescription?.toLowerCase().includes(q),
        );
      }
      // You can add minPrice / maxPrice / sort later if needed

      // Pagination
      const page = filters.page ?? 0;
      const size = filters.size ?? 10;
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
            sort: [],
            unpaged: false,
          },
          sort: [],
        },
      };
    }

    // Real API (uncomment when ready)
    // const params = new URLSearchParams();
    // if (filters.page !== undefined) params.set("page", String(filters.page));
    // if (filters.size !== undefined) params.set("size", String(filters.size));
    // if (filters.sort) params.set("sort", filters.sort);
    // if (filters.category) params.set("category", filters.category);
    // if (filters.color) params.set("color", filters.color);
    // if (filters.minPrice !== undefined) params.set("minPrice", String(filters.minPrice));
    // if (filters.maxPrice !== undefined) params.set("maxPrice", String(filters.maxPrice));
    // if (filters.search) params.set("search", filters.search);

    // const res = await apiClient.get<ApiResponse<ProductsResponse>>("/products", { params });
    // return res.data;

    throw new Error(
      "Real API is not enabled yet. Set USE_DUMMY_DATA = true or implement real endpoint.",
    );
  },

  // ────────────────────────────────────────────────
  //  Get single product by ID
  // ────────────────────────────────────────────────
  getProductById: async (id: number): Promise<ApiResponse<Product>> => {
    console.log("🔧 API - getProductById called with ID:", id);
    console.log("🔧 API - USE_DUMMY_DATA =", USE_DUMMY_DATA);

    if (USE_DUMMY_DATA) {
      console.log("🔧 API - Using dummy data");

      try {
        await delay();

        console.log(
          "🔧 API - Dummy products available:",
          DUMMY_PRODUCTS?.responseData?.content?.length,
        );

        if (
          !DUMMY_PRODUCTS ||
          !DUMMY_PRODUCTS.responseData ||
          !DUMMY_PRODUCTS.responseData.content
        ) {
          console.error(
            "🔧 API - DUMMY_PRODUCTS structure is invalid:",
            DUMMY_PRODUCTS,
          );
          throw new Error("Invalid dummy data structure");
        }

        // Log all available product IDs
        const availableIds = DUMMY_PRODUCTS.responseData.content.map(
          (p) => p.proId,
        );
        console.log("🔧 API - Available product IDs:", availableIds);

        const product = DUMMY_PRODUCTS.responseData.content.find(
          (p) => p.proId === id,
        );

        console.log("🔧 API - Product found:", product ? "Yes" : "No");
        console.log("🔧 API - Product data:", product);

        if (!product) {
          console.error(
            `🔧 API - Product with id ${id} not found in dummy data`,
          );
          throw new Error(`Product with id ${id} not found`);
        }

        return {
          responseCode: "00",
          responseMessage: "Product retrieved successfully",
          responseData: product,
        };
      } catch (error) {
        console.error("🔧 API - Error in getProductById:", error);
        throw error; // Re-throw to be caught by the page
      }
    }

    // Real API
    console.log("🔧 API - Using real API");
    const res = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
    return res.data;
  },

  // ────────────────────────────────────────────────
  //  Get products by category
  // ────────────────────────────────────────────────
  getProductsByCategory: async (
    categoryId: number,
    page = 0,
    size = 10,
  ): Promise<ApiResponse<ProductsResponse>> => {
    if (USE_DUMMY_DATA) {
      await delay();

      const filtered = DUMMY_PRODUCTS.responseData.content.filter((p) =>
        p.categories?.some((c) => c.catId === categoryId),
      );

      const start = page * size;
      const paginated = filtered.slice(start, start + size);

      return {
        responseCode: "00",
        responseMessage: "Products by category retrieved (dummy)",
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
            sort: [],
            unpaged: false,
          },
          sort: [],
        },
      };
    }

    // Real API
    const res = await apiClient.get<ApiResponse<ProductsResponse>>(
      `/categories/${categoryId}/products`,
      { params: { page, size } },
    );
    return res.data;
  },

  // ────────────────────────────────────────────────
  //  Search products
  // ────────────────────────────────────────────────
  searchProducts: async (
    query: string,
    page = 0,
    size = 10,
  ): Promise<ApiResponse<ProductsResponse>> => {
    if (USE_DUMMY_DATA) {
      await delay();

      const q = query.toLowerCase();
      const results = DUMMY_PRODUCTS.responseData.content.filter(
        (p) =>
          p.proName.toLowerCase().includes(q) ||
          p.proDescription?.toLowerCase().includes(q),
      );

      const start = page * size;
      const paginated = results.slice(start, start + size);

      return {
        responseCode: "00",
        responseMessage: "Search results (dummy)",
        responseData: {
          content: paginated,
          totalElements: results.length,
          totalPages: Math.ceil(results.length / size),
          number: page,
          size,
          numberOfElements: paginated.length,
          first: page === 0,
          last: start + size >= results.length,
          empty: paginated.length === 0,
          pageable: {
            offset: start,
            pageNumber: page,
            pageSize: size,
            paged: true,
            sort: [],
            unpaged: false,
          },
          sort: [],
        },
      };
    }

    // Real API
    const res = await apiClient.get<ApiResponse<ProductsResponse>>(
      "/products/search",
      { params: { q: query, page, size } },
    );
    return res.data;
  },
};
