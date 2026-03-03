"use client";

import { useState } from "react";
import type { ProductFilters as FilterTypes } from "@/app/types/product";
import { ChevronDown, ChevronUp, X } from "lucide-react";

interface ProductFiltersProps {
  filters: FilterTypes;
  onFilterChange: (key: keyof FilterTypes, value: any) => void;
  onClear: () => void;
  isMobile?: boolean;
}

// Dummy data for development
const DUMMY_CATEGORIES = [
  { id: 1, name: "Silk Sarees", count: 45 },
  { id: 2, name: "Cotton Sarees", count: 38 },
  { id: 3, name: "Bridal Collection", count: 22 },
  { id: 4, name: "Party Wear", count: 31 },
  { id: 5, name: "Daily Wear", count: 54 },
  { id: 6, name: "Designer Sarees", count: 27 },
];

const DUMMY_FABRICS = [
  { name: "Pure Silk", count: 42 },
  { name: "Cotton Silk", count: 28 },
  { name: "Banarasi", count: 19 },
  { name: "Kanchipuram", count: 23 },
  { name: "Chiffon", count: 31 },
  { name: "Georgette", count: 35 },
];

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
  const checkboxSize = isMobile ? "w-5 h-5" : "w-4 h-4";

  const [priceRange, setPriceRange] = useState<{ min?: number; max?: number }>({
    min: filters.minPrice,
    max: filters.maxPrice,
  });

  const handlePriceChange = (min?: number, max?: number) => {
    setPriceRange({ min, max });
    onFilterChange("minPrice", min);
    onFilterChange("maxPrice", max);
  };

  const handlePriceRangeSelect = (range: (typeof PRICE_RANGES)[0]) => {
    handlePriceChange(range.min, range.max || undefined);
  };

  const handleCategoryChange = (categoryName: string) => {
    onFilterChange("category", categoryName);
  };

  const handleColorChange = (color: string) => {
    onFilterChange("color", color);
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

      {/* Categories */}
      <FilterSection title="Categories">
        <div className="space-y-2">
          {DUMMY_CATEGORIES.map((category) => (
            <label
              key={category.id}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  value={category.name}
                  checked={filters.category === category.name}
                  onChange={() => handleCategoryChange(category.name)}
                  className="w-4 h-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-700 group-hover:text-primary-600">
                  {category.name}
                </span>
              </div>
              <span className="text-xs text-neutral-400">
                ({category.count})
              </span>
            </label>
          ))}
        </div>
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

      {/* Fabric Type */}
      <FilterSection title="Fabric">
        <div className="space-y-2">
          {DUMMY_FABRICS.map((fabric) => (
            <label
              key={fabric.name}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 rounded border-neutral-300 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-700">{fabric.name}</span>
              </div>
              <span className="text-xs text-neutral-400">({fabric.count})</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability" defaultOpen={false}>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 text-primary-600 rounded border-neutral-300 focus:ring-primary-500"
          />
          <span className="text-sm text-neutral-700">In Stock Only</span>
        </label>
      </FilterSection>
    </div>
  );
}
