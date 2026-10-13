import React from 'react';
import { 
  PackageCheck, 
  Truck, 
  MapPin, 
  CreditCard, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2,
  XCircle,
  MessageSquare
} from 'lucide-react';
import { Order } from '../types.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface OrdersTabProps {
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onNavigateToCatalog: () => void;
  onAskAboutOrder: (order: Order) => void;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({
  orders,
  onCancelOrder,
  onNavigateToCatalog,
  onAskAboutOrder,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light' || theme === 'sunset';

  const getStatusStepIndex = (status: Order['status']) => {
    switch (status) {
      case 'Confirmed': return 1;
      case 'Shipped': return 2;
      case 'Out for Delivery': return 3;
      case 'Delivered': return 4;
      default: return 1;
    }
  };

  const steps = [
    { label: 'Order Confirmed', step: 1 },
    { label: 'Shipped', step: 2 },
    { label: 'Out for Delivery', step: 3 },
    { label: 'Delivered', step: 4 },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 space-y-6">
      
      {/* Header */}
      <div className={`rounded-2xl p-6 border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
        isLight ? 'bg-white border-slate-200/90 text-slate-800' : 'bg-slate-900 border-slate-800 text-white'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <PackageCheck className="w-5 h-5 text-emerald-500" />
            <h2 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              My Orders
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold">
              {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
            </span>
          </div>
          <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Track your active deliveries, view order invoices, and manage past purchases.
          </p>
        </div>

        <button
          onClick={onNavigateToCatalog}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Browse More Products</span>
        </button>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className={`rounded-2xl p-12 text-center space-y-4 border ${
          isLight ? 'bg-white border-dashed border-slate-300' : 'bg-slate-900/60 border-dashed border-slate-800'
        }`}>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto ${
            isLight ? 'bg-slate-100 text-slate-400' : 'bg-slate-800 text-slate-400'
          }`}>
            <PackageCheck className="w-8 h-8" />
          </div>
          <div className="max-w-sm mx-auto space-y-1">
            <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              No Orders Placed Yet
            </h3>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              You haven't ordered any items yet. You can ask our AI Shopping Assistant to find the best gadgets for your budget and order right away!
            </p>
          </div>
          <button
            onClick={onNavigateToCatalog}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-sm transition-all inline-flex items-center gap-2"
          >
            <span>Explore Electronics & Order</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const currentStep = getStatusStepIndex(order.status);

            return (
              <div
                key={order.id}
                className={`rounded-2xl border overflow-hidden shadow-xs space-y-4 transition-colors ${
                  isLight ? 'bg-white border-slate-200/90 text-slate-800' : 'bg-slate-900 border-slate-800 text-white'
                }`}
              >
                {/* Order Top Bar */}
                <div className={`px-6 py-4 border-b flex flex-wrap items-center justify-between gap-3 text-xs ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
                }`}>
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <span className={`block text-[11px] font-bold ${isLight ? 'text-slate-400' : 'text-slate-400'}`}>ORDER ID</span>
                      <span className={`font-mono font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>{order.id}</span>
                    </div>
                    <div>
                      <span className={`block text-[11px] font-bold ${isLight ? 'text-slate-400' : 'text-slate-400'}`}>ORDER DATE</span>
                      <span className={isLight ? 'text-slate-700 font-medium' : 'text-slate-200'}>{order.orderDate}</span>
                    </div>
                    <div>
                      <span className={`block text-[11px] font-bold ${isLight ? 'text-slate-400' : 'text-slate-400'}`}>TOTAL AMOUNT</span>
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Delivery by: {order.estimatedDelivery}</span>
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Delivery Timeline Tracker */}
                  <div className={`p-4 rounded-xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-slate-800'
                  }`}>
                    <div className="flex items-center justify-between relative">
                      {/* Connecting line */}
                      <div className={`absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 -z-0 ${
                        isLight ? 'bg-slate-200' : 'bg-slate-800'
                      }`} />
                      <div
                        className="absolute top-1/2 left-4 -translate-y-1/2 h-1 bg-emerald-500 transition-all duration-500 -z-0"
                        style={{
                          width: `${((currentStep - 1) / (steps.length - 1)) * 92}%`,
                        }}
                      />

                      {steps.map((st) => {
                        const isReached = st.step <= currentStep;
                        return (
                          <div key={st.step} className="flex flex-col items-center relative z-10">
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                isReached
                                  ? 'bg-emerald-500 text-white ring-4 ring-emerald-100 dark:ring-emerald-950'
                                  : isLight ? 'bg-slate-200 text-slate-500' : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {isReached ? <CheckCircle2 className="w-4 h-4" /> : st.step}
                            </div>
                            <span
                              className={`text-[11px] mt-1.5 font-bold ${
                                isReached 
                                  ? isLight ? 'text-slate-900' : 'text-white' 
                                  : isLight ? 'text-slate-400' : 'text-slate-500'
                              }`}
                            >
                              {st.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Items in this Order */}
                  <div className="space-y-3">
                    <h4 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Ordered Products ({order.items.reduce((acc, i) => acc + i.quantity, 0)})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {order.items.map((item) => (
                        <div
                          key={item.product.id}
                          className={`p-3 rounded-xl border flex items-center gap-3 ${
                            isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-950/70 border-slate-800'
                          }`}
                        >
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className={`w-14 h-14 rounded-lg object-cover shrink-0 border ${
                              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                            }`}
                          />
                          <div className="flex-1 min-w-0 text-xs">
                            <h5 className={`font-bold truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.product.name}</h5>
                            <div className={`text-[11px] mb-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                              {item.product.specs.processor}
                            </div>
                            <div className="flex items-baseline gap-2">
                              <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                                ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                              </span>
                              <span className={`text-[10px] ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>Qty: {item.quantity}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping & Payment Meta */}
                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t ${
                    isLight ? 'border-slate-100' : 'border-slate-800'
                  }`}>
                    <div className="space-y-1">
                      <div className={`flex items-center gap-1.5 font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Delivery Address</span>
                      </div>
                      <p className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{order.address.fullName} ({order.address.phone})</p>
                      <p className={isLight ? 'text-slate-600' : 'text-slate-300'}>{order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}</p>
                    </div>

                    <div className="space-y-1">
                      <div className={`flex items-center gap-1.5 font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Payment Method</span>
                      </div>
                      <p className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{order.paymentMethod}</p>
                      <p className="text-emerald-600 dark:text-emerald-400 font-semibold">Paid & Verified • Invoice Generated</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className={`flex items-center justify-between pt-2 border-t flex-wrap gap-2 ${
                    isLight ? 'border-slate-100' : 'border-slate-800'
                  }`}>
                    <button
                      onClick={() => onAskAboutOrder(order)}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5 font-bold"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Ask Assistant for Delivery Updates</span>
                    </button>

                    {order.status === 'Confirmed' && (
                      <button
                        onClick={() => onCancelOrder(order.id)}
                        className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Cancel Order</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
