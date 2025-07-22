import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { IntlErrorCode } from 'next-intl';

export const locales = ['en', 'es', 'ja'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('locale')?.value;

  let locale: Locale = 'en';

  if (savedLocale && locales.includes(savedLocale as Locale)) {
    locale = savedLocale as Locale;
  } else {
    const headersList = await headers();
    const acceptLanguage = headersList.get('Accept-Language');

    if (acceptLanguage?.includes('es')) locale = 'es';
    else if (acceptLanguage?.includes('ja')) locale = 'ja';
  }

  const [enUI, enGame, enPokemon, enTrainers, enAttacks, enAbilities] =
    await Promise.all([
      import(`./locales/en/ui.json`).then(m => m.default).catch(() => ({})),
      import(`./locales/en/game.json`).then(m => m.default).catch(() => ({})),
      import(`./locales/en/pokemon.json`)
        .then(m => m.default)
        .catch(() => ({})),
      import(`./locales/en/trainers.json`)
        .then(m => m.default)
        .catch(() => ({})),
      import(`./locales/en/attacks.json`)
        .then(m => m.default)
        .catch(() => ({})),
      import(`./locales/en/abilities.json`)
        .then(m => m.default)
        .catch(() => ({})),
    ]);

  let localeUI = {};
  let localeGame = {};
  let localePokemon = {};
  let localeTrainers = {};
  let localeAttacks = {};
  let localeAbilities = {};

  if (locale !== 'en') {
    [
      localeUI,
      localeGame,
      localePokemon,
      localeTrainers,
      localeAttacks,
      localeAbilities,
    ] = await Promise.all([
      import(`./locales/${locale}/ui.json`)
        .then(m => m.default)
        .catch(() => ({})),
      import(`./locales/${locale}/game.json`)
        .then(m => m.default)
        .catch(() => ({})),
      import(`./locales/${locale}/pokemon.json`)
        .then(m => m.default)
        .catch(() => ({})),
      import(`./locales/${locale}/trainers.json`)
        .then(m => m.default)
        .catch(() => ({})),
      import(`./locales/${locale}/attacks.json`)
        .then(m => m.default)
        .catch(() => ({})),
      import(`./locales/${locale}/abilities.json`)
        .then(m => m.default)
        .catch(() => ({})),
    ]);
  }

  return {
    locale,
    messages: {
      ui: { ...enUI, ...localeUI },
      game: { ...enGame, ...localeGame },
      pokemon: { ...enPokemon, ...localePokemon },
      trainers: { ...enTrainers, ...localeTrainers },
      attacks: { ...enAttacks, ...localeAttacks },
      abilities: { ...enAbilities, ...localeAbilities },
    },
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return;
      } else {
        console.error(error);
      }
    },
    getMessageFallback({ namespace, key, error }) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        console.warn(
          `Missing translation: ${namespace}.${key}, falling back to key`
        );
        return key;
      } else {
        const path = [namespace, key].filter(part => part != null).join('.');
        return `Error: ${path}`;
      }
    },
  };
});
