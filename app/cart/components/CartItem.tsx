"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2, Heart, Minus, Plus, AlertCircle, ShoppingBag } from "lucide-react";

import { CartItemResponse } from "@/app/types/cart";
import { useCart } from "@/app/contexts/CartContext";
import { formatPrice } from "@/app/lib/utils/format";

interface CartItemProps {
  item: CartItemResponse | any;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 10 || isUpdating) return;

    try {
      setIsUpdating(true);
      await updateQuantity(item.productId, newQuantity);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    try {
      setIsRemoving(true);
      await removeItem(item.productId);
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setIsRemoving(false);
      setShowRemoveConfirm(false);
    }
  };

  return (
    <div className="relative p-4 md:p-6 border-b last:border-b-0 hover:bg-slate-50/50 transition">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Product Info - Mobile & Desktop */}
        <div className="md:col-span-6 flex gap-4">
          {/* Product Image */}
          <Link href={`/shop/products/${item.productId}`} className="flex-shrink-0">
            <div className="relative w-20 h-24 md:w-24 md:h-32 bg-slate-100 rounded-lg overflow-hidden">
              {item.productImage ? (
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <ShoppingBag size={24} />
                </div>
              )}
            </div>
          </Link>

          {/* Product Details */}
          <div className="flex-1">
            <Link 
              href={`/shop/products/${item.productId}`}
              className="font-medium hover:text-amber-600 transition line-clamp-2"
            >
              {item.productName}
            </Link>
            <p className="text-xs text-slate-500 mt-1">Code: {item.productCode}</p>
            
            {/* Mobile Price & Quantity */}
            <div className="flex items-center justify-between mt-3 md:hidden">
              <div>
                <p className="text-xs text-slate-500">Price</p>
                <p className="font-semibold">{formatPrice(item.unitPrice)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Total</p>
                <p className="font-semibold text-amber-600">{formatPrice(item.totalPrice)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Price - Desktop */}
        <div className="hidden md:block md:col-span-2 text-center">
          <p className="text-sm text-slate-500">Price</p>
          <p className="font-medium">{formatPrice(item.unitPrice)}</p>
        </div>

        {/* Quantity Controls */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1 || isUpdating}
              className="p-1 border rounded-md hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Minus size={16} />
            </button>
            
            <div className="relative">
              <span className="w-10 text-center font-medium">{item.quantity}</span>
              {isUpdating && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-1 -right-2"
                >
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                </motion.div>
              )}
            </div>

            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= 10 || isUpdating}
              className="p-1 border rounded-md hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
            </button>
          </div>
          {item.quantity >= 10 && (
            <p className="text-xs text-amber-600 text-center mt-1">Max quantity reached</p>
          )}
        </div>

        {/* Total - Desktop */}
        <div className="hidden md:block md:col-span-2 text-right">
          <p className="font-semibold text-amber-600">{formatPrice(item.totalPrice)}</p>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 md:static md:col-span-1 flex gap-2">
          <button
            onClick={() => setShowRemoveConfirm(true)}
            disabled={isRemoving}
            className="p-2 text-slate-400 hover:text-red-500 transition disabled:opacity-50"
            title="Remove item"
          >
            <Trash2 size={18} />
          </button>
          <button
            className="p-2 text-slate-400 hover:text-pink-500 transition"
            title="Add to wishlist"
          >
            <Heart size={18} />
          </button>
        </div>
      </div>

      {/* Remove Confirmation Modal */}
      <AnimatePresence>
        {showRemoveConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center p-4 rounded-2xl"
          >
            <div className="text-center">
              <AlertCircle className="w-10 h-10 text-amber-600 mx-auto mb-3" />
              <p className="font-medium mb-3">Remove this item?</p>
              <div className="flex gap-3">
                <button
                  onClick={handleRemove}
                  disabled={isRemoving}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 disabled:opacity-50"
                >
                  {isRemoving ? "Removing..." : "Yes, Remove"}
                </button>
                <button
                  onClick={() => setShowRemoveConfirm(false)}
                  className="px-4 py-2 bg-slate-200 rounded-lg text-sm hover:bg-slate-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}