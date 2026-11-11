export interface LegalSection {
  heading: string
  lines: string[]
  layout?: 'prose' | 'stacked'
}

export interface LegalDocument {
  title: string
  sections: LegalSection[]
}

export interface LegalLocale {
  imprint: LegalDocument
  privacy: LegalDocument
}

export type LegalLanguage = 'de' | 'en' | 'pt'

export interface ResolvedLegal extends LegalLocale {
  locale: LegalLanguage
  notice: string
}
