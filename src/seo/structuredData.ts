import type { TFunction } from 'i18next'
import { SITE } from './siteGraph'
import { eventObject } from './eventObject'
import { videoObject } from './videoObject'
import { isIndexable, pagePath, productionPath, videoPath } from '../routes'
import { ORIGIN } from '../content/routes'
import { type Route } from '../types/route'
import type { TKey } from '../i18n'

/** The JSON-LD graph of a page: who the site is about, the breadcrumb, and the video or event it shows. */
export function structuredData(route: Route, url: string, t: TFunction): object[] {
  if (!isIndexable(route) || route.page === 'home') return SITE

  const crumbs = [{ name: t('pages.home'), path: pagePath('home', route.lang) }]
  if (route.page === 'video') {
    crumbs.push({ name: t('nav.videos'), path: pagePath('videos', route.lang) })
    crumbs.push({ name: t(`videos.items.${route.video.key}.title` as TKey), path: videoPath(route.video, route.lang) })
  } else if (route.page === 'production') {
    crumbs.push({
      name: t(`productions.items.${route.production.key}.title` as TKey),
      path: productionPath(route.production, route.lang),
    })
  } else if (route.page !== 'notFound') {
    crumbs.push({ name: t(`pages.labels.${route.page}` as TKey), path: pagePath(route.page, route.lang) })
  }

  const breadcrumbs = {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: ORIGIN + crumb.path,
    })),
  }

  if (route.page === 'video') return [...SITE, breadcrumbs, videoObject(route.video, url, t)]
  if (route.page === 'production') return [...SITE, breadcrumbs, eventObject(route.production, url, t)]
  return [...SITE, breadcrumbs]
}
