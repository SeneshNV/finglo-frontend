"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "./ProductGrid";
import ProductFilters from "./ProductFilters";
import ProductSort from "./ProductSort";
import ActiveFilters from "./ActiveFilters";
import MobileFilters from "./MobileFilters";
import LoadMorePagination from "./ProductPagination";
import { useProducts } from "@/app/hooks/useProducts";
import { useFilters } from "@/app/hooks/useFilters";
import { Filter } from "lucide-react";

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<any[]>([]);

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

  useEffect(() => {
    fetchProducts(filters);
  }, [filters, fetchProducts]);

  // --- REFINED LOGIC: FIXING THE UNDEFINED ERROR ---
  useEffect(() => {
    if (!products) return;

    // Use ?? 0 to ensure we are comparing numbers, not undefined
    const activePage = filters.page ?? 0;

    if (activePage === 0) {
      setAllProducts(products);
    } else {
      setAllProducts((prev) => {
        const existingIds = new Set(prev.map((item) => item.proId));
        const newUniqueProducts = products.filter(
          (item) => !existingIds.has(item.proId),
        );
        return [...prev, ...newUniqueProducts];
      });
    }
  }, [products, filters.page]);

  useEffect(() => {
    const params = new URLSearchParams();

    // Safety check for URL params
    if (filters.page !== undefined) params.set("page", filters.page.toString());

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

  const handleLoadMore = () => {
    if (loading) return;
    setPage(currentPage + 1);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="hidden lg:block w-80 flex-shrink-0">
        <ProductFilters
          filters={filters}
          onFilterChange={updateFilter}
          onClear={clearFilters}
        />
      </aside>

      <div className="flex-1">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-neutral-200 bg-white hover:border-black transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-bold">
                Filters
              </span>
            </button>
            <ActiveFilters
              filters={filters}
              onRemove={updateFilter}
              onClear={clearFilters}
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">
              Showing {allProducts.length} of {totalElements}
            </span>
            <ProductSort
              value={filters.sort || "newest"}
              onChange={(sort) => updateFilter("sort", sort)}
            />
          </div>
        </div>

        {/* Fix: loading check for page 0 */}
        <ProductGrid
          products={allProducts}
          loading={loading && (filters.page ?? 0) === 0}
        />

        {totalPages > 1 && (
          <div className="mt-16 mb-20">
            <LoadMorePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onLoadMore={handleLoadMore}
              loading={loading && (filters.page ?? 0) > 0} // Fix: loading more check
            />
          </div>
        )}
      </div>

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
