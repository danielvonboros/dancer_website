import type { TKey } from '../i18n'

/** Sections of the home page, in page order — the nav links to each by its id. */
export const SECTIONS = ['about', 'work', 'cv', 'videos', 'references', 'contact'] as const
export type SectionId = (typeof SECTIONS)[number]

/** Translation key of each section's label in the nav. */
export const SECTION_LABELS = {
  about: 'nav.about',
  work: 'nav.work',
  cv: 'nav.cv',
  videos: 'nav.videos',
  references: 'nav.references',
  contact: 'nav.contact',
} as const satisfies Record<SectionId, TKey>
