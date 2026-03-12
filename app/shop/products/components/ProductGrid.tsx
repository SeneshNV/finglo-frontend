"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import type { Product } from "@/app/types/product";
import Link from "next/link";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  // --- Elegant Loading Skeleton ---
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-4">
            <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-neutral-100 w-1/4" />
              <div className="h-3 bg-neutral-100 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // --- Refined Empty State ---
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center py-32 px-6 text-center"
      >
        <div className="relative w-20 h-20 mb-10">
          <div className="absolute inset-0 border border-nude-taupe/20 rotate-45" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-nude-taupe/40"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <span className="text-[10px] uppercase tracking-[0.4em] text-nude-taupe mb-4 block font-semibold">
          Selection Unavailable
        </span>

        <h3 className="text-3xl md:text-4xl font-light tracking-tight text-nude-dark mb-6">
          The archive is{" "}
          <span className="italic font-serif">presently quiet</span>
        </h3>

        <p className="text-sm md:text-base text-nude-taupe/70 max-w-sm font-light leading-relaxed mb-10">
          We couldn't find any pieces matching your current selection. Consider
          refining your filters or exploring our new arrivals.
        </p>

        {/* Clean Link to base shop path */}
        {/* <Link
          href="/shop/products"
          prefetch={false}
          className="group flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-nude-dark font-bold transition-all"
        >
          <span className="border-b border-nude-dark/20 pb-1 group-hover:border-nude-dark transition-all duration-500">
            Clear All Filters
          </span>
          <div className="w-8 h-[1px] bg-nude-dark/20 group-hover:w-12 group-hover:bg-nude-dark transition-all duration-500" />
        </Link> */}
      </motion.div>
    );
  }

  // --- Active Product Grid with Staggered Entrance ---
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
      {products.map((product, index) => (
        <motion.div
          key={product.proId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.05 }}
        >
          <ProductCard product={product} priority={index < 4} />
        </motion.div>
      ))}
    </div>
  );
}
