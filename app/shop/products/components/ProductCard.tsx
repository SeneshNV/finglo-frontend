"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/app/types/product";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({
  product,
  priority = false,
}: ProductCardProps) {
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
      className="group flex flex-col bg-white overflow-hidden transition hover:-translate-y-[2px]"
    >
      {/* IMAGE */}
      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
        <Link href={`/shop/products/${product.proId}`}>
          {primaryImage && (
            <Image
              src={primaryImage.imageUrl}
              alt={product.proName}
              fill
              priority={priority}
              className={`object-cover transition duration-700 group-hover:scale-105 ${
                secondaryImage ? "group-hover:opacity-0" : ""
              }`}
            />
          )}

          {secondaryImage && (
            <Image
              src={secondaryImage.imageUrl}
              alt={product.proName}
              fill
              className="object-cover opacity-0 transition duration-700 group-hover:opacity-100 group-hover:scale-105"
            />
          )}
        </Link>

        {/* BADGES */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {isNew(product.createdAt) && !isOutOfStock && (
            <span className="bg-black text-white text-[10px] px-2 py-[2px] uppercase tracking-wide">
              New
            </span>
          )}

          {isOutOfStock && (
            <span className="bg-white text-stone-500 text-[10px] px-2 py-[2px] border">
              Sold Out
            </span>
          )}
        </div>

        {/* DESKTOP ADD TO CART */}
        {!isOutOfStock && (
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition duration-300 hidden md:block">
            <button className="w-full bg-black text-white py-2 flex items-center justify-center gap-2 text-[11px] uppercase tracking-wider hover:bg-stone-800 transition">
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        )}

        {/* MOBILE ADD BUTTON */}
        {!isOutOfStock && (
          <button className="absolute bottom-3 right-3 md:hidden bg-black text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md active:scale-95 transition">
            <ShoppingBag className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* PRODUCT INFO */}
      <div className="pt-3 pb-2 flex flex-col gap-[2px]">
        <p className="text-[10px] uppercase tracking-wide text-stone-400 line-clamp-1">
          {categories}
        </p>

        <Link href={`/shop/products/${product.proId}`}>
          <h3 className="text-sm font-medium text-stone-800 hover:text-black transition line-clamp-1">
            {product.proName}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-[2px]">
          <span className="text-sm font-semibold text-black">
            LKR {product.proPrice.toLocaleString()}
          </span>

          {product.availableStock < 5 && product.availableStock > 0 && (
            <span className="text-[10px] text-red-500">
              Only {product.availableStock}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function isNew(date?: string) {
  if (!date) return false;

  const createdDate = new Date(date);
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return createdDate > sevenDaysAgo;
}
