"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { productApi } from "@/app/lib/api/products";
import ProductCard from "@/app/shop/products/components/ProductCard";
import { Product } from "@/app/types/product";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await productApi.getProducts({
          page: 0,
          size: 4,
          sort: "newest",
          inStock: true,
        });

        if (response.responseCode === "00") {
          setProducts(response.responseData.content);
        }
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-neutral-400 mb-3 block">
            Curated Collection
          </span>

          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-neutral-900 mb-4">
            Featured <span className="font-bold">Sarees</span>
          </h2>

          <div className="w-16 h-[1px] bg-neutral-900 mx-auto mb-6" />

          <p className="text-neutral-500 max-w-lg mx-auto text-xs md:text-base leading-relaxed px-4">
            Each piece tells a story of tradition, craftsmanship, and timeless
            beauty.
          </p>
        </motion.div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-16">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse space-y-4">
                  <div className="aspect-[3/4] bg-neutral-200 rounded-sm" />
                  <div className="h-4 bg-neutral-200 w-3/4" />
                  <div className="h-4 bg-neutral-200 w-1/2" />
                </div>
              ))
            : products.map((product, index) => (
                <motion.div
                  key={product.proId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <ProductCard product={product} priority={index < 2} />
                </motion.div>
              ))}
        </div>

        {/* VIEW ALL BUTTON */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 md:mt-12"
        >
          <Link
            href="/shop/products"
            className="group relative inline-flex items-center overflow-hidden border border-neutral-900 px-8 md:px-12 py-3 md:py-4 text-[10px] md:text-[11px] uppercase tracking-[0.2em]"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
              View All Collections
            </span>

            <span className="absolute inset-0 z-0 bg-neutral-900 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
