import apiClient from "./client";
import { Product } from "@/app/types/product";
import { ApiResponse } from "@/app/types/product";

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerCountry: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: "payhere" | "cod";
}

export interface OrderResponse {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerCountry: string;
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  items: OrderItemResponse[];
  createdAt: string;
}

export interface OrderItemResponse {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface PayHereHashRequest {
  orderId: string;
  amount: number;
}

export interface PayHereHashResponse {
  hash: string;
  orderId: string;
}

export interface PaymentVerifyResponse {
  orderId: string;
  paymentStatus: string;
  orderStatus: string;
  verified: boolean;
}

// Helper to create API request wrapper (matching backend ApiRequest structure)
const createApiRequest = <T>(data: T) => ({
  requestData: data,
  timestamp: Date.now(),
  requestId: Math.random().toString(36).substring(7),
});

export const orderApi = {
  // Create order via public endpoint (no auth required)
  createOrder: async (
    orderData: OrderData,
  ): Promise<ApiResponse<OrderResponse>> => {
    try {
      const requestPayload = createApiRequest(orderData);

      const response = await apiClient.post<ApiResponse<OrderResponse>>(
        "/orders/public", // Using public endpoint
        requestPayload,
      );

      console.log("Order created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  // Get PayHere hash via public endpoint
  getPayHereHash: async (
    orderId: string,
    amount: number,
  ): Promise<ApiResponse<PayHereHashResponse>> => {
    try {
      const requestPayload = createApiRequest<PayHereHashRequest>({
        orderId,
        amount,
      });

      const response = await apiClient.post<ApiResponse<PayHereHashResponse>>(
        "/orders/public/payhere-hash",
        requestPayload,
      );

      console.log("PayHere hash generated:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting PayHere hash:", error);
      throw error;
    }
  },

  // Verify payment via public endpoint
  verifyPayment: async (orderId: string): Promise<ApiResponse<boolean>> => {
    try {
      const response = await apiClient.get<ApiResponse<boolean>>(
        `/orders/public/verify/${orderId}`,
      );

      console.log("Payment verified:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error verifying payment:", error);
      throw error;
    }
  },

  // Get order details (might need auth later)
  getOrder: async (
    orderNumber: string,
  ): Promise<ApiResponse<OrderResponse>> => {
    try {
      const response = await apiClient.get<ApiResponse<OrderResponse>>(
        `/orders/${orderNumber}`,
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  },
};
