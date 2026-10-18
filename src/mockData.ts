import { 
  MovieStoreItem, VideoItem, Mp3Item, UserAccount, 
  SystemConfig, AdminUserRecord, PromoVoucher, SecurityAuditLog 
} from './types';

export const initialAccount: UserAccount = {
  id: 'usr_8892',
  name: 'Chai Creator KH',
  email: 'chaychai725@gmail.com',
  telegramHandle: '@chay_creator',
  credits: 150,
  isVip: true,
  expiryDate: '2026-11-20',
};

export const sampleCompletedVideos: VideoItem[] = [
  {
    id: 'vid_01',
    title: 'ភាគ ១៖ មហាសេដ្ឋីបន្លំខ្លួនធ្វើជាសន្តិសុខដើម្បីសាកចិត្តគូដណ្តឹង',
    duration: '02:45',
    durationSec: 165,
    kind: 'completed',
    thumbnailUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    status: 'completed',
    voice: 'female',
    mode: 'narration',
    dateAdded: '2026-10-17',
    khmerScript: `កាលពីព្រេងនាយ មានមហាសេដ្ឋីម្នាក់ឈ្មោះសិរី។ គាត់ចង់ដឹងថាតើគូដណ្តឹងពិតជាស្រឡាញ់គាត់ដោយស្មោះ ឬគ្រាន់តែចង់បានទ្រព្យសម្បត្តិ។ គាត់ក៏បានសម្រេចចិត្តក្លែងបន្លំខ្លួនធ្វើជាសន្តិសុខធម្មតាម្នាក់នៅមុខក្រុមហ៊ុនផ្ទាល់ខ្លួន...`,
  },
  {
    id: 'vid_02',
    title: 'ភាគ ២៖ ការសងសឹករបស់កូនស្រីច្បងដែលគេមើលងាយ',
    duration: '03:12',
    durationSec: 192,
    kind: 'completed',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    status: 'completed',
    voice: 'male',
    mode: 'hybrid',
    dateAdded: '2026-10-16',
    khmerScript: `បន្ទាប់ពីត្រូវម្តាយចុង និងប្អូនស្រីបង្ខំឱ្យចាកចេញពីភូមិគ្រឹះ នាងបានត្រលប់មកវិញជាមួយតួនាទីជាប្រធានក្រុមហ៊ុនវិនិយោគធំជាងគេបង្អស់។ មនុស្សគ្រប់គ្នាដែលធ្លាប់សើចចំអកឱ្យនាង ឥឡូវនេះត្រូវអោនក្បាលសុំការអនុគ្រោះ...`,
  }
];

