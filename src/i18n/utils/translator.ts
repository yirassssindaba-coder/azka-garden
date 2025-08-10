import { i18nConfig, currencyByLocale, dateFormatsByLocale } from '../config/i18n.config';
import React from 'react';

// Import locale files
import idCommon from '../locales/id/common.json';
import enCommon from '../locales/en/common.json';

interface TranslationResources {
  [locale: string]: {
    [namespace: string]: any;
  };
}

class Translator {
  private currentLocale: string;
  private resources: TranslationResources;
  private fallbackLocale: string;

  constructor() {
    this.currentLocale = this.detectLocale();
    this.fallbackLocale = i18nConfig.fallbackLocale;
    this.resources = {
      id: { common: idCommon },
      en: { common: enCommon }
    };
  }

  private detectLocale(): string {
    // Check localStorage first
    const storedLocale = localStorage.getItem('azka-locale');
    if (storedLocale && i18nConfig.locales.includes(storedLocale)) {
      return storedLocale;
    }

    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (i18nConfig.locales.includes(browserLang)) {
      return browserLang;
    }

    // Check HTML lang attribute
    const htmlLang = document.documentElement.lang;
    if (htmlLang && i18nConfig.locales.includes(htmlLang)) {
      return htmlLang;
    }

    return i18nConfig.defaultLocale;
  }

  setLocale(locale: string): void {
    if (!i18nConfig.locales.includes(locale)) {
      console.warn(`Locale ${locale} is not supported`);
      return;
    }

    this.currentLocale = locale;
    localStorage.setItem('azka-locale', locale);
    document.documentElement.lang = locale;
    
    // Update document direction for RTL languages
    const isRTL = ['ar'].includes(locale);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

    // Dispatch locale change event
    window.dispatchEvent(new CustomEvent('localeChanged', { detail: { locale } }));
  }

  getLocale(): string {
    return this.currentLocale;
  }

  t(key: string, options: { [key: string]: any } = {}): string {
    const translation = this.getTranslation(key, this.currentLocale) || 
                       this.getTranslation(key, this.fallbackLocale) || 
                       key;

    return this.interpolate(translation, options);
  }

  private getTranslation(key: string, locale: string): string | null {
    const keys = key.split('.');
    const namespace = keys[0];
    const translationKey = keys.slice(1).join('.');

    const resource = this.resources[locale]?.[namespace];
    if (!resource) return null;

    return this.getNestedValue(resource, translationKey);
  }

  private getNestedValue(obj: any, path: string): string | null {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : null;
    }, obj);
  }

  private interpolate(text: string, options: { [key: string]: any }): string {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return options[key] !== undefined ? String(options[key]) : match;
    });
  }

  // Pluralization support
  plural(key: string, count: number, options: { [key: string]: any } = {}): string {
    const pluralKey = count === 1 ? `${key}_one` : `${key}_other`;
    const translation = this.t(pluralKey, { ...options, count });
    
    // Fallback to base key if plural form doesn't exist
    return translation === pluralKey ? this.t(key, { ...options, count }) : translation;
  }

  // Date formatting
  formatDate(date: Date | string, format: 'short' | 'long' | 'withTime' = 'short'): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const locale = this.currentLocale;
    
    const formatOptions: Intl.DateTimeFormatOptions = {};
    
    switch (format) {
      case 'short':
        formatOptions.year = 'numeric';
        formatOptions.month = '2-digit';
        formatOptions.day = '2-digit';
        break;
      case 'long':
        formatOptions.year = 'numeric';
        formatOptions.month = 'long';
        formatOptions.day = 'numeric';
        break;
      case 'withTime':
        formatOptions.year = 'numeric';
        formatOptions.month = '2-digit';
        formatOptions.day = '2-digit';
        formatOptions.hour = '2-digit';
        formatOptions.minute = '2-digit';
        break;
    }

    return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
  }

  // Currency formatting
  formatCurrency(amount: number, currency?: string): string {
    const locale = this.currentLocale;
    const currencyCode = currency || currencyByLocale[locale as keyof typeof currencyByLocale] || 'USD';
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  // Number formatting
  formatNumber(number: number): string {
    return new Intl.NumberFormat(this.currentLocale).format(number);
  }

  // Relative time formatting
  formatRelativeTime(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return this.t('date.relative.just_now');
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return this.t('date.relative.minutes_ago', { count: minutes });
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return this.t('date.relative.hours_ago', { count: hours });
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return this.t('date.relative.days_ago', { count: days });
    } else {
      return this.formatDate(dateObj);
    }
  }

  // Load additional resources
  async loadNamespace(namespace: string, locale?: string): Promise<void> {
    const targetLocale = locale || this.currentLocale;
    
    try {
      const resource = await import(`../locales/${targetLocale}/${namespace}.json`);
      
      if (!this.resources[targetLocale]) {
        this.resources[targetLocale] = {};
      }
      
      this.resources[targetLocale][namespace] = resource.default;
    } catch (error) {
      console.warn(`Failed to load namespace ${namespace} for locale ${targetLocale}:`, error);
    }
  }

  // Get available locales
  getAvailableLocales(): string[] {
    return i18nConfig.locales;
  }

  // Check if locale is RTL
  isRTL(locale?: string): boolean {
    const checkLocale = locale || this.currentLocale;
    return ['ar'].includes(checkLocale);
  }
}

// Create singleton instance
export const translator = new Translator();

// React hook for translations
export const useTranslation = () => {
  const [, forceUpdate] = React.useReducer((x: number) => x + 1, 0);

  React.useEffect(() => {
    const handleLocaleChange = () => forceUpdate();
    window.addEventListener('localeChanged', handleLocaleChange);
    return () => window.removeEventListener('localeChanged', handleLocaleChange);
  }, []);

  return {
    t: translator.t.bind(translator),
    plural: translator.plural.bind(translator),
    formatDate: translator.formatDate.bind(translator),
    formatCurrency: translator.formatCurrency.bind(translator),
    formatNumber: translator.formatNumber.bind(translator),
    formatRelativeTime: translator.formatRelativeTime.bind(translator),
    setLocale: translator.setLocale.bind(translator),
    getLocale: translator.getLocale.bind(translator),
    getAvailableLocales: translator.getAvailableLocales.bind(translator),
    i18n: translator,
    locale: translator.getLocale()
  };
};

export default translator;