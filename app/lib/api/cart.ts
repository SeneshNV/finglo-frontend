import apiClient from "./client";
import {
  ApiResponse,
  CartResponse,
  AddToCartRequest,
  UpdateCartItemRequest,
} from "@/app/types/cart";

// Helper to create API request wrapper
const createApiRequest = <T>(data: T) => ({
  requestData: data,
  timestamp: Date.now(),
  requestId: Math.random().toString(36).substring(7),
});

// Local storage keys
const CART_TOKEN_KEY = "finglo_cart_token";
const SESSION_ID_KEY = "finglo_session_id";

class CartApi {
  // ────────────────────────────────────────────────
  //  Token Management
  // ────────────────────────────────────────────────

  async getCartToken(): Promise<string> {
    if (typeof window === "undefined") return "";

    try {
      let token = localStorage.getItem(CART_TOKEN_KEY);

      if (!token) {
        console.log("🛒 No cart token found, generating new one...");
        const response = await this.generateToken();
        console.log("🛒 Generate token response:", response);

        if (response.responseCode === "00" && response.responseData) {
          token = response.responseData;
          localStorage.setItem(CART_TOKEN_KEY, token);
          console.log("🛒 New cart token generated and saved:", token);
        } else {
          console.error("🛒 Failed to generate token:", response);
          throw new Error(
            response.responseMessage || "Failed to generate token",
          );
        }
      }

      return token;
    } catch (error) {
      console.error("🛒 Failed to get cart token:", error);
      throw error;
    }
  }

  private getSessionId(): string {
    if (typeof window === "undefined") return "";

    let sessionId = localStorage.getItem(SESSION_ID_KEY);

    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem(SESSION_ID_KEY, sessionId);
      console.log("🛒 New session ID generated:", sessionId);
    }

    return sessionId;
  }

  clearCartToken(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(CART_TOKEN_KEY);
    console.log("🛒 Cart token cleared");
  }

  clearSessionId(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(SESSION_ID_KEY);
    console.log("🛒 Session ID cleared");
  }

  // ────────────────────────────────────────────────
  //  API Methods
  // ────────────────────────────────────────────────

  async generateToken(): Promise<ApiResponse<string>> {
    try {
      console.log("🛒 Generating new cart token...");
      const response = await apiClient.post<ApiResponse<string>>(
        "/products/public/cart/generate-token",
      );
      console.log("🛒 Token generated response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("🛒 Failed to generate cart token:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  }

  async addToCart(
    productId: number,
    quantity: number,
  ): Promise<ApiResponse<CartResponse>> {
    try {
      console.log("🛒 ===== ADD TO CART START =====");
      console.log("🛒 Getting cart token...");
      const token = await this.getCartToken();
      console.log("🛒 Using token:", token);

      const sessionId = this.getSessionId();
      console.log("🛒 Using sessionId:", sessionId);

      const requestData: AddToCartRequest = {
        cartToken: token,
        productId,
        quantity,
        sessionId,
      };

      const requestPayload = createApiRequest(requestData);
      console.log(
        "🛒 Request payload:",
        JSON.stringify(requestPayload, null, 2),
      );

      console.log("🛒 Sending POST request to /products/public/cart/add");
      const response = await apiClient.post<ApiResponse<CartResponse>>(
        "/products/public/cart/add",
        requestPayload,
      );

      console.log("🛒 Response status:", response.status);
      console.log("🛒 Response data:", response.data);
      console.log("🛒 ===== ADD TO CART END =====");

      return response.data;
    } catch (error: any) {
      console.error("🛒 ===== ADD TO CART ERROR =====");
      console.error("🛒 Error message:", error.message);
      console.error("🛒 Error response:", error.response?.data);
      console.error("🛒 Error status:", error.response?.status);
      console.error("🛒 Error headers:", error.response?.headers);
      console.error("🛒 ===== ERROR END =====");
      throw error;
    }
  }

  async getCart(token?: string): Promise<ApiResponse<CartResponse>> {
    try {
      console.log("🛒 ===== GET CART START =====");
      const cartToken = token || (await this.getCartToken());
      console.log("🛒 Fetching cart for token:", cartToken);

      const response = await apiClient.get<ApiResponse<CartResponse>>(
        `/products/public/cart/${cartToken}`,
      );

      console.log("🛒 Get cart response:", response.data);
      console.log("🛒 ===== GET CART END =====");
      return response.data;
    } catch (error: any) {
      console.error("🛒 ===== GET CART ERROR =====");
      console.error("🛒 Error:", error.message);
      console.error("🛒 Status:", error.response?.status);
      console.error("🛒 Data:", error.response?.data);
      console.error("🛒 ===== ERROR END =====");

      // If cart not found, return empty cart structure
      if (error.response?.status === 404) {
        console.log("🛒 Cart not found, returning empty cart");
        return {
          responseCode: "00",
          responseMessage: "Cart is empty",
          responseData: {
            cartId: 0,
            cartToken: token || "",
            totalItems: 0,
            subtotal: 0,
            items: [],
            expiresAt: new Date().toISOString(),
          },
        };
      }
      throw error;
    }
  }

  async updateCartItem(
    productId: number,
    quantity: number,
    token?: string,
  ): Promise<ApiResponse<CartResponse>> {
    try {
      const cartToken = token || (await this.getCartToken());

      const requestData: UpdateCartItemRequest = {
        productId,
        quantity,
      };

      const requestPayload = createApiRequest(requestData);

      console.log("🛒 Updating cart item:", requestPayload);

      const response = await apiClient.put<ApiResponse<CartResponse>>(
        `/products/public/cart/${cartToken}/update`,
        requestPayload,
      );

      console.log("🛒 Cart updated:", response.data);
      return response.data;
    } catch (error) {
      console.error("🛒 Failed to update cart item:", error);
      throw error;
    }
  }

  async removeCartItem(
    productId: number,
    token?: string,
  ): Promise<ApiResponse<void>> {
    try {
      const cartToken = token || (await this.getCartToken());

      console.log("🛒 Removing item:", { cartToken, productId });

      const response = await apiClient.delete<ApiResponse<void>>(
        `/products/public/cart/${cartToken}/item/${productId}`,
      );

      console.log("🛒 Item removed:", response.data);
      return response.data;
    } catch (error) {
      console.error("🛒 Failed to remove cart item:", error);
      throw error;
    }
  }

  async clearCart(token?: string): Promise<ApiResponse<void>> {
    try {
      const cartToken = token || (await this.getCartToken());

      console.log("🛒 Clearing cart:", cartToken);

      const response = await apiClient.delete<ApiResponse<void>>(
        `/products/public/cart/${cartToken}/clear`,
      );

      console.log("🛒 Cart cleared:", response.data);
      return response.data;
    } catch (error) {
      console.error("🛒 Failed to clear cart:", error);
      throw error;
    }
  }

  async getItemCount(): Promise<number> {
    try {
      const response = await this.getCart();
      return response.responseData?.totalItems || 0;
    } catch {
      return 0;
    }
  }

  async isProductInCart(productId: number): Promise<boolean> {
    try {
      const response = await this.getCart();
      return (
        response.responseData?.items?.some(
          (item) => item.productId === productId,
        ) || false
      );
    } catch {
      return false;
    }
  }

  async getProductQuantity(productId: number): Promise<number> {
    try {
      const response = await this.getCart();
      const item = response.responseData?.items?.find(
        (item) => item.productId === productId,
      );
      return item?.quantity || 0;
    } catch {
      return 0;
    }
  }
}

// Create and export a singleton instance
const cartApi = new CartApi();
export default cartApi;
