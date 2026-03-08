// src/app/hooks/useProducts.ts
import { useState, useCallback } from "react";
import { Product, ProductFilters } from "@/app/types/product";
import { productApi } from "../lib/api/products";

export function useProducts(initialFilters?: ProductFilters) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchProducts = useCallback(async (filters: ProductFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      console.log("🔍 Fetching products with filters:", filters);

      const response = await productApi.getProducts(filters);

      console.log("🔍 API Response:", response);

      if (response.responseCode === "00") {
        setProducts(response.responseData.content);
        setTotalPages(response.responseData.totalPages);
        setCurrentPage(response.responseData.number);
        setTotalElements(response.responseData.totalElements);
      } else {
        setError(response.responseMessage || "Failed to fetch products");
        console.error(
          "API returned error code:",
          response.responseCode,
          response.responseMessage,
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    loading,
    error,
    totalPages,
    currentPage,
    totalElements,
    fetchProducts,
  };
}
