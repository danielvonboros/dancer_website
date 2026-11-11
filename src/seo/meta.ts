import type { TFunction } from 'i18next'
import { CONTENT } from '../content/pages'
import type { TKey } from '../i18n'
import type { Route } from '../types/route'

export interface PageMeta {
  title: string
  description?: string
}

/** Title and description of a page — for <head>, and for `yarn dev`. */
export function pageMeta(route: Route, t: TFunction): PageMeta {
  switch (route.page) {
    case 'home':
      return { title: t('meta.title'), description: t('meta.description') }
    case 'videos':
      return { title: t('pages.videos.title'), description: t('pages.videos.description') }
    case 'video': {
      const key = route.video.key
      return {
        title: `${t(`videos.items.${key}.title` as TKey)} — Denison Silva`,
        description: t(`videos.items.${key}.description` as TKey),
      }
    }
    case 'production': {
      const key = route.production.key
      return {
        title: t(`productions.items.${key}.metaTitle` as TKey),
        description: t(`productions.items.${key}.description` as TKey),
      }
    }
    case 'imprint':
      return { title: `${t('legal.imprintTitle')} — Denison Silva` }
    case 'privacy':
      return { title: `${t('legal.privacyTitle')} — Denison Silva` }
    case 'notFound':
      return { title: t('pages.notFound.title') }
    default: {
      const content = CONTENT[route.page][route.lang]
      return { title: content.title, description: content.description }
    }
  }
}
