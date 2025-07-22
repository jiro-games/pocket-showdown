'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type Language = 'en' | 'es' | 'ja';
type TranslationNamespace =
  | 'ui'
  | 'pokemon'
  | 'attacks'
  | 'abilities'
  | 'trainers'
  | 'game';

interface Translations {
  [key: string]: string;
}

interface TranslationContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (namespace: TranslationNamespace, key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<
    Record<Language, Record<TranslationNamespace, Translations>>
  >({
    en: {},
    es: {},
    ja: {},
  } as any);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const namespaces: TranslationNamespace[] = [
          'ui',
          'pokemon',
          'attacks',
          'abilities',
          'trainers',
          'game',
        ];
        const languages: Language[] = ['en', 'es', 'ja'];

        const translationPromises = languages.map(async lang => {
          const langTranslations: Record<TranslationNamespace, Translations> =
            {} as any;

          await Promise.all(
            namespaces.map(async namespace => {
              try {
                const module = await import(
                  `../../locales/${lang}/${namespace}.json`
                );
                langTranslations[namespace] = module.default;
              } catch (error) {
                console.warn(`Failed to load ${lang}/${namespace}.json`, error);
                langTranslations[namespace] = {};
              }
            })
          );

          return { lang, translations: langTranslations };
        });

        const results = await Promise.all(translationPromises);
        const newTranslations = results.reduce(
          (acc, { lang, translations: langTranslations }) => {
            acc[lang] = langTranslations;
            return acc;
          },
          {} as Record<Language, Record<TranslationNamespace, Translations>>
        );

        setTranslations(newTranslations);
      } catch (error) {
        console.error('Failed to load translations:', error);
      }
    };

    loadTranslations();
  }, []);

  useEffect(() => {
    const detectLanguage = (): Language => {
      const saved = localStorage.getItem(
        'pocket-showdown-language'
      ) as Language;
      if (saved && ['en', 'es', 'ja'].includes(saved)) {
        return saved;
      }

      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('es')) return 'es';
      if (browserLang.startsWith('ja')) return 'ja';
      return 'en';
    };

    setCurrentLanguage(detectLanguage());
  }, []);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      const newLanguage = event.detail.language as Language;
      setCurrentLanguage(newLanguage);
    };

    window.addEventListener(
      'languageChanged',
      handleLanguageChange as EventListener
    );
    return () =>
      window.removeEventListener(
        'languageChanged',
        handleLanguageChange as EventListener
      );
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('pocket-showdown-language', lang);
  };

  const t = (namespace: TranslationNamespace, key: string): string => {
    return translations[currentLanguage]?.[namespace]?.[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

export function useUI() {
  const { t } = useTranslation();
  return (key: string) => t('ui', key);
}

export function usePokemon() {
  const { t } = useTranslation();
  return (key: string) => t('pokemon', key);
}

export function useAttacks() {
  const { t } = useTranslation();
  return (key: string) => t('attacks', key);
}
