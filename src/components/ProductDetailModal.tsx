import React from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Star, 
  Scale, 
  MessageSquare, 
  ShieldCheck, 
  Check, 
  ShoppingBag, 
  ArrowRight, 
  Truck 
} from 'lucide-react';
import { Product } from '../data/products.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectCompare: (product: Product) => void;
  isCompared: boolean;
  onAskAboutProduct: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onDirectOrder?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onSelectCompare,
  isCompared,
  onAskAboutProduct,
  onAddToCart,
  onDirectOrder,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light' || theme === 'sunset';

  if (!product) return null;

  const scoreLabels: Record<keyof Product['useCaseScores'], string> = {
    gaming: 'Gaming & High FPS',
    photography: 'Camera & Video',
    batteryLife: 'Battery Endurance',
    productivity: 'Multitasking & Code',
    valueForMoney: 'Value for Money',
    dailyUse: 'Everyday Comfort',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div 
        className={`rounded-2xl border w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col transition-colors ${
          isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`sticky top-0 z-10 px-6 py-4 border-b flex items-center justify-between backdrop-blur-md ${
          isLight ? 'bg-white/95 border-slate-200' : 'bg-slate-900/95 border-slate-800'
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
              {product.brand} • {product.category}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              Verified Spec Record
            </span>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isLight ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Main Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className={`rounded-xl overflow-hidden aspect-square border relative ${
                isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-800'
              }`}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-2 left-2 px-2.5 py-1 rounded text-xs font-bold bg-indigo-600 text-white shadow-md">
                    {product.badge}
                  </span>
                )}
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col justify-between">
              <div>
                <h2 className={`text-2xl font-black mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>{product.name}</h2>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className={`text-sm line-through ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <div className="flex items-center text-amber-500 text-sm font-bold gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{product.rating}</span>
                    <span className={`text-xs font-normal ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>({product.reviewsCount.toLocaleString('en-IN')})</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300 mb-4 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl font-medium">
                  <Truck className="w-3.5 h-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>Free Express Delivery available for this product</span>
                </div>

                <p className={`text-sm leading-relaxed mb-4 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <strong>Best For:</strong> {product.bestFor}
                </p>
              </div>

              {/* Action Buttons with Order Capabilities */}
              <div className={`space-y-2 pt-3 border-t ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
                <div className="flex flex-wrap gap-2">
                  {onDirectOrder && (
                    <button
                      onClick={() => {
                        onClose();
                        onDirectOrder(product);
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-sm flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Order Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  {onAddToCart && (
                    <button
                      onClick={() => {
                        onAddToCart(product);
                      }}
                      className={`py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all border ${
                        isLight
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                          : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Add to Cart</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => onSelectCompare(product)}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all border ${
                      isCompared
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                        : isLight
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                          : 'bg-slate-800/80 hover:bg-slate-750 text-slate-200 border-slate-700'
                    }`}
                  >
                    {isCompared ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> Added to Comparison
                      </>
                    ) : (
                      <>
                        <Scale className="w-3.5 h-3.5" /> Compare
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      onAskAboutProduct(product);
                      onClose();
                    }}
                    className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                        : 'bg-slate-800/80 hover:bg-slate-750 text-slate-200 border-slate-700'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Ask AI</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Key Highlights */}
          <div className={`p-4 rounded-xl border ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
          }`}>
            <h4 className={`text-xs uppercase tracking-wider font-bold mb-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Key Highlights</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {product.keyHighlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                  <span className={isLight ? 'text-slate-700' : 'text-slate-200'}>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Specifications Grid */}
          <div>
            <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${
              isLight ? 'text-slate-800' : 'text-slate-300'
            }`}>
              <span>Verified Specifications</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className={`p-3 rounded-xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-slate-750'
                }`}>
                  <span className={`capitalize block mb-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{key}:</span>
                  <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Use-Case Ratings */}
          <div>
            <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 ${
              isLight ? 'text-slate-800' : 'text-slate-300'
            }`}>
              Performance & Use-Case Ratings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(Object.keys(product.useCaseScores) as Array<keyof Product['useCaseScores']>).map((k) => {
                const score = product.useCaseScores[k];
                return (
                  <div key={k} className={`p-3 rounded-xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/40 border-slate-800'
                  }`}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={isLight ? 'text-slate-700 font-medium' : 'text-slate-300'}>{scoreLabels[k]}</span>
                      <span className="font-extrabold text-indigo-600 dark:text-indigo-400">{score} / 10</span>
                    </div>
                    <div className={`w-full h-2 rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-slate-700/60'}`}>
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-amber-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${(score / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`border p-4 rounded-xl ${
              isLight ? 'bg-emerald-50/60 border-emerald-200' : 'bg-emerald-950/20 border-emerald-900/40'
            }`}>
              <h4 className="text-emerald-700 dark:text-emerald-400 font-bold text-sm mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Advantages (Pros)
              </h4>
              <ul className="space-y-1.5 text-xs">
                {product.pros.map((p, i) => (
                  <li key={i} className={`flex items-start gap-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`border p-4 rounded-xl ${
              isLight ? 'bg-rose-50/60 border-rose-200' : 'bg-rose-950/20 border-rose-900/40'
            }`}>
              <h4 className="text-rose-700 dark:text-rose-400 font-bold text-sm mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Trade-offs (Cons)
              </h4>
              <ul className="space-y-1.5 text-xs">
                {product.cons.map((c, i) => (
                  <li key={i} className={`flex items-start gap-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
