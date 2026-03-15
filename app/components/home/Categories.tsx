"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getActiveCategories } from "@/app/lib/api/categories";
import { Category } from "@/app/types/category";
import CategoryCard from "@/app/category/components/CategoryCard";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getActiveCategories(0, 4);
        // We map the incoming data to include the 'size' property used by the old layout
        const layoutPatterns = ["lg", "sm", "sm", "md"]; 
        const mappedCategories = res.responseData.content.map((cat: any, index: number) => ({
          ...cat,
          size: layoutPatterns[index] || "sm",
        }));
        setCategories(mappedCategories);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };

    loadCategories();
  }, []);

  return (
    <section className="py-24 bg-nude-ivory overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header Section - Restored Old Style & Animations */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] text-nude-taupe mb-6 block font-semibold">
              The Finglo Collection
            </span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-nude-dark leading-[1.1]">
              Curated <span className="font-bold">Signature</span> <br />
              <span className="italic font-serif">Styles</span>
            </h2>
            <p className="text-sm md:text-base text-nude-taupe/80 mt-8 max-w-md font-light leading-relaxed">
              Experience the fusion of heritage craftsmanship and contemporary
              aesthetics through our expertly defined saree segments.
            </p>
          </motion.div>

          <Link
            href="/category"
            className="group flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-nude-dark font-bold"
          >
            <span className="border-b border-nude-taupe/30 pb-1 group-hover:border-nude-dark transition-all duration-500">
              View All Categories
            </span>
            <div className="w-8 h-[1px] bg-nude-taupe/30 group-hover:w-12 group-hover:bg-nude-dark transition-all duration-500" />
          </Link>
        </div>

        {/* Categories Grid - Restored Old Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[800px] lg:h-[750px]">
          {categories.map((cat: any, index) => (
            <CategoryCard key={cat.catId} category={cat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}