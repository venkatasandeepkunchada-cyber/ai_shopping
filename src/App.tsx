/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab, ChatMessage, ShoppingFilters, CartItem, Order } from './types.ts';
import { Product, PRODUCTS } from './data/products.ts';
import { ThemeProvider, useTheme } from './context/ThemeContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { ChatTab } from './components/ChatTab.tsx';
import { CompareTab } from './components/CompareTab.tsx';
import { CatalogTab } from './components/CatalogTab.tsx';
import { OrdersTab } from './components/OrdersTab.tsx';
import { TechExplainerTab } from './components/TechExplainerTab.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    sender: 'assistant',
    text: `Hello! 👋 I'm your **AI Shopping Assistant**.\n\nI can help you:\n- 🎯 Find the best electronics strictly within your budget (₹)\n- 🛍️ **Order directly** with express delivery & secure payment (UPI, COD, Card)\n- ⚖️ Compare phones, laptops, and gadgets side-by-side\n- 💡 Explain technical specs like RAM, refresh rate, and AMOLED in plain English\n- 🛡️ Verified pricing with zero hallucinated specs\n\nWhat would you like to explore or order today?`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    recommendedProductIds: ['phone-1', 'phone-2'],
    followUpSuggestions: [
      'I want to buy a mobile phone under ₹20,000 for gaming',
      'I want to order the OnePlus Nord CE4',
      'Compare OnePlus Nord CE4 and POCO X6 Pro',
      'Best laptop for coding under ₹50,000'
    ],
    isAiGrounded: true
  }
];

