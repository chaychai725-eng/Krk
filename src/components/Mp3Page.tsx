import React, { useState, useEffect } from 'react';
import { 
  Headphones, Volume2, Download, Trash2, ArrowLeft, Play, 
  Pause, RotateCcw, Sparkles, FileText, Upload, CheckCircle2, Loader2 
} from 'lucide-react';
import { Language, Mp3Item, VoiceChoice } from '../types';
import { translations } from '../translations';
import { sampleAudios } from '../mockData';
import { playKhmerVoice, stopSpeech } from '../audioHelper';

interface Mp3PageProps {
  lang: Language;
  credits: number;
  deductCredits: (amount: number, reason: string) => boolean;
  notify: (msg: string) => void;
  onBackToTranslate: () => void;
  onOpenBuyCredits: () => void;
}

export const Mp3Page: React.FC<Mp3PageProps> = ({
  lang,
  credits,
  deductCredits,
  notify,
  onBackToTranslate,
  onOpenBuyCredits,
}) => {
  const t = translations[lang];

  const [mode, setMode] = useState<'text' | 'srt'>('text');
  const [inputText, setInputText] = useState(
    'កាលពីព្រេងនាយ មានបុរសម្នាក់រស់នៅតាមដងផ្លូវដ៏ស្ងប់ស្ងាត់។ គាត់តែងតែមានក្តីស្រមៃចង់ក្លាយជាអ្នកផលិតមាតិកាដ៏ពូកែម្នាក់...'
  );
  const [selectedVoice, setSelectedVoice] = useState<VoiceChoice>('female');
  const [speed, setSpeed] = useState<number>(1.0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlayingCurrent, setIsPlayingCurrent] = useState(false);

  // Audio history list (persisted in localStorage)
  const [audioList, setAudioList] = useState<Mp3Item[]>(() => {
    try {
      const saved = localStorage.getItem('hch_mp3_history');
      return saved ? JSON.parse(saved) : sampleAudios;
    } catch {
      return sampleAudios;
    }
  });

  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('hch_mp3_history', JSON.stringify(audioList));
    } catch (e) {
      console.warn('Failed to save mp3 history:', e);
    }
  }, [audioList]);

  // Handle Play/Stop speech synthesis
  const handlePlayAudio = (item: Mp3Item) => {
    if (activePlayingId === item.id) {
      stopSpeech();
      setActivePlayingId(null);
      return;
    }

    stopSpeech();
    setActivePlayingId(item.id);
    playKhmerVoice(item.text, item.voice, item.speed, item.pitch, () => {
      setActivePlayingId(null);
    });
  };

  // Generate New MP3
  const handleGenerate = () => {
    if (!inputText.trim()) {
      notify(lang === 'kh' ? 'សូមបញ្ចូលអត្ថបទជាមុនសិន' : 'Please enter text');
      return;
    }

    if (!deductCredits(5, 'Generate Khmer MP3')) {
      onOpenBuyCredits();
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);

      const newItem: Mp3Item = {
        id: `mp3_${Date.now()}`,
        title: inputText.slice(0, 32) + '...',
        text: inputText,
        voice: selectedVoice,
        speed: speed,
        pitch: 1.0,
        duration: '01:05',
        audioUrl: '',
        createdAt: 'ទើបតែបង្កើត',
        fileSize: '1.2 MB'
      };

      setAudioList(prev => [newItem, ...prev]);

      // Automatically play the newly created audio
      handlePlayAudio(newItem);
    }, 2200);
  };

  const handleDeleteAudio = (id: string) => {
    setAudioList(prev => prev.filter(a => a.id !== id));
    if (activePlayingId === id) {
      stopSpeech();
      setActivePlayingId(null);
    }
  };

  return (
    <main className="max-w-4xl w-full mx-auto px-2.5 sm:px-3 py-3 sm:py-4 safe-bottom pb-24">
      <section className="bg-gradient-to-b from-[#131724] via-[#0d101a] to-[#080b12] rounded-2xl p-3.5 sm:p-5 border border-cyan-400/20 shadow-2xl relative overflow-hidden">
        {/* Top bar with back and balance */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <button
            type="button"
            onClick={onBackToTranslate}
            className="h-8.5 px-3 rounded-xl bg-gray-800/80 hover:bg-gray-700/80 text-xs font-semibold text-gray-200 flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.completedSubtitle ? 'ត្រឡប់ទៅបកប្រែរឿង' : 'Back'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="h-8.5 px-3 rounded-xl border border-amber-400/25 bg-amber-400/10 text-amber-300 text-xs font-bold flex items-center">
              💎 {credits} Credits
            </span>
            <button
              type="button"
              onClick={onOpenBuyCredits}
              className="h-8.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-black text-xs font-black shadow transition active:scale-95"
            >
              💎 {t.buyCredits}
            </button>
          </div>
        </div>

        {/* Hero Audio Visualizer Wave */}
        <div className="text-center mb-5">
          <div className="relative h-24 flex items-center justify-center overflow-hidden max-w-lg mx-auto">
            {/* Visualizer bars */}
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-14 flex items-center justify-between gap-1 opacity-70">
              {Array.from({ length: 36 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full animate-wave-bar ${
                    i % 4 === 0
                      ? 'bg-cyan-400 text-cyan-400 shadow-[0_0_8px_currentColor]'
                      : i % 4 === 1
                      ? 'bg-blue-400 text-blue-400 shadow-[0_0_8px_currentColor]'
                      : i % 4 === 2
                      ? 'bg-pink-400 text-pink-400 shadow-[0_0_8px_currentColor]'
                      : 'bg-amber-400 text-amber-400 shadow-[0_0_8px_currentColor]'
                  }`}
                  style={{
                    animationDelay: `${(i % 7) * 0.12}s`,
                    height: `${12 + (i % 5) * 8}px`,
                  }}
                />
              ))}
            </div>

            {/* Glowing headphones icon */}
            <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 border border-cyan-400/30 flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(34,211,238,0.3)] backdrop-blur-md">
              🎧
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-black text-white mt-2">
            {t.createMp3}
          </h2>
          <p className="text-xs text-cyan-300 font-semibold mt-0.5">
            {t.createKhmerAiVoice}
          </p>
        </div>

        {/* Tab switch: Text vs SRT */}
        <div className="grid grid-cols-2 gap-2 bg-black/40 p-1 rounded-xl mb-4 border border-gray-800">
          <button
            type="button"
            onClick={() => setMode('text')}
            className={`h-9 rounded-lg text-xs font-bold transition ${
              mode === 'text'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t.tabText}
          </button>
          <button
            type="button"
            onClick={() => setMode('srt')}
            className={`h-9 rounded-lg text-xs font-bold transition ${
              mode === 'srt'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t.tabSrt}
          </button>
        </div>

        {/* Text Mode */}
        {mode === 'text' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <label className="text-[11px] font-medium">{t.typeOrPaste}</label>
              <span className="text-[10px] text-cyan-400 font-mono">
                {inputText.length} តួអក្សរ
              </span>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={5}
              placeholder={t.textPlaceholder}
              className="w-full bg-[#080b12] border border-gray-800 focus:border-cyan-400 rounded-xl p-3 text-xs sm:text-sm text-gray-100 outline-none leading-relaxed resize-none transition shadow-inner"
            />
          </div>
        )}

        {/* SRT Mode */}
        {mode === 'srt' && (
          <div className="border-2 border-dashed border-indigo-400/30 bg-black/30 rounded-xl p-6 text-center">
            <FileText className="w-10 h-10 text-indigo-300 mx-auto mb-2 opacity-80" />
            <div className="text-xs sm:text-sm font-bold text-indigo-200">
              {t.uploadSrtHint}
            </div>
            <div className="text-[10px] text-gray-400 mt-1 mb-3">
              {t.uploadSrtMulti}
            </div>
            <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer shadow active:scale-95 transition">
              <Upload className="w-3.5 h-3.5" />
              <span>ជ្រើសរើសឯកសារ (.srt)</span>
              <input
                type="file"
                accept=".srt"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    notify(lang === 'kh' ? `✅ បានផ្ទុក ${e.target.files.length} ឯកសារ SRT ជោគជ័យ!` : 'SRT files queued');
                  }
                }}
              />
            </label>
          </div>
        )}

        {/* Voice Selector & Controls */}
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          {/* Voice card */}
          <div className="rounded-xl bg-black/30 border border-gray-800 p-3">
            <div className="text-[11px] text-gray-400 mb-2 flex items-center justify-between">
              <span>{t.chooseVoice}</span>
              <span className="text-[10px] text-gray-500">ល្បឿន: {speed}x</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                type="button"
                onClick={() => setSelectedVoice('female')}
                className={`h-10 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  selectedVoice === 'female'
                    ? 'bg-pink-500/20 border border-pink-400/40 text-pink-200 shadow'
                    : 'bg-gray-800/60 border border-gray-800 text-gray-400'
                }`}
              >
                <span>👩</span>
                <span>សម្លេងស្រី</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedVoice('male')}
                className={`h-10 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  selectedVoice === 'male'
                    ? 'bg-blue-500/20 border border-blue-400/40 text-blue-200 shadow'
                    : 'bg-gray-800/60 border border-gray-800 text-gray-400'
                }`}
              >
                <span>👨</span>
                <span>សម្លេងប្រុស</span>
              </button>
            </div>

            {/* Speed slider */}
            <div className="flex items-center gap-2 text-[10px] text-gray-400">
              <span>0.8x</span>
              <input
                type="range"
                min="0.8"
                max="1.5"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="flex-1 accent-cyan-400"
              />
              <span>1.5x</span>
            </div>
          </div>

          {/* Pricing & Guarantee */}
          <div className="rounded-xl bg-black/30 border border-gray-800 p-3 flex flex-col justify-center">
            <div className="text-amber-300 font-bold text-sm">
              {t.mp3CostLabel}
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 font-semibold leading-relaxed">
              {t.mp3Guarantee}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full mt-4 h-12 rounded-xl header-credit-btn text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-98 transition disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t.processing}</span>
            </>
          ) : (
            <>
              <span>🎧</span>
              <span>{t.generateMp3Btn}</span>
            </>
          )}
        </button>

        {/* Results & History */}
        <div className="mt-5 rounded-2xl border border-indigo-400/20 bg-[#080b13]/80 p-3.5 shadow-xl">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center text-xs font-bold">
                ✓
              </span>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-emerald-300">
                  {t.mp3Ready}
                </h3>
                <p className="text-[10px] text-gray-500">{t.mp3Retention}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => notify(lang === 'kh' ? '✅ បានទាញយកឯកសារ MP3 ទាំងអស់' : 'All MP3s downloaded')}
              className="h-7 px-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold flex items-center gap-1 active:scale-95 transition"
            >
              <Download className="w-3 h-3" />
              <span>Download All</span>
            </button>
          </div>

          {/* Audio Items */}
          <div className="space-y-2">
            {audioList.map((item) => (
              <div
                key={item.id}
                className={`p-2.5 rounded-xl border transition ${
                  activePlayingId === item.id
                    ? 'border-cyan-400 bg-cyan-950/20'
                    : 'border-gray-800/80 bg-[#06080e]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-gray-200 truncate">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-0.5">
                      <span className="text-cyan-400 font-semibold">
                        {item.voice === 'female' ? '👩 ស្រី' : '👨 ប្រុស'}
                      </span>
                      <span>• {item.duration}</span>
                      <span>• {item.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handlePlayAudio(item)}
                      className={`h-8 px-3 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                        activePlayingId === item.id
                          ? 'bg-cyan-500 text-black'
                          : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                      }`}
                    >
                      {activePlayingId === item.id ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>ផ្អាក</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>ចាក់</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => notify(lang === 'kh' ? '✅ បានទាញយកឯកសារ MP3 ជោគជ័យ!' : 'MP3 Downloaded')}
                      className="h-8 px-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs flex items-center"
                      title="Download MP3"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteAudio(item.id)}
                      className="h-8 px-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs flex items-center"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
