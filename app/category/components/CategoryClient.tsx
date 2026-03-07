"use client";

import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { Category, CategoryResponse } from "@/app/types/category";
import React, { useState, useEffect } from "react";
import CategoryHeader from "./CategoryHeader";
import CategoryStats from "./CategoryStats";
import CategoryGrid from "./CategoryGrid";
import CategoryImageGallery from "./CategoryImageGallery";

interface CategoryClientProps {
  initialData: CategoryResponse;
}

const CategoryClient: React.FC<CategoryClientProps> = ({ initialData }) => {
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(
    initialData.responseData.content,
  );
  const [viewMode, setViewMode] = useState<"grid" | "gallery">("grid");

  // Calculate stats
  const allCategories = initialData.responseData.content;
  const activeCategories = allCategories.filter(
    (c) => c.status.stCode === "ACT",
  );
  const inactiveCategories = allCategories.filter(
    (c) => c.status.stCode === "INACT",
  );

  // Filter categories based on selection
  useEffect(() => {
    if (filter === "active") {
      setFilteredCategories(activeCategories);
    } else if (filter === "inactive") {
      setFilteredCategories(inactiveCategories);
    } else {
      setFilteredCategories(allCategories);
    }
  }, [filter, allCategories, activeCategories, inactiveCategories]);

  const handleFilterChange = (newFilter: "all" | "active" | "inactive") => {
    setFilter(newFilter);
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/category" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      {/* Content based on view mode */}
      <div className="mt-4">
        <CategoryGrid categories={filteredCategories} />
      </div>
    </div>
  );
};

export default CategoryClient;
