import { useTranslations } from 'next-intl';

export function useSafeTranslations(namespace: string) {
  const t = useTranslations(namespace);

  return (key: string): string => {
    try {
      return t(key);
    } catch (error) {
      console.warn(
        `Missing translation: ${namespace}.${key}, falling back to key`
      );
      return key;
    }
  };
}
