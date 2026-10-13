import React from 'react';
import { 
  CheckCircle2, 
  Plus, 
  Check, 
  Cpu, 
  Battery, 
  Smartphone, 
  Star, 
  MessageSquare, 
  Eye, 
  Zap, 
  ShoppingBag, 
  ArrowRight 
} from 'lucide-react';
import { Product } from '../data/products.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface ProductCardProps {
  product: Product;
  onSelectCompare?: (product: Product) => void;
  isCompared?: boolean;
  onAskAboutProduct?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onDirectOrder?: (product: Product) => void;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectCompare,
  isCompared = false,
  onAskAboutProduct,
  onViewDetails,
  onAddToCart,
  onDirectOrder,
  compact = false
}) => {
  const { themeColors, theme } = useTheme();

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const isLight = theme === 'light' || theme === 'sunset';

  return (
    <div className={`rounded-2xl border transition-all flex flex-col group overflow-hidden ${
      isLight 
        ? 'bg-white border-slate-200/90 text-slate-900 shadow-sm hover:shadow-md hover:border-indigo-300' 
        : 'bg-slate-900 border-slate-800 text-white hover:border-slate-700'
    } ${isCompared ? 'ring-2 ring-indigo-500' : ''}`}>
      
      {/* Product Image & Badges */}
      <div className={`relative aspect-video sm:aspect-4/3 overflow-hidden ${isLight ? 'bg-slate-100' : 'bg-slate-950'}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${isLight ? 'from-black/50 via-transparent' : 'from-slate-950 via-transparent'} opacity-80`} />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
          {product.badge && (
            <span className="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-indigo-600 text-white shadow-sm flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-300" />
              {product.badge}
            </span>
          )}
          <span className="px-2 py-0.5 rounded-lg text-[11px] font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 backdrop-blur-xs flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Verified Spec
          </span>
        </div>

        {discountPercent > 0 && (
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg text-[11px] font-bold bg-amber-500 text-slate-950 shadow-sm">
            {discountPercent}% OFF
          </div>
        )}

        {/* Brand overlay */}
        <div className="absolute bottom-2 left-2.5">
          <span className="text-[11px] font-bold text-white uppercase tracking-wider drop-shadow-sm">
            {product.brand}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Rating */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className={`font-bold text-base leading-snug line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {product.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center text-amber-500 text-xs font-bold gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <span>{product.rating}</span>
            </div>
            <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              ({product.reviewsCount.toLocaleString('en-IN')} reviews)
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className={`text-xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className={`text-xs line-through ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Spec Snapshot Pills */}
          {!compact && (
            <div className="space-y-1.5 mb-4 text-xs">
              <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border ${
                isLight ? 'bg-slate-50 border-slate-200/90 text-slate-700' : 'bg-slate-950/60 border-slate-800 text-slate-300'
              }`}>
                <Cpu className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span className="truncate">{product.specs.processor}</span>
              </div>
              <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border ${
                isLight ? 'bg-slate-50 border-slate-200/90 text-slate-700' : 'bg-slate-950/60 border-slate-800 text-slate-300'
              }`}>
                <Battery className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate">{product.specs.battery}</span>
              </div>
              <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border ${
                isLight ? 'bg-slate-50 border-slate-200/90 text-slate-700' : 'bg-slate-950/60 border-slate-800 text-slate-300'
              }`}>
                <Smartphone className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <span className="truncate">{product.specs.ram} | {product.specs.storage}</span>
              </div>
            </div>
          )}

          {/* Target usecase */}
          <p className={`text-xs line-clamp-2 mb-4 italic ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            "{product.bestFor}"
          </p>
        </div>

        {/* Primary Order Action */}
        <div className={`space-y-2 pt-2 border-t ${isLight ? 'border-slate-100' : 'border-slate-800/80'}`}>
          <div className="flex items-center gap-2">
            {onDirectOrder && (
              <button
                onClick={() => onDirectOrder(product)}
                className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-sm shadow-emerald-950 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Order Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {onAddToCart && (
              <button
                onClick={() => onAddToCart(product)}
                className={`p-2 rounded-xl transition-colors border ${
                  isLight 
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
                title="Add to Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </button>
            )}
          </div>

          {/* Secondary Actions: Compare, Details, Ask */}
          <div className="flex items-center gap-1.5 pt-1">
            {onSelectCompare && (
              <button
                onClick={() => onSelectCompare(product)}
                className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition-all ${
                  isCompared
                    ? 'bg-indigo-600/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/50'
                    : isLight 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200' 
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-750'
                }`}
              >
                {isCompared ? (
                  <>
                    <Check className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                    <span>Compared</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3 h-3" />
                    <span>Compare</span>
                  </>
                )}
              </button>
            )}

            {onViewDetails && (
              <button
                onClick={() => onViewDetails(product)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isLight 
                    ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="View Complete Specifications"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            )}

            {onAskAboutProduct && (
              <button
                onClick={() => onAskAboutProduct(product)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isLight 
                    ? 'text-indigo-600 hover:bg-indigo-50' 
                    : 'text-indigo-400 hover:text-indigo-300 hover:bg-slate-800'
                }`}
                title="Ask Assistant about this product"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
