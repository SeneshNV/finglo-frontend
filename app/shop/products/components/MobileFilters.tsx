"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl flex flex-col"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <div>
                <h2 className="text-lg font-semibold text-stone-900">
                  Filters
                </h2>
                <p className="text-xs text-stone-500">Refine your collection</p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-neutral-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* FILTER CONTENT */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <ProductFilters
                filters={filters}
                onFilterChange={onFilterChange}
                onClear={onClear}
              />
            </div>

            {/* FOOTER ACTIONS */}
            <div className="border-t px-5 py-4 bg-white flex gap-3">
              <button
                onClick={() => {
                  onClear(); // Call the parent clear function
                  // Don't close the modal immediately so user sees the cleared state
                }}
                className="flex-1 border border-neutral-300 py-3 text-sm font-medium rounded-md hover:bg-neutral-50 transition"
              >
                Clear
              </button>

              <button
                onClick={onClose}
                className="flex-1 bg-black text-white py-3 text-sm font-medium rounded-md hover:bg-neutral-800 transition"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileFilters;
