import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { translator } from '../../i18n/utils/translator';
import { localeNames } from '../../i18n/config/i18n.config';

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(translator.getLocale());

  const handleLocaleChange = (locale: string) => {
    translator.setLocale(locale);
    setCurrentLocale(locale);
    setIsOpen(false);
  };

  const availableLocales = translator.getAvailableLocales();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-green-600 transition-colors"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">
          {localeNames[currentLocale as keyof typeof localeNames]}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-20">
            <div className="py-1">
              {availableLocales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => handleLocaleChange(locale)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                >
                  <span>{localeNames[locale as keyof typeof localeNames]}</span>
                  {locale === currentLocale && (
                    <Check className="h-4 w-4 text-green-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;