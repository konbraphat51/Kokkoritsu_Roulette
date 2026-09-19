import { useI18n } from 'vue-i18n'
import type { AppLocale } from '@/i18n'
import type { LocalizedText } from '@/types/university'

/**
 * Resolves data-side localized labels (university and prefecture names).
 * Message catalogues cover UI chrome; this covers the dataset.
 */
export function useLocalizedText() {
  const { locale } = useI18n()

  const localize = (text: LocalizedText): string => text[locale.value as AppLocale] ?? text.ja

  return { localize }
}
