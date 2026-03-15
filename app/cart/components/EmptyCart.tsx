"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-slate-400" />
        </div>

        <h1 className="text-3xl font-serif mb-3">Your cart is empty</h1>

        <p className="text-slate-600 mb-8">
          Looks like you haven't added anything to your cart yet. Explore our
          beautiful collection of handcrafted sarees.
        </p>

        <div className="space-y-3">
          <Link
            href="/shop/products"
            className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-neutral-800 transition w-full"
          >
            <ShoppingBag size={18} />
            Start Shopping
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 text-sm text-slate-600 hover:text-black transition"
          >
            <ArrowLeft size={16} />
            Return to Home
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-slate-500 mb-4">Popular Categories</p>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/shop/products?category=${category.toLowerCase()}`}
                className="px-4 py-2 bg-slate-100 rounded-full text-sm hover:bg-slate-200 transition"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const categories = [
  "Silk Sarees",
  "Cotton Sarees",
  "Bridal",
  "Daily Wear",
  "Designer",
];
