"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Truck, RotateCcw, Lock } from "lucide-react";

import { CartResponse } from "@/app/types/cart";
import { formatPrice } from "@/app/lib/utils/format";

interface CartSummaryProps {
  cart: CartResponse | any;
  isCheckingOut: boolean;
  onCheckout: () => void;
}

export default function CartSummary({
  cart,
  isCheckingOut,
  onCheckout,
}: CartSummaryProps) {
  const router = useRouter();
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // Calculate totals
  const subtotal = cart.subtotal;
  const shipping = subtotal >= 25000 ? 0 : 650;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    onCheckout();
    router.push("/checkout");
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim() || isApplyingPromo) return;

    setIsApplyingPromo(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsApplyingPromo(false);
    setPromoCode("");
    // Show success message
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Shipping</span>
          {shipping === 0 ? (
            <span className="text-emerald-600">Free</span>
          ) : (
            <span>{formatPrice(shipping)}</span>
          )}
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Tax (5%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        {subtotal >= 25000 && (
          <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 p-2 rounded-lg">
            <Truck size={14} />
            <span>Free shipping applied!</span>
          </div>
        )}
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-lg text-amber-600">{formatPrice(total)}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Inclusive of all taxes</p>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Promo code"
            className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
            disabled={isApplyingPromo}
          />
          <button
            onClick={handleApplyPromo}
            disabled={!promoCode.trim() || isApplyingPromo}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isApplyingPromo ? "..." : "Apply"}
          </button>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={isCheckingOut}
        className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-neutral-800 transition disabled:opacity-50 disabled:cursor-not-allowed mb-4"
      >
        {isCheckingOut ? "PROCESSING..." : "PROCEED TO CHECKOUT"}
      </button>

      {/* Secure Checkout Badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-6">
        <Lock size={14} />
        <span>Secure SSL Encrypted Checkout</span>
      </div>

      {/* Features */}
      <div className="space-y-3 pt-4 border-t">
        <div className="flex items-center gap-3 text-sm">
          <Shield size={18} className="text-slate-400" />
          <div>
            <p className="font-medium">Secure Payment</p>
            <p className="text-xs text-slate-500">PCI-DSS compliant</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Truck size={18} className="text-slate-400" />
          <div>
            <p className="font-medium">Free Shipping</p>
            <p className="text-xs text-slate-500">On orders above LKR 25,000</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <RotateCcw size={18} className="text-slate-400" />
          <div>
            <p className="font-medium">14-Day Returns</p>
            <p className="text-xs text-slate-500">Easy return policy</p>
          </div>
        </div>
      </div>

      {/* Estimated Delivery */}
      <div className="mt-4 pt-4 border-t text-xs text-slate-500">
        <p>Estimated delivery: 3-5 business days</p>
      </div>
    </div>
  );
}
