"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

import { productApi } from "@/app/lib/api/products";
import { Product } from "@/app/types/product";
import { formatPrice } from "@/app/lib/utils/format";
import { useCart } from "@/app/hooks/useCart";

export default function CartRecommendations() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      setIsLoading(true);
      const response = await productApi.getProducts({
        page: 0,
        size: 4,
        sort: "newest",
      });
      setProducts(response.responseData.content);
    } catch (error) {
      console.error("Failed to load recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAdd = async (productId: number) => {
    try {
      await addToCart(productId, 1);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible pb-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="animate-pulse min-w-[160px] md:min-w-0"
          >
            <div className="bg-slate-200 aspect-[3/4] rounded-lg mb-2" />
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-slate-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">You May Also Like</h3>

      <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible pb-2">
        {products.map((product, index) => (
          <motion.div
            key={product.proId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative min-w-[160px] md:min-w-0"
          >
            <Link href={`/shop/products/${product.proId}`}>
              <div className="relative aspect-[3/4] bg-slate-100 rounded-lg overflow-hidden mb-2">
                {product.images?.[0] && (
                  <Image
                    src={product.images[0].imageUrl}
                    alt={product.proName}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                )}
              </div>

              <h4 className="font-medium text-sm line-clamp-2">
                {product.proName}
              </h4>

              <p className="text-amber-600 font-semibold text-sm mt-1">
                {formatPrice(product.proPrice)}
              </p>
            </Link>

            <button
              onClick={() => handleQuickAdd(product.proId)}
              className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-black hover:text-white"
            >
              <Plus size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}