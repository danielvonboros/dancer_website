import { allRoutes, alternates, isIndexable, routePath } from '../routes'
import { LANGUAGES, ORIGIN } from '../content/routes'

/**
 * Every indexable page in every language, each listing its translations —
 * Google reads hreflang from the sitemap as well as from <head>.
 * Generated on each build, so a page leaves draft status and appears here
 * without anyone editing XML.
 */
export function sitemapXml(lastmod: string): string {
  const urls = allRoutes()
    .filter(isIndexable)
    .map((route) => {
      const paths = alternates(route)
      const links = LANGUAGES.map(
        (lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${ORIGIN}${paths[lang]}" />`,
      )
      return [
        '  <url>',
        `    <loc>${ORIGIN}${routePath(route)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        ...links,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${paths.en}" />`,
        '  </url>',
      ].join('\n')
    })

  const cv = ['  <url>', `    <loc>${ORIGIN}/denison-silva-cv.pdf</loc>`, '  </url>'].join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    cv,
    '</urlset>',
    '',
  ].join('\n')
}
