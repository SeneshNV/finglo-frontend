"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";

interface Product {
  proId: number;
  proName: string;
  proPrice: number;
  images: { imageUrl: string; isPrimary: boolean }[];
  categories: { catName: string }[];
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.responseData.content);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-10">
          {/* Loading Skeleton matches 2 columns on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-neutral-100 mb-4" />
                <div className="h-3 bg-neutral-100 rounded w-3/4 mb-2" />
                <div className="h-3 bg-neutral-100 rounded w-1/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-10">
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

        {/* RESPONSIVE GRID: 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-16">
          {products.map((product, index) => (
            <motion.div
              key={product.proId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 md:mt-8"
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

function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);

  const primaryImage = product.images.find((img) => img.isPrimary)?.imageUrl;
  const secondaryImage =
    product.images.find((img) => !img.isPrimary)?.imageUrl || primaryImage;

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-50">
        <Image
          src={primaryImage!}
          alt={product.proName}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={`object-cover transition-opacity duration-700 ease-in-out ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />
        <Image
          src={secondaryImage!}
          alt={`${product.proName} alternate`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={`object-cover transition-opacity duration-700 ease-in-out ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* QUICK ADD OVERLAY - Hidden on mobile to keep clean, visible on desktop hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              className="absolute bottom-3 left-3 right-3 z-20 hidden md:block"
            >
              <button className="flex w-full items-center justify-center gap-2 bg-white/90 backdrop-blur-md py-2.5 text-[9px] uppercase tracking-widest text-neutral-900 transition-colors hover:bg-black hover:text-white">
                <Plus className="h-3 w-3" />
                Add to Bag
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex flex-col items-center text-center px-1">
        <p className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-1">
          {product.categories[0]?.catName}
        </p>
        <h3 className="text-xs md:text-sm font-medium text-neutral-800 tracking-wide mb-1 line-clamp-1">
          {product.proName}
        </h3>
        <p className="text-[10px] md:text-xs font-light text-neutral-600">
          Rs. {product.proPrice.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
