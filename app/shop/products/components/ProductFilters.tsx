"use client";

import { useState, useEffect } from "react";
import type {
  ProductFilters as FilterTypes,
  Category,
} from "@/app/types/product";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { getActiveCategories } from "@/app/lib/api/categories";

interface ProductFiltersProps {
  filters: FilterTypes;
  onFilterChange: (key: keyof FilterTypes, value: any) => void;
  onClear: () => void;
  isMobile?: boolean;
}

const PRICE_RANGES = [
  { label: "Under LKR2,500", min: 0, max: 2500 },
  { label: "LKR2,500 - LKR5,000", min: 2500, max: 5000 },
  { label: "LKR5,000 - LKR10,000", min: 5000, max: 10000 },
  { label: "LKR10,000 - LKR20,000", min: 10000, max: 20000 },
  { label: "Above LKR20,000", min: 20000, max: null },
];

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-neutral-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="font-display text-lg text-primary-900">{title}</h3>
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
}

export default function ProductFilters({
  filters,
  onFilterChange,
  onClear,
  isMobile = false,
}: ProductFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<{ min?: number; max?: number }>({
    min: filters.minPrice,
    max: filters.maxPrice,
  });

  // Fetch real categories from backend with the correct format
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Fetch categories sorted by name
        const response = await getActiveCategories(0, 100, "catName", "asc");

        // Sort categories by name (in case backend doesn't sort)
        const sortedCategories = response.responseData.content.sort((a, b) =>
          a.catName.localeCompare(b.catName),
        );

        setCategories(sortedCategories);
        console.log("Categories loaded:", sortedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handlePriceChange = (min?: number, max?: number) => {
    setPriceRange({ min, max });
    onFilterChange("minPrice", min);
    onFilterChange("maxPrice", max);
  };

  const handlePriceRangeSelect = (range: (typeof PRICE_RANGES)[0]) => {
    handlePriceChange(range.min, range.max || undefined);
  };

  const handleCategoryChange = (categoryId: number) => {
    // Store category ID as string
    onFilterChange("category", categoryId.toString());
  };

  const activeFilterCount = [
    filters.category,
    filters.color,
    filters.minPrice,
    filters.maxPrice,
  ].filter(Boolean).length;

  return (
    <div className="bg-white p-6 border border-neutral-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl text-primary-900">Filters</h2>
        {activeFilterCount > 0 && (
          <button
            onClick={onClear}
            className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Availability */}
      <FilterSection title="Availability" defaultOpen={true}>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock || false}
            onChange={(e) =>
              onFilterChange("inStock", e.target.checked || undefined)
            }
            className="w-4 h-4 text-primary-600 rounded border-neutral-300 focus:ring-primary-500"
          />
          <span className="text-sm text-neutral-700">In Stock Only</span>
        </label>
      </FilterSection>

      {/* Categories - Real data from backend */}
      <FilterSection title="Categories">
        {loading ? (
          <div className="text-sm text-neutral-500 animate-pulse">
            Loading categories...
          </div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {categories.map((category) => (
              <label
                key={category.catId}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="category"
                    value={category.catId}
                    checked={filters.category === category.catId.toString()}
                    onChange={() => handleCategoryChange(category.catId)}
                    className="w-4 h-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
                  />
                  <span className="text-sm text-neutral-700 group-hover:text-primary-600">
                    {category.catName}
                  </span>
                </div>

                {/* SHOW PRODUCT COUNT */}
                <span className="text-xs text-neutral-400">
                  ({category.productCount})
                </span>
              </label>
            ))}
            {categories.length === 0 && (
              <div className="text-sm text-neutral-500">
                No categories found
              </div>
            )}
          </div>
        )}
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="space-y-3">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.label}
              onClick={() => handlePriceRangeSelect(range)}
              className={`block w-full text-left text-sm px-3 py-2 rounded transition-colors
                ${
                  priceRange.min === range.min && priceRange.max === range.max
                    ? "bg-primary-50 text-primary-700"
                    : "text-neutral-700 hover:bg-neutral-50"
                }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}
