import { Product } from './data/products.ts';

export type ActiveTab = 'chat' | 'catalog' | 'compare' | 'orders' | 'glossary';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedProductIds?: string[];
  followUpSuggestions?: string[];
  isAiGrounded?: boolean;
  orderActionProduct?: Product;
  errorNote?: string;
}

export interface ShoppingFilters {
  category: string;
  minPrice: number;
  maxPrice: number;
  brand: string;
  priority: 'balanced' | 'gaming' | 'battery' | 'camera' | 'productivity' | 'value';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  savings: number;
  address: DeliveryAddress;
  paymentMethod: 'UPI' | 'Cash on Delivery' | 'Credit/Debit Card' | 'Net Banking';
  orderDate: string;
  estimatedDelivery: string;
  status: 'Confirmed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
}
