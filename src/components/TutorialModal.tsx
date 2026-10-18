import React from 'react';
import { X, Youtube, ExternalLink, Play, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface TutorialModalProps {
  lang: Language;
  onClose: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ lang, onClose }) => {
  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-[#121622] border border-red-500/30 rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-4 sm:p-5 relative shadow-2xl space-y-4">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-gray-800 text-gray-300 hover:text-white flex items-center justify-center absolute top-3.5 right-3.5 z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
            <Youtube className="w-6 h-6 fill-red-500" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-white">
              {t.howToUse}
            </h2>
            <p className="text-xs text-gray-400">
              ការណែនាំលម្អិតអំពីរបៀបបកប្រែវីដេអូ និងសម្រាយរឿងជាមួយ AI
            </p>
          </div>
        </div>

        {/* Video Player Embed / Walkthrough */}
        <div className="rounded-xl overflow-hidden border border-red-500/20 bg-black aspect-video relative group shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/i1GjYADEUg0"
            title="HCH Digital Pro Tutorial"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Step by step guide */}
        <div className="space-y-2.5">
          <div className="text-xs font-bold text-gray-200">
            ជំហានងាយៗទាំង ៤ ក្នុងការផលិតវីដេអូ៖
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-[#090c12] border border-gray-800 flex gap-2.5 items-start">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-cyan-400 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                ១
              </span>
              <div>
                <b className="text-white">ទាញយក ឬ Upload វីដេអូ៖</b>
                <p className="text-gray-400 mt-0.5 text-[11px]">
                  ចម្លង Link ពី YouTube, TikTok ឬ Facebook ហើយចុច «ដោនឡូត» ឬ Upload វីដេអូផ្ទាល់ខ្លួនពីក្នុងទូរស័ព្ទ។
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#090c12] border border-gray-800 flex gap-2.5 items-start">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-cyan-400 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                ២
              </span>
              <div>
                <b className="text-white">ជ្រើសរើសសម្លេង AI (សម្លេងស្រី ឬ ប្រុស)៖</b>
                <p className="text-gray-400 mt-0.5 text-[11px]">
                  ជ្រើសរើសសម្លេងស្រីសម្រាប់ការសម្រាយរឿងមនោសញ្ចេតនា ឬសម្លេងប្រុសសម្រាប់រឿងវាយតប់។
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#090c12] border border-gray-800 flex gap-2.5 items-start">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-cyan-400 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                ៣
              </span>
              <div>
                <b className="text-white">ចុច «បកប្រែខ្មែរទាំងអស់»៖</b>
                <p className="text-gray-400 mt-0.5 text-[11px]">
                  ប្រព័ន្ធ AI នឹងធ្វើការវិភាគ សរសេរអត្ថបទសម្រាយ និងបញ្ចូលសម្លេងខ្មែរស្វ័យប្រវត្តិក្នងរយៈពេលត្រឹមតែប៉ុន្មានវិនាទី។
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#090c12] border border-gray-800 flex gap-2.5 items-start">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-cyan-400 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                ៤
              </span>
              <div>
                <b className="text-white">ទាញយក MP4 & SRT រួចបង្ហោះលើបណ្តាញសង្គម៖</b>
                <p className="text-gray-400 mt-0.5 text-[11px]">
                  ទាញយកវីដេអូ Full HD ដើម្បីបង្ហោះលើ TikTok, Facebook Reels, YouTube Shorts រកប្រាក់ចំណូលបានភ្លាមៗ!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Direct YouTube link */}
        <a
          href="https://youtu.be/i1GjYADEUg0"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-10 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow active:scale-95 transition"
        >
          <Youtube className="w-4 h-4" />
          <span>ទស្សនាលើ YouTube ផ្លូវការ</span>
          <ExternalLink className="w-3 h-3 ml-1" />
        </a>
      </div>
    </div>
  );
};
