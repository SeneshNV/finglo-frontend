"use client";

import { useState, useEffect, useCallback } from "react";
import cartApi from "@/app/lib/api/cart"; // Changed to default import
import { Cart, CartResponse } from "@/app/types/cart";

interface UseCartReturn {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  itemCount: number;
  subtotal: number;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

export function useCart(): UseCartReturn {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const transformCartResponse = (response: CartResponse): Cart => {
    return {
      ...response,
      items: response.items.map((item) => ({
        ...item,
        totalPrice: item.unitPrice * item.quantity,
      })),
    };
  };

  const refreshCart = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await cartApi.getCart();

      if (response.responseCode === "00") {
        if (response.responseData && response.responseData.items) {
          const cartData = transformCartResponse(response.responseData);
          setCart(cartData);
        } else {
          setCart(null);
        }
      } else {
        if (response.responseMessage?.includes("not found")) {
          setCart(null);
        } else {
          setError(response.responseMessage || "Failed to load cart");
        }
      }
    } catch (err: any) {
      console.error("Cart refresh error:", err);
      // Don't set error for 404 - just empty cart
      if (err.response?.status === 404) {
        setCart(null);
      } else {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = async (productId: number, quantity: number) => {
  console.log("useCart.addToCart called with:", { productId, quantity });

  try {
    setError(null);
    console.log("Calling cartApi.addToCart...");
    const response = await cartApi.addToCart(productId, quantity);
    console.log("cartApi.addToCart response:", response);

    if (response.responseCode === "00") {
      console.log("Success response, refreshing cart...");
      await refreshCart();
      console.log("Cart refreshed");
    } else {
      console.log("Error response code:", response.responseCode);
      console.log("Error message:", response.responseMessage);
      setError(response.responseMessage || "Failed to add item");
      throw new Error(response.responseMessage);
    }
  } catch (err: any) {
    console.error("Error in addToCart:", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to add item";
    setError(errorMessage);
    throw new Error(errorMessage);
  }
};

  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      setError(null);
      const response = await cartApi.updateCartItem(productId, quantity);

      if (response.responseCode === "00") {
        await refreshCart();
      } else {
        setError(response.responseMessage || "Failed to update quantity");
        throw new Error(response.responseMessage);
      }
    } catch (err: any) {
      console.error("Update quantity error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update quantity";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const removeItem = async (productId: number) => {
    try {
      setError(null);
      const response = await cartApi.removeCartItem(productId);

      if (response.responseCode === "00") {
        await refreshCart();
      } else {
        setError(response.responseMessage || "Failed to remove item");
        throw new Error(response.responseMessage);
      }
    } catch (err: any) {
      console.error("Remove item error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to remove item";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const clearCart = async () => {
    try {
      setError(null);
      const response = await cartApi.clearCart();

      if (response.responseCode === "00") {
        setCart(null);
      } else {
        setError(response.responseMessage || "Failed to clear cart");
        throw new Error(response.responseMessage);
      }
    } catch (err: any) {
      console.error("Clear cart error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to clear cart";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const itemCount =
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const subtotal = cart?.subtotal || 0;

  return {
    cart,
    isLoading,
    error,
    itemCount,
    subtotal,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart,
  };
}
