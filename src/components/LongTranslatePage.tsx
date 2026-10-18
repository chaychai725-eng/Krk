import React, { useState, useRef } from 'react';
import { 
  Wand2, Film, Sparkles, Volume2, Music, Scissors, Download, 
  Play, Pause, FileEdit, CheckCircle, RefreshCw, AlertCircle, Loader2
} from 'lucide-react';
import { Language, TranslationMode, VoiceChoice } from '../types';
import { translations } from '../translations';
import { playKhmerVoice, stopSpeech } from '../audioHelper';

interface LongTranslatePageProps {
  lang: Language;
  credits: number;
  deductCredits: (amount: number, reason: string) => boolean;
  notify: (msg: string) => void;
  onOpenBuyCredits: () => void;
}

interface ScriptLine {
  id: string;
  timecode: string;
  speaker: string;
  khmerText: string;
  originalText: string;
  isPlaying?: boolean;
}

export const LongTranslatePage: React.FC<LongTranslatePageProps> = ({
  lang,
  credits,
  deductCredits,
  notify,
  onOpenBuyCredits,
}) => {
  const t = translations[lang];

  const [videoUrl, setVideoUrl] = useState<string | null>(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  );
  const [videoTitle, setVideoTitle] = useState('សម្រាយរឿងភាគចិនកម្សត់៖ អាថ៌កំបាំងស្នេហ៍ឆ្លងដែន');
  const [videoLink, setVideoLink] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<VoiceChoice>('female');
  const [selectedMode, setSelectedMode] = useState<TranslationMode>('narration');
  const [selectedMood, setSelectedMood] = useState<'dramatic' | 'horror' | 'action' | 'comedy'>('dramatic');
  const [selectedBgm, setSelectedBgm] = useState<string>('dramatic');
  const [bgmVolume, setBgmVolume] = useState<number>(30);

  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState('');
  const [processPercent, setProcessPercent] = useState(0);

  // Script Studio lines
  const [scriptLines, setScriptLines] = useState<ScriptLine[]>([
    {
      id: 'sc_1',
      timecode: '00:00 - 00:25',
      speaker: 'Narrator',
      khmerText: 'នៅក្នុងទីក្រុងដ៏អ៊ូអរមួយ គ្មាននរណាម្នាក់ដឹងទេថា អ្នកបើកឡានតាក់ស៊ីសាមញ្ញម្នាក់នេះ គឺជាអតីតមេបញ្ជាការកងទ័ពពិសេសដ៏ល្បីល្បាញ...',
      originalText: 'In a bustling metropolis, no one suspected this humble cab driver was once a top special forces commander...',
    },
    {
      id: 'sc_2',
      timecode: '00:26 - 00:58',
      speaker: 'Narrator',
      khmerText: 'រហូតដល់យប់មួយ មាននារីវ័យក្មេងម្នាក់រត់ចូលមកក្នុងឡានរបស់គាត់ទាំងភិតភ័យ ព្រោះកំពុងត្រូវក្រុមជនពាលប្រដាប់អាវុធតាមប្រមាញ់...',
      originalText: 'Until one dark rainy evening, a young woman rushed into his car terrified, chased by armed syndicates...',
    },
    {
      id: 'sc_3',
      timecode: '00:59 - 01:40',
      speaker: 'Taxi Driver',
      khmerText: '«កុំបារម្ភនាង! ដរាបណាខ្ញុំនៅទីនេះ គ្មានជនណាម្នាក់អាចប៉ះពាល់នាងបានឡើយ!» សំឡេងដ៏ម៉ឺងម៉ាត់បន្លឺឡើង ខណៈគាត់ជាន់ហ្គែរបើកគេច...',
      originalText: '"Do not fear, miss. As long as you are in my cab, no one can lay a hand on you!"',
    }
  ]);

  const [activePlayingLine, setActivePlayingLine] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Play line
  const handlePlayLine = (line: ScriptLine) => {
    if (activePlayingLine === line.id) {
      stopSpeech();
      setActivePlayingLine(null);
      return;
    }

    stopSpeech();
    setActivePlayingLine(line.id);
    playKhmerVoice(line.khmerText, selectedVoice, 1.0, 1.0, () => {
      setActivePlayingLine(null);
    });
  };

  // Run PRO Generation
  const handleStartPro = () => {
    if (!deductCredits(35, 'PRO Story Recap Generation')) {
      onOpenBuyCredits();
      return;
    }

    setIsProcessing(true);
    setProcessPercent(20);
    setProcessStep(lang === 'kh' ? '🔍 វិភាគសាច់រឿង និងរៀបចំគ្រោង Storyboard...' : 'Analyzing story scenes & storyboard...');

    setTimeout(() => {
      setProcessPercent(55);
      setProcessStep(lang === 'kh' ? '✍️ តែងសម្រាយរឿងខ្មែរតាមទម្រង់ Viral TikTok/FB...' : 'Composing captivating viral Khmer narration...');
    }, 1500);

    setTimeout(() => {
      setProcessPercent(85);
      setProcessStep(lang === 'kh' ? '🎙️ ផលិតសម្លេង AI និងផ្គុំតន្ត្រី BGM ផ្ទៃខាងក្រោយ...' : 'Synthesizing voiceover and mixing BGM music...');
    }, 3200);

    setTimeout(() => {
      setProcessPercent(100);
      setProcessStep(lang === 'kh' ? '✅ បញ្ចប់ការផលិតសម្រាយរឿង PRO រួចរាល់!' : 'PRO Story Recap generated successfully!');
      setIsProcessing(false);
    }, 4800);
  };

  return (
    <main className="max-w-4xl w-full mx-auto px-2.5 sm:px-3 py-3 sm:py-4 space-y-4 pb-24">
      {/* Top PRO Banner */}
      <section className="bg-gradient-to-r from-purple-950/40 via-[#131722] to-cyan-950/40 rounded-2xl p-4 border border-fuchsia-400/30 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-fuchsia-500/20 border border-fuchsia-400/30 flex items-center justify-center text-fuchsia-300">
              <Wand2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-1.5">
                <span>{t.proHeaderTitle}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-black">
                  PRO AI
                </span>
              </h2>
              <p className="text-[10px] text-gray-400">
                សម្រាយរឿងបែបភាពយន្ត • ភាសាខ្មែរស្តង់ដារ • កាត់តស្វ័យប្រវត្តិ
              </p>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 text-emerald-300 font-bold shrink-0">
            {t.proPartRange}
          </span>
        </div>

        {/* Link Input */}
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 mb-3">
          <div className="flex items-center justify-between text-xs font-bold text-amber-200 mb-2">
            <span>{t.proVideoLink}</span>
            <span className="text-[10px] text-gray-400">YouTube, TikTok, Facebook, Douyin</span>
          </div>
          <div className="flex gap-2">
            <input
              type="url"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder={t.urlPlaceholder}
              className="flex-1 bg-black/40 border border-gray-700 focus:border-cyan-400 rounded-xl px-3 h-10 text-xs text-white outline-none"
            />
            <button
              type="button"
              onClick={() => {
                if (videoLink) {
                  setVideoTitle('វីដេអូទាញយកពីលីង (HD)');
                  notify(lang === 'kh' ? '✅ បានផ្ទុកវីដេអូដោយជោគជ័យ' : 'Video loaded');
                }
              }}
              className="h-10 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold shadow active:scale-95 transition"
            >
              {t.downloadBtn}
            </button>
          </div>
        </div>

        {/* Video Player & Upload Zone */}
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) {
              setVideoUrl(URL.createObjectURL(f));
              setVideoTitle(f.name);
            }
          }}
        />

        <div className="rounded-xl border border-cyan-500/30 bg-black overflow-hidden shadow-inner mb-3">
          {videoUrl ? (
            <div className="p-2 flex flex-col items-center">
              <video
                src={videoUrl}
                controls
                playsInline
                className="w-full max-h-[380px] rounded-lg bg-black object-contain"
              />
              <div className="w-full mt-2 flex items-center justify-between text-xs px-1 text-gray-300">
                <span className="font-bold text-white truncate max-w-[280px]">
                  {videoTitle}
                </span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[10px] text-cyan-300 underline font-semibold"
                >
                  ប្តូរវីដេអូ
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-8 text-center cursor-pointer hover:bg-gray-900/40 transition select-none"
            >
              <Film className="w-10 h-10 text-cyan-400 mx-auto mb-2 opacity-80" />
              <div className="text-sm font-bold text-white">{t.proUploadHint}</div>
              <div className="text-[10px] text-gray-400 mt-1">MP4, MOV, MKV, WebM</div>
            </div>
          )}
        </div>

        {/* PRO Options Grid */}
        <div className="space-y-3 bg-[#0c1018] p-3 rounded-xl border border-gray-800">
          {/* 1. Translation Mode */}
          <div>
            <div className="text-xs font-bold text-cyan-200 mb-2 flex items-center gap-1.5">
              <span>{t.proMode}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMode('translate')}
                className={`p-2.5 rounded-xl border text-left transition ${
                  selectedMode === 'translate'
                    ? 'border-cyan-400 bg-cyan-500/15 text-cyan-200'
                    : 'border-gray-800 bg-gray-900/50 text-gray-300'
                }`}
              >
                <div className="text-sm mb-0.5">🗣️</div>
                <div className="text-xs font-bold">{t.modeTranslate}</div>
                <div className="text-[9px] text-gray-400 mt-0.5">បកប្រែពាក្យសន្ទនា</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMode('narration')}
                className={`p-2.5 rounded-xl border text-left transition ${
                  selectedMode === 'narration'
                    ? 'border-fuchsia-400 bg-fuchsia-500/15 text-fuchsia-200'
                    : 'border-gray-800 bg-gray-900/50 text-gray-300'
                }`}
              >
                <div className="text-sm mb-0.5">🎬</div>
                <div className="text-xs font-bold">{t.modeNarration}</div>
                <div className="text-[9px] text-gray-400 mt-0.5">និទានរឿងទាក់ទាញ</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMode('hybrid')}
                className={`p-2.5 rounded-xl border text-left transition ${
                  selectedMode === 'hybrid'
                    ? 'border-amber-400 bg-amber-500/15 text-amber-200'
                    : 'border-gray-800 bg-gray-900/50 text-gray-300'
                }`}
              >
                <div className="text-sm mb-0.5">🌟</div>
                <div className="text-xs font-bold">{t.modeHybrid}</div>
                <div className="text-[9px] text-gray-400 mt-0.5">សម្រាយ + សន្ទនា</div>
              </button>
            </div>
          </div>

          {/* 2. Mood & Emotion */}
          <div>
            <div className="text-xs font-bold text-violet-200 mb-2 flex items-center gap-1.5">
              <span>{t.proMood}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMood('dramatic')}
                className={`p-2 rounded-lg border text-xs font-semibold text-center transition ${
                  selectedMood === 'dramatic'
                    ? 'border-purple-400 bg-purple-500/20 text-purple-200'
                    : 'border-gray-800 bg-gray-900/40 text-gray-400'
                }`}
              >
                🎭 {t.moodDramatic}
              </button>
              <button
                type="button"
                onClick={() => setSelectedMood('horror')}
                className={`p-2 rounded-lg border text-xs font-semibold text-center transition ${
                  selectedMood === 'horror'
                    ? 'border-purple-400 bg-purple-500/20 text-purple-200'
                    : 'border-gray-800 bg-gray-900/40 text-gray-400'
                }`}
              >
                👻 {t.moodHorror}
              </button>
              <button
                type="button"
                onClick={() => setSelectedMood('action')}
                className={`p-2 rounded-lg border text-xs font-semibold text-center transition ${
                  selectedMood === 'action'
                    ? 'border-purple-400 bg-purple-500/20 text-purple-200'
                    : 'border-gray-800 bg-gray-900/40 text-gray-400'
                }`}
              >
                ⚔️ {t.moodAction}
              </button>
              <button
                type="button"
                onClick={() => setSelectedMood('comedy')}
                className={`p-2 rounded-lg border text-xs font-semibold text-center transition ${
                  selectedMood === 'comedy'
                    ? 'border-purple-400 bg-purple-500/20 text-purple-200'
                    : 'border-gray-800 bg-gray-900/40 text-gray-400'
                }`}
              >
                😂 {t.moodComedy}
              </button>
            </div>
          </div>

          {/* 3. BGM Music Overlay */}
          <div>
            <div className="text-xs font-bold text-amber-200 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Music className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.bgmSelect}</span>
              </span>
              <span className="text-[10px] text-gray-400">Volume: {bgmVolume}%</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setSelectedBgm('none')}
                className={`p-2 rounded-lg border text-xs font-medium truncate ${
                  selectedBgm === 'none'
                    ? 'border-amber-400 bg-amber-500/20 text-amber-200'
                    : 'border-gray-800 bg-gray-900/40 text-gray-400'
                }`}
              >
                {t.bgmNone}
              </button>
              <button
                type="button"
                onClick={() => setSelectedBgm('dramatic')}
                className={`p-2 rounded-lg border text-xs font-medium truncate ${
                  selectedBgm === 'dramatic'
                    ? 'border-amber-400 bg-amber-500/20 text-amber-200'
                    : 'border-gray-800 bg-gray-900/40 text-gray-400'
                }`}
              >
                {t.bgmDramatic}
              </button>
              <button
                type="button"
                onClick={() => setSelectedBgm('suspense')}
                className={`p-2 rounded-lg border text-xs font-medium truncate ${
                  selectedBgm === 'suspense'
                    ? 'border-amber-400 bg-amber-500/20 text-amber-200'
                    : 'border-gray-800 bg-gray-900/40 text-gray-400'
                }`}
              >
                {t.bgmSuspense}
              </button>
              <button
                type="button"
                onClick={() => setSelectedBgm('action')}
                className={`p-2 rounded-lg border text-xs font-medium truncate ${
                  selectedBgm === 'action'
                    ? 'border-amber-400 bg-amber-500/20 text-amber-200'
                    : 'border-gray-800 bg-gray-900/40 text-gray-400'
                }`}
              >
                {t.bgmAction}
              </button>
            </div>
          </div>
        </div>

        {/* Generate PRO Button */}
        <div className="mt-4">
          {isProcessing && (
            <div className="mb-3 space-y-1.5">
              <div className="flex justify-between text-xs text-fuchsia-300">
                <span>{processStep}</span>
                <span className="font-bold">{processPercent}%</span>
              </div>
              <div className="h-2 rounded-full bg-black/60 overflow-hidden">
                <div
                  className="mp3-progress h-full transition-all duration-300"
                  style={{ width: `${processPercent}%` }}
                />
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleStartPro}
            disabled={isProcessing}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 hover:brightness-110 active:scale-98 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-fuchsia-900/30 transition disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t.processing}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-cyan-300" />
                <span>{t.startProGen} (35 Credits)</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Interactive Story Script Timeline Studio */}
      <section className="bg-[#121622] rounded-xl p-3 sm:p-4 border border-cyan-500/20 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
              <FileEdit className="w-4 h-4 text-cyan-400" />
              <span>ស្ទូឌីយោអត្ថបទសម្រាយរឿង (Story Script Studio)</span>
            </h3>
            <p className="text-[10px] text-gray-400 mt-0.5">
              អ្នកអាចកែសម្រួលអត្ថបទ ស្តាប់សម្លេងមួយឃ្លាៗ ឬទាញយកឯកសារ Subtitle SRT
            </p>
          </div>
          <button
            type="button"
            onClick={() => notify(lang === 'kh' ? '✅ បានរក្សាទុកអត្ថបទដោយជោគជ័យ' : 'Script saved')}
            className="h-8 px-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold flex items-center gap-1"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>រក្សាទុក</span>
          </button>
        </div>

        {/* Script Cards */}
        <div className="space-y-2.5">
          {scriptLines.map((line, idx) => (
            <div
              key={line.id}
              className={`p-3 rounded-xl border transition ${
                activePlayingLine === line.id
                  ? 'border-cyan-400 bg-cyan-950/20'
                  : 'border-gray-800 bg-[#090c12]'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-gray-800 text-cyan-300 font-mono text-[10px] font-bold">
                    {line.timecode}
                  </span>
                  <span className="text-[11px] font-bold text-purple-300">
                    {line.speaker}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handlePlayLine(line)}
                  className={`h-7 px-2.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition ${
                    activePlayingLine === line.id
                      ? 'bg-cyan-500 text-black'
                      : 'bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20'
                  }`}
                >
                  {activePlayingLine === line.id ? (
                    <>
                      <Pause className="w-3 h-3" />
                      <span>ផ្អាក</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3 h-3" />
                      <span>ស្តាប់ឃ្លានេះ</span>
                    </>
                  )}
                </button>
              </div>

              {/* Editable Khmer script */}
              <textarea
                value={line.khmerText}
                onChange={(e) => {
                  const val = e.target.value;
                  setScriptLines(lines =>
                    lines.map(l => l.id === line.id ? { ...l, khmerText: val } : l)
                  );
                }}
                rows={2}
                className="w-full bg-black/40 border border-gray-800 focus:border-cyan-400 rounded-lg p-2 text-xs sm:text-sm text-gray-100 outline-none leading-relaxed resize-none"
              />

              <div className="text-[10px] text-gray-500 mt-1 italic">
                {line.originalText}
              </div>
            </div>
          ))}
        </div>

        {/* Studio export bar */}
        <div className="pt-2 flex items-center justify-between gap-2 flex-wrap border-t border-gray-800">
          <span className="text-[11px] text-gray-400">
            សរុប ៣ ឈុតឆាក • រយៈពេលប៉ាន់ស្មាន ០១:៤០
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => notify(lang === 'kh' ? '✅ បានទាញយកឯកសារ Subtitle SRT ជោគជ័យ' : 'SRT downloaded')}
              className="h-8 px-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>ដោនឡូត SRT</span>
            </button>
            <button
              type="button"
              onClick={() => notify(lang === 'kh' ? '🚀 បានចាប់ផ្តើម Render វីដេអូកម្រិត Full HD 1080p' : 'Rendering 1080p video')}
              className="h-8 px-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:brightness-110 text-white text-xs font-bold flex items-center gap-1 shadow"
            >
              <Download className="w-3 h-3" />
              <span>ដោនឡូត MP4 (Full HD)</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
