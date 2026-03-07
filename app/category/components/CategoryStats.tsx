"use client";

import React from "react";

interface CategoryStatsProps {
  totalCategories: number;
  activeCategories: number;
  inactiveCategories: number;
}

const CategoryStats: React.FC<CategoryStatsProps> = ({
  totalCategories,
  activeCategories,
  inactiveCategories,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="stat bg-base-100 rounded-lg shadow-sm border border-gray-100">
        <div className="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Total Categories</div>
        <div className="stat-value text-primary">{totalCategories}</div>
        <div className="stat-desc">All categories in store</div>
      </div>

      <div className="stat bg-base-100 rounded-lg shadow-sm border border-gray-100">
        <div className="stat-figure text-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Active Categories</div>
        <div className="stat-value text-success">{activeCategories}</div>
        <div className="stat-desc">Currently available</div>
      </div>

      <div className="stat bg-base-100 rounded-lg shadow-sm border border-gray-100">
        <div className="stat-figure text-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Inactive Categories</div>
        <div className="stat-value text-error">{inactiveCategories}</div>
        <div className="stat-desc">Temporarily unavailable</div>
      </div>
    </div>
  );
};

export default CategoryStats;
