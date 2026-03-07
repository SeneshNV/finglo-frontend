"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Category } from "@/app/types/category";
import Link from "next/link";

interface CategoryImageGalleryProps {
  categories: Category[];
}

const CategoryImageGallery: React.FC<CategoryImageGalleryProps> = ({
  categories,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  return (
    <div className="bg-base-200 rounded-2xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-6 h-6 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg>
        Category Gallery
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((category) => (
          <div
            key={category.catId}
            className="relative group cursor-pointer"
            onClick={() => setSelectedCategory(category)}
            onMouseEnter={() => setSelectedCategory(category)}
            onMouseLeave={() => setSelectedCategory(null)}
          >
            <div className="aspect-square rounded-xl overflow-hidden bg-base-100 shadow-md">
              <img
                src={category.imageUrl}
                alt={category.imageAlt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Overlay with category name */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs font-semibold line-clamp-2">
                  {category.catName}
                </p>
                <p className="text-white/80 text-[10px]">
                  {category.status.stDescription}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Category Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-base-100 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-4 right-4 btn btn-circle btn-sm btn-ghost bg-white/90 z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>

              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto">
                  <img
                    src={selectedCategory.imageUrl}
                    alt={selectedCategory.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">
                    {selectedCategory.catName}
                  </h3>
                  <div className="flex gap-2 mb-4">
                    {selectedCategory.catCode && (
                      <div className="badge badge-primary">
                        {selectedCategory.catCode}
                      </div>
                    )}
                    <div
                      className={`badge badge-${selectedCategory.status.stCode === "ACT" ? "success" : "error"}`}
                    >
                      {selectedCategory.status.stDescription}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">
                    {selectedCategory.catDescription}
                  </p>

                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Created:</span>{" "}
                      {new Date(selectedCategory.createdAt).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-semibold">Updated:</span>{" "}
                      {new Date(selectedCategory.updatedAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="divider"></div>

                  <Link
                    href={`/category/${selectedCategory.catId}`}
                    className="btn btn-primary w-full"
                    onClick={() => setSelectedCategory(null)}
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryImageGallery;
