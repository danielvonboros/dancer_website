import i18n, { type ParseKeys } from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './en.json'
import de from './de.json'
import pt from './pt.json'

export const LANGUAGES = ['en', 'de', 'pt'] as const
export type Language = (typeof LANGUAGES)[number]

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      pt: { translation: pt },
    },
    fallbackLng: 'en',
    supportedLngs: LANGUAGES as unknown as string[],
    // 'de-AT' and 'pt-BR' should resolve to 'de' and 'pt'
    load: 'languageOnly',
    nonExplicitSupportedLngs: true,
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'ds-lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  })

/** Keep <html lang> and the document title in step with the UI language. */
function sync(lng: string) {
  document.documentElement.lang = lng
  const title = i18n.t('meta.title')
  document.title = title
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', i18n.t('meta.description'))
}

i18n.on('languageChanged', sync)
if (i18n.isInitialized) sync(i18n.language)

export default i18n

/** Every valid translation key, for the few places we build one dynamically. */
export type TKey = ParseKeys
