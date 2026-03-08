"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/app/types/product";
import { Heart, ShoppingBag, ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({
  product,
  priority = false,
}: ProductCardProps) {
  const router = useRouter();

  const primaryImage =
    product.images?.find((img) => img.isPrimary) || product.images?.[0];
  const secondaryImage = product.images?.find(
    (img) => !img.isPrimary && img.imageUrl !== primaryImage?.imageUrl,
  );

  const isOutOfStock = product.availableStock === 0;
  const categories =
    product.categories?.map((c) => c.catName).join(", ") || "Collection";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-white overflow-hidden"
    >
      {/* IMAGE SECTION */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-stone-50">
        <Link
          href={`/shop/products/${product.proId}`}
          className="block h-full w-full cursor-zoom-in"
        >
          {primaryImage && (
            <Image
              src={primaryImage.imageUrl}
              alt={product.proName}
              fill
              className={`object-cover transition-transform duration-1000 ease-out group-hover:scale-110 ${
                secondaryImage ? "group-hover:opacity-0" : ""
              }`}
              priority={priority}
            />
          )}
          {secondaryImage && (
            <Image
              src={secondaryImage.imageUrl}
              alt={product.proName}
              fill
              className="object-cover opacity-0 transition-all duration-1000 ease-out group-hover:scale-110 group-hover:opacity-100"
            />
          )}
        </Link>

        {/* TOP OVERLAYS */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <div className="flex flex-col gap-2">
            {isNew(product.createdAt) && !isOutOfStock && (
              <span className="bg-stone-900 text-white text-[8px] tracking-[0.2em] uppercase px-2 py-1">
                New
              </span>
            )}
            {isOutOfStock && (
              <span className="bg-white/90 backdrop-blur-md text-stone-500 text-[8px] tracking-[0.2em] uppercase px-2 py-1 border border-stone-200">
                Sold Out
              </span>
            )}
          </div>
          <button className="p-2 rounded-full bg-white/60 backdrop-blur-md text-stone-800 hover:bg-stone-900 hover:text-white transition-all duration-300">
            <Heart className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* LUXURY ACTION BAR - Slide up on hover */}
        {!isOutOfStock && (
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1] z-20 hidden md:block">
            <button
              onClick={() => {
                /* Add to Cart Logic */
              }}
              className="w-full h-12 bg-white/90 backdrop-blur-xl border border-white/40 text-stone-900 rounded-none shadow-2xl flex items-center justify-center gap-3 hover:bg-stone-900 hover:text-white transition-colors duration-300"
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold">
                Add to Bag
              </span>
            </button>
          </div>
        )}

        {/* MOBILE PRODUCTIVE BUTTON - Always visible on mobile */}
        {!isOutOfStock && (
          <div className="absolute bottom-3 right-3 md:hidden z-20">
            <button className="h-10 w-10 rounded-full bg-stone-900 text-white shadow-lg flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* INFO SECTION */}
      <div className="pt-5 pb-2 flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold leading-none">
              {categories}
            </p>
            <Link
              href={`/shop/products/${product.proId}`}
              className="group/title flex items-center gap-1"
            >
              <h3 className="text-base font-serif italic text-stone-800 group-hover/title:text-stone-500 transition-colors">
                {product.proName}
              </h3>
              <ArrowUpRight className="w-3 h-3 text-stone-300 opacity-0 group-hover/title:opacity-100 transition-all" />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-1">
          <span className="text-sm font-semibold tracking-tight text-stone-900">
            LKR {product.proPrice.toLocaleString()}.00
          </span>
          {product.availableStock < 5 && product.availableStock > 0 && (
            <span className="text-[9px] text-red-500 font-medium uppercase tracking-tighter">
              Only {product.availableStock} Left
            </span>
          )}
        </div>
        {/* SUBTLE BORDER ANIMATION (The "Best" Part) */}
        <div className="h-[1px] w-0 bg-stone-900 group-hover:w-full transition-all duration-700 mt-2 opacity-20" />
      </div>
    </motion.div>
  );
}

// Helper function
function isNew(date?: string) {
  if (!date) return false;
  const createdDate = new Date(date);
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return createdDate > sevenDaysAgo;
}
