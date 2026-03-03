"use client";

import React, { useEffect } from "react";
import ProductFilters from "./ProductFilters";
import type { ProductFilters as FilterTypes } from "@/app/types/product";
import { X } from "lucide-react";

interface MobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterTypes;
  onFilterChange: (key: keyof FilterTypes, value: any) => void;
  onClear: () => void;
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClear,
}) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="px-6 py-6 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-primary-900">Filters</h2>
            <button
              onClick={onClose}
              className="rounded-md text-neutral-400 hover:text-primary-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="mt-2 text-sm text-neutral-500">
            Refine your saree collection
          </p>
        </div>

        {/* Filters Content */}
        <div className="h-[calc(100vh-180px)] overflow-y-auto px-6 py-6">
          <ProductFilters
            filters={filters}
            onFilterChange={onFilterChange}
            onClear={onClear}
          />
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-neutral-200 bg-white px-6 py-6">
          <div className="flex flex-col gap-3">
            <button
              onClick={onClose}
              className="w-full btn-gold py-3 text-center"
            >
              Apply Filters
            </button>
            <button
              onClick={() => {
                onClear();
                onClose();
              }}
              className="w-full btn-luxury-outline py-3 text-center"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFilters;
