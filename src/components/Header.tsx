import React from 'react';
import { Sparkles, Key, Youtube, User, Globe, ChevronDown, Coins, ShieldCheck } from 'lucide-react';
import { Language, MainTab, UserAccount } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  account: UserAccount;
  onOpenBuyCredits: () => void;
  onOpenAccount: () => void;
  onOpenTutorial: () => void;
  onOpenPromo: () => void;
  onOpenCreditInfo: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  setLang,
  activeTab,
  setActiveTab,
  account,
  onOpenBuyCredits,
  onOpenAccount,
  onOpenTutorial,
  onOpenPromo,
  onOpenCreditInfo,
  onOpenAdmin,
}) => {
  const t = translations[lang];

  return (
    <header className="bg-[#121620]/95 backdrop-blur-md border-b border-gray-800/80 sticky top-0 z-40 shadow-lg">
      <div className="max-w-4xl mx-auto px-3 py-2.5 space-y-2">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-2">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('video')}
            className="flex items-center gap-2 cursor-pointer select-none group shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-[#0d1117] rounded-[10px] flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 font-extrabold text-sm sm:text-base">
                  HCH
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xs sm:text-sm font-extrabold tracking-tight text-white flex items-center gap-1">
                  HCH Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Pro</span>
                </h1>
                <span className="hidden sm:inline-flex text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/30">
                  AI V3.2
                </span>
              </div>
              <p className="text-[9px] text-gray-400 hidden sm:block">
                Khmer AI Video & Story Studio
              </p>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Credit Info Badge */}
            <button
              type="button"
              onClick={onOpenCreditInfo}
              className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] px-2 py-1.5 rounded-lg border border-amber-400/40 bg-amber-400/10 text-amber-300 font-semibold whitespace-nowrap hover:bg-amber-400/20 active:scale-95 transition"
              title="Click for credit expiry & details"
            >
              <span>💎</span>
              <span className="font-bold">{account.credits}</span>
              <span className="hidden xs:inline text-amber-300/80">/ {t.creditsMonth}</span>
              <span className="text-[9px] opacity-75">ⓘ</span>
            </button>

            {/* Buy Credits Button */}
            <button
              type="button"
              onClick={onOpenBuyCredits}
              className="header-credit-btn h-8 sm:h-9 px-2.5 sm:px-3 rounded-xl text-[10px] sm:text-[11px] font-bold text-white whitespace-nowrap flex items-center gap-1 shadow-md hover:brightness-110 active:scale-95 transition"
            >
              <span>{t.buyCredits}</span>
            </button>

            {/* Language Selector */}
            <div className="relative">
              <select
                aria-label="Language"
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="appearance-none bg-[#191e2b] border border-gray-700 hover:border-gray-600 text-[10px] sm:text-[11px] text-gray-200 rounded-xl h-8 sm:h-9 pl-2 pr-5 font-semibold focus:outline-none focus:border-cyan-500 cursor-pointer transition shadow-inner"
              >
                <option value="kh">🇰🇭 KH</option>
                <option value="en">🇺🇸 EN</option>
              </select>
              <ChevronDown className="w-3 h-3 text-gray-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Account / Profile Button */}
            <button
              type="button"
              onClick={onOpenAccount}
              className="h-8 sm:h-9 px-2.5 sm:px-3 rounded-xl bg-gradient-to-r from-blue-600/90 to-indigo-600/90 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/30 text-white text-[10px] sm:text-[11px] font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition shrink-0"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-cyan-200">
                <User className="w-3 h-3" />
              </div>
              <span className="max-w-[75px] truncate hidden xs:inline">{account.name.split(' ')[0]}</span>
            </button>
          </div>
        </div>

        {/* Sub-header helper tools: Web Tutorial & AI Key Promo */}
        <div className="flex items-center gap-2 pt-0.5">
          {/* Tutorial button */}
          <button
            type="button"
            onClick={onOpenTutorial}
            className="flex-1 h-8 sm:h-8.5 rounded-lg bg-gradient-to-r from-red-950/60 via-red-900/40 to-pink-950/60 border border-red-500/30 hover:border-red-400/50 text-red-200 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-2 px-2 shadow-sm active:scale-98 transition group"
          >
            <div className="w-5 h-5 rounded bg-white text-red-600 flex items-center justify-center shadow">
              <Youtube className="w-3.5 h-3.5 fill-red-600" />
            </div>
            <div className="text-left leading-tight truncate">
              <span className="block truncate font-bold text-gray-100">{t.howToUse}</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 ml-auto hidden sm:inline">
              {t.watchVideo}
            </span>
          </button>

          {/* AI Key Promo button */}
          <button
            type="button"
            onClick={onOpenPromo}
            className="flex-1 h-8 sm:h-8.5 rounded-lg bg-[#191e2b] hover:bg-gray-800/80 border border-amber-400/20 hover:border-amber-400/40 text-amber-300 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 px-2 active:scale-98 transition"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span className="truncate">{t.aiKeyPromo}</span>
            <span className="text-[9px] px-1 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30">
              FREE
            </span>
          </button>

          {/* Admin Control Center button (PIN Protected) */}
          <button
            type="button"
            onClick={onOpenAdmin}
            className="h-8 sm:h-8.5 px-2.5 rounded-lg bg-gradient-to-r from-cyan-950/70 to-blue-950/70 hover:bg-cyan-900/50 border border-cyan-400/30 text-cyan-300 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 active:scale-98 transition shrink-0"
            title="Admin Control Center (PIN Protected)"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden xs:inline">Admin</span>
            <span className="text-[9px] px-1 rounded bg-cyan-400/20 text-cyan-200 font-mono">
              PIN 🔒
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
