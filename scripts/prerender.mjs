// Last step of `yarn build`: renders every route of the server bundle into
// its own index.html under dist/, so each page ships its text and its <head>
// as plain HTML — readable without JavaScript, by Google and everyone else.
// Apache then serves /de/videos/ from dist/de/videos/index.html by itself.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = resolve('dist')
const serverDir = resolve('dist-ssr')
const template = await readFile(join(dist, 'index.html'), 'utf8')

for (const marker of ['<html lang="en">', '<!--app-head-->', '<!--app-html-->', '<!--app-route-->']) {
  if (!template.includes(marker)) throw new Error(`index.html lost its ${marker} marker`)
}

const server = await import(pathToFileURL(join(serverDir, 'entry-server.js')).href)

for (const route of server.routes) {
  const page = server.render(route)
  const html = template
    .replace('<html lang="en">', `<html lang="${page.lang}">`)
    .replace('<!--app-head-->', page.head)
    .replace('<!--app-html-->', page.html)
    .replace('<!--app-route-->', `<script id="route" type="application/json">${page.route}</script>`)

  const file = join(dist, page.file)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
}

const today = new Date().toISOString().slice(0, 10)
await writeFile(join(dist, 'sitemap.xml'), server.sitemapXml(today))
await rm(serverDir, { recursive: true, force: true })

console.log(`prerendered ${server.routes.length} pages and sitemap.xml`)
