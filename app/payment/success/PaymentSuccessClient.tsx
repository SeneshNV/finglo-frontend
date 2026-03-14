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
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const checkAndCreateOrder = async () => {
      if (!orderId) {
        setError("No order ID provided");
        setVerifying(false);
        return;
      }

      let checkAttempts = 0;
      const maxAttempts = 3; // 30 seconds total (2s * 3)
      const pollInterval = 2000;

      const checkOrder = setInterval(async () => {
        checkAttempts++;
        setAttempts(checkAttempts);

        try {
          console.log(
            `Checking order ${orderId} (attempt ${checkAttempts}/${maxAttempts})...`,
          );

          // Try to get the order
          const response = await orderApi.getOrder(orderId);

          if (response?.responseData) {
            // Order found!
            console.log("Order found!", response.responseData);
            setOrder(response.responseData);
            setVerifying(false);

            // Clear pending data
            sessionStorage.removeItem(`pending_order_${orderId}`);
            clearInterval(checkOrder);
          }
        } catch (err: any) {
          const isNotFound =
            err.status === 404 ||
            (err.response?.status === 400 &&
              err.response?.data?.responseCode === "08");

          if (isNotFound) {
            console.log(
              `Order not found yet (attempt ${checkAttempts}/${maxAttempts})...`,
            );

            // If we've waited long enough and still no order, create it manually
            if (checkAttempts >= maxAttempts) {
              clearInterval(checkOrder);

              try {
                console.log("Max attempts reached, creating order manually...");

                // Get pending order data from sessionStorage
                const pendingData = sessionStorage.getItem(
                  `pending_order_${orderId}`,
                );

                if (pendingData) {
                  const orderData = JSON.parse(pendingData);

                  // Create the order
                  const createResponse = await orderApi.createOrder({
                    ...orderData,
                    paymentStatus: "COMPLETED",
                  });

                  if (createResponse?.responseData) {
                    console.log(
                      "Order created manually:",
                      createResponse.responseData,
                    );
                    setOrder(createResponse.responseData);
                    setVerifying(false);
                    sessionStorage.removeItem(`pending_order_${orderId}`);
                  } else {
                    setError(
                      "Order creation failed. Please contact support.",
                    );
                    setVerifying(false);
                  }
                } else {
                  setError(
                    "No pending order data found. Please contact support with your order ID.",
                  );
                  setVerifying(false);
                }
              } catch (createErr) {
                console.error("Manual order creation failed:", createErr);
                setError(
                  "Payment successful but order creation failed. Please contact support.",
                );
                setVerifying(false);
              }
            }
          } else {
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

    checkAndCreateOrder();
  }, [orderId]);

  // Rest of your component remains the same...
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
              Confirming your payment...
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Please wait while we create your order
            </p>
            <p className="text-xs text-slate-400 mt-4">Attempt {attempts}/3</p>
          </div>
        </div>
      </div>
    );
  }

  if (order) {
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
            A confirmation email will be sent to {order.customerEmail}
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
        <h1 className="text-2xl font-semibold mb-2">Order Processing</h1>
        <p className="text-slate-600 mb-2">
          {error || "We're processing your order."}
        </p>
        <p className="text-sm text-slate-400 mb-4">Order ID: {orderId}</p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-amber-800 font-medium mb-2">
            Your payment was successful!
          </p>
          <p className="text-xs text-amber-700">
            Please save your order ID and contact support if you don't receive a
            confirmation email soon.
          </p>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="block w-full bg-black text-white px-6 py-3 rounded-xl hover:bg-neutral-800"
          >
            Refresh
          </button>
          <Link
            href="/shop/products"
            className="block border border-black text-black px-6 py-3 rounded-xl hover:bg-slate-50"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
