import React, { useState } from 'react';
import { X, User, Shield, Calendar, Send, LogOut, CheckCircle, Smartphone } from 'lucide-react';
import { Language, UserAccount } from '../types';
import { translations } from '../translations';

interface AccountModalProps {
  lang: Language;
  account: UserAccount;
  onUpdateAccount: (updated: Partial<UserAccount>) => void;
  onClose: () => void;
  onOpenBuyCredits: () => void;
  onOpenAdmin: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  lang,
  account,
  onUpdateAccount,
  onClose,
  onOpenBuyCredits,
  onOpenAdmin,
}) => {
  const t = translations[lang];

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(account.name);
  const [telegram, setTelegram] = useState(account.telegramHandle);

  const handleSave = () => {
    onUpdateAccount({ name, telegramHandle: telegram });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-[#121622] border border-indigo-500/30 rounded-2xl max-w-md w-full max-h-[92vh] overflow-y-auto p-4 sm:p-5 relative shadow-2xl space-y-4">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-gray-800 text-gray-300 hover:text-white flex items-center justify-center absolute top-3.5 right-3.5"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Avatar & Identity */}
        <div className="text-center pt-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-0.5 mx-auto mb-2.5 shadow-xl shadow-indigo-500/20">
            <div className="w-full h-full bg-[#0a0d15] rounded-[14px] flex items-center justify-center text-cyan-300 text-2xl font-black">
              {account.name.charAt(0)}
            </div>
          </div>
          <h2 className="text-base sm:text-lg font-black text-white">
            {account.name}
          </h2>
          <div className="text-xs text-cyan-400 font-semibold mt-0.5 flex items-center justify-center gap-1">
            <Send className="w-3 h-3 text-[#229ed9]" />
            <span>{account.telegramHandle}</span>
          </div>
          <span className="inline-block mt-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            {account.isVip ? '👑 VIP Member' : 'Standard User'}
          </span>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-amber-950/30 via-slate-900 to-amber-950/20 rounded-xl p-3.5 border border-amber-400/30 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-gray-400">{t.currentCredits}</div>
            <div className="text-xl sm:text-2xl font-black text-amber-300 flex items-center gap-1.5 mt-0.5">
              <span>💎</span>
              <span>{account.credits}</span>
            </div>
            <div className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gray-400" />
              <span>{t.creditsExpire}: {account.expiryDate}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenBuyCredits();
            }}
            className="h-9 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-black shadow transition active:scale-95"
          >
            {t.buyCredits}
          </button>
        </div>

        {/* Feature Access Matrix */}
        <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] bg-black/40 p-2.5 rounded-xl border border-gray-800">
          <div className="p-1 rounded bg-gray-900/60">
            <div className="text-sm">🎬</div>
            <div className="text-gray-300 font-semibold mt-1">បកប្រែរឿង</div>
            <div className="text-emerald-400 font-bold">Active</div>
          </div>
          <div className="p-1 rounded bg-gray-900/60">
            <div className="text-sm">✨</div>
            <div className="text-gray-300 font-semibold mt-1">បកប្រែ PRO</div>
            <div className="text-emerald-400 font-bold">Active</div>
          </div>
          <div className="p-1 rounded bg-gray-900/60">
            <div className="text-sm">🎙️</div>
            <div className="text-gray-300 font-semibold mt-1">MP3 Voice</div>
            <div className="text-emerald-400 font-bold">Active</div>
          </div>
          <div className="p-1 rounded bg-gray-900/60">
            <div className="text-sm">🎞️</div>
            <div className="text-gray-300 font-semibold mt-1">Movie Store</div>
            <div className="text-emerald-400 font-bold">Active</div>
          </div>
        </div>

        {/* Edit profile fields */}
        {isEditing ? (
          <div className="space-y-2.5 bg-[#090c12] p-3 rounded-xl border border-gray-800">
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">
                {t.usernameLabel}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-9 rounded-lg bg-black/40 border border-gray-700 px-3 text-xs text-white outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">
                {t.telegramLabel}
              </label>
              <input
                type="text"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                className="w-full h-9 rounded-lg bg-black/40 border border-gray-700 px-3 text-xs text-white outline-none focus:border-cyan-400"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 h-8 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold"
              >
                រក្សាទុក
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 h-8 rounded-lg bg-gray-800 text-gray-300 text-xs"
              >
                បោះបង់
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="w-full h-9 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold"
          >
            កែប្រែព័ត៌មានគណនី
          </button>
        )}

        {/* Admin Access Portal button */}
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenAdmin();
          }}
          className="w-full h-10 rounded-xl bg-gradient-to-r from-cyan-950/60 via-blue-950/60 to-indigo-950/60 border border-cyan-400/40 hover:border-cyan-400/70 text-cyan-200 text-xs font-bold flex items-center justify-center gap-2 shadow transition active:scale-98"
        >
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>ចូលផ្ទាំងគ្រប់គ្រង Admin (Protected with PIN 🔒)</span>
        </button>

        {/* Telegram WebApp Integration notice */}
        <div className="p-2.5 rounded-xl border border-[#229ed9]/25 bg-[#229ed9]/5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-cyan-200">
            <Send className="w-4 h-4 text-[#229ed9]" />
            <span>Telegram Bot Sync: <b className="text-white">Connected</b></span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold">Online</span>
        </div>
      </div>
    </div>
  );
};
