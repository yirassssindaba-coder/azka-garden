// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
export const API_TIMEOUT = 30000; // 30 seconds

// Application Configuration
export const APP_NAME = 'Azka Garden';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Toko Tanaman Hias Online Terpercaya';

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 100;

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

// Currency
export const DEFAULT_CURRENCY = 'IDR';
export const CURRENCY_SYMBOL = 'Rp';

// Date Formats
export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm';
export const TIME_FORMAT = 'HH:mm';

// Validation Rules
export const PASSWORD_MIN_LENGTH = 8;
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 20;
export const PHONE_MIN_LENGTH = 10;
export const PHONE_MAX_LENGTH = 15;

// Order Status
export const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED'
} as const;

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Menunggu Pembayaran',
  [ORDER_STATUS.CONFIRMED]: 'Dikonfirmasi',
  [ORDER_STATUS.PROCESSING]: 'Diproses',
  [ORDER_STATUS.SHIPPED]: 'Dikirim',
  [ORDER_STATUS.DELIVERED]: 'Selesai',
  [ORDER_STATUS.CANCELLED]: 'Dibatalkan',
  [ORDER_STATUS.REFUNDED]: 'Dikembalikan'
} as const;

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED'
} as const;

export const PAYMENT_STATUS_LABELS = {
  [PAYMENT_STATUS.PENDING]: 'Menunggu Pembayaran',
  [PAYMENT_STATUS.PROCESSING]: 'Memproses Pembayaran',
  [PAYMENT_STATUS.COMPLETED]: 'Pembayaran Berhasil',
  [PAYMENT_STATUS.FAILED]: 'Pembayaran Gagal',
  [PAYMENT_STATUS.CANCELLED]: 'Pembayaran Dibatalkan',
  [PAYMENT_STATUS.REFUNDED]: 'Pembayaran Dikembalikan'
} as const;

// User Roles
export const USER_ROLES = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
  DEVELOPER: 'DEVELOPER'
} as const;

// Plant Care Levels
export const CARE_LEVELS = {
  EASY: 'Mudah',
  MEDIUM: 'Sedang',
  HARD: 'Sulit'
} as const;

// Plant Categories
export const PLANT_CATEGORIES = {
  INDOOR: 'Tanaman Indoor',
  OUTDOOR: 'Tanaman Outdoor',
  SUCCULENT: 'Sukulen',
  FLOWERING: 'Tanaman Berbunga',
  FOLIAGE: 'Tanaman Hias Daun',
  HERB: 'Tanaman Herbal',
  FRUIT: 'Tanaman Buah',
  VEGETABLE: 'Tanaman Sayuran'
} as const;

// Shipping Methods
export const SHIPPING_METHODS = {
  REGULAR: 'regular',
  EXPRESS: 'express',
  SAME_DAY: 'same-day',
  PICKUP: 'pickup'
} as const;

export const SHIPPING_METHOD_LABELS = {
  [SHIPPING_METHODS.REGULAR]: 'Pengiriman Regular',
  [SHIPPING_METHODS.EXPRESS]: 'Pengiriman Express',
  [SHIPPING_METHODS.SAME_DAY]: 'Same Day Delivery',
  [SHIPPING_METHODS.PICKUP]: 'Ambil di Toko'
} as const;

// Payment Methods
export const PAYMENT_METHODS = {
  BANK_TRANSFER: 'bank_transfer',
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  E_WALLET: 'e_wallet',
  COD: 'cod',
  CRYPTO: 'crypto'
} as const;

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.BANK_TRANSFER]: 'Transfer Bank',
  [PAYMENT_METHODS.CREDIT_CARD]: 'Kartu Kredit',
  [PAYMENT_METHODS.DEBIT_CARD]: 'Kartu Debit',
  [PAYMENT_METHODS.E_WALLET]: 'E-Wallet',
  [PAYMENT_METHODS.COD]: 'Bayar di Tempat',
  [PAYMENT_METHODS.CRYPTO]: 'Cryptocurrency'
} as const;

// Indonesian Banks
export const INDONESIAN_BANKS = [
  { code: 'BCA', name: 'Bank Central Asia' },
  { code: 'BNI', name: 'Bank Negara Indonesia' },
  { code: 'BRI', name: 'Bank Rakyat Indonesia' },
  { code: 'MANDIRI', name: 'Bank Mandiri' },
  { code: 'CIMB', name: 'CIMB Niaga' },
  { code: 'DANAMON', name: 'Bank Danamon' },
  { code: 'PERMATA', name: 'Bank Permata' },
  { code: 'MAYBANK', name: 'Maybank Indonesia' },
  { code: 'OCBC', name: 'OCBC NISP' },
  { code: 'PANIN', name: 'Panin Bank' }
] as const;

