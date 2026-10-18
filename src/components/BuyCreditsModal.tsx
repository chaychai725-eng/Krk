import React, { useState } from 'react';
import { X, Check, QrCode, Send, Sparkles, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface BuyCreditsModalProps {
  lang: Language;
  onClose: () => void;
  onAddCredits: (amount: number) => void;
}

export const BuyCreditsModal: React.FC<BuyCreditsModalProps> = ({
  lang,
  onClose,
  onAddCredits,
}) => {
  const t = translations[lang];

  const packages = [
    {
      id: 'tier_1',
      credits: 500,
      price: '$5.00',
      bonus: '',
      popular: false,
      descKh: 'សាកសមសម្រាប់អ្នកចាប់ផ្តើមបកប្រែវីដេអូខ្លីៗ',
      descEn: 'Suitable for beginners creating short clips'
    },
    {
      id: 'tier_2',
      credits: 1200,
      price: '$10.00',
      bonus: '+ 200 Credits Free',
      popular: true,
      descKh: 'កញ្ចប់លក់ដាច់បំផុតសម្រាប់អ្នកផលិតមាតិកា TikTok / FB',
      descEn: 'Most popular package for TikTok/FB creators'
    },
    {
      id: 'tier_3',
      credits: 3000,
      price: '$20.00',
      bonus: '+ 800 Credits Free',
      popular: false,
      descKh: 'សម្រាប់សម្រាយរឿងភាគ និងវីដេអូវែងៗជាប្រចាំ',
      descEn: 'For regular drama recaps and long video dubbing'
    },
    {
      id: 'tier_4',
      credits: 10000,
      price: '$50.00',
      bonus: '+ 3,000 Credits Free',
      popular: false,
      descKh: 'កញ្ចប់ VIP Master សម្រាប់ស្ទូឌីយោ និងក្រុមការងារ',
      descEn: 'VIP Master bundle for production teams'
    }
  ];

  const [selectedPack, setSelectedPack] = useState(packages[1]);
  const [showQr, setShowQr] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onAddCredits(selectedPack.credits);
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-[#121622] border border-cyan-400/30 rounded-2xl max-w-md w-full max-h-[92vh] overflow-y-auto p-4 sm:p-5 relative shadow-2xl space-y-4">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-gray-800 text-gray-300 hover:text-white flex items-center justify-center absolute top-3.5 right-3.5"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center pt-1">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/15 border border-amber-300/30 flex items-center justify-center text-2xl mx-auto mb-2 shadow-lg shadow-amber-500/10">
            💎
          </div>
          <h2 className="text-base sm:text-lg font-black text-white">
            {t.buyCreditsTitle}
          </h2>
          <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
            {t.buyCreditsDesc}
          </p>
        </div>

        {/* Package Tiers */}
        <div className="space-y-2">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => {
                setSelectedPack(pkg);
                setShowQr(false);
              }}
              className={`p-3 rounded-xl border transition cursor-pointer relative ${
                selectedPack.id === pkg.id
                  ? 'border-cyan-400 bg-cyan-950/20 shadow-md shadow-cyan-500/10'
                  : 'border-gray-800 bg-[#090c12] hover:border-gray-700'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-2 right-3 text-[9px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-red-500 to-amber-500 text-white shadow">
                  {t.popularBadge}
                </span>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-white">
                      💎 {pkg.credits.toLocaleString()} Credits
                    </span>
                    {pkg.bonus && (
                      <span className="text-[10px] text-amber-300 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/30">
                        {pkg.bonus}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {lang === 'kh' ? pkg.descKh : pkg.descEn}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-black text-cyan-300">
                    {pkg.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Options */}
        {showQr ? (
          <div className="bg-[#090c12] rounded-xl p-4 border border-cyan-400/30 text-center space-y-3">
            <div className="text-xs font-bold text-gray-200">
              {t.payWithKhqr}
            </div>
            {/* Real KHQR Simulation Box */}
            <div className="w-48 h-48 mx-auto bg-white p-2.5 rounded-2xl shadow-xl flex flex-col items-center justify-between border-4 border-red-600">
              <div className="text-red-600 font-black text-xs tracking-wider">
                BAKONG KHQR
              </div>
              {/* QR Pattern visual */}
              <div className="w-32 h-32 bg-gray-900 rounded-lg p-2 flex items-center justify-center">
                <QrCode className="w-full h-full text-white" />
              </div>
              <div className="text-[10px] text-gray-800 font-bold">
                HCH DIGITAL PRO • {selectedPack.price}
              </div>
            </div>
            <div className="text-[11px] text-gray-400">
              ABA Account: <b className="text-white">002 899 314 (HCH DIGITAL)</b>
            </div>

            {successMsg ? (
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                ✅ បញ្ចូល Credit ជោគជ័យ! +{selectedPack.credits} 💎
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="w-full h-10 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
              >
                {isProcessing ? 'កំពុងត្រួតពិនិត្យការទូទាត់...' : 'ខ្ញុំបានផ្ទេរប្រាក់រួចហើយ (បញ្ជាក់ភ្លាមៗ)'}
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={() => setShowQr(true)}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:brightness-110 active:scale-98 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <QrCode className="w-4 h-4" />
              <span>បង់ប្រាក់តាម Bakong KHQR / ABA ({selectedPack.price})</span>
            </button>

            <a
              href="https://t.me/huy_support"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-10 rounded-xl bg-[#229ed9]/15 hover:bg-[#229ed9]/25 border border-[#229ed9]/40 text-cyan-200 text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              <Send className="w-3.5 h-3.5 text-[#229ed9]" />
              <span>{t.contactSupport} (@huy_support)</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
