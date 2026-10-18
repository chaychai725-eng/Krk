import React, { useState, useRef } from 'react';
import { 
  Download, Upload, Scissors, Trash2, Film, CheckCircle2, 
  Play, Pause, Mic, Volume2, Sparkles, AlertCircle, FileText,
  RotateCcw, ExternalLink, Music, Loader2
} from 'lucide-react';
import { Language, VideoItem, VoiceChoice, VideoPart } from '../types';
import { translations } from '../translations';
import { playKhmerVoice, stopSpeech } from '../audioHelper';
import { executeAiTranslation } from '../services/aiModels';

interface TranslationPageProps {
  lang: Language;
  credits: number;
  deductCredits: (amount: number, reason: string) => boolean;
  completedVideos: VideoItem[];
  setCompletedVideos: React.Dispatch<React.SetStateAction<VideoItem[]>>;
  notify: (msg: string) => void;
  onOpenScript: (video: VideoItem) => void;
  onOpenBuyCredits: () => void;
  onOpenCreditInfo: () => void;
}

export const TranslationPage: React.FC<TranslationPageProps> = ({
  lang,
  credits,
  deductCredits,
  completedVideos,
  setCompletedVideos,
  notify,
  onOpenScript,
  onOpenBuyCredits,
  onOpenCreditInfo,
}) => {
  const t = translations[lang];

  // States
  const [videoLink, setVideoLink] = useState('');
  const [isDownloadingLink, setIsDownloadingLink] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState('');

  // Long video state
  const [cutMinutes, setCutMinutes] = useState('2');
  const [cutMode, setCutMode] = useState('fast');
  const [longParts, setLongParts] = useState<VideoPart[]>([
    {
      partIndex: 1,
      title: 'Episode 01 - ភាគ ១ (00:00 - 02:00)',
      duration: '02:00',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    },
    {
      partIndex: 2,
      title: 'Episode 02 - ភាគ ២ (02:00 - 04:00)',
      duration: '02:00',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
    }
  ]);

  // Short video state
  const [shortVideo, setShortVideo] = useState<string | null>(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  );
  const [shortVideoTitle, setShortVideoTitle] = useState('សម្រង់ឈុតពិសេស៖ វីដេអូខ្លីគំរូសម្រាប់បកប្រែ');
  const [selectedVoice, setSelectedVoice] = useState<VoiceChoice>('female');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationStep, setTranslationStep] = useState('');
  const [translationProgress, setTranslationProgress] = useState(0);

  // Completed preview
  const [activeCompletedVideo, setActiveCompletedVideo] = useState<VideoItem | null>(null);

  // Clone voice state
  const [showCloneCard, setShowCloneCard] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVoiceSample, setRecordedVoiceSample] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  // Preview Voice Sample
  const [previewingVoice, setPreviewingVoice] = useState<'female' | 'male' | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const longFileInputRef = useRef<HTMLInputElement>(null);

  // Test listen voice
  const handleTestVoice = (voice: 'female' | 'male') => {
    stopSpeech();
    setPreviewingVoice(voice);
    const sampleText = voice === 'female' 
      ? 'សួស្តី! នេះគឺជាសម្លេងស្រី AI សម្រាប់បកប្រែរឿង ភាសាខ្មែរយ៉ាងរលូន។' 
      : 'សួស្តីបងប្អូន! នេះជាសម្លេងប្រុស AI ដ៏មានឥទ្ធិពល សម្រាប់សម្រាយសាច់រឿង។';
    playKhmerVoice(sampleText, voice, 1.0, 1.0, () => {
      setPreviewingVoice(null);
    });
  };

  // Download Link handler
  const handleDownloadLink = () => {
    if (!videoLink.trim()) {
      setDownloadMsg(lang === 'kh' ? 'សូមបញ្ចូល Link វីដេអូ YouTube / TikTok' : 'Please enter a video URL');
      return;
    }

    if (!deductCredits(5, 'Link Download')) {
      onOpenBuyCredits();
      return;
    }

    setIsDownloadingLink(true);
    setDownloadMsg(lang === 'kh' ? 'កំពុងទាញយកវីដេអូពី Server...' : 'Fetching video from link...');

    setTimeout(() => {
      setIsDownloadingLink(false);
      setShortVideo('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
      setShortVideoTitle(videoLink.includes('tiktok') ? 'TikTok Viral Video (HD)' : 'YouTube Clip HD');
      setDownloadMsg(lang === 'kh' ? '✅ ទាញយកបានជោគជ័យ! រួចរាល់សម្រាប់បកប្រែ' : '✅ Video downloaded successfully!');
      setTimeout(() => setDownloadMsg(''), 4000);
    }, 2200);
  };

  // Split long video simulation
  const handleUploadLongVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newParts: VideoPart[] = [
      {
        partIndex: 1,
        title: `${file.name.replace(/\.[^/.]+$/, '')} - ភាគ ១ (00:00 - 0${cutMinutes}:00)`,
        duration: `0${cutMinutes}:00`,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
      },
      {
        partIndex: 2,
        title: `${file.name.replace(/\.[^/.]+$/, '')} - ភាគ ២ (0${cutMinutes}:00 - 0${Number(cutMinutes) * 2}:00)`,
        duration: `0${cutMinutes}:00`,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
      },
      {
        partIndex: 3,
        title: `${file.name.replace(/\.[^/.]+$/, '')} - ភាគ ៣ (ចប់)`,
        duration: `01:45`,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
      }
    ];

    setLongParts(newParts);
  };

  // Upload Short Video
  const handleUploadShortVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setShortVideo(url);
      setShortVideoTitle(file.name);
    }
  };

  // Run AI Translation
  const handleGenerateAll = async () => {
    if (!shortVideo) {
      notify(lang === 'kh' ? 'សូម Upload ឬដោនឡូតវីដេអូជាមុនសិន' : 'Please upload a video first');
      return;
    }

    const cost = showCloneCard ? 40 : 25;
    if (!deductCredits(cost, 'Khmer Video Translation')) {
      onOpenBuyCredits();
      return;
    }

    setIsTranslating(true);
    setTranslationProgress(15);
    setTranslationStep(lang === 'kh' ? '🎵 កំពុងស្រង់សម្លេង និងបម្លែងអត្ថបទ (Transcribing)...' : '🎵 Extracting audio and transcribing dialogue...');

    try {
      const aiResultPromise = executeAiTranslation({
        videoTitle: shortVideoTitle,
        voice: selectedVoice,
        mode: 'narration',
      });

      setTimeout(() => {
        setTranslationProgress(45);
        setTranslationStep(lang === 'kh' ? '🧠 កំពុងបកប្រែទៅជាភាសាខ្មែរតាមក្បួនសម្រាយរឿង (Gemini 3.8 Flash)...' : '🧠 Translating to native Khmer story narration...');
      }, 1200);

      setTimeout(() => {
        setTranslationProgress(75);
        setTranslationStep(
          lang === 'kh' 
            ? `🎙️ កំពុងបង្កើតសម្លេង AI (${selectedVoice === 'female' ? 'សម្លេងស្រី 48kHz' : 'សម្លេងប្រុស 48kHz'})...` 
            : '🎙️ Synthesizing Khmer AI Voiceover & sync...'
        );
      }, 2500);

      const aiResult = await aiResultPromise;

      setTranslationProgress(100);
      setTranslationStep(lang === 'kh' ? '✨ បញ្ចូល Subtitles និងរៀបចំឯកសាររួចរាល់!' : '✨ Finalizing video & subtitles!');

      setTimeout(() => {
        setIsTranslating(false);
        const newCompleted: VideoItem = {
          id: `vid_${Date.now()}`,
          title: `${shortVideoTitle} [បកប្រែខ្មែររួចរាល់]`,
          duration: '02:30',
          durationSec: 150,
          kind: 'completed',
          thumbnailUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&auto=format&fit=crop&q=80',
          videoUrl: shortVideo,
          status: 'completed',
          voice: selectedVoice,
          mode: 'narration',
          dateAdded: 'ទើបតែបកប្រែ',
          khmerScript: aiResult.khmerScript,
        };

        setCompletedVideos(prev => [newCompleted, ...prev]);
        setActiveCompletedVideo(newCompleted);

        // Play completion voice preview
        handleTestVoice(selectedVoice === 'female' ? 'female' : 'male');
      }, 700);
    } catch {
      setIsTranslating(false);
    }
  };

  // Mock Voice Recording for Voice Cloning
  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingSeconds(0);
      const interval = setInterval(() => {
        setRecordingSeconds(sec => {
          if (sec >= 15) {
            clearInterval(interval);
            setIsRecording(false);
            setRecordedVoiceSample('voice_clone_custom_sample.wav');
            return 15;
          }
          return sec + 1;
        });
      }, 1000);
    } else {
      setIsRecording(false);
      setRecordedVoiceSample('voice_clone_custom_sample.wav');
    }
  };

  return (
    <main className="max-w-4xl w-full mx-auto px-2.5 sm:px-3 py-3 sm:py-4 space-y-4 pb-24">
      {/* 1. Direct Video Link Input */}
      <section className="bg-[#121622] rounded-xl p-3 border border-gray-800 shadow-lg">
        <div className="flex gap-2">
          <input
            type="url"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="flex-grow bg-[#090c12] border border-gray-700 hover:border-gray-600 focus:border-blue-500 text-xs sm:text-sm text-gray-100 rounded-lg px-3 h-10 outline-none transition"
            placeholder={t.urlPlaceholder}
          />
          <button
            type="button"
            onClick={handleDownloadLink}
            disabled={isDownloadingLink}
            className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white px-3 sm:px-4 h-10 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 shadow-md transition disabled:opacity-50"
          >
            {isDownloadingLink ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{t.downloadBtn}</span>
          </button>
        </div>

        {/* Quick sample link buttons */}
        <div className="mt-2 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
            <span className="text-gray-500">គំរូ៖</span>
            <button
              type="button"
              onClick={() => setVideoLink('https://www.tiktok.com/@khmer_stories/video/728912389')}
              className="text-cyan-400 hover:underline bg-cyan-400/10 px-1.5 py-0.5 rounded border border-cyan-400/20"
            >
              TikTok Drama
            </button>
            <button
              type="button"
              onClick={() => setVideoLink('https://www.youtube.com/watch?v=sample_movie_recap')}
              className="text-red-400 hover:underline bg-red-400/10 px-1.5 py-0.5 rounded border border-red-400/20"
            >
              YouTube Recap
            </button>
          </div>
          <span className="text-[10px] text-amber-300 font-bold">
            {t.costPerDownload}
          </span>
        </div>

        {downloadMsg && (
          <div className="mt-2 text-xs text-cyan-300 animate-fadeIn">
            {downloadMsg}
          </div>
        )}

        <div className="mt-2 text-[10px] text-gray-500 border-t border-gray-800/80 pt-1.5">
          {t.freeNotice}
        </div>
      </section>

      {/* 2. Long Videos Section (វីដេអូវែង) */}
      <section className="bg-[#121622] rounded-xl p-3 border border-amber-400/25 shadow-lg shadow-amber-950/10">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-400/10 border border-amber-400/30 text-amber-300">
              <Film className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.longVideoTitle}</span>
            </span>
            <span className="text-[10px] bg-gray-800 text-gray-300 font-bold px-2 py-0.5 rounded">
              {longParts.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => notify(lang === 'kh' ? '✅ បានទាញយកគ្រប់ភាគជោគជ័យ' : 'All parts downloaded')}
              className="h-8 px-2.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-bold flex items-center gap-1 active:scale-95 transition"
            >
              <Download className="w-3 h-3" />
              <span className="hidden xs:inline">{t.downloadAll}</span>
            </button>
            <button
              type="button"
              onClick={() => setLongParts([])}
              className="h-8 px-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-400/30 text-red-300 text-[10px] font-bold flex items-center gap-1 active:scale-95 transition"
            >
              <Trash2 className="w-3 h-3" />
              <span className="hidden xs:inline">{t.clearAll}</span>
            </button>
          </div>
        </div>

        {/* Tip banner */}
        <div className="mb-2.5 rounded-lg border border-amber-400/20 bg-amber-400/5 px-3 py-2 text-[11px] text-gray-300 flex items-start gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-amber-300 mt-0.5 shrink-0" />
          <span>{t.longVideoDesc}</span>
        </div>

        {/* Upload Zone */}
        <input
          ref={longFileInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleUploadLongVideo}
        />
        <div
          onClick={() => longFileInputRef.current?.click()}
          className="border border-dashed border-amber-400/30 hover:border-amber-400/60 bg-amber-400/5 rounded-xl px-4 py-3 cursor-pointer mb-3 flex items-center justify-center gap-3 min-h-[58px] transition group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-300/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
            <Upload className="w-4 h-4 text-amber-300" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-amber-200">
              {t.uploadLongVideo}
            </div>
            <div className="text-[10px] text-gray-400">
              {t.forVideosOver5m}
            </div>
          </div>
        </div>

        {/* Cut duration controls */}
        <div className="flex items-center justify-between sm:justify-end gap-2 mb-3 text-xs text-gray-400 flex-wrap">
          <span className="text-[11px] font-medium text-gray-300">{t.cutEachPart}</span>
          <select
            value={cutMinutes}
            onChange={(e) => setCutMinutes(e.target.value)}
            className="bg-[#090c12] border border-cyan-400/50 rounded-lg h-8 px-2 text-xs font-bold text-cyan-200 outline-none focus:border-cyan-300 cursor-pointer"
          >
            <option value="1">1 min</option>
            <option value="2">2 min (ស្តង់ដារ)</option>
            <option value="3">3 min</option>
            <option value="4">4 min</option>
            <option value="5" disabled>5 min 🔒 VIP</option>
          </select>

          <select
            value={cutMode}
            onChange={(e) => setCutMode(e.target.value)}
            className="bg-[#090c12] border border-cyan-400/50 rounded-lg h-8 px-2 text-xs font-bold text-cyan-200 outline-none focus:border-cyan-300 cursor-pointer"
          >
            <option value="fast">{t.cutFast}</option>
            <option value="exact">{t.cutExact}</option>
          </select>
        </div>

        {/* Parts list */}
        {longParts.length > 0 ? (
          <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
            {longParts.map((part) => (
              <div
                key={part.partIndex}
                className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#090c12] border border-gray-800 hover:border-gray-700 transition"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-6 h-6 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/30 text-[10px] font-extrabold flex items-center justify-center shrink-0">
                    {part.partIndex}
                  </span>
                  <div className="truncate">
                    <p className="text-xs font-bold text-gray-200 truncate">{part.title}</p>
                    <span className="text-[10px] text-cyan-400">{part.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setShortVideo(part.videoUrl);
                      setShortVideoTitle(part.title);
                    }}
                    className="h-7 px-2 rounded bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-200 text-[10px] font-semibold flex items-center gap-1 transition"
                    title="Send to translation player"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>បកប្រែ</span>
                  </button>
                  <a
                    href={part.videoUrl}
                    download
                    className="h-7 px-2 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 text-[10px] font-semibold flex items-center gap-1 transition"
                  >
                    <Download className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-xs text-gray-500">
            មិនទាន់មានវីដេអូដែលបានកាត់នៅឡើយទេ
          </div>
        )}
      </section>

      {/* 3. Short Videos Section & Live Video Preview */}
      <section className="bg-[#121622] rounded-xl p-3 border border-blue-500/25 shadow-lg">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-500/10 border border-blue-400/30 text-blue-300">
            <Film className="w-3.5 h-3.5 text-blue-300" />
            <span>{t.shortVideoTitle}</span>
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleUploadShortVideo}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="h-7 px-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-400/30 text-blue-200 text-[10px] font-bold flex items-center gap-1 active:scale-95 transition"
          >
            <Upload className="w-3 h-3" />
            <span>{t.uploadShortBtn}</span>
          </button>
        </div>

        <div className="mb-2 rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-[11px] text-cyan-200 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
          <span>{t.shortVideoDesc}</span>
        </div>

        {/* Video Player Box */}
        <div className="rounded-xl border border-cyan-400/20 bg-black overflow-hidden shadow-inner mb-3">
          {shortVideo ? (
            <div className="p-2 flex flex-col items-center">
              <video
                src={shortVideo}
                controls
                playsInline
                className="max-w-full max-h-[380px] w-auto h-auto rounded-lg object-contain bg-black"
              />
              <div className="w-full mt-2 flex items-center justify-between text-xs px-1 text-gray-300">
                <span className="font-bold text-white truncate max-w-[280px]">
                  {shortVideoTitle}
                </span>
                <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  Ready to Dub
                </span>
              </div>
            </div>
          ) : (
            <div className="min-h-[200px] flex flex-col items-center justify-center p-6 text-center">
              <Film className="w-10 h-10 text-cyan-400/50 mb-2" />
              <div className="text-sm font-bold text-white">{t.noVideoYet}</div>
              <div className="text-xs text-gray-400 mt-1">{t.uploadShortPreviewHint}</div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold shadow active:scale-95 transition"
              >
                {t.uploadShortBtn}
              </button>
            </div>
          )}
        </div>

        {/* Voice Selection */}
        <div className="mb-3">
          <div className="text-xs font-semibold text-gray-300 mb-2 flex items-center justify-between">
            <span>🎙️ {t.chooseVoice}</span>
            <span className="text-[10px] text-gray-500">ចុចលើប៊ូតុងដើម្បីស្តាប់គំរូ</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Female voice */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedVoice('female')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedVoice('female');
                }
              }}
              className={`p-3 rounded-xl border text-left transition relative cursor-pointer select-none ${
                selectedVoice === 'female'
                  ? 'border-pink-500 bg-pink-500/15 shadow-md shadow-pink-500/10'
                  : 'border-gray-800 bg-[#090c12] hover:border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-2xl mb-1">👩</div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTestVoice('female');
                  }}
                  className="p-1 rounded-md bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 text-[10px] flex items-center gap-1 font-bold active:scale-95 transition"
                  title="Listen sample"
                >
                  <Volume2 className="w-3 h-3" />
                  <span>{previewingVoice === 'female' ? '...' : 'ស្តាប់'}</span>
                </button>
              </div>
              <div className="text-xs font-bold text-pink-200">{t.femaleVoice}</div>
              <div className="text-[9px] text-gray-400 mt-0.5">ទន់ភ្លន់ ជក់ចិត្ត សាកសមរឿងភាគ</div>
            </div>

            {/* Male voice */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedVoice('male')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedVoice('male');
                }
              }}
              className={`p-3 rounded-xl border text-left transition relative cursor-pointer select-none ${
                selectedVoice === 'male'
                  ? 'border-blue-500 bg-blue-500/15 shadow-md shadow-blue-500/10'
                  : 'border-gray-800 bg-[#090c12] hover:border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-2xl mb-1">👨</div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTestVoice('male');
                  }}
                  className="p-1 rounded-md bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-[10px] flex items-center gap-1 font-bold active:scale-95 transition"
                  title="Listen sample"
                >
                  <Volume2 className="w-3 h-3" />
                  <span>{previewingVoice === 'male' ? '...' : 'ស្តាប់'}</span>
                </button>
              </div>
              <div className="text-xs font-bold text-blue-200">{t.maleVoice}</div>
              <div className="text-[9px] text-gray-400 mt-0.5">អំណាច ម៉ឺងម៉ាត់ សាកសមរឿងវាយតប់</div>
            </div>
          </div>
        </div>

        {/* Translation action card */}
        <div className="rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-900/20 via-indigo-900/20 to-purple-900/20 p-3 mb-3">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div>
              <div className="text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">
                {t.translateCardTitle}
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">
                {t.translateCardDesc}
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenCreditInfo}
              className="text-[10px] font-bold px-2 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 shrink-0"
            >
              {t.translateCostBadge}
            </button>
          </div>

          {/* Progress bar during translation */}
          {isTranslating && (
            <div className="my-3 space-y-1.5">
              <div className="flex justify-between text-[11px] text-cyan-300">
                <span>{translationStep}</span>
                <span className="font-bold">{translationProgress}%</span>
              </div>
              <div className="h-2 rounded-full bg-black/50 overflow-hidden">
                <div
                  className="mp3-progress h-full transition-all duration-300"
                  style={{ width: `${translationProgress}%` }}
                />
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleGenerateAll}
            disabled={isTranslating}
            className="w-full h-10 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:brightness-110 active:scale-98 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40 transition disabled:opacity-50"
          >
            {isTranslating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t.processing}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t.generateKhAll}</span>
              </>
            )}
          </button>
        </div>

        {/* Clone Voice Collapsible Studio */}
        <div className="rounded-xl border border-fuchsia-500/30 bg-fuchsia-950/20 p-3">
          <div
            onClick={() => setShowCloneCard(!showCloneCard)}
            className="flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">🎙️</span>
              <div>
                <div className="text-xs font-bold text-fuchsia-200">
                  {t.cloneCardTitle}
                </div>
                <div className="text-[10px] text-gray-400">
                  {t.cloneCardDesc}
                </div>
              </div>
            </div>
            <span className="text-xs text-fuchsia-400 font-bold">
              {showCloneCard ? '▲ បង្រួញ' : '▼ បើក Studio'}
            </span>
          </div>

          {showCloneCard && (
            <div className="mt-3 pt-3 border-t border-fuchsia-500/20 space-y-3">
              <div className="text-[10px] text-fuchsia-300/90 bg-fuchsia-500/10 p-2 rounded-lg border border-fuchsia-400/20">
                {t.cloneHint}
              </div>

              {/* Record Microphone or upload */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`h-11 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                    isRecording
                      ? 'border-red-500 bg-red-500/20 text-red-200 animate-pulse'
                      : 'border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-100 hover:bg-fuchsia-500/20'
                  }`}
                >
                  <Mic className={`w-4 h-4 ${isRecording ? 'text-red-400 animate-bounce' : 'text-fuchsia-300'}`} />
                  <span>
                    {isRecording ? `កំពុងថត (${recordingSeconds}s)...` : t.recordVoiceSample}
                  </span>
                </button>

                <label className="h-11 rounded-xl border border-gray-700 bg-gray-900/60 hover:bg-gray-800 text-gray-200 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-gray-400" />
                  <span className="truncate">{t.uploadVoiceSample}</span>
                  <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setRecordedVoiceSample(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>

              {recordedVoiceSample && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-green-500/30 text-xs text-green-300">
                  <span className="truncate">✅ Voice Clone Model: {recordedVoiceSample}</span>
                  <button
                    type="button"
                    onClick={() => handleTestVoice('female')}
                    className="text-[10px] text-cyan-300 underline font-bold"
                  >
                    តេស្តសម្លេង
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 4. Completed Khmer Videos Section (វីដេអូបកប្រែរួចរាល់) */}
      <section className="bg-[#121622] rounded-xl p-3 border border-emerald-500/25 shadow-lg">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div>
            <h2 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{t.completedTitle}</span>
            </h2>
            <p className="text-[10px] text-gray-400 mt-0.5">
              {t.completedSubtitle}
            </p>
          </div>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
            {completedVideos.length} វីដេអូ
          </span>
        </div>

        {/* Inline Player for active completed video */}
        {activeCompletedVideo && (
          <div className="mb-3 rounded-xl border border-emerald-500/30 bg-black overflow-hidden shadow-lg animate-fadeIn">
            <div className="flex items-center justify-between px-3 py-2 bg-[#090c12] border-b border-gray-800">
              <span className="text-xs font-bold text-gray-200 truncate">
                {activeCompletedVideo.title}
              </span>
              <button
                type="button"
                onClick={() => setActiveCompletedVideo(null)}
                className="text-gray-400 hover:text-white text-xs px-2 py-0.5 rounded bg-gray-800"
              >
                ✕
              </button>
            </div>
            <div className="p-2 flex flex-col items-center">
              <video
                src={activeCompletedVideo.videoUrl}
                controls
                playsInline
                autoPlay
                className="w-full max-h-[380px] rounded-lg bg-black object-contain"
              />
            </div>
          </div>
        )}

        {/* List of completed videos */}
        <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
          {completedVideos.map((vid) => (
            <div
              key={vid.id}
              className={`p-2.5 rounded-xl border transition cursor-pointer ${
                activeCompletedVideo?.id === vid.id
                  ? 'border-emerald-500 bg-emerald-950/20'
                  : 'border-gray-800 bg-[#090c12] hover:border-gray-700'
              }`}
              onClick={() => setActiveCompletedVideo(vid)}
            >
              <div className="flex gap-2.5 items-start">
                <div className="w-20 h-14 rounded-lg overflow-hidden bg-gray-900 shrink-0 relative">
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 text-[8px] bg-black/80 text-white px-1 rounded font-bold">
                    {vid.duration}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-bold text-gray-100 line-clamp-2">
                    {vid.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                    <span className="text-emerald-400 font-semibold">
                      {vid.voice === 'female' ? '👩 សម្លេងស្រី' : '👨 សម្លេងប្រុស'}
                    </span>
                    <span>• {vid.dateAdded}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-2.5 pt-2 border-t border-gray-800 flex items-center justify-between gap-1 flex-wrap">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenScript(vid);
                  }}
                  className="h-7 px-2.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[10px] font-bold flex items-center gap-1 active:scale-95 transition"
                >
                  <FileText className="w-3 h-3" />
                  <span>{t.viewScript}</span>
                </button>

                <div className="flex items-center gap-1">
                  <a
                    href={vid.videoUrl}
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="h-7 px-2.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/30 text-emerald-200 text-[10px] font-bold flex items-center gap-1 active:scale-95 transition"
                  >
                    <Download className="w-3 h-3" />
                    <span>{t.downloadMp4}</span>
                  </a>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      notify(lang === 'kh' ? '✅ បានទាញយកឯកសារ Subtitle (.srt)' : 'SRT Subtitle downloaded');
                    }}
                    className="h-7 px-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-[10px] font-bold flex items-center gap-1"
                    title="Download SRT Subtitle"
                  >
                    <span>SRT</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      notify(lang === 'kh' ? '✅ បានទាញយកឯកសារសម្លេង (.mp3)' : 'MP3 Audio downloaded');
                    }}
                    className="h-7 px-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-[10px] font-bold flex items-center gap-1"
                    title="Download MP3 voiceover only"
                  >
                    <Music className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
