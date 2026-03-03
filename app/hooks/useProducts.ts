import { useState, useCallback, useEffect } from "react";
import { productApi } from "@/app/lib/api/products";
import type {
  Product,
  ProductsResponse,
  ProductFilters,
} from "@/app/types/product";

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  totalElements: number;
  pageSize: number;
  fetchProducts: (filters?: ProductFilters) => Promise<void>;
  setFilters: (filters: ProductFilters) => void;
}

export function useProducts(
  initialFilters?: ProductFilters,
): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters || {});

  const fetchProducts = useCallback(
    async (customFilters?: ProductFilters) => {
      setLoading(true);
      setError(null);
      try {
        const filtersToUse = customFilters || filters;
        const response = await productApi.getProducts(filtersToUse);

        if (response.responseCode === "00") {
          setProducts(response.responseData.content);
          setTotalPages(response.responseData.totalPages);
          setCurrentPage(response.responseData.number);
          setTotalElements(response.responseData.totalElements);
          setPageSize(response.responseData.size);
        } else {
          setError(response.responseMessage);
        }
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [filters],
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    totalPages,
    currentPage,
    totalElements,
    pageSize,
    fetchProducts,
    setFilters,
  };
}
