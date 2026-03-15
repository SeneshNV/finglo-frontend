import { formatPrice } from "@/app/lib/utils/format";
import { motion } from "framer-motion";

interface CartProgressProps {
  subtotal: number;
}

export default function CartProgress({ subtotal }: CartProgressProps) {
  const freeShippingThreshold = 25000;
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const remaining = freeShippingThreshold - subtotal;

  return (
    <div className="bg-white rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-2 text-sm">
        <span className="font-medium">Free Shipping</span>
        {remaining > 0 ? (
          <span className="text-amber-600">
            Add {formatPrice(remaining)} more to get free shipping
          </span>
        ) : (
          <span className="text-emerald-600">
            You qualify for free shipping!
          </span>
        )}
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className={`h-full rounded-full ${
            progress >= 100 ? "bg-emerald-500" : "bg-amber-500"
          }`}
        />
      </div>
    </div>
  );
}
