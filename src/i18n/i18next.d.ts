import 'i18next'
import type en from './en.json'

/** Makes t() autocomplete and typo-proof across all three locales. */
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: { translation: typeof en }
  }
}
