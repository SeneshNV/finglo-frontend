"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { orderApi } from "@/app/lib/api/orders";

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const tempOrderId = searchParams.get("order_id");
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createOrderAfterPayment = async () => {
      if (!tempOrderId) {
        setError("No order ID provided");
        setVerifying(false);
        return;
      }

      try {
        // First, check if order already exists
        try {
          const existingOrder = await orderApi.getOrder(tempOrderId);
          if (existingOrder.responseData) {
            setVerified(true);
            setOrderNumber(existingOrder.responseData.orderNumber);
            setVerifying(false);
            return;
          }
        } catch (e) {
          // Order doesn't exist, continue to create it
          console.log("Order doesn't exist yet, creating...");
        }

        // Retrieve stored customer data
        const storedData = sessionStorage.getItem(`payment_${tempOrderId}`);
        if (!storedData) {
          throw new Error("No payment data found");
        }

        const paymentData = JSON.parse(storedData);

        // Create the order
        const orderData = {
          customerName: `${paymentData.customer.firstName} ${paymentData.customer.lastName}`,
          customerEmail: paymentData.customer.email,
          customerPhone: paymentData.customer.phone,
          customerAddress: paymentData.customer.address,
          customerCity: paymentData.customer.city,
          customerCountry: paymentData.customer.country,
          items: paymentData.items,
          subtotal: paymentData.totalAmount - 350, // Subtract shipping
          shipping: 350,
          total: paymentData.totalAmount,
          paymentMethod: "payhere",
          paymentStatus: "COMPLETED",
          orderStatus: "CONFIRMED",
          transactionId: tempOrderId
        };

        console.log("Creating order after payment:", orderData);
        const orderResponse = await orderApi.createOrder(orderData);
        
        if (orderResponse.responseData) {
          setVerified(true);
          setOrderNumber(orderResponse.responseData.orderNumber);
          
          // Clear stored data
          sessionStorage.removeItem(`payment_${tempOrderId}`);
        } else {
          throw new Error("Failed to create order");
        }
      } catch (error) {
        console.error("Failed to create order:", error);
        setVerified(false);
        setError(error instanceof Error ? error.message : "Failed to process order");
      } finally {
        setVerifying(false);
      }
    };

    createOrderAfterPayment();
  }, [tempOrderId]);

  // Rest of the component remains the same...
  if (verifying) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Processing your order...</p>
          </div>
        </div>
      </div>
    );
  }

  if (verified) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <CheckCircle size={48} className="text-emerald-600 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Payment Successful!</h1>
          <p className="text-slate-600 mb-2">
            Thank you for your purchase.
          </p>
          {orderNumber && (
            <p className="text-sm text-slate-500 mb-6">
              Order #{orderNumber} has been confirmed.
              You will receive a confirmation email shortly.
            </p>
          )}
          <Link
            href="/shop/products"
            className="inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-neutral-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
        <XCircle size={48} className="text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold mb-2">
          Order Processing Failed
        </h1>
        <p className="text-slate-600 mb-2">
          {error || "We couldn't process your order."}
        </p>
        <p className="text-sm text-slate-400 mb-6">
          Reference: {tempOrderId}
        </p>
        <p className="text-sm text-slate-500 mb-6">
          Don't worry, your payment was successful. Please contact support with the reference number.
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