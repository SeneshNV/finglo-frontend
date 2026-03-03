"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "./ProductGrid";
import ProductFilters from "./ProductFilters";
import ProductSort from "./ProductSort";
import ActiveFilters from "./ActiveFilters";
import MobileFilters from "./MobileFilters";
import ProductPagination from "./ProductPagination";
import { useProducts } from "@/app/hooks/useProducts";
import { useFilters } from "@/app/hooks/useFilters";
import { Filter } from "lucide-react";

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Initialize filters from URL params
  const { filters, updateFilter, clearFilters, setPage } = useFilters({
    page: Number(searchParams.get("page")) || 0,
    size: 12,
    sort: searchParams.get("sort") || "newest",
    category: searchParams.get("category") || undefined,
    color: searchParams.get("color") || undefined,
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    search: searchParams.get("search") || undefined,
  });

  const {
    products,
    loading,
    totalPages,
    currentPage,
    totalElements,
    fetchProducts,
  } = useProducts(filters);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts(filters);
  }, [filters, fetchProducts]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.page) params.set("page", filters.page.toString());
    if (filters.sort && filters.sort !== "newest")
      params.set("sort", filters.sort);
    if (filters.category) params.set("category", filters.category);
    if (filters.color) params.set("color", filters.color);
    if (filters.minPrice) params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice.toString());
    if (filters.search) params.set("search", filters.search);

    const newUrl = `${window.location.pathname}${params.toString() ? "?" + params.toString() : ""}`;
    window.history.replaceState({}, "", newUrl);
  }, [filters]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Desktop Filters */}
      <aside className="hidden lg:block w-80 flex-shrink-0">
        <ProductFilters
          filters={filters}
          onFilterChange={updateFilter}
          onClear={clearFilters}
        />
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            {/* Mobile Filters Button */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-neutral-200 bg-white hover:border-primary-300 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            {/* Active Filters */}
            <ActiveFilters
              filters={filters}
              onRemove={updateFilter}
              onClear={clearFilters}
            />
          </div>

          {/* Results Count & Sort */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-500">
              {totalElements} Products
            </span>
            <ProductSort
              value={filters.sort || "newest"}
              onChange={(sort) => updateFilter("sort", sort)}
            />
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid products={products} loading={loading} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12">
            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      {/* Mobile Filters Drawer */}
      <MobileFilters
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        filters={filters}
        onFilterChange={updateFilter}
        onClear={clearFilters}
      />
    </div>
  );
}
