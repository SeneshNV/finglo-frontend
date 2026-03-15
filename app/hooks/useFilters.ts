// src/app/hooks/useFilters.ts

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
    setFilters((prev) => {
      // Create a new object without the current filter
      const { [key]: removed, ...rest } = prev;

      // If value is undefined, null, empty string, or false, remove the filter
      if (
        value === undefined ||
        value === null ||
        value === "" ||
        value === false
      ) {
        return {
          ...rest,
          page: 0, // Still reset page
        };
      }

      // Otherwise add/update the filter
      return {
        ...rest,
        [key]: value,
        page: 0, // Reset to first page when filters change
      };
    });
  }, []);

  const updateMultipleFilters = useCallback(
    (newFilters: Partial<ProductFilters>) => {
      setFilters((prev) => {
        // Start with current filters
        const result = { ...prev };

        // Process each new filter
        (Object.entries(newFilters) as [keyof ProductFilters, any][]).forEach(
          ([key, value]) => {
            if (
              value === undefined ||
              value === null ||
              value === "" ||
              value === false
            ) {
              // Remove filter if value is falsy
              delete result[key];
            } else {
              // Add/update filter with proper typing
              result[key] = value as any;
            }
          },
        );

        // Always reset to first page
        return {
          ...result,
          page: 0,
        } as ProductFilters;
      });
    },
    [],
  );

  const clearFilters = useCallback(() => {
    // Clear ALL filters including search
    setFilters({
      page: 0,
      size: 12,
      sort: "newest",
      // Explicitly set search to undefined to ensure it's removed
      search: undefined,
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
