'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import './LanguageSelector.css';

type Language = 'en' | 'es' | 'ja';

const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
];

export function LanguageSelector() {
  const router = useRouter();
  const currentLocale = useLocale() as Language;
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(currentLocale);

  useEffect(() => {
    setSelectedLanguage(currentLocale);
  }, [currentLocale]);

  const handleLanguageChange = (newLanguage: Language) => {
    setSelectedLanguage(newLanguage);

    document.cookie = `locale=${newLanguage}; path=/; max-age=${60 * 60 * 24 * 365}`;

    localStorage.setItem('pocket-showdown-language', newLanguage);

    router.refresh();
  };

  return (
    <div className="language-selector">
      <GlobeAltIcon className="language-selector__icon" />
      <select
        value={selectedLanguage}
        onChange={e => handleLanguageChange(e.target.value as Language)}
        className="language-selector__select"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code} className="language-selector__option">
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
