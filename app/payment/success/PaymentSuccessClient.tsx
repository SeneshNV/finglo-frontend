"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { orderApi, OrderResponse } from "@/app/lib/api/orders";

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const checkOrderStatus = async () => {
      if (!orderId) {
        setError("No order ID provided");
        setVerifying(false);
        return;
      }

      // Check if we have temp data (for debugging)
      const tempData = sessionStorage.getItem(`temp_order_${orderId}`);
      console.log("Temp data exists:", !!tempData);

      // Start checking for order
      let checkAttempts = 0;
      const maxAttempts = 5; // 30 seconds total (2s * 5)
      const pollInterval = 2000;

      const checkOrder = setInterval(async () => {
        checkAttempts++;
        setAttempts(checkAttempts);

        try {
          console.log(
            `Checking for order ${orderId} (attempt ${checkAttempts}/${maxAttempts})...`,
          );

          // Try to get the order
          const response = await orderApi.getOrder(orderId);

          if (response?.responseData) {
            // Order found! Webhook created it
            console.log("Order found!", response.responseData);
            setVerified(true);
            setOrder(response.responseData);
            setVerifying(false);

            // Clear temporary data
            sessionStorage.removeItem(`temp_order_${orderId}`);
            clearInterval(checkOrder);
          }
        } catch (err: any) {
          // Check if it's a 404/not found error
          const isNotFound =
            err.status === 404 ||
            (err.response?.status === 400 &&
              err.response?.data?.responseCode === "08");

          if (isNotFound) {
            console.log(
              `Order not found yet (attempt ${checkAttempts}/${maxAttempts})...`,
            );

            if (checkAttempts >= maxAttempts) {
              clearInterval(checkOrder);

              // Try one last time with the fallback order creation
              try {
                console.log(
                  "Max attempts reached, trying fallback order creation...",
                );
                const created = await createFallbackOrder(orderId);

                if (created) {
                  setVerified(true);
                  setOrder(created);
                  setVerifying(false);
                } else {
                  setError(
                    "Your payment was successful but we're having trouble creating your order. Please contact support with your reference number.",
                  );
                  setVerifying(false);
                }
              } catch (fallbackErr) {
                setError(
                  "Your payment was successful but we're having trouble creating your order. Please contact support with your reference number.",
                );
                setVerifying(false);
              }
            }
          } else {
            // Some other error
            console.error("Error checking order:", err);
            if (checkAttempts >= maxAttempts) {
              clearInterval(checkOrder);
              setError("Error verifying order. Please contact support.");
              setVerifying(false);
            }
          }
        }
      }, pollInterval);

      return () => clearInterval(checkOrder);
    };

    const createFallbackOrder = async (
      tempOrderId: string,
    ): Promise<OrderResponse | null> => {
      try {
        // Try to get temp data from sessionStorage
        const tempDataStr = sessionStorage.getItem(`temp_order_${tempOrderId}`);

        if (!tempDataStr) {
          console.log("No temp data found for fallback order");
          return null;
        }

        const tempData = JSON.parse(tempDataStr);

        // Prepare order data
        const orderData = {
          customerName: `${tempData.customer.firstName} ${tempData.customer.lastName}`,
          customerEmail: tempData.customer.email,
          customerPhone: tempData.customer.phone,
          customerAddress: tempData.customer.address,
          customerCity: tempData.customer.city,
          customerCountry: tempData.customer.country,
          items: tempData.items,
          subtotal: tempData.summary.subtotal,
          shipping: tempData.summary.shipping,
          total: tempData.summary.total,
          paymentMethod: "payhere",
          paymentStatus: "COMPLETED",
          tempOrderId: tempOrderId,
        };

        console.log("Creating fallback order with data:", orderData);

        const response = await orderApi.createOrder(orderData as any);

        if (response?.responseData) {
          console.log(
            "Fallback order created successfully:",
            response.responseData,
          );
          sessionStorage.removeItem(`temp_order_${tempOrderId}`);
          return response.responseData;
        }

        return null;
      } catch (err) {
        console.error("Fallback order creation failed:", err);
        return null;
      }
    };

    checkOrderStatus();
  }, [orderId]);

  if (verifying) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="py-8">
            <Loader2
              size={48}
              className="animate-spin text-emerald-600 mx-auto mb-4"
            />
            <p className="text-lg font-medium text-slate-900">
              Processing your order...
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Please wait while we confirm your payment
            </p>
            <p className="text-xs text-slate-400 mt-4">Attempt {attempts}/5</p>
          </div>
        </div>
      </div>
    );
  }

  if (verified && order) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <CheckCircle size={48} className="text-emerald-600 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Payment Successful!</h1>
          <p className="text-slate-600 mb-2">Thank you for your purchase.</p>
          <p className="text-sm text-slate-500 mb-4">
            Order #{order.orderNumber} has been confirmed.
          </p>
          <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left text-sm">
            <p className="font-medium mb-2">Order Details:</p>
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-slate-600 mb-1"
              >
                <span>
                  {item.productName} x {item.quantity}
                </span>
                <span>LKR {item.totalPrice.toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t mt-2 pt-2 flex justify-between font-medium">
              <span>Total</span>
              <span>LKR {order.total.toLocaleString()}</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mb-6">
            You will receive a confirmation email at {order.customerEmail}
          </p>
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
        <h1 className="text-2xl font-semibold mb-2">Order Processing Failed</h1>
        <p className="text-slate-600 mb-2">
          {error || "We couldn't process your order."}
        </p>
        <p className="text-sm text-slate-400 mb-4">Reference: {orderId}</p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-amber-800 font-medium mb-2">
            Your payment was successful, but we're having trouble creating your
            order.
          </p>
          <p className="text-xs text-amber-700">
            Please save your reference number and contact our support team.
            We'll ensure your order is processed.
          </p>
        </div>
        <div className="space-y-3">
          <Link
            href="/shop/products"
            className="block bg-black text-white px-6 py-3 rounded-xl hover:bg-neutral-800"
          >
            Back to Shop
          </Link>
          <Link
            href="/contact"
            className="block border border-black text-black px-6 py-3 rounded-xl hover:bg-slate-50"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
