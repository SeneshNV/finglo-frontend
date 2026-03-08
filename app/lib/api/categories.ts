// src/lib/api/categories.ts
import { CategoryResponse } from "@/app/types/category";
import apiClient from "./client";

// Helper to create API request wrapper (same as in products.ts)
const createApiRequest = <T>(data: T) => ({
  requestData: data,
  timestamp: Date.now().toString(), // Note: timestamp as string
  requestId: crypto.randomUUID?.() || Math.random().toString(36).substring(7),
});

export const getCategories = async (
  page = 0,
  size = 10,
  sortBy = "catName",
  sortDir = "asc",
): Promise<CategoryResponse> => {
  try {
    const requestPayload = createApiRequest({
      page,
      size,
      sortBy,
      sortDir,
    });

    console.log("📦 Fetching categories with payload:", requestPayload);

    const response = await apiClient.post<CategoryResponse>(
      "/products/public/view-categories", // Update this endpoint to match your backend
      requestPayload,
    );

    console.log("📦 Categories response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getActiveCategories = async (
  page = 0,
  size = 10,
  sortBy = "catName",
  sortDir = "asc",
): Promise<CategoryResponse> => {
  try {
    const requestPayload = createApiRequest({
      page,
      size,
      sortBy,
      sortDir,
      status: "ACT", // Add status filter if your backend supports it
    });

    const response = await apiClient.post<CategoryResponse>(
      "/products/public/view-categories", // Same endpoint, backend should handle filtering
      requestPayload,
    );

    // Filter active categories on frontend if backend doesn't support status filtering
    const activeCategories = response.data.responseData.content.filter(
      (category) => category.status.stCode === "ACT",
    );

    return {
      ...response.data,
      responseData: {
        ...response.data.responseData,
        content: activeCategories,
        totalElements: activeCategories.length,
        numberOfElements: activeCategories.length,
      },
    };
  } catch (error) {
    console.error("Error fetching active categories:", error);
    throw error;
  }
};

export const getCategoryById = async (
  id: number,
): Promise<CategoryResponse> => {
  try {
    // For single category, you might use a GET request instead
    const response = await apiClient.get<CategoryResponse>(
      `/products/public/view-category/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    throw error;
  }
};
