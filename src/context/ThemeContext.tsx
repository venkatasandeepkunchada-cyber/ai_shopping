import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppTheme = 'light' | 'dark' | 'emerald' | 'sunset';

export interface ThemeColors {
  id: AppTheme;
  name: string;
  icon: string;
  pageBg: string;
  navBg: string;
  navBorder: string;
  cardBg: string;
  cardBorder: string;
  surfaceBg: string;
  surfaceBorder: string;
  inputBg: string;
  inputBorder: string;
  textHeading: string;
  textBody: string;
  textMuted: string;
  brandGradient: string;
  primaryBtn: string;
  secondaryBtn: string;
  accentPill: string;
  codeBg: string;
}

export const THEMES: Record<AppTheme, ThemeColors> = {
  light: {
    id: 'light',
    name: 'Studio Light',
    icon: '☀️',
    pageBg: 'bg-slate-100 text-slate-900',
    navBg: 'bg-white/95 border-b border-slate-200/90 text-slate-900 shadow-xs',
    navBorder: 'border-slate-200',
    cardBg: 'bg-white border-slate-200/90 text-slate-900 shadow-xs hover:border-slate-300',
    cardBorder: 'border-slate-200',
    surfaceBg: 'bg-white border-slate-200/90',
    surfaceBorder: 'border-slate-200',
    inputBg: 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white',
    inputBorder: 'border-slate-300',
    textHeading: 'text-slate-900',
    textBody: 'text-slate-700',
    textMuted: 'text-slate-500',
    brandGradient: 'from-indigo-600 via-blue-600 to-indigo-500',
    primaryBtn: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/20',
    secondaryBtn: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200',
    accentPill: 'bg-indigo-50 text-indigo-700 border border-indigo-200/80',
    codeBg: 'bg-slate-50 border-slate-200 text-slate-800',
  },
  dark: {
    id: 'dark',
    name: 'Midnight Dark',
    icon: '🌙',
    pageBg: 'bg-slate-950 text-slate-100',
    navBg: 'bg-slate-900/95 border-b border-slate-800 text-white',
    navBorder: 'border-slate-800',
    cardBg: 'bg-slate-900 border-slate-800 text-white shadow-xs hover:border-slate-700',
    cardBorder: 'border-slate-800',
    surfaceBg: 'bg-slate-900 border-slate-800',
    surfaceBorder: 'border-slate-800',
    inputBg: 'bg-slate-950 border-slate-700 text-white placeholder:text-slate-500',
    inputBorder: 'border-slate-700',
    textHeading: 'text-white',
    textBody: 'text-slate-300',
    textMuted: 'text-slate-400',
    brandGradient: 'from-indigo-600 via-violet-600 to-amber-500',
    primaryBtn: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30',
    secondaryBtn: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700',
    accentPill: 'bg-indigo-950/60 text-indigo-300 border border-indigo-800/80',
    codeBg: 'bg-slate-950 border-slate-800 text-slate-200',
  },
  emerald: {
    id: 'emerald',
    name: 'Nordic Emerald',
    icon: '🌲',
    pageBg: 'bg-[#061e17] text-emerald-50',
    navBg: 'bg-[#092a20]/95 border-b border-emerald-900/80 text-emerald-50',
    navBorder: 'border-emerald-900/80',
    cardBg: 'bg-[#0b3327] border-emerald-900 text-emerald-50 shadow-xs hover:border-emerald-700',
    cardBorder: 'border-emerald-900',
    surfaceBg: 'bg-[#0b3327] border-emerald-900',
    surfaceBorder: 'border-emerald-900',
    inputBg: 'bg-[#041611] border-emerald-800 text-emerald-100 placeholder:text-emerald-500/70',
    inputBorder: 'border-emerald-800',
    textHeading: 'text-white',
    textBody: 'text-emerald-100',
    textMuted: 'text-emerald-400/80',
    brandGradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    primaryBtn: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-900',
    secondaryBtn: 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-800',
    accentPill: 'bg-emerald-900/60 text-emerald-300 border border-emerald-700',
    codeBg: 'bg-[#041611] border-emerald-900 text-emerald-200',
  },
  sunset: {
    id: 'sunset',
    name: 'Warm Sunset',
    icon: '🌅',
    pageBg: 'bg-[#fffaf5] text-stone-900',
    navBg: 'bg-white/95 border-b border-orange-200/80 text-stone-900 shadow-xs',
    navBorder: 'border-orange-200',
    cardBg: 'bg-white border-orange-200/90 text-stone-900 shadow-xs hover:border-orange-300',
    cardBorder: 'border-orange-200',
    surfaceBg: 'bg-white border-orange-200/90',
    surfaceBorder: 'border-orange-200',
    inputBg: 'bg-orange-50/50 border-orange-200 text-stone-900 placeholder:text-stone-400 focus:bg-white',
    inputBorder: 'border-orange-200',
    textHeading: 'text-stone-900',
    textBody: 'text-stone-700',
    textMuted: 'text-stone-500',
    brandGradient: 'from-orange-500 via-amber-500 to-rose-500',
    primaryBtn: 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-sm shadow-orange-600/20',
    secondaryBtn: 'bg-orange-100/70 hover:bg-orange-200/70 text-orange-950 border border-orange-200',
    accentPill: 'bg-orange-100 text-orange-800 border border-orange-300',
    codeBg: 'bg-orange-50 border-orange-200 text-stone-800',
  },
};

interface ThemeContextType {
  theme: AppTheme;
  themeColors: ThemeColors;
  setTheme: (theme: AppTheme) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to the brand new 'light' Studio Light theme as requested!
  const [theme, setThemeState] = useState<AppTheme>(() => {
    const saved = localStorage.getItem('shopping_assistant_theme') as AppTheme;
    if (saved && THEMES[saved]) return saved;
    return 'light'; // New default theme!
  });

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('shopping_assistant_theme', newTheme);
  };

  const cycleTheme = () => {
    const list: AppTheme[] = ['light', 'dark', 'emerald', 'sunset'];
    const nextIdx = (list.indexOf(theme) + 1) % list.length;
    setTheme(list[nextIdx]);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeColors: THEMES[theme], setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
