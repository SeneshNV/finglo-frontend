"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/app/types/product";
import { FileHeart, Heart, ShoppingBag } from "lucide-react";

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
  const isOutOfStock = product.availableStock === 0;
  const categories =
    product.categories?.map((c) => c.catName).join(", ") || "Saree";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      {/* Image Container */}
      <Link
        href={`/shop/products/${product.proId}`}
        className="block relative aspect-[3/4] overflow-hidden bg-neutral-100"
      >
        {primaryImage ? (
          <Image
            src={primaryImage.imageUrl}
            alt={product.proName}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-200">
            <span className="text-neutral-400">No image</span>
          </div>
        )}

        {/* Hover Actions - Only show if in stock */}
        {!isOutOfStock && (
          <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <div className="flex divide-x divide-white/20">
              {/* ✅ Changed from Link to button to avoid nested <a> tags */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/shop/products/${product.proId}`);
                }}
                className="flex-1 bg-primary-600/90 backdrop-blur-sm text-white py-3 text-sm font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                <FileHeart className="w-4 h-4" />
                View
              </button>
              <button
                onClick={(e) => e.preventDefault()}
                className="flex-1 bg-primary-600/90 backdrop-blur-sm text-white py-3 text-sm font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="w-4 h-4 text-neutral-700" />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isOutOfStock && (
            <span className="bg-red-500 text-white text-xs px-2 py-1">
              Out of Stock
            </span>
          )}
          {new Date(product.createdAt) >
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
            <span className="bg-gold-500 text-white text-xs px-2 py-1">
              New
            </span>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-4">
        <Link href={`/shop/products/${product.proId}`}>
          <h3 className="font-display text-lg text-primary-900 hover:text-primary-700 transition-colors">
            {product.proName}
          </h3>
        </Link>
        <p className="text-sm text-neutral-600 mb-2 line-clamp-1">
          {categories}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xl text-primary-800">
            LKR{product.proPrice.toLocaleString()}
          </span>
          {product.proColor && (
            <span className="text-xs text-neutral-500">
              • {product.proColor}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
