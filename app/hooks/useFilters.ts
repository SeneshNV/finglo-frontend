import { useState, useCallback } from "react";
import { ProductFilters } from "@/app/types/product";

export function useFilters(initialFilters?: ProductFilters) {
  const [filters, setFilters] = useState<ProductFilters>(
    initialFilters || {
      page: 0,
      size: 12,
      sort: "newest",
    },
  );

  const updateFilter = useCallback((key: keyof ProductFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      // Reset to first page when filters change
      page: 0,
    }));
  }, []);

  const updateMultipleFilters = useCallback(
    (newFilters: Partial<ProductFilters>) => {
      setFilters((prev) => ({
        ...prev,
        ...newFilters,
        page: 0,
      }));
    },
    [],
  );

  const clearFilters = useCallback(() => {
    setFilters({
      page: 0,
      size: 12,
      sort: "newest",
    });
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  }, []);

  return {
    filters,
    updateFilter,
    updateMultipleFilters,
    clearFilters,
    setPage,
  };
}
