import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  CheckCircle2, 
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { Product, PRODUCTS, CATEGORIES } from '../data/products.ts';
import { ShoppingFilters } from '../types.ts';
import { ProductCard } from './ProductCard.tsx';
import { useTheme } from '../context/ThemeContext.tsx';

interface CatalogTabProps {
  filters: ShoppingFilters;
  onUpdateFilters: (newFilters: Partial<ShoppingFilters>) => void;
  comparedProducts: Product[];
  onToggleCompare: (product: Product) => void;
  onViewProductDetails: (product: Product) => void;
  onAskAboutProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onDirectOrder: (product: Product) => void;
}

export const CatalogTab: React.FC<CatalogTabProps> = ({
  filters,
  onUpdateFilters,
  comparedProducts,
  onToggleCompare,
  onViewProductDetails,
  onAskAboutProduct,
  onAddToCart,
  onDirectOrder,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light' || theme === 'sunset';

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'priceAsc' | 'priceDesc' | 'rating' | 'gaming'>('recommended');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (filters.category !== 'all' && p.category !== filters.category) {
        return false;
      }
      if (filters.minPrice && p.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && p.price > filters.maxPrice) {
        return false;
      }
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(term);
        const matchesBrand = p.brand.toLowerCase().includes(term);
        const matchesSpecs = JSON.stringify(p.specs).toLowerCase().includes(term);
        const matchesBestFor = p.bestFor.toLowerCase().includes(term);
        if (!matchesName && !matchesBrand && !matchesSpecs && !matchesBestFor) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'gaming') return b.useCaseScores.gaming - a.useCaseScores.gaming;
      return b.useCaseScores.valueForMoney - a.useCaseScores.valueForMoney;
    });
  }, [filters, searchTerm, sortBy]);

  const resetAllFilters = () => {
    setSearchTerm('');
    onUpdateFilters({
      category: 'all',
      minPrice: 0,
      maxPrice: 100000,
      priority: 'balanced'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 space-y-6">
      
      {/* Search & Filter Header Card */}
      <div className={`rounded-2xl p-6 border shadow-xs space-y-5 transition-colors ${
        isLight ? 'bg-white border-slate-200/90 text-slate-800' : 'bg-slate-900 border-slate-800 text-white'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-5 h-5 text-indigo-500" />
              <h2 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Verified Products Catalog
              </h2>
              <span className="text-xs bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                Verified Specs
              </span>
            </div>
            <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Browse authentic market electronics in India with real benchmark specs and 1-click express ordering.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isLight ? 'text-slate-400' : 'text-slate-400'}`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by brand, phone, chip..."
              className={`w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border focus:outline-hidden focus:border-indigo-500 transition-colors ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white' : 'bg-slate-950 border-slate-700 text-white placeholder:text-slate-500'
              }`}
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className={`flex flex-wrap gap-2 pt-2 border-t ${isLight ? 'border-slate-100' : 'border-slate-800/80'}`}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onUpdateFilters({ category: cat.id })}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filters.category === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80'
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Budget Slider & Sorter Controls */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t items-center ${
          isLight ? 'border-slate-100' : 'border-slate-800/80'
        }`}>
          {/* Budget Range */}
          <div className="sm:col-span-2">
            <div className={`flex justify-between text-xs font-bold mb-1.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <span>Budget Window: Up to</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">
                ₹{filters.maxPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="100000"
              step="2000"
              value={filters.maxPrice}
              onChange={(e) => onUpdateFilters({ maxPrice: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className={`flex justify-between text-[10px] mt-1 ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
              <span>₹2,000 (Accessories/Audio)</span>
              <span>₹25,000 (Mid-range)</span>
              <span>₹50,000 (Performance)</span>
              <span>₹1,00,000 (Flagships)</span>
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div>
            <label className={`text-xs font-bold block mb-1.5 flex items-center gap-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <ArrowUpDown className="w-3 h-3 text-indigo-500" />
              <span>Sort By</span>
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={`w-full text-xs px-3 py-2 rounded-xl border focus:outline-hidden focus:border-indigo-500 font-medium ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-700 text-white'
              }`}
            >
              <option value="recommended">Recommended (Best Value)</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="rating">User Ratings (Highest)</option>
              <option value="gaming">Gaming & Performance Score</option>
            </select>
          </div>
        </div>

      </div>

      {/* Catalog Results Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Showing <strong className={isLight ? 'text-slate-900 font-bold' : 'text-white'}>{filteredProducts.length}</strong> verified products
          </span>

          {(filters.category !== 'all' || filters.maxPrice < 100000 || searchTerm) && (
            <button
              onClick={resetAllFilters}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className={`rounded-2xl p-12 text-center space-y-4 border ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto ${
              isLight ? 'bg-slate-100 text-slate-400' : 'bg-slate-800 text-slate-400'
            }`}>
              <Filter className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`text-base font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                No products match your budget filter
              </h3>
              <p className={`text-xs max-w-sm mx-auto mb-4 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                No items found under ₹{filters.maxPrice.toLocaleString('en-IN')} in category "{filters.category}". Try increasing your budget or changing the category.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map((product) => {
              const isCompared = comparedProducts.some((c) => c.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectCompare={() => onToggleCompare(product)}
                  isCompared={isCompared}
                  onAddToCart={() => onAddToCart(product)}
                  onDirectOrder={() => onDirectOrder(product)}
                  onAskAboutProduct={onAskAboutProduct}
                  onViewDetails={onViewProductDetails}
                />
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
