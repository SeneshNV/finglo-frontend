import { Product, ProductImage } from './product';

// ==================== REQUEST DTOs ====================

export interface AddToCartRequest {
  cartToken?: string;
  productId: number;
  quantity: number;
  sessionId?: string;
}

export interface UpdateCartItemRequest {
  productId: number;
  quantity: number;
}

export interface CartTokenRequest {
  cartToken?: string;
  sessionId?: string;
  userId?: number;
}

// ==================== RESPONSE DTOs ====================

export interface CartItem {
  cartItemId: number;
  productId: number;
  productName: string;
  productCode: string;
  productImage: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Cart {
  cartId: number;
  cartToken: string;
  userId?: number;
  totalItems: number;
  subtotal: number;
  items: CartItem[];
  expiresAt: string; // ISO date string
  createdAt?: string;
  updatedAt?: string;
}

export interface CartResponse {
  cartId: number;
  cartToken: string;
  userId?: number;
  totalItems: number;
  subtotal: number;
  items: CartItemResponse[];
  expiresAt: string;
}

export interface CartItemResponse {
  cartItemId: number;
  productId: number;
  productName: string;
  productCode: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// ==================== API RESPONSE WRAPPERS ====================

export interface ApiResponse<T> {
  responseCode: string;
  responseMessage: string;
  responseData: T;
}

// ==================== CART STATE & CONTEXT TYPES ====================

export interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  itemCount: number;
  subtotal: number;
}

export interface CartContextType extends CartState {
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

// ==================== CART HOOK PROPS ====================

export interface UseCartReturn extends CartState {
  addToCart: (productId: number, quantity: number) => Promise<Cart | undefined>;
  updateQuantity: (productId: number, quantity: number) => Promise<Cart | undefined>;
  removeItem: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

// ==================== ENUMS & CONSTANTS ====================

export enum CartErrorCode {
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  INSUFFICIENT_STOCK = 'INSUFFICIENT_STOCK',
  CART_LIMIT_EXCEEDED = 'CART_LIMIT_EXCEEDED',
  QUANTITY_LIMIT_EXCEEDED = 'QUANTITY_LIMIT_EXCEEDED',
  CART_NOT_FOUND = 'CART_NOT_FOUND',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface CartError {
  code: CartErrorCode;
  message: string;
  productId?: number;
}

// ==================== CART UTILITY TYPES ====================

export interface CartSummary {
  itemCount: number;
  subtotal: number;
  tax?: number;
  shipping?: number;
  total: number;
}

export interface CartItemWithProduct extends CartItem {
  product?: Product; // Full product details when needed
  images?: ProductImage[];
}

// ==================== RESPONSE CODE CONSTANTS ====================

export const CART_RESPONSE_CODES = {
  SUCCESS: '00',
  CREATED: '01',
  UPDATED: '02',
  DELETED: '03',
  BUSINESS_ERROR: '10',
  VALIDATION_ERROR: '11',
  NOT_FOUND: '12',
  INSUFFICIENT_STOCK: '14',
  CART_LIMIT_EXCEEDED: '15',
  SYSTEM_ERROR: '20',
} as const;

export type CartResponseCode = typeof CART_RESPONSE_CODES[keyof typeof CART_RESPONSE_CODES];

// ==================== TYPE GUARDS ====================

export function isCart(item: any): item is Cart {
  return (
    item &&
    typeof item === 'object' &&
    'cartId' in item &&
    'cartToken' in item &&
    'items' in item &&
    Array.isArray(item.items)
  );
}

export function isCartItem(item: any): item is CartItem {
  return (
    item &&
    typeof item === 'object' &&
    'cartItemId' in item &&
    'productId' in item &&
    'quantity' in item &&
    'unitPrice' in item
  );
}

export function isApiResponse<T>(response: any): response is ApiResponse<T> {
  return (
    response &&
    typeof response === 'object' &&
    'responseCode' in response &&
    'responseMessage' in response
  );
}

// ==================== CART FILTERS & SORT ====================

export interface CartFilters {
  page?: number;
  size?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'expiresAt';
  sortDir?: 'asc' | 'desc';
  userId?: number;
  isActive?: boolean;
}

// ==================== CART EVENTS ====================

export type CartEventType = 
  | 'ITEM_ADDED'
  | 'ITEM_REMOVED'
  | 'QUANTITY_UPDATED'
  | 'CART_CLEARED'
  | 'CART_MERGED'
  | 'CART_EXPIRED';

export interface CartEvent {
  type: CartEventType;
  cartToken: string;
  timestamp: number;
  data?: any;
}

// ==================== CHECKOUT TYPES (if needed) ====================

export interface CheckoutCart extends Cart {
  available: boolean;
  validated: boolean;
  validationErrors?: string[];
}

export interface CartValidationResult {
  isValid: boolean;
  errors: {
    productId: number;
    message: string;
    code: string;
  }[];
  updatedCart?: Cart;
}