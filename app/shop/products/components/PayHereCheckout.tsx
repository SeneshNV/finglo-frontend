"use client";

import { useState } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";
import { Product } from "@/app/types/product";
import { orderApi, TempOrderData } from "@/app/lib/api/orders";

interface PayHereCheckoutProps {
  product: Product;
  quantity: number;
  className?: string;
}

export default function PayHereCheckout({
  product,
  quantity,
  className = "",
}: PayHereCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Sri Lanka",
  });

  const totalAmount = product.proPrice * quantity;
  const shippingCost = 350;
  const grandTotal = totalAmount + shippingCost;

  // Generate a temporary order ID for PayHere
  const generateTempOrderId = () => {
    return `TEMP_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  };

  // Load PayHere script
  const loadPayHereScript = () => {
    return new Promise((resolve, reject) => {
      if (document.getElementById("payhere-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "payhere-script";
      script.src = "https://www.payhere.lk/lib/payhere.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Failed to load PayHere script"));
      document.body.appendChild(script);
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const required = ["firstName", "lastName", "email", "phone", "address", "city"];
    for (const field of required) {
      if (!formData[field as keyof typeof formData]) {
        alert(`Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`);
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return false;
    }

    const phoneRegex = /^(?:\+94|0)[0-9]{9}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      alert("Please enter a valid Sri Lankan phone number");
      return false;
    }

    return true;
  };

  const processPayHerePayment = async () => {
    if (!validateForm()) return;

    try {
      setIsProcessing(true);

      // Load PayHere script
      await loadPayHereScript();

      // Generate temporary order ID
      const tempOrderId = generateTempOrderId();

      // Prepare customer data object
      const customerData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        country: formData.country,
      };

      // Prepare items data
      const itemsData = [{
        productId: product.proId,
        productName: product.proName,
        quantity: quantity,
        unitPrice: product.proPrice,
        totalPrice: totalAmount,
      }];

      // Prepare summary data
      const summaryData = {
        subtotal: totalAmount,
        shipping: shippingCost,
        total: grandTotal,
      };

      // Prepare temporary order data for backend
      const tempOrderData: TempOrderData = {
        tempId: tempOrderId,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        customerCity: formData.city,
        customerCountry: formData.country,
        items: itemsData,
        subtotal: totalAmount,
        shipping: shippingCost,
        total: grandTotal,
      };

      // Store ALL data in sessionStorage as backup
      sessionStorage.setItem(`temp_order_${tempOrderId}`, JSON.stringify({
        customer: customerData,
        items: itemsData,
        summary: summaryData,
        timestamp: Date.now(),
      }));

      // Store temporary order data in backend
      console.log("Storing temp order data:", tempOrderId);
      await orderApi.storeTempOrderData(tempOrderId, tempOrderData);

      // Get hash from backend
      console.log("Getting PayHere hash for temp order:", tempOrderId);
      const hashResponse = await orderApi.getPayHereHash(tempOrderId, grandTotal);
      
      const hash = hashResponse.responseData?.hash;
      if (!hash) {
        throw new Error("Failed to get payment hash");
      }

      // Configure PayHere payment
      const payment = {
        sandbox: true,
        merchant_id: process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID || "1223956",
        return_url: `${window.location.origin}/payment/success?order_id=${tempOrderId}`,
        cancel_url: `${window.location.origin}/payment/cancel?order_id=${tempOrderId}`,
        notify_url: `${process.env.NEXT_PUBLIC_API_URL}/orders/payhere-notify`,
        order_id: tempOrderId,
        items: `${product.proName} x ${quantity}`,
        amount: grandTotal.toFixed(2),
        currency: "LKR",
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        hash: hash,
      };

      console.log("Starting PayHere payment with temp ID:", tempOrderId);

      // Initialize PayHere checkout
      if (window.payhere) {
        window.payhere.onCompleted = function onCompleted(orderId) {
          console.log("Payment completed for temp order:", orderId);
          // Redirect to success page - order will be created by webhook
          window.location.href = `${window.location.origin}/payment/success?order_id=${orderId}`;
        };

        window.payhere.onDismissed = function onDismissed() {
          console.log("Payment dismissed");
          // Clear temporary data
          sessionStorage.removeItem(`temp_order_${tempOrderId}`);
          setIsProcessing(false);
          setShowCheckoutForm(false);
        };

        window.payhere.onError = function onError(error) {
          console.log("Payment error:", error);
          alert("Payment failed. Please try again.");
          setIsProcessing(false);
        };

        window.payhere.startPayment(payment);
        setShowCheckoutForm(false);
      } else {
        throw new Error("PayHere script not loaded");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      alert("Failed to process payment. Please try again.");
      setIsProcessing(false);
    }
  };

  // Form JSX remains the same...
  if (showCheckoutForm) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Checkout Details</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-500">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="text-xs text-slate-500">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                  required
                  placeholder="0712345678"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Sri Lankan mobile number
                </p>
              </div>

              <div>
                <label className="text-xs text-slate-500">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-500">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500">Country *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                  >
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-2">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">
                      {product.proName} x {quantity}
                    </span>
                    <span>LKR {totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Shipping</span>
                    <span>LKR {shippingCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Total</span>
                    <span>LKR {grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCheckoutForm(false)}
                className="flex-1 border py-3 rounded-xl hover:bg-slate-50 transition-colors"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={processPayHerePayment}
                disabled={isProcessing}
                className="flex-1 bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Pay Now"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowCheckoutForm(true)}
      disabled={isProcessing}
      className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 md:h-14 rounded-xl font-semibold text-xs md:text-sm tracking-[0.15em] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 ${className}`}
    >
      <ShieldCheck size={16} />
      {isProcessing ? "PROCESSING..." : "SECURE CHECKOUT"}
    </button>
  );
}

declare global {
  interface Window {
    payhere: {
      startPayment: (payment: any) => void;
      onCompleted: (orderId: string) => void;
      onDismissed: () => void;
      onError: (error: any) => void;
    };
  }
}