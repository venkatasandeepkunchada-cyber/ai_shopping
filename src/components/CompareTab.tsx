import React, { useState } from 'react';
import { 
  Scale, 
  Trash2, 
  Zap, 
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2
} from 'lucide-react';
import { Product, PRODUCTS } from '../data/products.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface CompareTabProps {
  comparedProducts: Product[];
  onRemoveProduct: (id: string) => void;
  onAddProduct: (product: Product) => void;
  onClearAll: () => void;
  onAskChatbotToCompare: (products: Product[]) => void;
}

export const CompareTab: React.FC<CompareTabProps> = ({
  comparedProducts,
  onRemoveProduct,
  onAddProduct,
  onClearAll,
  onAskChatbotToCompare,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light' || theme === 'sunset';

  const [selectedAddId, setSelectedAddId] = useState('');

  const availableToAdd = PRODUCTS.filter(
    (p) => !comparedProducts.some((cp) => cp.id === p.id)
  );

  const handleSelectAdd = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (!id) return;
    const prod = PRODUCTS.find((p) => p.id === id);
    if (prod && comparedProducts.length < 3) {
      onAddProduct(prod);
      setSelectedAddId('');
    }
  };

  const getCheapest = () => {
    if (comparedProducts.length < 2) return null;
    return [...comparedProducts].sort((a, b) => a.price - b.price)[0];
  };

  const getBestGaming = () => {
    if (comparedProducts.length < 2) return null;
    return [...comparedProducts].sort((a, b) => b.useCaseScores.gaming - a.useCaseScores.gaming)[0];
  };

  const getBestBattery = () => {
    if (comparedProducts.length < 2) return null;
    return [...comparedProducts].sort((a, b) => b.useCaseScores.batteryLife - a.useCaseScores.batteryLife)[0];
  };

  const cheapest = getCheapest();
  const bestGaming = getBestGaming();
  const bestBattery = getBestBattery();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 space-y-6">
      
      {/* Header */}
      <div className={`rounded-2xl p-6 border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
        isLight ? 'bg-white border-slate-200/90 text-slate-800' : 'bg-slate-900 border-slate-800 text-white'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Scale className="w-5 h-5 text-indigo-500" />
            <h2 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Side-by-Side Product Comparison
            </h2>
            <span className="text-xs bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full font-bold">
              {comparedProducts.length} / 3 Selected
            </span>
          </div>
          <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Compare verified prices, technical specifications, advantages, and trade-offs directly.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {comparedProducts.length < 3 && availableToAdd.length > 0 && (
            <div className="relative">
              <select
                value={selectedAddId}
                onChange={handleSelectAdd}
                className={`text-xs rounded-xl px-3 py-2 pr-8 border focus:outline-hidden focus:border-indigo-500 cursor-pointer font-semibold ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                <option value="">+ Add Product to Compare</option>
                {availableToAdd.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (₹{p.price.toLocaleString('en-IN')})
                  </option>
                ))}
              </select>
            </div>
          )}

          {comparedProducts.length > 0 && (
            <button
              onClick={onClearAll}
              className={`text-xs px-3 py-2 rounded-xl border transition-colors flex items-center gap-1.5 ${
                isLight
                  ? 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border-slate-200'
                  : 'bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border-slate-700'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}

          {comparedProducts.length >= 2 && (
            <button
              onClick={() => onAskChatbotToCompare(comparedProducts)}
              className="text-xs px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Trade-off Verdict</span>
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {comparedProducts.length === 0 ? (
        <div className={`rounded-2xl p-12 text-center space-y-4 border ${
          isLight ? 'bg-white border-dashed border-slate-300' : 'bg-slate-900/60 border-dashed border-slate-800'
        }`}>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto ${
            isLight ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-indigo-950/50 border border-indigo-800 text-indigo-400'
          }`}>
            <Scale className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto">
            <h3 className={`text-lg font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              No Products in Comparison
            </h3>
            <p className={`text-xs mb-6 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Select 2 or 3 products from our catalog or assistant suggestions to view a detailed spec comparison matrix.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => {
                  const p1 = PRODUCTS.find((p) => p.id === 'phone-1');
                  const p2 = PRODUCTS.find((p) => p.id === 'phone-2');
                  if (p1) onAddProduct(p1);
                  if (p2) onAddProduct(p2);
                }}
                className={`text-xs px-3.5 py-2 rounded-xl font-semibold flex items-center gap-1.5 border transition-all ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-indigo-700 border-slate-200'
                    : 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-slate-700'
                }`}
              >
                <span>Compare OnePlus Nord CE4 vs POCO X6 Pro</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={() => {
                  const l1 = PRODUCTS.find((p) => p.id === 'laptop-1');
                  const l2 = PRODUCTS.find((p) => p.id === 'laptop-2');
                  if (l1) onAddProduct(l1);
                  if (l2) onAddProduct(l2);
                }}
                className={`text-xs px-3.5 py-2 rounded-xl font-semibold flex items-center gap-1.5 border transition-all ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-indigo-700 border-slate-200'
                    : 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-slate-700'
                }`}
              >
                <span>Compare ASUS Vivobook vs Lenovo IdeaPad</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      ) : comparedProducts.length === 1 ? (
        <div className={`rounded-2xl p-6 text-center border ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <p className="text-sm text-amber-600 dark:text-amber-300 font-semibold mb-4">
            You have selected 1 product (<strong>{comparedProducts[0].name}</strong>). Add at least one more to compare!
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {availableToAdd.slice(0, 4).map((p) => (
              <button
                key={p.id}
                onClick={() => onAddProduct(p)}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-colors ${
                  isLight
                    ? 'bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 border-slate-200'
                    : 'bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 border-slate-700'
                }`}
              >
                + Add {p.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Side-by-Side Comparison Matrix */
        <div className="space-y-6">
          
          {/* Quick Winner Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {cheapest && (
              <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
                isLight ? 'bg-emerald-50 border-emerald-200' : 'bg-emerald-950/30 border-emerald-800/60'
              }`}>
                <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                    Best Budget Pick
                  </span>
                  <span className={`text-xs font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {cheapest.name} (₹{cheapest.price.toLocaleString('en-IN')})
                  </span>
                </div>
              </div>
            )}

            {bestGaming && (
              <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
                isLight ? 'bg-indigo-50 border-indigo-200' : 'bg-indigo-950/30 border-indigo-800/60'
              }`}>
                <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider block">
                    Top Performance & Gaming
                  </span>
                  <span className={`text-xs font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {bestGaming.name} ({bestGaming.useCaseScores.gaming}/10)
                  </span>
                </div>
              </div>
            )}

            {bestBattery && (
              <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
                isLight ? 'bg-amber-50 border-amber-200' : 'bg-amber-950/30 border-amber-800/60'
              }`}>
                <div className="p-2 bg-amber-500 text-slate-950 rounded-xl shadow-xs">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                    Best Battery Endurance
                  </span>
                  <span className={`text-xs font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {bestBattery.name} ({bestBattery.useCaseScores.batteryLife}/10)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Table Container */}
          <div className={`rounded-2xl border overflow-hidden shadow-xs ${
            isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-200'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                
                {/* Header Row */}
                <thead>
                  <tr className={`border-b ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'}`}>
                    <th className={`p-4 w-44 font-bold text-xs uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Product Overview
                    </th>
                    {comparedProducts.map((p) => (
                      <th key={p.id} className="p-4 min-w-[240px] align-top">
                        <div className="space-y-3">
                          <div className={`relative aspect-video rounded-xl overflow-hidden border ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                            <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                            <button
                              onClick={() => onRemoveProduct(p.id)}
                              className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-rose-600 text-white transition-colors"
                              title="Remove from comparison"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div>
                            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 uppercase font-bold tracking-wider">{p.brand}</span>
                            <h4 className={`font-bold text-base leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>{p.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-lg font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>₹{p.price.toLocaleString('en-IN')}</span>
                              <span className={`text-xs line-through ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>₹{p.originalPrice.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex items-center text-amber-500 text-xs font-bold gap-1 mt-1">
                              <Star className="w-3 h-3 fill-amber-500" />
                              <span>{p.rating} / 5</span>
                              <span className={isLight ? 'text-slate-400 font-normal' : 'text-slate-500 font-normal'}>({p.reviewsCount.toLocaleString('en-IN')})</span>
                            </div>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className={`divide-y text-xs ${isLight ? 'divide-slate-100' : 'divide-slate-800/80'}`}>
                  {/* Best For Row */}
                  <tr className={isLight ? 'bg-slate-50/50' : 'bg-slate-900/40'}>
                    <td className={`p-4 font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Intended Ideal Use</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 font-semibold text-indigo-600 dark:text-indigo-300 italic">
                        "{p.bestFor}"
                      </td>
                    ))}
                  </tr>

                  {/* Processor */}
                  <tr>
                    <td className={`p-4 font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Processor / SoC</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className={`p-4 font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {p.specs.processor}
                      </td>
                    ))}
                  </tr>

                  {/* RAM & Storage */}
                  <tr className={isLight ? 'bg-slate-50/50' : 'bg-slate-950/30'}>
                    <td className={`p-4 font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>RAM & Storage</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4">
                        <div><strong>RAM:</strong> {p.specs.ram}</div>
                        <div><strong>Storage:</strong> {p.specs.storage}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Display */}
                  <tr>
                    <td className={`p-4 font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Display</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4">
                        {p.specs.display}
                      </td>
                    ))}
                  </tr>

                  {/* Battery & Charging */}
                  <tr className={isLight ? 'bg-slate-50/50' : 'bg-slate-950/30'}>
                    <td className={`p-4 font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Battery & Charging</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4">
                        <div className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{p.specs.battery}</div>
                        <div className="text-emerald-600 dark:text-emerald-400 font-semibold">{p.specs.charging || 'Standard Charging'}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Scores */}
                  <tr>
                    <td className={`p-4 font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Ratings (out of 10)</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 space-y-1.5">
                        <div className="flex justify-between">
                          <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Gaming:</span>
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">{p.useCaseScores.gaming}/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Battery:</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">{p.useCaseScores.batteryLife}/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Camera:</span>
                          <span className="font-bold text-sky-600 dark:text-sky-400">{p.useCaseScores.photography}/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Value:</span>
                          <span className="font-bold text-amber-600 dark:text-amber-400">{p.useCaseScores.valueForMoney}/10</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Pros */}
                  <tr className={isLight ? 'bg-emerald-50/40' : 'bg-emerald-950/10'}>
                    <td className="p-4 font-bold text-emerald-700 dark:text-emerald-400">Key Advantages</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4">
                        <ul className="space-y-1">
                          {p.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Cons */}
                  <tr className={isLight ? 'bg-rose-50/40' : 'bg-rose-950/10'}>
                    <td className="p-4 font-bold text-rose-700 dark:text-rose-400">Trade-offs</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4">
                        <ul className="space-y-1">
                          {p.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-rose-600 dark:text-rose-400 font-bold">✗</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>

              </table>
            </div>
          </div>

          {/* Verdict Box */}
          <div className={`rounded-2xl p-6 border shadow-xs space-y-3 ${
            isLight
              ? 'bg-gradient-to-r from-indigo-50/80 via-white to-white border-indigo-200'
              : 'bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border-indigo-800/60'
          }`}>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-amber-400" />
              <h3 className={`font-bold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Assistant Verdict: Which Should You Buy?
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              {comparedProducts.map((p) => (
                <div key={p.id} className={`p-4 rounded-xl border ${
                  isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-950/60 border-slate-800'
                }`}>
                  <h4 className="font-bold text-sm text-indigo-600 dark:text-indigo-300 mb-1">
                    Buy {p.name} (₹{p.price.toLocaleString('en-IN')}) if:
                  </h4>
                  <p className={`mb-2 font-medium ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                    You prioritize <strong>{p.bestFor}</strong>.
                  </p>
                  <div className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Standout features: {p.keyHighlights.slice(0, 2).join(' • ')}
                  </div>
                </div>
              ))}
            </div>

            <div className={`pt-3 border-t flex justify-end ${isLight ? 'border-indigo-100' : 'border-slate-800'}`}>
              <button
                onClick={() => onAskChatbotToCompare(comparedProducts)}
                className="text-xs px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all flex items-center gap-2"
              >
                <span>Discuss this comparison in Chatbot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
