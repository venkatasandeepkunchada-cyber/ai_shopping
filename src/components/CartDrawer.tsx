import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck
} from 'lucide-react';
import { CartItem } from '../types.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light' || theme === 'sunset';

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalOriginal = items.reduce((sum, item) => sum + item.product.originalPrice * item.quantity, 0);
  const totalSavings = totalOriginal - totalAmount;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fade-in">
      <div 
        className={`w-full max-w-md h-full flex flex-col shadow-2xl border-l transition-colors ${
          isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className={`p-4 border-b flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
        }`}>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className={`font-bold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Your Shopping Cart
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
              {items.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isLight ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-200' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Banner */}
        <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-4 py-2.5 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
          <Truck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Free Express Delivery included on all orders!</span>
        </div>

        {/* Items List */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-3 divide-y ${
          isLight ? 'divide-slate-100' : 'divide-slate-800/60'
        }`}>
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                isLight ? 'bg-slate-100 text-slate-400' : 'bg-slate-800 text-slate-500'
              }`}>
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className={`font-bold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>Your cart is empty</h3>
              <p className={`text-xs max-w-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Ask our AI Shopping Assistant to find products within your budget, or browse the verified catalog.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="pt-3 first:pt-0 flex gap-3">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className={`w-16 h-16 rounded-xl object-cover shrink-0 border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <h4 className={`text-xs font-bold truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.product.name}</h4>
                  <div className={`text-[11px] mb-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{item.product.brand}</div>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                    <span className={`text-[11px] line-through ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                      ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className={`flex items-center border rounded-lg overflow-hidden ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-700'
                    }`}>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className={`p-1 ${isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className={`px-2 text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className={`p-1 ${isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Pricing & Checkout */}
        {items.length > 0 && (
          <div className={`p-4 border-t space-y-3 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/90 border-slate-800'
          }`}>
            <div className="space-y-1.5 text-xs">
              <div className={`flex justify-between ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                <span>Subtotal (MRP):</span>
                <span>₹{totalOriginal.toLocaleString('en-IN')}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Product Discount:</span>
                  <span>- ₹{totalSavings.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className={`flex justify-between ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                <span>Express Delivery:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE</span>
              </div>
              <div className={`pt-2 border-t flex justify-between text-sm font-black ${
                isLight ? 'border-slate-200 text-slate-900' : 'border-slate-800 text-white'
              }`}>
                <span>Total Amount:</span>
                <span className="text-base text-emerald-600 dark:text-emerald-400">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className={`flex items-center justify-center gap-1.5 text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Safe & Secure Checkout • 7-day replacement guarantee</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
