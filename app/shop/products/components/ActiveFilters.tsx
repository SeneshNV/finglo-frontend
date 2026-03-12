// src/app/shop/components/ActiveFilters.tsx

"use client";

import type { ProductFilters } from "@/app/types/product";
import { X } from "lucide-react";

interface ActiveFiltersProps {
  filters: ProductFilters;
  onRemove: (key: keyof ProductFilters, value: any) => void;
  onClear: () => void;
}

export default function ActiveFilters({
  filters,
  onRemove,
  onClear,
}: ActiveFiltersProps) {
  const activeFilters: {
    key: keyof ProductFilters;
    label: string;
    value: string;
  }[] = [];

  // Search filter
  if (filters.search) {
    activeFilters.push({
      key: "search",
      label: "Search",
      value: filters.search,
    });
  }

  // Category filter
  if (filters.category) {
    activeFilters.push({
      key: "category",
      label: "Category",
      value: filters.category,
    });
  }

  // Color filter
  if (filters.color) {
    activeFilters.push({
      key: "color",
      label: "Color",
      value: filters.color,
    });
  }

  // Price filter
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    let priceLabel = "";
    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      priceLabel = `LKR ${filters.minPrice} - LKR ${filters.maxPrice}`;
    } else if (filters.minPrice !== undefined) {
      priceLabel = `Above LKR ${filters.minPrice}`;
    } else if (filters.maxPrice !== undefined) {
      priceLabel = `Below LKR ${filters.maxPrice}`;
    }

    activeFilters.push({
      key: "minPrice", // Using minPrice as key, but we'll handle both
      label: "Price",
      value: priceLabel,
    });
  }

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-neutral-500">Active Filters:</span>

      {activeFilters.map((filter) => (
        <button
          key={`${filter.key}-${filter.value}`}
          onClick={() => {
            if (filter.key === "minPrice") {
              // For price filter, remove both min and max
              onRemove("minPrice", undefined);
              onRemove("maxPrice", undefined);
            } else {
              onRemove(filter.key, undefined);
            }
          }}
          className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 
                   text-sm hover:bg-primary-100 transition-colors group"
        >
          <span>
            <span className="text-xs opacity-75">{filter.label}:</span>{" "}
            <span className="font-medium">{filter.value}</span>
          </span>
          <X className="w-3 h-3 ml-1 group-hover:scale-110 transition-transform" />
        </button>
      ))}

      <button
        onClick={onClear}
        className="text-sm text-neutral-500 hover:text-primary-600 underline"
      >
        Clear All
      </button>
    </div>
  );
}
