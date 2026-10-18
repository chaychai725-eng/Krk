import React, { useState, useEffect } from 'react';
import { 
  Language, MainTab, UserAccount, VideoItem, MovieStoreItem, 
  AdminUserRecord, PromoVoucher, SecurityAuditLog, SystemConfig 
} from './types';
import { 
  initialAccount, sampleCompletedVideos, movieStoreItems, 
  defaultSystemConfig, sampleAdminUsers, samplePromoVouchers, sampleSecurityLogs 
} from './mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { TranslationPage } from './components/TranslationPage';
import { LongTranslatePage } from './components/LongTranslatePage';
import { Mp3Page } from './components/Mp3Page';
import { MovieStorePage } from './components/MovieStorePage';
import { BuyCreditsModal } from './components/BuyCreditsModal';
import { AccountModal } from './components/AccountModal';
import { TutorialModal } from './components/TutorialModal';
import { PromoModal } from './components/PromoModal';
import { CreditInfoModal } from './components/CreditInfoModal';
import { ScriptModal } from './components/ScriptModal';
import { AdminPinModal } from './components/AdminPinModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { ShieldAlert, Lock, AlertTriangle } from 'lucide-react';

export default function App() {
  // Language state (defaults to Khmer 'kh' as per HCH Digital Pro platform)
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('hch_lang');
      return (saved as Language) || 'kh';
    } catch {
      return 'kh';
    }
  });

  // Active tab state
  const [activeTab, setActiveTab] = useState<MainTab>(() => {
    try {
      const saved = localStorage.getItem('hch_active_tab');
      return (saved as MainTab) || 'video';
    } catch {
      return 'video';
    }
  });

  // User account state
  const [account, setAccount] = useState<UserAccount>(() => {
    try {
      const saved = localStorage.getItem('hch_user_account');
      return saved ? JSON.parse(saved) : initialAccount;
    } catch {
      return initialAccount;
    }
  });

  // Completed videos state
  const [completedVideos, setCompletedVideos] = useState<VideoItem[]>(() => {
    try {
      const saved = localStorage.getItem('hch_completed_videos');
      return saved ? JSON.parse(saved) : sampleCompletedVideos;
    } catch {
      return sampleCompletedVideos;
    }
  });

  // System Security & Admin Config state
  const [systemConfig, setSystemConfig] = useState<SystemConfig>(() => {
    try {
      const saved = localStorage.getItem('hch_system_config');
      return saved ? JSON.parse(saved) : defaultSystemConfig;
    } catch {
      return defaultSystemConfig;
    }
  });

  // Admin Users List state
  const [adminUsers, setAdminUsers] = useState<AdminUserRecord[]>(() => {
    try {
      const saved = localStorage.getItem('hch_admin_users');
      return saved ? JSON.parse(saved) : sampleAdminUsers;
    } catch {
      return sampleAdminUsers;
    }
  });

  // Dynamic Store Items state
  const [storeItems, setStoreItems] = useState<MovieStoreItem[]>(() => {
    try {
      const saved = localStorage.getItem('hch_store_items');
      return saved ? JSON.parse(saved) : movieStoreItems;
    } catch {
      return movieStoreItems;
    }
  });

  // Promo Vouchers state
  const [promoVouchers, setPromoVouchers] = useState<PromoVoucher[]>(() => {
    try {
      const saved = localStorage.getItem('hch_promo_vouchers');
      return saved ? JSON.parse(saved) : samplePromoVouchers;
    } catch {
      return samplePromoVouchers;
    }
  });

  // Security Audit Logs state
  const [securityLogs, setSecurityLogs] = useState<SecurityAuditLog[]>(() => {
    try {
      const saved = localStorage.getItem('hch_security_logs');
      return saved ? JSON.parse(saved) : sampleSecurityLogs;
    } catch {
      return sampleSecurityLogs;
    }
  });

  // Modal triggers
  const [showBuyCredits, setShowBuyCredits] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [showCreditInfo, setShowCreditInfo] = useState(false);
  const [activeScriptVideo, setActiveScriptVideo] = useState<VideoItem | null>(null);

  // Admin Modals
  const [showAdminPin, setShowAdminPin] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  // Toast notification state
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Helper to add security audit logs
  const logSecurityEvent = (action: string, severity: 'info' | 'warning' | 'critical' = 'info') => {
    const newLog: SecurityAuditLog = {
      id: `sec_${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      action,
      actor: account.name || 'User Session',
      ip: '103.216.51.14 (Verified)',
      severity,
    };
    setSecurityLogs(prev => [newLog, ...prev]);
  };

  // Persist states
  useEffect(() => {
    try {
      localStorage.setItem('hch_lang', lang);
      document.documentElement.lang = lang;
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem('hch_active_tab', activeTab);
      window.scrollTo(0, 0);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [activeTab]);

  useEffect(() => {
    try {
      localStorage.setItem('hch_user_account', JSON.stringify(account));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [account]);

  useEffect(() => {
    try {
      localStorage.setItem('hch_completed_videos', JSON.stringify(completedVideos));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [completedVideos]);

  useEffect(() => {
    try {
      localStorage.setItem('hch_system_config', JSON.stringify(systemConfig));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [systemConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('hch_admin_users', JSON.stringify(adminUsers));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [adminUsers]);

  useEffect(() => {
    try {
      localStorage.setItem('hch_store_items', JSON.stringify(storeItems));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [storeItems]);

  useEffect(() => {
    try {
      localStorage.setItem('hch_promo_vouchers', JSON.stringify(promoVouchers));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [promoVouchers]);

  useEffect(() => {
    try {
      localStorage.setItem('hch_security_logs', JSON.stringify(securityLogs));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [securityLogs]);

  // Deduct Credits handler
  const deductCredits = (amount: number, reason: string): boolean => {
    if (account.credits < amount) {
      showToast(lang === 'kh' ? '❌ Credit របស់អ្នកមិនគ្រប់គ្រាន់ទេ! សូមបញ្ចូលបន្ថែម' : 'Insufficient credits');
      logSecurityEvent(`Attempted deduction failed: Insufficient credits for ${reason}`, 'warning');
      return false;
    }

    setAccount(prev => ({
      ...prev,
      credits: prev.credits - amount
    }));
    showToast(lang === 'kh' ? `💎 បានកាត់ ${amount} Credits សម្រាប់ ${reason}` : `Deducted ${amount} credits`);
    logSecurityEvent(`Deducted ${amount} Credits for ${reason}`);
    return true;
  };

  // Add Credits handler
  const addCredits = (amount: number) => {
    setAccount(prev => ({
      ...prev,
      credits: prev.credits + amount
    }));
    showToast(lang === 'kh' ? `🎉 បញ្ចូលជោគជ័យ! +${amount} Credits 💎` : `Top up successful! +${amount} credits`);
    logSecurityEvent(`Account credited +${amount} Credits via KHQR payment`);
  };

  // Apply promo bonus
  const handleApplyPromo = (amount: number, code: string) => {
    // Check if code exists in promoVouchers
    const voucher = promoVouchers.find(v => v.code.toUpperCase() === code.toUpperCase() && v.isActive);
    if (voucher && voucher.usedCount >= voucher.totalAllowed) {
      showToast(lang === 'kh' ? '❌ កូដប្រូម៉ូសិននេះបានប្រើប្រាស់អស់ចំនួនកំណត់ហើយ' : 'Promo code redemption limit reached');
      return;
    }

    setAccount(prev => ({
      ...prev,
      credits: prev.credits + amount,
      promoApplied: code
    }));

    if (voucher) {
      setPromoVouchers(prev =>
        prev.map(v => v.id === voucher.id ? { ...v, usedCount: v.usedCount + 1 } : v)
      );
    }

    showToast(lang === 'kh' ? `🎁 ទទួលបាន +${amount} Credits ពីកូដ ${code}!` : `Promo code applied! +${amount} credits`);
    logSecurityEvent(`Promo voucher redeemed: ${code} (+${amount} Credits)`);
  };

  // Unlock Admin handler
  const handleAdminUnlockSuccess = () => {
    setShowAdminPin(false);
    setShowAdminDashboard(true);
    logSecurityEvent('Admin Dashboard session authorized with valid Master PIN');
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-100 flex flex-col font-sans">
      {/* Maintenance Mode Alert Banner if active */}
      {systemConfig.isMaintenanceMode && (
        <div className="bg-gradient-to-r from-red-600 to-amber-600 px-3 py-1.5 text-center text-xs font-black text-white flex items-center justify-center gap-2 shadow-lg">
          <AlertTriangle className="w-4 h-4 animate-bounce" />
          <span>⚠️ គេហទំព័រកំពុងស្ថិតក្រោមការថែទាំប្រព័ន្ធ (Maintenance Mode Active)</span>
          <button
            type="button"
            onClick={() => setShowAdminPin(true)}
            className="underline ml-2 bg-black/30 px-2 py-0.5 rounded text-[11px]"
          >
            ចូល Admin ដើម្បីបិទ
          </button>
        </div>
      )}

      {/* Top Header */}
      <Header
        lang={lang}
        setLang={setLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        account={account}
        onOpenBuyCredits={() => setShowBuyCredits(true)}
        onOpenAccount={() => setShowAccount(true)}
        onOpenTutorial={() => setShowTutorial(true)}
        onOpenPromo={() => setShowPromo(true)}
        onOpenCreditInfo={() => setShowCreditInfo(true)}
        onOpenAdmin={() => setShowAdminPin(true)}
      />

      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#151a26]/95 border border-cyan-400/40 text-cyan-200 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-2xl backdrop-blur-md animate-bounce">
          {toastMsg}
        </div>
      )}

      {/* Content Area according to active tab */}
      <div className="flex-1">
        {activeTab === 'video' && (
          <TranslationPage
            lang={lang}
            credits={account.credits}
            deductCredits={deductCredits}
            completedVideos={completedVideos}
            setCompletedVideos={setCompletedVideos}
            notify={showToast}
            onOpenScript={(vid) => setActiveScriptVideo(vid)}
            onOpenBuyCredits={() => setShowBuyCredits(true)}
            onOpenCreditInfo={() => setShowCreditInfo(true)}
          />
        )}

        {activeTab === 'story' && (
          <LongTranslatePage
            lang={lang}
            credits={account.credits}
            deductCredits={deductCredits}
            notify={showToast}
            onOpenBuyCredits={() => setShowBuyCredits(true)}
          />
        )}

        {activeTab === 'mp3' && (
          <Mp3Page
            lang={lang}
            credits={account.credits}
            deductCredits={deductCredits}
            notify={showToast}
            onBackToTranslate={() => setActiveTab('video')}
            onOpenBuyCredits={() => setShowBuyCredits(true)}
          />
        )}

        {activeTab === 'store' && (
          <MovieStorePage
            lang={lang}
            credits={account.credits}
            deductCredits={deductCredits}
            notify={showToast}
            onOpenBuyCredits={() => setShowBuyCredits(true)}
            storeItems={storeItems}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        lang={lang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* User Modals */}
      {showBuyCredits && (
        <BuyCreditsModal
          lang={lang}
          onClose={() => setShowBuyCredits(false)}
          onAddCredits={addCredits}
        />
      )}

      {showAccount && (
        <AccountModal
          lang={lang}
          account={account}
          onUpdateAccount={(patch) => setAccount(prev => ({ ...prev, ...patch }))}
          onClose={() => setShowAccount(false)}
          onOpenBuyCredits={() => setShowBuyCredits(true)}
          onOpenAdmin={() => setShowAdminPin(true)}
        />
      )}

      {showTutorial && (
        <TutorialModal
          lang={lang}
          onClose={() => setShowTutorial(false)}
        />
      )}

      {showPromo && (
        <PromoModal
          lang={lang}
          onClose={() => setShowPromo(false)}
          onApplyPromo={handleApplyPromo}
        />
      )}

      {showCreditInfo && (
        <CreditInfoModal
          lang={lang}
          credits={account.credits}
          onClose={() => setShowCreditInfo(false)}
          onOpenBuyCredits={() => setShowBuyCredits(true)}
        />
      )}

      {activeScriptVideo && (
        <ScriptModal
          lang={lang}
          video={activeScriptVideo}
          onClose={() => setActiveScriptVideo(null)}
        />
      )}

      {/* Admin Security PIN Verification Modal */}
      {showAdminPin && (
        <AdminPinModal
          lang={lang}
          masterPin={systemConfig.masterPin}
          onSuccess={handleAdminUnlockSuccess}
          onClose={() => setShowAdminPin(false)}
          notify={showToast}
        />
      )}

      {/* Full Admin Management Dashboard Modal */}
      {showAdminDashboard && (
        <AdminDashboardModal
          lang={lang}
          config={systemConfig}
          onUpdateConfig={(updated) => setSystemConfig(prev => ({ ...prev, ...updated }))}
          users={adminUsers}
          onUpdateUsers={setAdminUsers}
          storeItems={storeItems}
          onUpdateStoreItems={setStoreItems}
          promoVouchers={promoVouchers}
          onUpdatePromoVouchers={setPromoVouchers}
          securityLogs={securityLogs}
          onClose={() => setShowAdminDashboard(false)}
          notify={showToast}
        />
      )}
    </div>
  );
}
