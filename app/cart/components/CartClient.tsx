"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowLeft, AlertCircle } from "lucide-react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";
import CartSkeleton from "./CartSkeleton";
// import CartProgress from "./CartProgress";
import CartRecommendations from "./CartRecommendations";
import { useCart } from "@/app/contexts/CartContext";

export default function CartClient() {
  const { cart, isLoading, error, refreshCart, itemCount, subtotal } =
    useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    refreshCart();
  }, []);

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-serif mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={refreshCart}
            className="bg-black text-white px-8 py-3 rounded-xl hover:bg-neutral-800 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div className="flex items-center gap-4">
            <Link
              href="/shop/products"
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-black transition"
            >
              <ArrowLeft size={16} />
              {/* Continue Shopping */}
            </Link>
            <h1 className="text-2xl md:text-3xl font-serif">Shopping Cart</h1>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ShoppingBag size={18} />
            <span>
              {itemCount} {itemCount === 1 ? "Item" : "Items"}
            </span>
          </div>
        </div>

        {/* Cart Progress */}
        {/* <CartProgress subtotal={subtotal} /> */}

        {/* Main Cart Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Cart Header - Desktop */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b bg-slate-50 text-sm font-medium text-slate-600">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Cart Items List */}
              <AnimatePresence mode="popLayout">
                {cart.items.map((item, index) => (
                  <motion.div
                    key={item.productId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CartItem item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Cart Recommendations */}
            <div className="mt-12">
              <CartRecommendations />
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary
                cart={cart}
                isCheckingOut={isCheckingOut}
                onCheckout={() => setIsCheckingOut(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
