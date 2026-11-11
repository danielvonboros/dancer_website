import { BINDING_NOTICE, ENTITY, LEGAL_CONTENT } from '../content/legal'
import type { LegalDocument, LegalLanguage, ResolvedLegal } from '../types/legal'

/** Replaces the {placeholders} in a legal text with the details in ENTITY. */
function fill(line: string, country: string): string {
  return line
    .replaceAll('{name}', ENTITY.name)
    .replaceAll('{street}', ENTITY.street)
    .replaceAll('{postalCity}', ENTITY.postalCity)
    .replaceAll('{country}', country)
    .replaceAll('{email}', ENTITY.email)
    .replaceAll('{phone}', ENTITY.phone)
}

/** Imprint and privacy text in the given language (English as fallback), placeholders filled in. */
export function resolveLegal(language: string): ResolvedLegal {
  const short = language.split('-')[0]
  const locale: LegalLanguage = short in LEGAL_CONTENT ? (short as LegalLanguage) : 'en'
  const country = ENTITY.country[locale]
  const content = LEGAL_CONTENT[locale]

  const render = (document: LegalDocument): LegalDocument => ({
    title: document.title,
    sections: document.sections.map((section) => ({
      ...section,
      lines: section.lines.map((line) => fill(line, country)),
    })),
  })

  return {
    locale,
    imprint: render(content.imprint),
    privacy: render(content.privacy),
    notice: BINDING_NOTICE[locale],
  }
}
