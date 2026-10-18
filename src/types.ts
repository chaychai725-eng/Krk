export type Language = 'kh' | 'en';

export type MainTab = 'video' | 'story' | 'mp3' | 'store';

export type VoiceChoice = 'female' | 'male' | 'storyteller' | 'energetic';

export type TranslationMode = 'translate' | 'narration' | 'hybrid';

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  durationSec: number;
  kind: 'long' | 'short' | 'completed';
  sourceUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  status: 'idle' | 'processing' | 'completed' | 'error';
  progress?: number;
  voice?: VoiceChoice;
  mode?: TranslationMode;
  dateAdded: string;
  subtitlesUrl?: string;
  audioUrl?: string;
  scriptText?: string;
  khmerScript?: string;
  parts?: VideoPart[];
}

export interface VideoPart {
  partIndex: number;
  title: string;
  duration: string;
  videoUrl: string;
}

export interface Mp3Item {
  id: string;
  title: string;
  text: string;
  voice: VoiceChoice;
  speed: number;
  pitch: number;
  duration: string;
  audioUrl: string;
  createdAt: string;
  fileSize?: string;
}

export interface MovieStoreItem {
  id: string;
  title: string;
  titleEn: string;
  category: 'romance' | 'action' | 'horror' | 'comedy' | 'drama';
  priceUsd: number;
  priceCredits: number;
  coverImage: string;
  episodes: number;
  totalDuration: string;
  synopsis: string;
  synopsisEn: string;
  isCompleted: boolean;
  isPopular?: boolean;
  sampleVideoUrl?: string;
  sampleAudioUrl?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  telegramHandle: string;
  credits: number;
  isVip: boolean;
  expiryDate: string;
  promoApplied?: string;
  role?: 'user' | 'admin';
}

export type AdminTab = 'overview' | 'users' | 'store' | 'pricing' | 'promos' | 'security' | 'ai-engine';

export interface AdminUserRecord {
  id: string;
  name: string;
  telegram: string;
  email: string;
  credits: number;
  role: 'user' | 'vip' | 'admin';
  status: 'active' | 'blocked';
  joinedDate: string;
  totalSpent: number;
}

export interface PromoVoucher {
  id: string;
  code: string;
  credits: number;
  totalAllowed: number;
  usedCount: number;
  isActive: boolean;
  expiryDate: string;
}

export interface SecurityAuditLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  ip: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface SystemConfig {
  masterPin: string;
  isMaintenanceMode: boolean;
  allowSignups: boolean;
  antiAbuseRateLimit: number; // requests per minute
  firewallEnabled: boolean;
  sessionTimeoutMinutes: number;
  costLinkDownload: number;
  costVideoDub: number;
  costProRecap: number;
  costMp3: number;
  costVoiceClone: number;
  aiModel: string;
  geminiKeyConfigured: boolean;
  telegramBotActive: boolean;
}
