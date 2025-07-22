'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

type Language = 'en' | 'es' | 'ja';

const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
];

export function LanguageSelector() {
  const router = useRouter();
  const currentLocale = useLocale() as Language;
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>(currentLocale);

  useEffect(() => {
    setSelectedLanguage(currentLocale);
  }, [currentLocale]);

  const handleLanguageChange = (newLanguage: Language) => {
    setSelectedLanguage(newLanguage);

    document.cookie = `locale=${newLanguage}; path=/; max-age=${
      60 * 60 * 24 * 365
    }`;

    localStorage.setItem('pocket-showdown-language', newLanguage);

    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <GlobeAltIcon className="w-5 h-5 text-white" />
      <select
        value={selectedLanguage}
        onChange={e => handleLanguageChange(e.target.value as Language)}
        className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
      >
        {languages.map(lang => (
          <option
            key={lang.code}
            value={lang.code}
            className="bg-gray-800 text-white"
          >
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
