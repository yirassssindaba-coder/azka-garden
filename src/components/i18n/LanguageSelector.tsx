import React, { useState } from 'react';
import { Globe, Check, Moon, Sun, Monitor } from 'lucide-react';
import { useTranslation } from '../../i18n/utils/translator';
import { useTheme } from '../../contexts/ThemeContext';
import { localeNames } from '../../i18n/config/i18n.config';

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const { t, setLocale, getLocale, getAvailableLocales } = useTranslation();
  const { theme, isDark, setTheme, toggleTheme } = useTheme();
  const currentLocale = getLocale();

  const handleLocaleChange = (locale: string) => {
    setLocale(locale);
    setIsOpen(false);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setShowThemeMenu(false);
  };

  const availableLocales = getAvailableLocales();

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="h-4 w-4" />;
      case 'dark': return <Moon className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-2">
      {/* Language Selector */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full lg:w-auto space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors bg-gray-50 dark:bg-gray-800 rounded-lg lg:bg-transparent lg:dark:bg-transparent"
        >
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">
              {localeNames[currentLocale as keyof typeof localeNames]}
            </span>
          </div>
          <span className="lg:hidden text-xs text-gray-500">▼</span>
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 lg:right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-700 z-20">
              <div className="py-1">
                {availableLocales.map((locale) => (
                  <button
                    key={locale}
                    onClick={() => handleLocaleChange(locale)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
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

      {/* Theme Selector */}
      <div className="relative">
        <button
          onClick={() => setShowThemeMenu(!showThemeMenu)}
          className="flex items-center justify-between w-full lg:w-auto space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors bg-gray-50 dark:bg-gray-800 rounded-lg lg:bg-transparent lg:dark:bg-transparent"
        >
          <div className="flex items-center space-x-2">
            {getThemeIcon()}
            <span className="text-sm font-medium lg:hidden">
              {theme === 'light' ? 'Terang' : theme === 'dark' ? 'Gelap' : 'Sistem'}
            </span>
          </div>
          <span className="lg:hidden text-xs text-gray-500">▼</span>
        </button>

        {showThemeMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowThemeMenu(false)}
            />
            <div className="absolute right-0 lg:right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-700 z-20">
              <div className="py-1">
                <button
                  onClick={() => handleThemeChange('light')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4" />
                    <span>Terang</span>
                  </div>
                  {theme === 'light' && <Check className="h-4 w-4 text-green-600" />}
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <Moon className="h-4 w-4" />
                    <span>Gelap</span>
                  </div>
                  {theme === 'dark' && <Check className="h-4 w-4 text-green-600" />}
                </button>
                <button
                  onClick={() => handleThemeChange('system')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <Monitor className="h-4 w-4" />
                    <span>Sistem</span>
                  </div>
                  {theme === 'system' && <Check className="h-4 w-4 text-green-600" />}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;