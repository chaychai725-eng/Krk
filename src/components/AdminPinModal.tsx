import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, AlertCircle, X, KeyRound, Check } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface AdminPinModalProps {
  lang: Language;
  masterPin: string;
  onSuccess: () => void;
  onClose: () => void;
  notify: (msg: string) => void;
}

export const AdminPinModal: React.FC<AdminPinModalProps> = ({
  lang,
  masterPin,
  onSuccess,
  onClose,
  notify,
}) => {
  const t = translations[lang];

  const [enteredPin, setEnteredPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  // Lockout timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (lockoutSeconds > 0) {
      timer = setInterval(() => {
        setLockoutSeconds((prev) => {
          if (prev <= 1) {
            setIsLocked(false);
            setFailedAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [lockoutSeconds]);

  const handleKeyPress = (digit: string) => {
    if (isLocked) return;
    if (enteredPin.length < 4) {
      const newPin = enteredPin + digit;
      setEnteredPin(newPin);
      setErrorMsg('');

      if (newPin.length === 4) {
        verifyPin(newPin);
      }
    }
  };

  const handleBackspace = () => {
    if (isLocked) return;
    setEnteredPin((prev) => prev.slice(0, -1));
    setErrorMsg('');
  };

  const handleClear = () => {
    if (isLocked) return;
    setEnteredPin('');
    setErrorMsg('');
  };

  const verifyPin = (pin: string) => {
    if (pin === masterPin) {
      notify(lang === 'kh' ? '✅ ដោះសោផ្ទាំង Admin ជោគជ័យ!' : 'Admin access granted!');
      onSuccess();
    } else {
      const attempts = failedAttempts + 1;
      setFailedAttempts(attempts);
      setEnteredPin('');

      if (attempts >= 3) {
        setIsLocked(true);
        setLockoutSeconds(30);
        setErrorMsg(t.adminLocked);
        notify(lang === 'kh' ? '⚠️ បានបញ្ចូលខុស ៣ ដង! ប្រព័ន្ធចាក់សោសុវត្ថិភាព ៣០ វិនាទី' : 'Security lockout: 3 failed attempts');
      } else {
        const remaining = 3 - attempts;
        setErrorMsg(
          lang === 'kh'
            ? `❌ លេខកូដ PIN មិនត្រឹមត្រូវ! នៅសល់ ${remaining} ដងទៀត`
            : `Incorrect PIN! ${remaining} attempts remaining`
        );
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-[#121622] border border-cyan-400/40 rounded-2xl max-w-sm w-full p-5 relative shadow-[0_0_50px_rgba(6,182,212,0.15)] space-y-4">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center absolute top-3.5 right-3.5 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="text-center pt-2">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mx-auto mb-2.5 shadow-lg shadow-cyan-500/10">
            <ShieldCheck className="w-7 h-7 text-cyan-300" />
          </div>
          <h2 className="text-base sm:text-lg font-black text-white">
            {t.adminPinTitle}
          </h2>
          <p className="text-[11px] text-gray-400 mt-1">
            {t.adminPinSubtitle}
          </p>
        </div>

        {/* PIN Dots Display */}
        <div className="flex justify-center items-center gap-3 py-2">
          {[0, 1, 2, 3].map((index) => {
            const isFilled = enteredPin.length > index;
            return (
              <div
                key={index}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  isFilled
                    ? 'bg-cyan-400 border-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)] scale-110'
                    : 'border-gray-700 bg-gray-900/60'
                }`}
              />
            );
          })}
        </div>

        {/* Error message / Lockout notice */}
        {errorMsg && (
          <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {isLocked && (
          <div className="text-center text-amber-300 text-xs font-bold animate-pulse">
            ⏳ រង់ចាំដោះសោក្នុងរយៈពេល {lockoutSeconds} វិនាទី...
          </div>
        )}

        {/* 10-Key PIN Keypad */}
        <div className="grid grid-cols-3 gap-2 pt-1 max-w-[260px] mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              disabled={isLocked}
              onClick={() => handleKeyPress(digit)}
              className="h-12 rounded-xl bg-[#090c14] hover:bg-[#151a28] active:bg-cyan-500/20 active:scale-95 border border-gray-800 hover:border-gray-700 text-lg font-bold text-white transition disabled:opacity-30 disabled:pointer-events-none shadow"
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            disabled={isLocked}
            onClick={handleClear}
            className="h-12 rounded-xl bg-[#090c14] hover:bg-red-500/10 active:scale-95 border border-gray-800 text-xs font-bold text-gray-400 hover:text-red-300 transition disabled:opacity-30"
          >
            Clear
          </button>
          <button
            type="button"
            disabled={isLocked}
            onClick={() => handleKeyPress('0')}
            className="h-12 rounded-xl bg-[#090c14] hover:bg-[#151a28] active:bg-cyan-500/20 active:scale-95 border border-gray-800 text-lg font-bold text-white transition disabled:opacity-30 disabled:pointer-events-none shadow"
          >
            0
          </button>
          <button
            type="button"
            disabled={isLocked}
            onClick={handleBackspace}
            className="h-12 rounded-xl bg-[#090c14] hover:bg-gray-800 active:scale-95 border border-gray-800 text-xs font-bold text-gray-400 hover:text-gray-200 transition disabled:opacity-30"
          >
            ⌫
          </button>
        </div>

        {/* Helper Hint */}
        <div className="text-center pt-1 border-t border-gray-800">
          <span className="text-[10px] text-gray-400 bg-black/40 px-2.5 py-1 rounded-md border border-gray-800 inline-block font-mono">
            🔑 {t.adminPinDefaultHint}
          </span>
        </div>
      </div>
    </div>
  );
};
