"use client";

import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { Category, CategoryResponse } from "@/app/types/category";
import React, { useState, useEffect } from "react";
import CategoryHeader from "./CategoryHeader";
import CategoryStats from "./CategoryStats";
import CategoryGrid from "./CategoryGrid";
import CategoryImageGallery from "./CategoryImageGallery";
import { getCategories } from "@/app/lib/api/categories"; // import for client-side fallback

interface CategoryClientProps {
  initialData: CategoryResponse | null; // allow null
}

const CategoryClient: React.FC<CategoryClientProps> = ({ initialData }) => {
  const [data, setData] = useState<CategoryResponse | null>(initialData);
  const [loading, setLoading] = useState(!initialData); // loading if no initial data
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(
    initialData?.responseData.content ?? [], // safe fallback
  );
  const [viewMode, setViewMode] = useState<"grid" | "gallery">("grid");

  // fetch on client side if server fetch failed during build
  useEffect(() => {
    if (!initialData) {
      setLoading(true);
      getCategories()
        .then((result) => {
          setData(result);
          setFilteredCategories(result.responseData.content);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [initialData]);

  // safe fallbacks
  const allCategories = data?.responseData.content ?? [];
  const activeCategories = allCategories.filter(
    (c) => c.status.stCode === "ACT",
  );
  const inactiveCategories = allCategories.filter(
    (c) => c.status.stCode === "INACT",
  );

  useEffect(() => {
    if (filter === "active") {
      setFilteredCategories(activeCategories);
    } else if (filter === "inactive") {
      setFilteredCategories(inactiveCategories);
    } else {
      setFilteredCategories(allCategories);
    }
  }, [filter, data]); // depend on data, not derived arrays

  const handleFilterChange = (newFilter: "all" | "active" | "inactive") => {
    setFilter(newFilter);
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/category" },
  ];

  // show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      <div className="mt-4">
        <CategoryGrid categories={filteredCategories} />
      </div>
    </div>
  );
};

export default CategoryClient;