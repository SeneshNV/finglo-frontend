import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
        <XCircle size={48} className="text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Payment Cancelled</h1>
        <p className="text-slate-600 mb-6">
          Your payment was cancelled. No charges were made.
        </p>
        <Link
          href="/shop/products"
          className="inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-neutral-800"
        >
          Back to Shop
        </Link>
      </div>
    </div>
  );
}
