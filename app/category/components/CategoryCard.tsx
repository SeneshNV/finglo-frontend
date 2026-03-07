"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/app/types/category";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const imageUrl =
    category.imageUrl ||
    `https://placehold.co/600x400/1a1a1a/ffffff?text=${encodeURIComponent(
      category.catName,
    )}`;

  const formattedDate = new Date(category.updatedAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <article className="group relative bg-white border border-neutral-200 overflow-hidden rounded-xl transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
      {/* IMAGE */}
      <div className="relative h-[280px] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={category.imageAlt || category.catName}
          fill
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
      </div>

      {/* CONTENT */}
      <div className="p-7 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Meta */}
          <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400">
            Collection • {formattedDate}
          </span>

          {/* Title */}
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 transition-colors duration-300 group-hover:text-primary">
            {category.catName}
          </h2>

          {/* Description */}
          <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
            {category.catDescription}
          </p>
        </div>

        {/* Divider */}
        <div className="mt-6 h-[1px] w-12 bg-neutral-300 group-hover:w-full transition-all duration-700"></div>

        {/* CTA */}
        <div className="mt-5 flex items-center justify-between">
          <Link
            href={`/shop/products`}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-900 group/link"
          >
            <span className="relative">
              Explore Collection
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neutral-900 transition-all duration-300 group-hover/link:w-full"></span>
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.7"
              stroke="currentColor"
              className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CategoryCard;
