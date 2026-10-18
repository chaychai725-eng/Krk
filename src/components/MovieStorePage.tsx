import React, { useState } from 'react';
import { 
  Search, ShoppingCart, Film, Sparkles, CheckCircle2, 
  Send, Play, Volume2, Star, ShieldCheck, Download, X
} from 'lucide-react';
import { Language, MovieStoreItem } from '../types';
import { translations } from '../translations';
import { movieStoreItems } from '../mockData';
import { playKhmerVoice, stopSpeech } from '../audioHelper';

interface MovieStorePageProps {
  lang: Language;
  credits: number;
  deductCredits: (amount: number, reason: string) => boolean;
  notify: (msg: string) => void;
  onOpenBuyCredits: () => void;
  storeItems: MovieStoreItem[];
}

export const MovieStorePage: React.FC<MovieStorePageProps> = ({
  lang,
  credits,
  deductCredits,
  notify,
  onOpenBuyCredits,
  storeItems,
}) => {
  const t = translations[lang];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MovieStoreItem | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // Filter items from dynamic storeItems
  const filteredItems = storeItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.synopsis.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Handle Buy Item with Credits
  const handleBuyItem = (item: MovieStoreItem) => {
    if (deductCredits(item.priceCredits, `Bought story: ${item.title}`)) {
      setPurchaseSuccess(true);
      setTimeout(() => {
        setPurchaseSuccess(false);
      }, 4000);
    } else {
      onOpenBuyCredits();
    }
  };

  // Preview Voice Sample
  const handleListenSample = (item: MovieStoreItem) => {
    if (isPlayingPreview) {
      stopSpeech();
      setIsPlayingPreview(false);
      return;
    }
    stopSpeech();
    setIsPlayingPreview(true);
    playKhmerVoice(item.synopsis, 'female', 1.0, 1.0, () => {
      setIsPlayingPreview(false);
    });
  };

  return (
    <main className="max-w-4xl w-full mx-auto px-2 sm:px-3 py-2.5 sm:py-4 space-y-3 pb-24">
      {/* Top Banner & Search */}
      <section className="bg-gradient-to-r from-purple-950/40 via-[#131722] to-cyan-950/40 rounded-xl p-3 sm:p-4 border border-fuchsia-400/20 shadow-lg">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-[9px] uppercase tracking-[0.16em] text-fuchsia-300 font-bold">
              HCH Digital Pro
            </div>
            <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-1.5 mt-0.5">
              <span>{t.movieStoreTitle}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-400/30">
                Viral Drama Pack
              </span>
            </h2>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 font-bold">
            {t.movieStoreBadge}
          </span>
        </div>

        {/* Search input */}
        <div className="mt-3 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchStoryPlaceholder}
            className="w-full h-10 rounded-xl bg-black/40 border border-gray-700 focus:border-fuchsia-400 pl-9 pr-3 text-xs text-white outline-none transition"
          />
        </div>

        {/* Categories */}
        <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-lg font-bold shrink-0 transition ${
              selectedCategory === 'all'
                ? 'bg-fuchsia-600 text-white'
                : 'bg-black/30 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            {t.allCategories}
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('drama')}
            className={`px-3 py-1 rounded-lg font-bold shrink-0 transition ${
              selectedCategory === 'drama'
                ? 'bg-fuchsia-600 text-white'
                : 'bg-black/30 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            {t.catDrama}
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('romance')}
            className={`px-3 py-1 rounded-lg font-bold shrink-0 transition ${
              selectedCategory === 'romance'
                ? 'bg-fuchsia-600 text-white'
                : 'bg-black/30 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            {t.catRomance}
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('action')}
            className={`px-3 py-1 rounded-lg font-bold shrink-0 transition ${
              selectedCategory === 'action'
                ? 'bg-fuchsia-600 text-white'
                : 'bg-black/30 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            {t.catAction}
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('horror')}
            className={`px-3 py-1 rounded-lg font-bold shrink-0 transition ${
              selectedCategory === 'horror'
                ? 'bg-fuchsia-600 text-white'
                : 'bg-black/30 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            {t.catHorror}
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('comedy')}
            className={`px-3 py-1 rounded-lg font-bold shrink-0 transition ${
              selectedCategory === 'comedy'
                ? 'bg-fuchsia-600 text-white'
                : 'bg-black/30 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            {t.catComedy}
          </button>
        </div>
      </section>

      {/* 9:16 Movie Cards Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="rounded-xl overflow-hidden border border-cyan-400/20 bg-[#0d111a] hover:border-cyan-400/50 transition-all duration-200 cursor-pointer group shadow-lg flex flex-col justify-between"
          >
            {/* 9:16 poster cover */}
            <div className="aspect-[9/16] bg-slate-950 relative overflow-hidden">
              <img
                src={item.coverImage}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-cyan-500/80 text-black font-extrabold shadow">
                  💎 {item.isCompleted ? 'ចប់' : 'លក់'}
                </span>
                {item.isPopular && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-500/90 text-white font-extrabold shadow">
                    HOT 🔥
                  </span>
                )}
              </div>

              <div className="absolute bottom-2 left-2 right-2">
                <div className="text-[10px] text-gray-300 flex items-center justify-between">
                  <span>{item.episodes} ភាគ</span>
                  <span>{item.totalDuration}</span>
                </div>
              </div>
            </div>

            {/* Meta details & buy action */}
            <div className="p-2.5 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <div className="text-xs sm:text-sm text-cyan-400 font-extrabold mt-1">
                  ${item.priceUsd.toFixed(2)}{' '}
                  <span className="text-[10px] text-gray-400 font-normal">
                    ({item.priceCredits} Credits)
                  </span>
                </div>
              </div>

              <div className="mt-2.5 space-y-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(item);
                  }}
                  className="w-full h-8 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow active:scale-95 transition"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{t.buyNow}</span>
                </button>

                <a
                  href="https://t.me/huy_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="block text-center text-[9px] text-gray-500 hover:text-cyan-400 transition"
                >
                  {t.supportTelegram}
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Story Detail & Buy Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 animate-fadeIn">
          <div className="bg-[#121622] border border-cyan-400/30 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-4 relative shadow-2xl space-y-3">
            <button
              type="button"
              onClick={() => {
                stopSpeech();
                setSelectedItem(null);
                setIsPlayingPreview(false);
              }}
              className="w-8 h-8 rounded-full bg-gray-800 text-gray-300 hover:text-white flex items-center justify-center absolute top-3 right-3 z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-3">
              <div className="w-24 sm:w-28 aspect-[9/16] rounded-xl overflow-hidden shrink-0 shadow-md">
                <img
                  src={selectedItem.coverImage}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-bold border border-fuchsia-400/30">
                  {selectedItem.category.toUpperCase()}
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-white mt-1 leading-snug">
                  {selectedItem.title}
                </h3>
                <div className="text-xs text-gray-400 mt-0.5">
                  {selectedItem.titleEn}
                </div>
                <div className="text-base text-cyan-300 font-black mt-2">
                  ${selectedItem.priceUsd.toFixed(2)}{' '}
                  <span className="text-xs text-amber-300 font-bold">
                    (ឬ {selectedItem.priceCredits} Credits)
                  </span>
                </div>
                <div className="text-[10px] text-gray-400 mt-1">
                  {selectedItem.episodes} ភាគ • រយៈពេលសរុប {selectedItem.totalDuration}
                </div>
              </div>
            </div>

            {/* Synopsis */}
            <div className="bg-[#090c12] rounded-xl p-3 border border-gray-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-gray-200">
                <span>សាច់រឿងសង្ខេប (Synopsis):</span>
                <button
                  type="button"
                  onClick={() => handleListenSample(selectedItem)}
                  className="text-[10px] text-cyan-300 flex items-center gap-1 hover:underline"
                >
                  <Volume2 className="w-3 h-3" />
                  <span>{isPlayingPreview ? 'ផ្អាកស្តាប់' : 'ស្តាប់សម្លេងគំរូ'}</span>
                </button>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                {selectedItem.synopsis}
              </p>
            </div>

            {/* Included in package */}
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-3 space-y-1.5 text-xs text-gray-200">
              <div className="font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>កញ្ចប់រឿងរួមបញ្ចូលទាំងស្រុង៖</span>
              </div>
              <ul className="grid grid-cols-2 gap-1 text-[11px] text-gray-300 pl-4 list-disc">
                <li>វីដេអូកាត់តរួច (1080p MP4)</li>
                <li>សម្លេងសម្រាយរឿងខ្មែរ (HQ MP3)</li>
                <li>ឯកសារ Subtitle ខ្មែរ (.SRT)</li>
                <li>អត្ថបទ Script ពេញលេញ</li>
              </ul>
            </div>

            {purchaseSuccess ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-center text-xs font-bold space-y-1">
                <div>🎉 បានទិញជោគជ័យ! តំណភ្ជាប់ទាញយកត្រូវបានផ្ញើជូនរួចរាល់។</div>
                <button
                  type="button"
                  onClick={() => notify(lang === 'kh' ? '📦 កំពុងទាញយកកញ្ចប់ Zip រឿង...' : 'Downloading drama package zip...')}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-bold inline-flex items-center gap-1.5 text-xs mt-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ទាញយកកញ្ចប់ Zip ឥឡូវនេះ</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-1">
                {/* Buy with Credits */}
                <button
                  type="button"
                  onClick={() => handleBuyItem(selectedItem)}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:brightness-110 active:scale-98 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>ទិញភ្លាមៗជាមួយ Credits ({selectedItem.priceCredits} 💎)</span>
                </button>

                {/* Direct Telegram Support link */}
                <a
                  href="https://t.me/huy_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-10 rounded-xl bg-[#229ed9]/20 hover:bg-[#229ed9]/30 border border-[#229ed9]/40 text-cyan-200 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                >
                  <Send className="w-3.5 h-3.5 text-[#229ed9]" />
                  <span>ទិញតាម Telegram (@huy_support)</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};