export const movieStoreItems: MovieStoreItem[] = [
  {
    id: '12',
    title: 'អំណាចកូនស្រីច្បង (ដល់ចប់)',
    titleEn: 'Power of the Eldest Daughter (Full End)',
    category: 'drama',
    priceUsd: 1.00,
    priceCredits: 100,
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
    episodes: 24,
    totalDuration: '52 នាទី',
    synopsis: 'កូនស្រីច្បងដែលធ្លាប់ត្រូវគេមើលងាយនិងបណ្តេញចេញពីត្រកូលអភិជន បានវិលត្រឡប់មកវិញក្នុងនាមជាស្តេចជំនួញ ព្រមទាំងបកអាក្រាតមុខមាត់ពិតរបស់គ្រួសារកំណាច។',
    synopsisEn: 'The eldest daughter who was once looked down upon returns as a business tycoon to expose the true face of her greedy family.',
    isCompleted: true,
    isPopular: true,
  },
  {
    id: '11',
    title: 'បន្លំខ្លួនជាអ្នកបំរើដើម្បីចាប់ស្រីប្តី (ដល់ចប់)',
    titleEn: 'Undercover Maid Catches Unfaithful Husband (Full End)',
    category: 'romance',
    priceUsd: 1.00,
    priceCredits: 100,
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&auto=format&fit=crop&q=80',
    episodes: 18,
    totalDuration: '38 នាទី',
    synopsis: 'ភរិយាស្របច្បាប់ក្លែងខ្លួនធ្វើជាអ្នកបោសសម្អាតក្នុងខុនដូទំនើប ដើម្បីប្រមូលភស្តុតាងជាក់ស្តែងពីការក្បត់របស់ស្វាមី មុននឹងដកហូតទ្រព្យសម្បត្តិទាំងអស់។',
    synopsisEn: 'A lawful wife disguises as a cleaner in a luxury penthouse to gather concrete evidence of her husband’s infidelity.',
    isCompleted: true,
    isPopular: true,
  },
  {
    id: '10',
    title: 'ស៊ុនតាមចញ្ចើមផ្លូវ (ដល់ចប់)',
    titleEn: 'Sun on the Sidewalk (Full End)',
    category: 'action',
    priceUsd: 1.00,
    priceCredits: 100,
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80',
    episodes: 20,
    totalDuration: '44 នាទី',
    synopsis: 'យុវជនក្រីក្រដែលរស់នៅតាមចិញ្ចើមផ្លូវ បង្ហាញពីថាមពលក្បាច់គុនបុរាណដើម្បីការពារអ្នកទន់ខ្សោយ និងកម្ចាត់ក្រុមបងធំអន្ធពាលក្នុងទីក្រុង។',
    synopsisEn: 'A destitute youth on the street utilizes ancient martial arts mastery to defend the weak and eliminate local gangs.',
    isCompleted: true,
    isPopular: false,
  },
  {
    id: '9',
    title: 'រឿង ទេវចុងភៅលាក់មុខ (ដល់ចប់)',
    titleEn: 'The Hidden God of Cookery (Full End)',
    category: 'comedy',
    priceUsd: 1.00,
    priceCredits: 100,
    coverImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&auto=format&fit=crop&q=80',
    episodes: 16,
    totalDuration: '35 នាទី',
    synopsis: 'ចុងភៅកំពូលលំដាប់ពិភពលោកដែលបាត់ខ្លួនជាច្រើនឆ្នាំ មកបើកតូបលក់គុយទាវតូចមួយ ប៉ុន្តែកេរ្តិ៍ឈ្មោះនិងរសជាតិម្ហូបដ៏អស្ចារ្យមិនអាចលាក់បានឡើយ។',
    synopsisEn: 'A world-class chef who disappeared for years opens a humble noodle cart, but his unmatched culinary skills cannot be concealed.',
    isCompleted: true,
    isPopular: true,
  },
  {
    id: '8',
    title: 'អាថ៌កំបាំងភូមិខ្មោចលងព្រឺព្រួច (ដល់ចប់)',
    titleEn: 'Secrets of the Haunted Mountain Hamlet',
    category: 'horror',
    priceUsd: 1.50,
    priceCredits: 150,
    coverImage: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=500&auto=format&fit=crop&q=80',
    episodes: 12,
    totalDuration: '32 នាទី',
    synopsis: 'ក្រុមសិស្សសាលាចុះស្រាវជ្រាវក្នុងភូមិដាច់ស្រយាលមួយ ហើយបានជួបប្រទះនូវរឿងរ៉ាវចម្លែកៗ រួមទាំងវិញ្ញាណបុរាណដែលចងកំហឹងរាប់រយឆ្នាំ។',
    synopsisEn: 'College students investigating a remote highland village encounter ancient spirits trapped in centuries of vengeance.',
    isCompleted: true,
    isPopular: false,
  },
  {
    id: '7',
    title: 'ស្នេហ៍ឆ្លងភពព្រះអង្គម្ចាស់កំសត់ (ដល់ចប់)',
    titleEn: 'Across Time: The Exiled Crown Prince',
    category: 'romance',
    priceUsd: 1.00,
    priceCredits: 100,
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
    episodes: 22,
    totalDuration: '48 នាទី',
    synopsis: 'ព្រះអង្គម្ចាស់សម័យបុរាណបានធ្លាក់ចូលរូងពេលវេលា មកដល់ទីក្រុងភ្នំពេញឆ្នាំ២០២៦ ហើយបានជួបនឹងនារីអ្នកផលិតមាតិកា TikTok ម្នាក់។',
    synopsisEn: 'An ancient prince falls through a time rift into modern 2026 and crosses paths with an aspiring digital video creator.',
    isCompleted: true,
    isPopular: false,
  }
];

export const sampleAudios: Mp3Item[] = [
  {
    id: 'mp3_01',
    title: 'សេចក្តីផ្តើម៖ រឿងមហាសេដ្ឋីលាក់មុខ ភាគ១',
    text: 'សូមស្វាគមន៍មកកាន់ការសម្រាយរឿងដ៏ជក់ចិត្ត! ថ្ងៃនេះយើងនឹងនាំអារម្មណ៍លោកអ្នកទៅទស្សនារឿងរ៉ាវរបស់យុវជនម្នាក់...',
    voice: 'female',
    speed: 1.0,
    pitch: 1.0,
    duration: '01:15',
    audioUrl: '',
    createdAt: '10 នាទីមុន',
    fileSize: '1.4 MB'
  },
  {
    id: 'mp3_02',
    title: 'ឈុតឆាកវាយប្រហារដ៏រន្ធត់ ភាគ២',
    text: 'ខណៈពេលដែលសត្រូវកំពុងឡោមព័ទ្ធ គាត់បានដកដាវបុរាណចេញពីស្រោម ហើយបញ្ចេញក្បាច់គុនយ៉ាងរហ័សរហួន...',
    voice: 'male',
    speed: 1.1,
    pitch: 0.9,
    duration: '00:48',
    audioUrl: '',
    createdAt: '1 ម៉ោងមុន',
    fileSize: '950 KB'
  }
];

