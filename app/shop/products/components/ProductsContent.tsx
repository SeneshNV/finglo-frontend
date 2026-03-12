// src/app/shop/components/ProductsContent.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "./ProductGrid";
import ProductFilters from "./ProductFilters";
import ProductSort from "./ProductSort";
import ActiveFilters from "./ActiveFilters";
import MobileFilters from "./MobileFilters";
import LoadMorePagination from "./ProductPagination";
import SearchBar from "./SearchBar";
import { useProducts } from "@/app/hooks/useProducts";
import { useFilters } from "@/app/hooks/useFilters";
import { Filter, Search } from "lucide-react";

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<any[]>([]);

  // Separate state for search term (doesn't affect filters UI)
  const [searchTerm, setSearchTerm] = useState("");

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
    // Don't include search in filters
  });

  const {
    products,
    loading,
    totalPages,
    currentPage,
    totalElements,
    fetchProducts,
  } = useProducts();

  // Fetch products when filters OR search term changes
  useEffect(() => {
    // Combine filters with search term
    const searchFilters = {
      ...filters,
      search: searchTerm || undefined,
    };
    fetchProducts(searchFilters);
  }, [filters, searchTerm, fetchProducts]);

  // Handle search from SearchBar
  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      setPage(0); // Reset to first page on new search
    },
    [setPage],
  );

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
    if (filters.page !== undefined && filters.page > 0)
      params.set("page", filters.page.toString());

    if (filters.sort && filters.sort !== "newest")
      params.set("sort", filters.sort);
    if (filters.category) params.set("category", filters.category);
    if (filters.color) params.set("color", filters.color);
    if (filters.minPrice) params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice.toString());
    // Don't add search to URL params

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
        {/* Search Bar Section - Independent from filters */}
        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search by product name, code, or description..."
            initialValue={searchTerm}
          />
        </div>

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
              filters={filters} // Only pass filters without search
              onRemove={updateFilter}
              onClear={clearFilters}
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">
              {searchTerm ? (
                <>
                  Found {totalElements} results for "{searchTerm}"
                </>
              ) : (
                <>
                  Showing {allProducts.length} of {totalElements}
                </>
              )}
            </span>
            <ProductSort
              value={filters.sort || "newest"}
              onChange={(sort) => updateFilter("sort", sort)}
            />
          </div>
        </div>

        {/* No Results State */}
        {!loading && allProducts.length === 0 && (
          <div className="text-center py-16 px-4">
            <div className="mb-6">
              <Search className="w-16 h-16 mx-auto text-neutral-300" />
            </div>
            <h3 className="text-xl font-light text-neutral-900 mb-3">
              No products found
            </h3>
            <p className="text-neutral-500 text-sm max-w-md mx-auto mb-8">
              {searchTerm ? (
                <>We couldn't find any products matching "{searchTerm}"</>
              ) : (
                <>No products match your selected filters</>
              )}
            </p>
            {(searchTerm ||
              filters.category ||
              filters.color ||
              filters.minPrice ||
              filters.maxPrice) && (
              <button
                onClick={() => {
                  clearFilters();
                  setSearchTerm("");
                }}
                className="px-8 py-3 border border-neutral-900 text-neutral-900 text-xs uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-colors duration-300"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Product Grid */}
        <ProductGrid
          products={allProducts}
          loading={loading && (filters.page ?? 0) === 0}
        />

        {totalPages > 1 && allProducts.length > 0 && (
          <div className="mt-16 mb-20">
            <LoadMorePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onLoadMore={handleLoadMore}
              loading={loading && (filters.page ?? 0) > 0}
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
