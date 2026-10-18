import React, { useState } from 'react';
import { X, Key, Gift, CheckCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface PromoModalProps {
  lang: Language;
  onClose: () => void;
  onApplyPromo: (credits: number, codeName: string) => void;
}

export const PromoModal: React.FC<PromoModalProps> = ({
  lang,
  onClose,
  onApplyPromo,
}) => {
  const t = translations[lang];

  const [promoCode, setPromoCode] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [appliedMsg, setAppliedMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleRedeemCode = () => {
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'HCH2026' || code === 'KHMER_AI' || code === 'FREE100' || code === 'CHAY') {
      const bonus = code === 'HCH2026' ? 250 : 100;
      onApplyPromo(bonus, code);
      setAppliedMsg({
        type: 'success',
        text: `🎉 កូដត្រឹមត្រូវ! អ្នកទទួលបាន +${bonus} Credits ដោយឥតគិតថ្លៃ!`
      });
      setTimeout(() => {
        onClose();
      }, 1800);
    } else {
      setAppliedMsg({
        type: 'error',
        text: '❌ កូដប្រូម៉ូសិនមិនត្រឹមត្រូវ ឬផុតកំណត់។ សូមសាកល្បង៖ HCH2026'
      });
    }
  };

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) return;
    localStorage.setItem('hch_custom_api_key', apiKey.trim());
    setAppliedMsg({
      type: 'success',
      text: '✅ បានរក្សាទុក Gemini API Key! អ្នកទទួលបានល្បឿន Super Fast AI!'
    });
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-[#121622] border border-amber-400/30 rounded-2xl max-w-md w-full max-h-[92vh] overflow-y-auto p-4 sm:p-5 relative shadow-2xl space-y-4">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-gray-800 text-gray-300 hover:text-white flex items-center justify-center absolute top-3.5 right-3.5"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="text-center pt-1">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/15 border border-amber-300/30 flex items-center justify-center text-2xl mx-auto mb-2 text-amber-400 shadow-lg shadow-amber-500/10">
            <Key className="w-6 h-6 text-amber-400" />
          </div>
          <h2 className="text-base sm:text-lg font-black text-white">
            {t.aiKeyPromo}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            បញ្ចូលកូដប្រូម៉ូសិន ឬភ្ជាប់ Gemini API Key ផ្ទាល់ខ្លួន
          </p>
        </div>

        {/* Feedback message */}
        {appliedMsg && (
          <div
            className={`p-3 rounded-xl text-xs font-bold ${
              appliedMsg.type === 'success'
                ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-200'
                : 'bg-red-500/20 border border-red-400/40 text-red-200'
            }`}
          >
            {appliedMsg.text}
          </div>
        )}

        {/* 1. Redeem Voucher / Promo Code */}
        <div className="bg-[#090c12] rounded-xl p-3.5 border border-amber-400/20 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
            <Gift className="w-4 h-4" />
            <span>កូដប្រូម៉ូសិនបញ្ចុះតម្លៃ ឬថែម Credit (Promo Code)</span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="ឧទាហរណ៍៖ HCH2026"
              className="flex-1 bg-black/40 border border-gray-700 focus:border-amber-400 rounded-lg px-3 h-10 text-xs text-white uppercase font-mono tracking-wider outline-none"
            />
            <button
              type="button"
              onClick={handleRedeemCode}
              className="h-10 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 active:scale-95 text-black font-black text-xs transition"
            >
              បញ្ចូល
            </button>
          </div>

          <div className="flex items-center gap-1 text-[10px] text-gray-400">
            <span>សាកល្បងកូដឥតគិតថ្លៃ៖</span>
            <button
              type="button"
              onClick={() => setPromoCode('HCH2026')}
              className="text-amber-400 underline font-mono"
            >
              HCH2026 (+250 💎)
            </button>
          </div>
        </div>

        {/* 2. Custom Gemini API Key */}
        <div className="bg-[#090c12] rounded-xl p-3.5 border border-cyan-400/20 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
            <Sparkles className="w-4 h-4" />
            <span>Gemini AI Key ផ្ទាល់ខ្លួន (ជម្រើសបន្ថែម)</span>
          </div>
          <p className="text-[10px] text-gray-400 leading-relaxed">
            ប្រសិនបើអ្នកមាន Google AI Studio Gemini Key អ្នកអាចភ្ជាប់ទីនេះដើម្បីដំណើរការបកប្រែលឿនបំផុតដោយគ្មានដែនកំណត់។
          </p>

          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full bg-black/40 border border-gray-700 focus:border-cyan-400 rounded-lg px-3 h-9 text-xs text-white outline-none font-mono"
          />

          <button
            type="button"
            onClick={handleSaveApiKey}
            className="w-full h-9 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow active:scale-95 transition"
          >
            រក្សាទុក AI Key
          </button>
        </div>
      </div>
    </div>
  );
};