// Indonesian E-Wallets
export const INDONESIAN_EWALLETS = [
  { code: 'GOPAY', name: 'GoPay' },
  { code: 'OVO', name: 'OVO' },
  { code: 'DANA', name: 'DANA' },
  { code: 'LINKAJA', name: 'LinkAja' },
  { code: 'SHOPEEPAY', name: 'ShopeePay' },
  { code: 'JENIUS', name: 'Jenius Pay' }
] as const;

// Indonesian Provinces
export const INDONESIAN_PROVINCES = [
  'Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Kepulauan Riau',
  'Jambi', 'Sumatera Selatan', 'Bangka Belitung', 'Bengkulu', 'Lampung',
  'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur',
  'Banten', 'Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur',
  'Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara',
  'Sulawesi Utara', 'Sulawesi Tengah', 'Sulawesi Selatan', 'Sulawesi Tenggara', 'Gorontalo', 'Sulawesi Barat',
  'Maluku', 'Maluku Utara', 'Papua', 'Papua Barat', 'Papua Selatan', 'Papua Tengah', 'Papua Pegunungan', 'Papua Barat Daya'
] as const;

// Social Media Links
export const SOCIAL_MEDIA = {
  FACEBOOK: 'https://facebook.com/azkagarden',
  INSTAGRAM: 'https://instagram.com/azkagarden',
  TWITTER: 'https://twitter.com/azkagarden',
  YOUTUBE: 'https://youtube.com/azkagarden',
  TIKTOK: 'https://tiktok.com/@azkagarden',
  WHATSAPP: 'https://wa.me/6281234567890'
} as const;

// Contact Information
export const CONTACT_INFO = {
  PHONE: '+62 812-3456-7890',
  EMAIL: 'info@azkagarden.com',
  ADDRESS: 'Jl. Raya Tanaman Hias No. 123, Jakarta Selatan 12345',
  BUSINESS_HOURS: 'Senin - Sabtu: 08:00 - 17:00 WIB'
} as const;

// SEO Meta Tags
export const SEO_DEFAULTS = {
  TITLE: 'Azka Garden - Toko Tanaman Hias Online Terpercaya',
  DESCRIPTION: 'Belanja tanaman hias berkualitas tinggi dengan harga terjangkau. Koleksi lengkap tanaman indoor, outdoor, sukulen, dan tanaman berbunga. Gratis ongkir se-Indonesia.',
  KEYWORDS: 'tanaman hias, toko tanaman online, tanaman indoor, tanaman outdoor, sukulen, tanaman berbunga, jual tanaman, tanaman murah',
  IMAGE: '/images/og-image.jpg',
  URL: 'https://azkagarden.com'
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Koneksi internet bermasalah. Silakan coba lagi.',
  SERVER_ERROR: 'Terjadi kesalahan pada server. Silakan coba lagi nanti.',
  VALIDATION_ERROR: 'Data yang dimasukkan tidak valid.',
  UNAUTHORIZED: 'Anda tidak memiliki akses untuk melakukan tindakan ini.',
  NOT_FOUND: 'Data yang dicari tidak ditemukan.',
  TIMEOUT: 'Permintaan timeout. Silakan coba lagi.',
  UNKNOWN_ERROR: 'Terjadi kesalahan yang tidak diketahui.'
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Berhasil masuk ke akun Anda.',
  REGISTER_SUCCESS: 'Akun berhasil dibuat. Selamat datang!',
  LOGOUT_SUCCESS: 'Berhasil keluar dari akun.',
  PROFILE_UPDATED: 'Profil berhasil diperbarui.',
  PASSWORD_CHANGED: 'Password berhasil diubah.',
  ORDER_CREATED: 'Pesanan berhasil dibuat.',
  PAYMENT_SUCCESS: 'Pembayaran berhasil diproses.',
  ITEM_ADDED_TO_CART: 'Produk berhasil ditambahkan ke keranjang.',
  ITEM_REMOVED_FROM_CART: 'Produk berhasil dihapus dari keranjang.'
} as const;