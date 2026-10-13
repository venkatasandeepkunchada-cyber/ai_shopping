import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  Building2, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  ArrowRight,
  PackageCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, DeliveryAddress, Order } from '../types.ts';
import { Product } from '../data/products.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  directProduct?: Product | null;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  directProduct,
  onOrderSuccess,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light' || theme === 'sunset';

  if (!isOpen) return null;

  const itemsToCheckout: CartItem[] = directProduct
    ? [{ product: directProduct, quantity: 1 }]
    : cartItems;

  const [address, setAddress] = useState<DeliveryAddress>({
    fullName: 'Poorna Chandu',
    phone: '+91 98765 43210',
    street: 'Flat 402, Green Meadows, 5th Main Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560100',
  });

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('UPI');
  const [upiId, setUpiId] = useState('poornachandu@okhdfcbank');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const totalAmount = itemsToCheckout.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalOriginal = itemsToCheckout.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0
  );
  const totalSavings = totalOriginal - totalAmount;

  const handlePlaceOrder = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 3);

      const newOrder: Order = {
        id: orderId,
        items: itemsToCheckout,
        totalAmount,
        savings: totalSavings,
        address,
        paymentMethod,
        orderDate: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        status: 'Confirmed',
      };

      setCompletedOrder(newOrder);
      onOrderSuccess(newOrder);
      setIsSubmitting(false);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }, 1000);
  };

  const handleResetAndClose = () => {
    setCompletedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div 
        className={`rounded-2xl border w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col transition-colors ${
          isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`sticky top-0 z-10 px-6 py-4 border-b flex items-center justify-between backdrop-blur-md ${
          isLight ? 'bg-white/95 border-slate-200' : 'bg-slate-900/95 border-slate-800'
        }`}>
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className={`font-bold text-lg ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {completedOrder ? 'Order Confirmed!' : 'Express Checkout'}
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isLight ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {completedOrder ? (
            /* Order Placed Success Screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Payment Successful
                </span>
                <h2 className={`text-2xl font-black mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>Thank you for your order!</h2>
                <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Order ID: <strong className={`font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>{completedOrder.id}</strong>
                </p>
              </div>

              {/* Delivery Details Card */}
              <div className={`border rounded-xl p-4 text-left max-w-lg mx-auto text-xs space-y-3 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-slate-800'
              }`}>
                <div className={`flex items-center justify-between border-b pb-2 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Estimated Delivery:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-300 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" />
                    {completedOrder.estimatedDelivery}
                  </span>
                </div>

                <div className={`flex items-center justify-between border-b pb-2 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Delivering to:</span>
                  <span className={`font-semibold text-right ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {completedOrder.address.fullName}, {completedOrder.address.city} ({completedOrder.address.pincode})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Payment:</span>
                  <span className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {completedOrder.paymentMethod} (₹{completedOrder.totalAmount.toLocaleString('en-IN')})
                  </span>
                </div>
              </div>

              {/* Items summary */}
              <div className="max-w-lg mx-auto space-y-2 text-left">
                <span className={`text-[11px] font-bold uppercase tracking-wider block ${isLight ? 'text-slate-400' : 'text-slate-400'}`}>
                  Items in this order:
                </span>
                {completedOrder.items.map((item) => (
                  <div
                    key={item.product.id}
                    className={`flex items-center justify-between p-2.5 rounded-lg text-xs ${
                      isLight ? 'bg-slate-50 border border-slate-200' : 'bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <div>
                        <div className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.product.name}</div>
                        <div className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <span className={`font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2"
                >
                  <PackageCheck className="w-4 h-4" />
                  <span>View in My Orders</span>
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <div className="space-y-6">
              {/* Order Items Preview */}
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Items to Order ({itemsToCheckout.reduce((acc, i) => acc + i.quantity, 0)})
                </h4>
                <div className="space-y-2">
                  {itemsToCheckout.map((item) => (
                    <div
                      key={item.product.id}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className={`w-12 h-12 rounded-lg object-cover shrink-0 ${isLight ? 'bg-white' : 'bg-slate-900'}`}
                        />
                        <div>
                          <div className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.product.name}</div>
                          <div className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{item.product.brand} • Qty: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address Section */}
              <div className={`border rounded-xl p-4 space-y-3 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
              }`}>
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-800' : 'text-white'}`}>
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    <span>Delivery Address</span>
                  </div>
                  <button
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
                  >
                    {isEditingAddress ? 'Save Address' : 'Change Address'}
                  </button>
                </div>

                {isEditingAddress ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <label className={`text-[11px] block mb-0.5 ${isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'}`}>Full Name</label>
                      <input
                        type="text"
                        value={address.fullName}
                        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                        className={`w-full rounded-lg p-2 text-xs border ${
                          isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`text-[11px] block mb-0.5 ${isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'}`}>Phone Number</label>
                      <input
                        type="text"
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        className={`w-full rounded-lg p-2 text-xs border ${
                          isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                        }`}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={`text-[11px] block mb-0.5 ${isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'}`}>Street Address</label>
                      <input
                        type="text"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        className={`w-full rounded-lg p-2 text-xs border ${
                          isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`text-[11px] block mb-0.5 ${isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'}`}>City & State</label>
                      <input
                        type="text"
                        value={`${address.city}, ${address.state}`}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className={`w-full rounded-lg p-2 text-xs border ${
                          isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`text-[11px] block mb-0.5 ${isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'}`}>Pincode</label>
                      <input
                        type="text"
                        value={address.pincode}
                        onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                        className={`w-full rounded-lg p-2 text-xs border ${
                          isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                        }`}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={`text-xs space-y-0.5 pt-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    <p className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{address.fullName} • {address.phone}</p>
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} - {address.pincode}</p>
                  </div>
                )}
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <span className={`text-xs font-bold uppercase tracking-wider block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Select Payment Option
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {/* UPI */}
                  <label
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'UPI'
                        ? isLight ? 'bg-indigo-50 border-indigo-500 text-slate-900 shadow-xs' : 'bg-indigo-950/60 border-indigo-500 text-white'
                        : isLight ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100' : 'bg-slate-950/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="accent-indigo-600"
                    />
                    <Smartphone className="w-4 h-4 text-indigo-500" />
                    <div className="flex-1">
                      <div className="font-bold">UPI (GPay / PhonePe / Paytm)</div>
                      <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Instant 1-tap checkout</div>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'Cash on Delivery'
                        ? isLight ? 'bg-emerald-50 border-emerald-500 text-slate-900 shadow-xs' : 'bg-indigo-950/60 border-indigo-500 text-white'
                        : isLight ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100' : 'bg-slate-950/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={() => setPaymentMethod('Cash on Delivery')}
                      className="accent-emerald-600"
                    />
                    <Banknote className="w-4 h-4 text-emerald-500" />
                    <div className="flex-1">
                      <div className="font-bold">Cash on Delivery (COD)</div>
                      <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Pay on arrival</div>
                    </div>
                  </label>

                  {/* Cards */}
                  <label
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'Credit/Debit Card'
                        ? isLight ? 'bg-indigo-50 border-indigo-500 text-slate-900 shadow-xs' : 'bg-indigo-950/60 border-indigo-500 text-white'
                        : isLight ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100' : 'bg-slate-950/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Credit/Debit Card'}
                      onChange={() => setPaymentMethod('Credit/Debit Card')}
                      className="accent-indigo-600"
                    />
                    <CreditCard className="w-4 h-4 text-sky-500" />
                    <div className="flex-1">
                      <div className="font-bold">Credit / Debit Card</div>
                      <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Visa, MasterCard, RuPay</div>
                    </div>
                  </label>

                  {/* Net Banking */}
                  <label
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'Net Banking'
                        ? isLight ? 'bg-indigo-50 border-indigo-500 text-slate-900 shadow-xs' : 'bg-indigo-950/60 border-indigo-500 text-white'
                        : isLight ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100' : 'bg-slate-950/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Net Banking'}
                      onChange={() => setPaymentMethod('Net Banking')}
                      className="accent-indigo-600"
                    />
                    <Building2 className="w-4 h-4 text-amber-500" />
                    <div className="flex-1">
                      <div className="font-bold">Net Banking</div>
                      <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>All major Indian banks</div>
                    </div>
                  </label>
                </div>

                {paymentMethod === 'UPI' && (
                  <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-slate-800'
                  }`}>
                    <span className={`shrink-0 font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>UPI ID:</span>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className={`rounded-lg px-2 py-1 text-xs flex-1 border ${
                        isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                      }`}
                    />
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Verified</span>
                  </div>
                )}
              </div>

              {/* Total & Place Order Button */}
              <div className={`pt-4 border-t space-y-3 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Total Payable Amount:</span>
                    {totalSavings > 0 && (
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block font-bold">
                        You save ₹{totalSavings.toLocaleString('en-IN')} on this order!
                      </span>
                    )}
                  </div>
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting || itemsToCheckout.length === 0}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Confirming Order...</span>
                    </div>
                  ) : (
                    <>
                      <span>Confirm & Place Order Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className={`flex items-center justify-center gap-2 text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>100% Genuine Products • Verified Seller Warranty • Easy Returns</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
