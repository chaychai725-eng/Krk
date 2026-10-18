import React, { useState } from 'react';
import { X, Copy, Check, FileText, Download } from 'lucide-react';
import { VideoItem, Language } from '../types';

interface ScriptModalProps {
  lang: Language;
  video: VideoItem;
  onClose: () => void;
}

export const ScriptModal: React.FC<ScriptModalProps> = ({
  lang,
  video,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [scriptText, setScriptText] = useState(
    video.khmerScript ||
    `[00:00 - 00:30] កាលពីព្រេងនាយ មានបុរសម្នាក់បានសម្រេចចិត្តដើរស្វែងរកសេចក្តីពិតនៃជីវិត។\n[00:31 - 01:10] គាត់បានឆ្លងកាត់ភ្នំ និងជ្រោះជ្រៅជាច្រើន រហូតមកដល់ភូមិឋានមួយដែលពោរពេញទៅដោយអាថ៌កំបាំង។\n[01:11 - 02:00] មនុស្សគ្រប់គ្នានៅទីនោះជឿជាក់ថា មានតែអ្នកក្លាហានពិតប្រាកដប៉ុណ្ណោះ ទើបអាចដោះស្រាយបញ្ហានេះបាន...`
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-[#121622] border border-indigo-500/30 rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-4 sm:p-5 relative shadow-2xl space-y-3">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-gray-800 text-gray-300 hover:text-white flex items-center justify-center absolute top-3.5 right-3.5"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          <div className="min-w-0 pr-8">
            <h2 className="text-sm sm:text-base font-black text-white truncate">
              {video.title}
            </h2>
            <p className="text-[10px] text-gray-400">
              អត្ថបទសម្រាយរឿងភាសាខ្មែរ (Khmer Dialogue & Narration Script)
            </p>
          </div>
        </div>

        {/* Script Content */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>អ្នកអាចកែសម្រួល ឬចម្លងអត្ថបទនេះយកទៅប្រើប្រាស់បាន៖</span>
            <button
              type="button"
              onClick={handleCopy}
              className="text-cyan-400 hover:underline flex items-center gap-1 font-bold text-[11px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'បានចម្លង!' : 'ចម្លងអត្ថបទ'}</span>
            </button>
          </div>

          <textarea
            value={scriptText}
            onChange={(e) => setScriptText(e.target.value)}
            rows={10}
            className="w-full bg-[#080b12] border border-gray-800 focus:border-indigo-400 rounded-xl p-3 text-xs sm:text-sm text-gray-100 outline-none leading-relaxed font-sans shadow-inner"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>ចម្លងអត្ថបទ Script</span>
          </button>
          <button
            type="button"
            onClick={() => {
              const blob = new Blob([scriptText], { type: 'text/plain;charset=utf-8' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${video.title.slice(0, 20)}_script.txt`;
              a.click();
            }}
            className="px-4 h-10 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold text-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ទាញយក .txt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
