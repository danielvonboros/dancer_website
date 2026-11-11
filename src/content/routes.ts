import type { Language, PageDef, PageId } from '../types/route'

export const LANGUAGES = ['en', 'de', 'pt'] as const

export const ORIGIN = 'https://www.denisonsilva.com'

/**
 * English stays at the root because Google already knows the site there;
 * German and Portuguese get a prefix. Every page has its own translated
 * slug, so each language can rank for what people search in it.
 */
export const PREFIX: Record<Language, string> = { en: '', de: '/de', pt: '/pt' }

/**
 * Folder the production pages live in. There is no page at the folder
 * itself — the CV on the home page is the list of productions.
 */
export const PRODUCTIONS_DIR: Record<Language, string> = {
  en: 'productions',
  de: 'produktionen',
  pt: 'producoes',
}

export const PAGES: Record<PageId, PageDef> = {
  home: { slug: { en: '', de: '', pt: '' } },
  videos: { slug: { en: 'videos', de: 'videos', pt: 'videos' } },
  ballet: {
    slug: { en: 'ballet-classes-berlin', de: 'ballettunterricht-berlin', pt: 'aulas-de-bale-berlim' },
    draft: true,
  },
  contemporary: {
    slug: {
      en: 'contemporary-dance-classes-berlin',
      de: 'contemporary-dance-berlin',
      pt: 'aulas-de-danca-contemporanea-berlim',
    },
    draft: true,
  },
  jazz: {
    slug: { en: 'jazz-dance-classes-berlin', de: 'jazz-dance-berlin', pt: 'aulas-de-jazz-berlim' },
    draft: true,
  },
  private: {
    slug: {
      en: 'private-ballet-lessons-berlin',
      de: 'ballett-privatstunden-berlin',
      pt: 'aulas-particulares-de-bale-berlim',
    },
    draft: true,
  },
  workshops: {
    slug: {
      en: 'dance-workshops-for-schools',
      de: 'tanzworkshops-schulen-kitas',
      pt: 'oficinas-de-danca-para-escolas',
    },
    draft: true,
  },
  choreography: {
    slug: { en: 'choreography', de: 'choreografie', pt: 'coreografia' },
    draft: true,
  },
  dancer: { slug: { en: 'dancer', de: 'taenzer', pt: 'bailarino' }, draft: true },
  imprint: { slug: { en: 'imprint', de: 'impressum', pt: 'impressum' }, noindex: true },
  privacy: { slug: { en: 'privacy', de: 'datenschutz', pt: 'privacidade' }, noindex: true },
}
