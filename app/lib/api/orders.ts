import apiClient from "./client";
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
  paymentStatus?: "PENDING" | "COMPLETED" | "FAILED";
  tempOrderId?: string;
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

export interface TempOrderData {
  tempId: string;
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
}

// Helper to create API request wrapper
const createApiRequest = <T>(data: T) => ({
  requestData: data,
  timestamp: Date.now(),
  requestId: Math.random().toString(36).substring(7),
});

export const orderApi = {
  // Create order (only used as fallback)
  createOrder: async (
    orderData: OrderData,
  ): Promise<ApiResponse<OrderResponse>> => {
    try {
      const requestPayload = createApiRequest(orderData);
      const response = await apiClient.post<ApiResponse<OrderResponse>>(
        "/orders/public",
        requestPayload,
      );
      console.log("Order created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  // Store temporary order data
  storeTempOrderData: async (
    tempId: string,
    tempData: TempOrderData,
  ): Promise<ApiResponse<any>> => {
    try {
      const requestPayload = createApiRequest(tempData);
      const response = await apiClient.post<ApiResponse<any>>(
        `/orders/public/temp/${tempId}`,
        requestPayload,
      );
      console.log("Temp order data stored:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error storing temp order data:", error);
      throw error;
    }
  },

  // Get PayHere hash
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

  // Get order details
  getOrder: async (
    orderNumber: string,
  ): Promise<ApiResponse<OrderResponse>> => {
    try {
      const response = await apiClient.get<ApiResponse<OrderResponse>>(
        `/orders/public/${orderNumber}`,
      );
      return response.data;
    } catch (error: any) {
      // Handle 400 with "08" response code (not found)
      if (
        error.response?.status === 400 &&
        error.response?.data?.responseCode === "08"
      ) {
        const notFoundError = new Error("Order not found");
        (notFoundError as any).status = 404;
        (notFoundError as any).response = error.response;
        throw notFoundError;
      }
      if (error.response?.status === 404) {
        const notFoundError = new Error("Order not found");
        (notFoundError as any).status = 404;
        (notFoundError as any).response = error.response;
        throw notFoundError;
      }
      console.error("Error fetching order:", error);
      throw error;
    }
  },
};
