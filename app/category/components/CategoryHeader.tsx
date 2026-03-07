"use client";

import React from "react";

interface CategoryHeaderProps {
  totalCategories: number;
  activeCount: number;
  inactiveCount: number;
  onFilterChange?: (filter: "all" | "active" | "inactive") => void;
  currentFilter?: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  totalCategories,
  activeCount,
  inactiveCount,
  onFilterChange,
  currentFilter = "all",
}) => {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Our Categories
          </h1>
          <p className="text-gray-600">
            Browse through our collection of {totalCategories} categories
          </p>
        </div>

        {onFilterChange && (
          <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm">
            <button
              onClick={() => onFilterChange("all")}
              className={`px-4 py-2 rounded-md transition-all ${
                currentFilter === "all"
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              All ({totalCategories})
            </button>
            <button
              onClick={() => onFilterChange("active")}
              className={`px-4 py-2 rounded-md transition-all ${
                currentFilter === "active"
                  ? "bg-success text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Active ({activeCount})
            </button>
            <button
              onClick={() => onFilterChange("inactive")}
              className={`px-4 py-2 rounded-md transition-all ${
                currentFilter === "inactive"
                  ? "bg-error text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Inactive ({inactiveCount})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryHeader;
