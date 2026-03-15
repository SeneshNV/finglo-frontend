"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Category } from "@/app/types/category";

interface CategoryCardProps {
  category: Category;
  index: number; // Added index for staggered animations and labels
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
  // Logic to determine grid size based on index (simulating the old lg, sm, md pattern)
  const layoutPatterns = ["lg", "sm", "sm", "md"];
  const size = layoutPatterns[index % 4] || "sm";

  const gridClasses = {
    lg: "lg:col-span-2 lg:row-span-2 min-h-[450px]",
    md: "lg:col-span-2 lg:row-span-1 min-h-[350px]",
    sm: "lg:col-span-1 lg:row-span-1 min-h-[350px]",
  };

  const imageUrl =
    category.imageUrl ||
    `https://images.unsplash.com/photo-1616756141603-6d37d5cde2a2?q=80&w=1074&auto=format&fit=crop`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`relative group overflow-hidden ${gridClasses[size as keyof typeof gridClasses]}`}
    >
      <Link
        href={`/shop/products?category=${category.catId}`}
        className="block w-full h-full"
      >
        {/* 1. Subtle Grain Overlay for Texture */}
        <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* 2. Soft Dark Overlay (Fades in on hover) */}
        <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/50 transition-all duration-700 z-10" />

        {/* 3. The Image with extra-slow cinematic zoom */}
        <Image
          src={imageUrl}
          alt={category.imageAlt || category.catName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-[2s] ease-[0.16, 1, 0.3, 1] group-hover:scale-110"
        />

        {/* 4. Text Content - Floating Glass/Elegant Effect */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
          <div className="flex flex-col">
            <p className="text-white/60 text-[9px] uppercase tracking-[0.4em] mb-2 font-medium">
              Segment {index + 1}
            </p>

            <h3 className="text-white text-3xl md:text-4xl font-light tracking-tight mb-4">
              {category.catName}
            </h3>

            {/* Hidden "Discover" reveal */}
            <div className="overflow-hidden">
              <span className="inline-flex items-center gap-3 text-white text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                Discover{" "}
                <div className="w-10 h-[1px] bg-white/50 group-hover:w-16 transition-all duration-1000" />
              </span>
            </div>
          </div>
        </div>

        {/* 5. Decorative corner accent (Top Right) */}
        <div className="absolute top-6 right-6 z-20 w-8 h-8 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-700" />
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