export const defaultSystemConfig: SystemConfig = {
  masterPin: '8899',
  isMaintenanceMode: false,
  allowSignups: true,
  antiAbuseRateLimit: 60,
  firewallEnabled: true,
  sessionTimeoutMinutes: 60,
  costLinkDownload: 5,
  costVideoDub: 25,
  costProRecap: 35,
  costMp3: 5,
  costVoiceClone: 40,
  aiModel: 'gemini-2.5-flash',
  geminiKeyConfigured: true,
  telegramBotActive: true,
};

export const sampleAdminUsers: AdminUserRecord[] = [
  {
    id: 'usr_8892',
    name: 'Chai Creator KH',
    telegram: '@chay_creator',
    email: 'chaychai725@gmail.com',
    credits: 150,
    role: 'admin',
    status: 'active',
    joinedDate: '2026-09-01',
    totalSpent: 45.00
  },
  {
    id: 'usr_1024',
    name: 'Sokha Media HD',
    telegram: '@sokha_reels',
    email: 'sokha.media@gmail.com',
    credits: 1250,
    role: 'vip',
    status: 'active',
    joinedDate: '2026-09-15',
    totalSpent: 80.00
  },
  {
    id: 'usr_2048',
    name: 'Bopha TikTok Drama',
    telegram: '@bopha_drama',
    email: 'bopha.kh@hotmail.com',
    credits: 420,
    role: 'user',
    status: 'active',
    joinedDate: '2026-10-02',
    totalSpent: 20.00
  },
  {
    id: 'usr_3099',
    name: 'Dara Action Movie',
    telegram: '@dara_action',
    email: 'dara.action@gmail.com',
    credits: 65,
    role: 'user',
    status: 'active',
    joinedDate: '2026-10-10',
    totalSpent: 10.00
  },
  {
    id: 'usr_9999',
    name: 'Spam Bot Account',
    telegram: '@bot_suspicious',
    email: 'bot99@unknown.xyz',
    credits: 0,
    role: 'user',
    status: 'blocked',
    joinedDate: '2026-10-17',
    totalSpent: 0.00
  }
];

export const samplePromoVouchers: PromoVoucher[] = [
  {
    id: 'vouch_1',
    code: 'HCH2026',
    credits: 250,
    totalAllowed: 500,
    usedCount: 142,
    isActive: true,
    expiryDate: '2026-12-31'
  },
  {
    id: 'vouch_2',
    code: 'VIP500',
    credits: 500,
    totalAllowed: 50,
    usedCount: 38,
    isActive: true,
    expiryDate: '2026-11-30'
  },
  {
    id: 'vouch_3',
    code: 'KHMER_AI',
    credits: 100,
    totalAllowed: 1000,
    usedCount: 654,
    isActive: true,
    expiryDate: '2026-12-31'
  }
];

export const sampleSecurityLogs: SecurityAuditLog[] = [
  {
    id: 'sec_1',
    timestamp: '2026-10-18 07:10:22',
    action: 'Admin Panel Access Authorized (PIN Verified)',
    actor: 'Chai Creator (Admin)',
    ip: '103.216.51.14 (Phnom Penh)',
    severity: 'info'
  },
  {
    id: 'sec_2',
    timestamp: '2026-10-18 06:45:11',
    action: 'Suspicious Brute Force Rate Limited',
    actor: 'IP 45.142.214.99',
    ip: '45.142.214.99 (Firewall Blocked)',
    severity: 'warning'
  },
  {
    id: 'sec_3',
    timestamp: '2026-10-18 05:20:00',
    action: 'Gemini AI API Key Validation Passed',
    actor: 'System Daemon',
    ip: '127.0.0.1 (Internal)',
    severity: 'info'
  },
  {
    id: 'sec_4',
    timestamp: '2026-10-17 23:30:15',
    action: 'KHQR Payment Webhook Verified ($10.00)',
    actor: 'Bakong Gateway',
    ip: '110.74.200.12 (ABA Bank)',
    severity: 'info'
  }
];
