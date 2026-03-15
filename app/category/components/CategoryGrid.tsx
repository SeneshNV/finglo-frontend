"use client";

import React from "react";
import { Category } from "@/app/types/category";
import CategoryCard from "./CategoryCard";

interface CategoryGridProps {
  categories: Category[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  if (categories.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🏷️</div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
          No Categories Found
        </h3>
        <p className="text-gray-500">Check back later for new categories</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category, index) => (
        <CategoryCard key={category.catId} category={category} index={index} />
      ))}
    </div>
  );
};

export default CategoryGrid;