function AppContent() {
  const { themeColors } = useTheme();

  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);

  // Cart & Order State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [directCheckoutProduct, setDirectCheckoutProduct] = useState<Product | null>(null);

  // Initial Sample Order for demonstration
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-519284',
      items: [
        {
          product: PRODUCTS.find((p) => p.id === 'phone-1') || PRODUCTS[0],
          quantity: 1,
        },
      ],
      totalAmount: 19999,
      savings: 5000,
      address: {
        fullName: 'Poorna Chandu',
        phone: '+91 98765 43210',
        street: 'Flat 402, Green Meadows, 5th Main Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560100',
      },
      paymentMethod: 'UPI',
      orderDate: 'Today, 09:30 AM',
      estimatedDelivery: 'Wednesday, 14 Oct',
      status: 'Confirmed',
    },
  ]);

  // Filters state
  const [filters, setFilters] = useState<ShoppingFilters>({
    category: 'all',
    minPrice: 0,
    maxPrice: 100000,
    brand: '',
    priority: 'balanced'
  });

  // Selected products for side-by-side comparison (max 3)
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);

  // Detailed Modal
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  // Cart Management
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Direct 1-Click Order Handler
  const handleDirectOrder = (product: Product) => {
    setDirectCheckoutProduct(product);
    setIsCheckoutOpen(true);
  };

  const handleProceedCartCheckout = () => {
    setDirectCheckoutProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);

    if (!directCheckoutProduct) {
      setCart([]);
    }

    const orderConfirmationMessage: ChatMessage = {
      id: `assistant-order-${Date.now()}`,
      sender: 'assistant',
      text: `🎉 **Order Confirmed! (ID: ${newOrder.id})**\n\nYour order for **${newOrder.items.map((i) => `${i.product.name} (Qty: ${i.quantity})`).join(', ')}** totaling **₹${newOrder.totalAmount.toLocaleString('en-IN')}** has been placed successfully.\n\n- **Payment Method:** ${newOrder.paymentMethod}\n- **Estimated Delivery:** ${newOrder.estimatedDelivery}\n- **Delivery Address:** ${newOrder.address.street}, ${newOrder.address.city}\n\nYou can track delivery progress in the **My Orders** tab anytime!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAiGrounded: true,
      followUpSuggestions: [
        'Track my order status',
        'Show delivery updates',
        'Find accessories for my order'
      ],
    };
    setMessages((prev) => [...prev, orderConfirmationMessage]);
    setActiveTab('orders');
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const handleUpdateFilters = (newFilters: Partial<ShoppingFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleToggleCompare = (product: Product) => {
    setComparedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleRemoveCompare = (productId: string) => {
    setComparedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleClearCompare = () => {
    setComparedProducts([]);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const lower = text.toLowerCase();
    const isOrderIntent = lower.includes('order') || lower.includes('buy') || lower.includes('purchase');
    const matchedProduct = PRODUCTS.find(
      (p) => lower.includes(p.name.toLowerCase()) || lower.includes(p.id)
    );

    try {
      const history = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
          filters,
          priority: filters.priority,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProductIds: data.recommendedProductIds || (matchedProduct ? [matchedProduct.id] : []),
        followUpSuggestions: data.followUpSuggestions || [],
        isAiGrounded: data.isAiGrounded ?? true,
        errorNote: data.errorNote,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (isOrderIntent && matchedProduct) {
        setTimeout(() => {
          handleDirectOrder(matchedProduct);
        }, 800);
      }
    } catch (err: any) {
      console.error('Failed to get chat response:', err);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: `I'm ready to help you find and order electronics within your budget! You can browse our verified catalog or tap 'Order Now' on any product.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProductIds: ['phone-1', 'phone-2'],
        followUpSuggestions: ['Show phones under ₹20,000', 'Order OnePlus Nord CE4'],
        isAiGrounded: true,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAskAboutProduct = (product: Product) => {
    setActiveTab('chat');
    handleSendMessage(`Tell me more about ${product.name}. What are its main advantages, disadvantages, and how can I order it?`);
  };

  const handleAskAboutSpec = (term: string) => {
    setActiveTab('chat');
    handleSendMessage(`Explain what "${term}" means in simple English and how it affects my choice when buying electronics.`);
  };

  const handleAskChatbotToCompare = (products: Product[]) => {
    setActiveTab('chat');
    const names = products.map((p) => p.name).join(' vs ');
    handleSendMessage(`Compare ${names} side-by-side with verified specifications, pros, cons, and tell me which one is better value.`);
  };

  const handleAskAboutOrder = (order: Order) => {
    setActiveTab('chat');
    handleSendMessage(`When will my order ${order.id} be delivered? Please give me delivery tracking details.`);
  };

  return (
    <div className={`min-h-screen ${themeColors.pageBg} flex flex-col font-sans transition-colors selection:bg-indigo-500 selection:text-white`}>
      {/* Top Navbar with Theme Selector */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        compareCount={comparedProducts.length}
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
        ordersCount={orders.length}
        onOpenCart={() => setIsCartOpen(true)}
        onResetChat={handleResetChat}
      />

      {/* Main Tab Content */}
      <main className="flex-1">
        {activeTab === 'chat' && (
          <ChatTab
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onResetChat={handleResetChat}
            filters={filters}
            onUpdateFilters={handleUpdateFilters}
            comparedProducts={comparedProducts}
            onToggleCompare={handleToggleCompare}
            onViewProductDetails={(p) => setDetailProduct(p)}
            onNavigateToCompare={() => setActiveTab('compare')}
            onAddToCart={handleAddToCart}
            onDirectOrder={handleDirectOrder}
          />
        )}

        {activeTab === 'catalog' && (
          <CatalogTab
            filters={filters}
            onUpdateFilters={handleUpdateFilters}
            comparedProducts={comparedProducts}
            onToggleCompare={handleToggleCompare}
            onViewProductDetails={(p) => setDetailProduct(p)}
            onAskAboutProduct={handleAskAboutProduct}
            onAddToCart={handleAddToCart}
            onDirectOrder={handleDirectOrder}
          />
        )}

        {activeTab === 'compare' && (
          <CompareTab
            comparedProducts={comparedProducts}
            onRemoveProduct={handleRemoveCompare}
            onAddProduct={(p) => {
              if (comparedProducts.length < 3) {
                setComparedProducts((prev) => [...prev, p]);
              }
            }}
            onClearAll={handleClearCompare}
            onAskChatbotToCompare={handleAskChatbotToCompare}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersTab
            orders={orders}
            onCancelOrder={handleCancelOrder}
            onNavigateToCatalog={() => setActiveTab('catalog')}
            onAskAboutOrder={handleAskAboutOrder}
          />
        )}

        {activeTab === 'glossary' && (
          <TechExplainerTab onAskAboutSpec={handleAskAboutSpec} />
        )}
      </main>

      {/* Cart Slide-out Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedCartCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setDirectCheckoutProduct(null);
        }}
        cartItems={cart}
        directProduct={directCheckoutProduct}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onSelectCompare={handleToggleCompare}
        isCompared={detailProduct ? comparedProducts.some((p) => p.id === detailProduct.id) : false}
        onAskAboutProduct={handleAskAboutProduct}
        onAddToCart={handleAddToCart}
        onDirectOrder={handleDirectOrder}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
