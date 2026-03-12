"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { orderApi, OrderData } from "@/app/lib/api/orders";

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processOrder = async () => {
      if (!orderId) {
        setError("No order ID provided");
        setVerifying(false);
        return;
      }

      try {
        // STEP 1: Try to create the order immediately from session data
        console.log("Attempting to create order immediately for:", orderId);
        const orderCreated = await createOrderFromSession(orderId);
        
        if (orderCreated) {
          // Order created successfully - we're done!
          console.log("Order created successfully on first attempt");
          return;
        }

        // STEP 2: If creation failed, maybe webhook is handling it?
        // Start polling to check if order exists (webhook might create it)
        console.log("Order creation failed, starting polling for webhook-created order");
        let attempts = 0;
        const maxAttempts = 10;
        const pollInterval = 2000;

        const checkOrder = setInterval(async () => {
          try {
            attempts++;
            console.log(`Checking for order ${orderId} (attempt ${attempts}/${maxAttempts})...`);

            const orderResponse = await orderApi.getOrder(orderId);

            if (orderResponse?.responseData) {
              // Order found! Webhook created it
              console.log("Order found (created by webhook):", orderResponse.responseData);
              setVerified(true);
              setOrderNumber(orderResponse.responseData.orderNumber);
              setVerifying(false);

              // Clear temporary data
              sessionStorage.removeItem(`customer_${orderId}`);
              sessionStorage.removeItem(`items_${orderId}`);
              sessionStorage.removeItem(`summary_${orderId}`);

              clearInterval(checkOrder);
            }
          } catch (e: any) {
            if (e.status === 404 || e.response?.status === 404) {
              console.log(`Order still not found (attempt ${attempts}/${maxAttempts})...`);

              if (attempts >= maxAttempts) {
                clearInterval(checkOrder);
                setError(
                  "We're having trouble processing your order. Please contact support with your reference number."
                );
                setVerifying(false);
              }
            } else {
              console.error("Error checking order:", e);
              if (attempts >= maxAttempts) {
                clearInterval(checkOrder);
                setError("Error verifying order. Please contact support.");
                setVerifying(false);
              }
            }
          }
        }, pollInterval);

        return () => clearInterval(checkOrder);
      } catch (error) {
        console.error("Order processing failed:", error);
        setError("Failed to process your order. Please contact support.");
        setVerifying(false);
      }
    };

    const createOrderFromSession = async (tempOrderId: string): Promise<boolean> => {
      try {
        console.log("Creating order from session data for:", tempOrderId);
        
        // Retrieve data from sessionStorage
        const customerDataStr = sessionStorage.getItem(`customer_${tempOrderId}`);
        const itemsDataStr = sessionStorage.getItem(`items_${tempOrderId}`);
        const summaryDataStr = sessionStorage.getItem(`summary_${tempOrderId}`);

        if (!customerDataStr || !itemsDataStr || !summaryDataStr) {
          console.log("No session data found - webhook might handle it");
          return false;
        }

        const customerData = JSON.parse(customerDataStr);
        const itemsData = JSON.parse(itemsDataStr);
        const summaryData = JSON.parse(summaryDataStr);

        // Prepare order data
        const orderData: OrderData = {
          customerName: `${customerData.firstName} ${customerData.lastName}`,
          customerEmail: customerData.email,
          customerPhone: customerData.phone,
          customerAddress: customerData.address,
          customerCity: customerData.city,
          customerCountry: customerData.country,
          items: itemsData.map((item: any) => ({
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          })),
          subtotal: summaryData.subtotal,
          shipping: summaryData.shipping,
          total: summaryData.total,
          paymentMethod: "payhere",
        };

        console.log("Creating order with data:", orderData);

        // Create the order
        const orderResponse = await orderApi.createOrder(orderData);

        if (orderResponse?.responseData) {
          console.log("Order created successfully:", orderResponse.responseData);
          setVerified(true);
          setOrderNumber(orderResponse.responseData.orderNumber);
          setVerifying(false);

          // Clear session data
          sessionStorage.removeItem(`customer_${tempOrderId}`);
          sessionStorage.removeItem(`items_${tempOrderId}`);
          sessionStorage.removeItem(`summary_${tempOrderId}`);
          
          return true;
        }
        
        return false;
      } catch (err) {
        console.error("Failed to create order from session:", err);
        return false;
      }
    };

    processOrder();
  }, [orderId]);

  if (verifying) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Processing your order...</p>
            <p className="text-sm text-slate-400 mt-2">
              Please wait while we confirm your payment
            </p>
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
          <p className="text-slate-600 mb-2">Thank you for your purchase.</p>
          {orderNumber && (
            <>
              <p className="text-sm text-slate-500 mb-4">
                Order #{orderNumber} has been confirmed.
              </p>
              <p className="text-xs text-slate-400 mb-6">
                You will receive a confirmation email shortly.
              </p>
            </>
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
        <p className="text-sm text-slate-400 mb-4">Reference: {orderId}</p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-amber-800 font-medium mb-2">
            Your payment was successful, but we're having trouble creating your order.
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