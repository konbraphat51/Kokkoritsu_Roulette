import { createI18n } from 'vue-i18n'
import en from './locales/en'
import ja from './locales/ja'

/** Locales this app ships UI text for. */
export const SUPPORTED_LOCALES = ['ja', 'en'] as const

export type AppLocale = (typeof SUPPORTED_LOCALES)[number]

const STORAGE_KEY = 'kokkoritsu-roulette:locale'

/**
 * Japanese is the default because the site targets Japanese applicants;
 * English is kept as a fully translated alternative.
 */
const FALLBACK_LOCALE: AppLocale = 'ja'

function isSupportedLocale(value: string | null): value is AppLocale {
  return value !== null && (SUPPORTED_LOCALES as readonly string[]).includes(value)
}

/**
 * Resolves the initial locale from storage, otherwise the default.
 *
 * The browser language is deliberately not consulted: the site targets
 * Japanese applicants, so Japanese stays the first impression and English is
 * an explicit opt-in through the locale switcher.
 */
export function resolveInitialLocale(): AppLocale {
  if (typeof window === 'undefined') {
    return FALLBACK_LOCALE
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  return isSupportedLocale(stored) ? stored : FALLBACK_LOCALE
}

/** Persists the chosen locale so a reload keeps the user's preference. */
export function persistLocale(locale: AppLocale): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, locale)
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: resolveInitialLocale(),
  fallbackLocale: FALLBACK_LOCALE,
  messages: { ja, en },
})
