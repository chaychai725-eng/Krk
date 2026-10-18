import React from 'react';
import { PlayCircle, Wand2, Headphones, Clapperboard } from 'lucide-react';
import { Language, MainTab } from '../types';
import { translations } from '../translations';

interface BottomNavProps {
  lang: Language;
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  lang,
  activeTab,
  setActiveTab,
}) => {
  const t = translations[lang];

  return (
    <nav className="fixed left-0 right-0 bottom-0 z-50 bg-[#070b13]/95 backdrop-blur-xl border-t border-blue-500/15 py-1.5 px-2 safe-bottom shadow-[0_-8px_25px_rgba(0,0,0,0.6)]">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1.5">
        {/* Video / Translate Story */}
        <button
          type="button"
          onClick={() => setActiveTab('video')}
          className={`relative h-12 rounded-xl flex flex-col items-center justify-center transition-all ${
            activeTab === 'video'
              ? 'bg-gradient-to-b from-blue-600/30 to-blue-900/30 border border-blue-400/50 text-cyan-300 shadow-md shadow-blue-500/20'
              : 'border border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          {activeTab === 'video' && (
            <span className="absolute -top-1 px-1.5 py-0.2 rounded-full text-[8px] font-bold bg-cyan-400 text-black shadow">
              {t.activeBadge}
            </span>
          )}
          <PlayCircle className={`w-4 h-4 mb-0.5 ${activeTab === 'video' ? 'text-cyan-300' : 'text-gray-400'}`} />
          <span className="text-[10px] sm:text-[11px] font-bold tracking-tight truncate max-w-full px-1">
            {t.navTranslateStory}
          </span>
        </button>

        {/* Story / PRO Translate */}
        <button
          type="button"
          onClick={() => setActiveTab('story')}
          className={`relative h-12 rounded-xl flex flex-col items-center justify-center transition-all ${
            activeTab === 'story'
              ? 'bg-gradient-to-b from-fuchsia-600/30 to-purple-900/30 border border-fuchsia-400/50 text-fuchsia-200 shadow-md shadow-fuchsia-500/20'
              : 'border border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          {activeTab === 'story' && (
            <span className="absolute -top-1 px-1.5 py-0.2 rounded-full text-[8px] font-bold bg-fuchsia-400 text-black shadow">
              {t.activeBadge}
            </span>
          )}
          <Wand2 className={`w-4 h-4 mb-0.5 ${activeTab === 'story' ? 'text-fuchsia-300' : 'text-gray-400'}`} />
          <span className="text-[10px] sm:text-[11px] font-bold tracking-tight truncate max-w-full px-1">
            {t.navProTranslate}
          </span>
        </button>

        {/* MP3 */}
        <button
          type="button"
          onClick={() => setActiveTab('mp3')}
          className={`relative h-12 rounded-xl flex flex-col items-center justify-center transition-all ${
            activeTab === 'mp3'
              ? 'bg-gradient-to-b from-cyan-600/30 to-blue-900/30 border border-cyan-400/50 text-cyan-200 shadow-md shadow-cyan-500/20'
              : 'border border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          {activeTab === 'mp3' && (
            <span className="absolute -top-1 px-1.5 py-0.2 rounded-full text-[8px] font-bold bg-cyan-400 text-black shadow">
              {t.activeBadge}
            </span>
          )}
          <div className="relative">
            <Headphones className={`w-4 h-4 mb-0.5 ${activeTab === 'mp3' ? 'text-cyan-300' : 'text-gray-400'}`} />
            {activeTab === 'mp3' && (
              <span className="absolute -right-2 top-0 flex gap-0.5 items-end h-3">
                <i className="w-0.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></i>
                <i className="w-0.5 h-3 bg-cyan-300 rounded-full animate-bounce [animation-delay:0.15s]"></i>
                <i className="w-0.5 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.3s]"></i>
              </span>
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold tracking-tight">
            {t.navMp3}
          </span>
        </button>

        {/* Movie Store */}
        <button
          type="button"
          onClick={() => setActiveTab('store')}
          className={`relative h-12 rounded-xl flex flex-col items-center justify-center transition-all ${
            activeTab === 'store'
              ? 'bg-gradient-to-b from-amber-600/30 to-amber-900/30 border border-amber-400/50 text-amber-200 shadow-md shadow-amber-500/20'
              : 'border border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          {activeTab === 'store' && (
            <span className="absolute -top-1 px-1.5 py-0.2 rounded-full text-[8px] font-bold bg-amber-400 text-black shadow">
              {t.activeBadge}
            </span>
          )}
          <Clapperboard className={`w-4 h-4 mb-0.5 ${activeTab === 'store' ? 'text-amber-300' : 'text-gray-400'}`} />
          <span className="text-[10px] sm:text-[11px] font-bold tracking-tight truncate max-w-full px-1">
            {t.navMovieStore}
          </span>
        </button>
      </div>
    </nav>
  );
};
