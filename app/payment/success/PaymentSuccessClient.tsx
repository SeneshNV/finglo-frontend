"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { orderApi } from "@/app/lib/api/orders";

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (orderId) {
      orderApi
        .verifyPayment(orderId)
        .then(() => {
          setVerified(true);
        })
        .catch(console.error)
        .finally(() => setVerifying(false));
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
        {verifying ? (
          <div className="py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Verifying your payment...</p>
          </div>
        ) : verified ? (
          <>
            <CheckCircle size={48} className="text-emerald-600 mx-auto mb-4" />
            <h1 className="text-2xl font-semibold mb-2">Payment Successful!</h1>
            <p className="text-slate-600 mb-6">
              Thank you for your purchase. Order #{orderId} has been confirmed.
            </p>
            <Link
              href="/shop/products"
              className="inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-neutral-800"
            >
              Continue Shopping
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-2">
              Payment Verification Failed
            </h1>
            <p className="text-slate-600 mb-6">Please contact support.</p>
            <Link
              href="/shop/products"
              className="inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-neutral-800"
            >
              Back to Shop
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
