import React from 'react';
import { X, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Language } from '../types';

interface CreditInfoModalProps {
  lang: Language;
  credits: number;
  onClose: () => void;
  onOpenBuyCredits: () => void;
}

export const CreditInfoModal: React.FC<CreditInfoModalProps> = ({
  lang,
  credits,
  onClose,
  onOpenBuyCredits,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-[#121622] border border-amber-400/30 rounded-2xl max-w-md w-full max-h-[92vh] overflow-y-auto p-4 sm:p-5 relative shadow-2xl space-y-4">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-gray-800 text-gray-300 hover:text-white flex items-center justify-center absolute top-3.5 right-3.5"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="text-center pt-1">
          <div className="text-3xl mb-1">💎</div>
          <h2 className="text-base sm:text-lg font-black text-white">
            ព័ត៌មានលម្អិតអំពី Credit របស់ HCH
          </h2>
          <div className="text-xs text-amber-300 font-bold mt-1">
            សមតុល្យបច្ចុប្បន្ន៖ {credits} Credits
          </div>
        </div>

        {/* Costs Table */}
        <div className="space-y-2 text-xs">
          <div className="font-bold text-gray-200">
            តារាងតម្លៃកាត់ Credit តាមមុខងារនីមួយៗ៖
          </div>

          <div className="divide-y divide-gray-800 rounded-xl bg-[#090c12] border border-gray-800 overflow-hidden">
            <div className="p-2.5 flex items-center justify-between">
              <div>
                <b className="text-white">ដោនឡូតតាមលីង (Download Link)</b>
                <div className="text-[10px] text-gray-400">YouTube, TikTok, Facebook</div>
              </div>
              <span className="font-bold text-amber-300">5 Credits</span>
            </div>

            <div className="p-2.5 flex items-center justify-between">
              <div>
                <b className="text-white">បកប្រែវីដេអូខ្លី (AI Voice Dubbing)</b>
                <div className="text-[10px] text-gray-400">បកប្រែ + សម្លេង AI + Subtitles</div>
              </div>
              <span className="font-bold text-amber-300">25 Credits</span>
            </div>

            <div className="p-2.5 flex items-center justify-between">
              <div>
                <b className="text-white">បកប្រែកម្រិត PRO (Gemini Movie Recap)</b>
                <div className="text-[10px] text-gray-400">សម្រាយរឿងបែបភាពយន្ត + BGM</div>
              </div>
              <span className="font-bold text-amber-300">35 Credits</span>
            </div>

            <div className="p-2.5 flex items-center justify-between">
              <div>
                <b className="text-white">បកប្រែដោយសម្លេង Clone</b>
                <div className="text-[10px] text-gray-400">ប្រើសម្លេងផ្ទាល់ខ្លួនរបស់អ្នក</div>
              </div>
              <span className="font-bold text-amber-300">40 Credits</span>
            </div>

            <div className="p-2.5 flex items-center justify-between">
              <div>
                <b className="text-white">បង្កើត MP3 សម្លេង AI</b>
                <div className="text-[10px] text-gray-400">បម្លែងអត្ថបទ ឬ SRT ទៅជា MP3</div>
              </div>
              <span className="font-bold text-amber-300">5 Credits</span>
            </div>
          </div>
        </div>

        {/* Rules note */}
        <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-400/20 text-[11px] text-cyan-200 space-y-1">
          <div className="font-bold flex items-center gap-1 text-cyan-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>គោលការណ៍ Credit យុត្តិធម៌ (Fair Charge):</span>
          </div>
          <p className="leading-relaxed">
            • ប្រសិនបើការបកប្រែបរាជ័យ ឬមានកំហុសបច្ចេកទេស ប្រព័ន្ធនឹងមិនកាត់ Credit ឡើយ (Fail = 0 Credit)។<br/>
            • ការ Upload វីដេអូ ការកាត់ភាគ និងការចាក់ Preview គឺមិនគិតថ្លៃ (Free 100%)។
          </p>
        </div>

        {/* Action button */}
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenBuyCredits();
          }}
          className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 active:scale-98 text-black font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow"
        >
          <span>💎 បញ្ចូល Credit បន្ថែម</span>
        </button>
      </div>
    </div>
  );
};
