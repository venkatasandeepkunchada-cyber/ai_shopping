import React from 'react';
import { 
  Bot, 
  Scale, 
  Layers, 
  BookOpen, 
  ShoppingBag, 
  PackageCheck,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { ActiveTab } from '../types.ts';
import { useTheme } from '../context/ThemeContext.tsx';
import { ThemeSelector } from './ThemeSelector.tsx';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  compareCount: number;
  cartCount: number;
  ordersCount: number;
  onOpenCart: () => void;
  onResetChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  compareCount,
  cartCount,
  ordersCount,
  onOpenCart,
  onResetChat
}) => {
  const { themeColors } = useTheme();

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md transition-colors ${themeColors.navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${themeColors.brandGradient} flex items-center justify-center shadow-md text-white`}>
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-bold text-lg tracking-tight ${themeColors.textHeading}`}>
                  AI Shopping Assistant
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                  <Sparkles className="w-3 h-3 mr-1 text-emerald-500" />
                  Instant Orders
                </span>
              </div>
              <p className={`text-xs ${themeColors.textMuted} hidden sm:block`}>
                Budget recommendations, side-by-side comparisons & verified specs
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'chat'
                  ? `${themeColors.primaryBtn}`
                  : `${themeColors.textBody} hover:${themeColors.textHeading} hover:bg-slate-200/50 dark:hover:bg-slate-800/60`
              }`}
            >
              <Bot className="w-4 h-4" />
              <span className="hidden md:inline">Assistant Chat</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'catalog'
                  ? `${themeColors.primaryBtn}`
                  : `${themeColors.textBody} hover:${themeColors.textHeading} hover:bg-slate-200/50 dark:hover:bg-slate-800/60`
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="hidden md:inline">Products</span>
            </button>

            <button
              onClick={() => setActiveTab('compare')}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'compare'
                  ? `${themeColors.primaryBtn}`
                  : `${themeColors.textBody} hover:${themeColors.textHeading} hover:bg-slate-200/50 dark:hover:bg-slate-800/60`
              }`}
            >
              <Scale className="w-4 h-4" />
              <span className="hidden md:inline">Compare</span>
              {compareCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs font-bold bg-amber-500 text-slate-950">
                  {compareCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'orders'
                  ? `${themeColors.primaryBtn}`
                  : `${themeColors.textBody} hover:${themeColors.textHeading} hover:bg-slate-200/50 dark:hover:bg-slate-800/60`
              }`}
            >
              <PackageCheck className="w-4 h-4" />
              <span className="hidden md:inline">My Orders</span>
              {ordersCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs font-bold bg-emerald-500 text-white">
                  {ordersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('glossary')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'glossary'
                  ? `${themeColors.primaryBtn}`
                  : `${themeColors.textBody} hover:${themeColors.textHeading} hover:bg-slate-200/50 dark:hover:bg-slate-800/60`
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden md:inline">Tech Decoded</span>
            </button>
          </nav>

          {/* Cart, Theme Switcher & Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Selector */}
            <ThemeSelector />

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold transition-all shadow-sm shadow-emerald-700/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 ? (
                <span className="px-1.5 py-0.5 rounded-full text-xs font-bold bg-white text-emerald-900 leading-none">
                  {cartCount}
                </span>
              ) : (
                <span className="text-emerald-100 text-xs hidden sm:inline">(0)</span>
              )}
            </button>

            {/* Reset Chat */}
            <button
              onClick={onResetChat}
              title="Reset Conversation"
              className={`p-2 ${themeColors.textMuted} hover:${themeColors.textHeading} rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors`}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
