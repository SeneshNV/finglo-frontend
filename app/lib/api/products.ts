import { DUMMY_PRODUCTS } from "../dummy/products";
import apiClient from "./client";
import {
  ApiResponse,
  ProductsResponse,
  Product,
  ProductFilters,
} from "@/app/types/product";

export const productApi = {
  // Get all products with pagination
  getProducts: async (filters?: ProductFilters) => {
    try {
      // For development: return dummy data
      if (process.env.NODE_ENV === "development") {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        return DUMMY_PRODUCTS as ApiResponse<ProductsResponse>;
      }

      // For production: call actual API
      const params = new URLSearchParams();

      if (filters?.page !== undefined)
        params.append("page", filters.page.toString());
      if (filters?.size !== undefined)
        params.append("size", filters.size.toString());
      if (filters?.sort) params.append("sort", filters.sort);
      if (filters?.category) params.append("category", filters.category);
      if (filters?.color) params.append("color", filters.color);
      if (filters?.minPrice)
        params.append("minPrice", filters.minPrice.toString());
      if (filters?.maxPrice)
        params.append("maxPrice", filters.maxPrice.toString());
      if (filters?.search) params.append("search", filters.search);

      const response = await apiClient.get<ApiResponse<ProductsResponse>>(
        "/products",
        { params },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // Get single product by ID
  getProductById: async (id: number) => {
    try {
      // For development: filter from dummy data
      if (process.env.NODE_ENV === "development") {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const product = DUMMY_PRODUCTS.responseData.content.find(
          (p: any) => p.proId === id,
        );
        if (product) {
          return {
            responseCode: "00",
            responseMessage: "Product retrieved successfully",
            responseData: product,
          } as ApiResponse<Product>;
        } else {
          throw new Error("Product not found");
        }
      }

      const response = await apiClient.get<ApiResponse<Product>>(
        `/products/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (categoryId: number, page = 0, size = 10) => {
    try {
      if (process.env.NODE_ENV === "development") {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const filteredProducts = DUMMY_PRODUCTS.responseData.content.filter(
          (p: any) => p.categories.some((c: any) => c.catId === categoryId),
        );
        return {
          responseCode: "00",
          responseMessage: "Products retrieved successfully",
          responseData: {
            content: filteredProducts,
            totalPages: Math.ceil(filteredProducts.length / size),
            number: page,
            totalElements: filteredProducts.length,
          },
        } as ApiResponse<ProductsResponse>;
      }

      const response = await apiClient.get<ApiResponse<ProductsResponse>>(
        `/categories/${categoryId}/products`,
        { params: { page, size } },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (query: string, page = 0, size = 10) => {
    try {
      if (process.env.NODE_ENV === "development") {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const searchResults = DUMMY_PRODUCTS.responseData.content.filter(
          (p: any) =>
            p.proName.toLowerCase().includes(query.toLowerCase()) ||
            p.proDescription.toLowerCase().includes(query.toLowerCase()),
        );
        return {
          responseCode: "00",
          responseMessage: "Products retrieved successfully",
          responseData: {
            content: searchResults,
            totalPages: Math.ceil(searchResults.length / size),
            number: page,
            totalElements: searchResults.length,
          },
        } as ApiResponse<ProductsResponse>;
      }

      const response = await apiClient.get<ApiResponse<ProductsResponse>>(
        "/products/search",
        { params: { q: query, page, size } },
      );
      return response.data;
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  },
};
