import { Attack, Language, TrainerCard, TranslatedText } from '@/types/game';

export const defaultLanguage: Language = 'en';

export function getAttackText(
  translatedText: TranslatedText,
  language: Language,
  fallback?: string
): string {
  const finalText = translatedText[language] || translatedText[defaultLanguage];

  if (Array.isArray(finalText)) {
    if (finalText.length === 0) return fallback || '';
    return finalText.join(' ');
  }

  return finalText || fallback || '';
}

export function getTranslatedText(
  translatedText: TranslatedText,
  language: Language,
  fallback?: string
): string[] {
  const finalText = translatedText[language] || translatedText[defaultLanguage];

  if (Array.isArray(finalText)) {
    if (finalText.length === 0) return fallback ? [fallback] : [];
    return finalText;
  }

  return finalText ? [finalText] : fallback ? [fallback] : [];
}
