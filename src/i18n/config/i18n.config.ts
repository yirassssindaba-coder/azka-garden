export interface I18nConfig {
  defaultLocale: string;
  locales: string[];
  fallbackLocale: string;
  interpolation: {
    escapeValue: boolean;
  };
  detection: {
    order: string[];
    caches: string[];
  };
}

export const i18nConfig: I18nConfig = {
  defaultLocale: 'id',
  locales: ['id', 'en', 'zh', 'ja', 'ar'],
  fallbackLocale: 'id',
  interpolation: {
    escapeValue: false
  },
  detection: {
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage']
  }
};

export const localeNames = {
  id: 'Bahasa Indonesia',
  en: 'English',
  zh: '中文',
  ja: '日本語',
  ar: 'العربية'
};

export const rtlLocales = ['ar'];

export const currencyByLocale = {
  id: 'IDR',
  en: 'USD',
  zh: 'CNY',
  ja: 'JPY',
  ar: 'USD'
};

export const dateFormatsByLocale = {
  id: {
    short: 'DD/MM/YYYY',
    long: 'DD MMMM YYYY',
    withTime: 'DD/MM/YYYY HH:mm'
  },
  en: {
    short: 'MM/DD/YYYY',
    long: 'MMMM DD, YYYY',
    withTime: 'MM/DD/YYYY HH:mm'
  },
  zh: {
    short: 'YYYY/MM/DD',
    long: 'YYYY年MM月DD日',
    withTime: 'YYYY/MM/DD HH:mm'
  },
  ja: {
    short: 'YYYY/MM/DD',
    long: 'YYYY年MM月DD日',
    withTime: 'YYYY/MM/DD HH:mm'
  },
  ar: {
    short: 'DD/MM/YYYY',
    long: 'DD MMMM YYYY',
    withTime: 'DD/MM/YYYY HH:mm'
  }
};