import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  RotateCcw, 
  Bot, 
  User, 
  SlidersHorizontal, 
  Scale, 
  CheckCircle2, 
  AlertCircle,
  Zap,
  Tag,
  ArrowRight
} from 'lucide-react';
import { ChatMessage, ShoppingFilters } from '../types.ts';
import { Product, PRODUCTS } from '../data/products.ts';
import { ProductCard } from './ProductCard.tsx';
import { useTheme } from '../context/ThemeContext.tsx';

interface ChatTabProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  onResetChat: () => void;
  filters: ShoppingFilters;
  onUpdateFilters: (newFilters: Partial<ShoppingFilters>) => void;
  comparedProducts: Product[];
  onToggleCompare: (product: Product) => void;
  onViewProductDetails: (product: Product) => void;
  onNavigateToCompare: () => void;
  onAddToCart: (product: Product) => void;
  onDirectOrder: (product: Product) => void;
}

export const ChatTab: React.FC<ChatTabProps> = ({
  messages,
  onSendMessage,
  isLoading,
  onResetChat,
  filters,
  onUpdateFilters,
  comparedProducts,
  onToggleCompare,
  onViewProductDetails,
  onNavigateToCompare,
  onAddToCart,
  onDirectOrder
}) => {
  const { theme, themeColors } = useTheme();
  const isLight = theme === 'light' || theme === 'sunset';

  const [inputText, setInputText] = useState('');
  const [showFilterBar, setShowFilterBar] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    const text = inputText.trim();
    setInputText('');
    onSendMessage(text);
  };

  const starterPrompts = [
    {
      label: '📱 Phone under ₹20,000 for gaming & battery',
      query: 'I want to buy a mobile phone under ₹20,000. I need it for gaming and long battery life.'
    },
    {
      label: '🛍️ Order OnePlus Nord CE4',
      query: 'I want to order the OnePlus Nord CE4. How do I proceed with payment and delivery?'
    },
    {
      label: '💻 Best laptop for coding under ₹50,000',
      query: 'What is the best laptop for coding and multitasking under ₹50,000?'
    },
    {
      label: '⚖️ Compare OnePlus Nord CE4 vs Poco X6 Pro',
      query: 'Compare OnePlus Nord CE4 and Poco X6 Pro for gaming and everyday battery life.'
    },
    {
      label: '🎧 Best ANC headphones under ₹5,000',
      query: 'Recommend the best headphones or earbuds with active noise cancellation under ₹5,000.'
    }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-5xl mx-auto px-4 py-4 sm:px-6">
      
      {/* Top Filter & Budget Pill Bar */}
      <div className={`mb-3 rounded-2xl p-3 shadow-xs border transition-colors ${
        isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-white'
      }`}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilterBar(!showFilterBar)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors border ${
                isLight 
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200' 
                  : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500" />
              <span>Budget & Category Filters</span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold ml-1">
                {filters.category !== 'all' ? filters.category : 'All'} • ≤₹{(filters.maxPrice).toLocaleString('en-IN')}
              </span>
            </button>

            {comparedProducts.length > 0 && (
              <button
                onClick={onNavigateToCompare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-all"
              >
                <Scale className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>{comparedProducts.length} in Comparison</span>
                <ArrowRight className="w-3 h-3 ml-0.5" />
              </button>
            )}
          </div>

          <div className={`flex items-center gap-2 text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Verified Catalog & Instant Order
            </span>
            <button
              onClick={onResetChat}
              className={`transition-colors flex items-center gap-1 ml-2 ${
                isLight ? 'text-slate-400 hover:text-slate-700' : 'text-slate-400 hover:text-white'
              }`}
              title="Clear Chat History"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Expandable Filter Details */}
        {showFilterBar && (
          <div className={`mt-3 pt-3 border-t grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fade-in ${
            isLight ? 'border-slate-100' : 'border-slate-800'
          }`}>
            {/* Category */}
            <div>
              <label className={`text-[11px] font-bold block mb-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => onUpdateFilters({ category: e.target.value })}
                className={`w-full rounded-xl text-xs px-2.5 py-1.5 border focus:border-indigo-500 focus:outline-hidden ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                }`}
              >
                <option value="all">All Categories</option>
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="smartwatches">Smartwatches</option>
                <option value="audio">Headphones & Audio</option>
                <option value="tablets">Tablets</option>
              </select>
            </div>

            {/* Max Budget */}
            <div>
              <div className={`flex justify-between text-[11px] font-bold mb-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <span>Maximum Budget</span>
                <span className="text-indigo-600 dark:text-indigo-400">₹{filters.maxPrice.toLocaleString('en-IN')}</span>
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
            </div>

            {/* Priority */}
            <div>
              <label className={`text-[11px] font-bold block mb-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Primary Priority
              </label>
              <select
                value={filters.priority}
                onChange={(e) => onUpdateFilters({ priority: e.target.value as any })}
                className={`w-full rounded-xl text-xs px-2.5 py-1.5 border focus:border-indigo-500 focus:outline-hidden ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                }`}
              >
                <option value="balanced">Balanced / All-Rounder</option>
                <option value="gaming">Gaming & Performance</option>
                <option value="battery">Long Battery Life</option>
                <option value="camera">Camera & Photography</option>
                <option value="productivity">Coding & Productivity</option>
                <option value="value">Best Value for Money</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          
          const recProducts = (msg.recommendedProductIds || [])
            .map((id) => PRODUCTS.find((p) => p.id === id))
            .filter(Boolean) as Product[];

          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {/* Avatar */}
              {!isUser && (
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${themeColors.brandGradient} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                  <Bot className="w-4 h-4" />
                </div>
              )}

              {/* Message Bubble Container */}
              <div className={`max-w-[85%] sm:max-w-[78%] space-y-2`}>
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-tr-xs shadow-sm'
                      : isLight
                        ? 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs shadow-xs'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-xs'
                  }`}
                >
                  {/* Assistant Header Tag */}
                  {!isUser && (
                    <div className={`flex items-center gap-1.5 text-[11px] mb-2 pb-1.5 border-b ${
                      isLight ? 'border-slate-100 text-slate-500' : 'border-slate-800 text-slate-400'
                    }`}>
                      <Sparkles className="w-3 h-3 text-emerald-500" />
                      <span className={`font-bold ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                        AI Shopping Assistant
                      </span>
                      {msg.isAiGrounded && (
                        <span className="ml-auto text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified Database Specs
                        </span>
                      )}
                    </div>
                  )}

                  {/* Message Text Rendering */}
                  <div className="whitespace-pre-wrap space-y-2">
                    {msg.text.split('\n\n').map((paragraph, idx) => {
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h3 key={idx} className={`font-bold text-base mt-2 mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                            {paragraph.replace('### ', '')}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith('#### ')) {
                        return (
                          <h4 key={idx} className="font-semibold text-sm text-indigo-600 dark:text-indigo-300 mt-2 mb-0.5">
                            {paragraph.replace('#### ', '')}
                          </h4>
                        );
                      }
                      return <p key={idx}>{paragraph}</p>;
                    })}
                  </div>

                  {msg.errorNote && (
                    <div className="mt-2 text-xs text-amber-700 dark:text-amber-300 flex items-center gap-1 bg-amber-50 dark:bg-amber-950/30 p-2 rounded-lg border border-amber-200 dark:border-amber-900">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{msg.errorNote}</span>
                    </div>
                  )}
                </div>

                {/* Recommended Product Cards with Direct Order & Cart Action */}
                {!isUser && recProducts.length > 0 && (
                  <div className="pt-1">
                    <div className={`text-xs font-bold mb-2 flex items-center gap-1.5 ${
                      isLight ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      <Tag className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Matched Products Available to Order ({recProducts.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {recProducts.map((p) => {
                        const isCompared = comparedProducts.some((c) => c.id === p.id);
                        return (
                          <ProductCard
                            key={p.id}
                            product={p}
                            onSelectCompare={() => onToggleCompare(p)}
                            isCompared={isCompared}
                            onAddToCart={() => onAddToCart(p)}
                            onDirectOrder={() => onDirectOrder(p)}
                            onAskAboutProduct={(prod) =>
                              onSendMessage(`Tell me more about ${prod.name} and why I should order it over alternatives.`)
                            }
                            onViewDetails={() => onViewProductDetails(p)}
                            compact={false}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Follow-up Suggestion Chips */}
                {!isUser && msg.followUpSuggestions && msg.followUpSuggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.followUpSuggestions.map((suggestion, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => onSendMessage(suggestion)}
                        className={`text-xs px-2.5 py-1 rounded-full transition-all text-left flex items-center gap-1 font-medium border ${
                          isLight
                            ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
                            : 'bg-slate-800/80 hover:bg-slate-750 text-slate-300 border-slate-700/80 hover:text-white'
                        }`}
                      >
                        <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                        <span>{suggestion}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* User Avatar */}
              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${themeColors.brandGradient} flex items-center justify-center text-white shrink-0`}>
              <Bot className="w-4 h-4" />
            </div>
            <div className={`rounded-2xl px-4 py-3 text-sm flex items-center gap-3 border ${
              isLight ? 'bg-white border-slate-200 text-slate-700 shadow-xs' : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Searching verified database specs & preparing recommendations...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompts */}
      {messages.length <= 1 && (
        <div className="py-2">
          <div className={`text-xs font-bold mb-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            💡 Quick Questions & Order Actions:
          </div>
          <div className="flex flex-wrap gap-2">
            {starterPrompts.map((sp, idx) => (
              <button
                key={idx}
                onClick={() => onSendMessage(sp.query)}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all text-left font-medium ${
                  isLight
                    ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90 shadow-xs hover:border-indigo-300 hover:text-indigo-600'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-indigo-500/50 hover:text-white'
                }`}
              >
                {sp.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Bar Form */}
      <form onSubmit={handleSubmit} className="pt-2">
        <div className={`relative flex items-center rounded-2xl border transition-all shadow-sm ${
          isLight
            ? 'bg-white border-slate-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20'
            : 'bg-slate-900 border-slate-800 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500'
        }`}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask for recommendations, compare specs, or type 'Order OnePlus Nord CE4'..."
            className={`w-full bg-transparent text-sm px-4 py-3.5 pr-12 focus:outline-hidden ${
              isLight ? 'text-slate-900 placeholder:text-slate-400' : 'text-white placeholder:text-slate-500'
            }`}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={`absolute right-2 p-2 rounded-xl transition-all ${
              inputText.trim() && !isLoading
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
                : isLight ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className={`text-[11px] mt-1.5 text-center ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
          Verified database integration prevents false pricing or fabricated specs. Order directly with 1 click.
        </p>
      </form>

    </div>
  );
};
