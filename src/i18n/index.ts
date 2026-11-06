import i18n, { type ParseKeys } from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import de from './de.json'
import pt from './pt.json'
import type { Language } from '../routes'

export { LANGUAGES, type Language } from '../routes'

/**
 * The language comes from the URL (/de/…, /pt/…), never from the browser:
 * every page is prerendered in exactly one language, and the browser has
 * to hydrate it in that same language. Synchronous on purpose — all three
 * dictionaries are bundled, so there is nothing to wait for.
 */
export function setupI18n(lng: Language) {
  if (!i18n.isInitialized) {
    void i18n.use(initReactI18next).init({
      resources: {
        en: { translation: en },
        de: { translation: de },
        pt: { translation: pt },
      },
      lng,
      fallbackLng: 'en',
      initAsync: false,
      showSupportNotice: false,
      interpolation: { escapeValue: false },
    })
  } else if (i18n.language !== lng) {
    void i18n.changeLanguage(lng)
  }
  return i18n
}

export default i18n

/** Every valid translation key, for the few places we build one dynamically. */
export type TKey = ParseKeys
