import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Lightbulb, 
  HelpCircle, 
  ArrowRight, 
  Cpu, 
  Battery, 
  Eye, 
  HardDrive, 
  Camera, 
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { TECH_GLOSSARY, TechTerm } from '../data/techGlossary.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface TechExplainerTabProps {
  onAskAboutSpec: (term: string) => void;
}

export const TechExplainerTab: React.FC<TechExplainerTabProps> = ({ onAskAboutSpec }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light' || theme === 'sunset';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Specs' },
    { id: 'performance', label: 'Processor & RAM' },
    { id: 'display', label: 'Screen & Refresh Rate' },
    { id: 'battery', label: 'Battery & Wattage' },
    { id: 'storage', label: 'Storage & Speed' },
    { id: 'camera', label: 'Camera & Megapixels' },
    { id: 'build', label: 'Durability & IP Rating' },
  ];

  const filteredTerms = TECH_GLOSSARY.filter((t) => {
    if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return (
        t.term.toLowerCase().includes(term) ||
        t.simpleExplanation.toLowerCase().includes(term) ||
        t.everydayAnalogy.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const getCategoryIcon = (cat: TechTerm['category']) => {
    switch (cat) {
      case 'performance': return <Cpu className="w-4 h-4 text-indigo-500" />;
      case 'display': return <Eye className="w-4 h-4 text-sky-500" />;
      case 'battery': return <Battery className="w-4 h-4 text-emerald-500" />;
      case 'storage': return <HardDrive className="w-4 h-4 text-amber-500" />;
      case 'camera': return <Camera className="w-4 h-4 text-rose-500" />;
      case 'build': return <ShieldCheck className="w-4 h-4 text-teal-500" />;
      default: return <Lightbulb className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 space-y-6">
      
      {/* Header Banner */}
      <div className={`rounded-2xl p-6 border shadow-xs transition-colors ${
        isLight
          ? 'bg-gradient-to-r from-indigo-50 via-white to-white border-slate-200/90 text-slate-800'
          : 'bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-slate-800 text-white'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              <h2 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Spec Jargon Buster & Tech Explainer
              </h2>
              <span className="text-xs bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full font-bold">
                Plain English Decoded
              </span>
            </div>
            <p className={`text-xs sm:text-sm max-w-2xl ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Don't get tricked by marketing numbers. Here are honest explanations of technical jargon using real-world analogies and rules of thumb.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isLight ? 'text-slate-400' : 'text-slate-400'}`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search spec (e.g. RAM, Hz, OIS)..."
              className={`w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border focus:outline-hidden focus:border-indigo-500 ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                  : 'bg-slate-950 border-slate-700 text-white placeholder:text-slate-500'
              }`}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className={`flex flex-wrap gap-2 pt-4 mt-4 border-t ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === c.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/90'
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTerms.map((item, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-5 border transition-all flex flex-col justify-between space-y-4 shadow-xs ${
              isLight
                ? 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-md'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl border ${
                    isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-800'
                  }`}>
                    {getCategoryIcon(item.category)}
                  </div>
                  <h3 className={`font-bold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.term}</h3>
                </div>
                <button
                  onClick={() => onAskAboutSpec(item.term)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isLight ? 'text-indigo-600 hover:bg-indigo-50' : 'text-indigo-400 hover:bg-indigo-600/20'
                  }`}
                  title="Ask Assistant more about this specification"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>

              {/* Simple explanation */}
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                {item.simpleExplanation}
              </p>

              {/* Real World Analogy Box */}
              <div className={`border rounded-xl p-3.5 space-y-1.5 ${
                isLight ? 'bg-amber-50/60 border-amber-200/80' : 'bg-slate-950/70 border-indigo-950/80'
              }`}>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Everyday Analogy:</span>
                </div>
                <p className={`text-xs italic leading-relaxed ${isLight ? 'text-amber-900' : 'text-slate-300'}`}>
                  {item.everydayAnalogy}
                </p>
              </div>

              {/* Rule of Thumb Box */}
              <div className={`border rounded-xl p-3 space-y-1 ${
                isLight ? 'bg-emerald-50/60 border-emerald-200/80' : 'bg-emerald-950/20 border-emerald-900/40'
              }`}>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Rule of Thumb for Buyers:</span>
                </div>
                <p className={`text-xs ${isLight ? 'text-emerald-950' : 'text-slate-200'}`}>
                  {item.ruleOfThumb}
                </p>
              </div>

              {/* Spec Values Decoded */}
              <div className="pt-2">
                <span className={`text-[11px] font-bold uppercase tracking-wider block mb-2 ${isLight ? 'text-slate-400' : 'text-slate-400'}`}>
                  Real Numbers Decoded:
                </span>
                <div className="space-y-1.5">
                  {item.exampleValues.map((v, vIdx) => (
                    <div
                      key={vIdx}
                      className={`rounded-xl p-2 border text-xs flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-slate-750'
                      }`}
                    >
                      <span className={`font-bold shrink-0 font-mono text-[11px] ${
                        isLight ? 'text-indigo-600' : 'text-indigo-300'
                      }`}>
                        {v.spec}
                      </span>
                      <span className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                        — {v.meaning}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className={`pt-3 border-t flex justify-end ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
              <button
                onClick={() => onAskAboutSpec(item.term)}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5 transition-colors"
              >
                <span>Ask AI Chatbot how this affects your budget</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
