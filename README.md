# denisonsilva.com

Site for Denison Silva — dancer, choreographer and dance educator.
React 19 + TypeScript on Vite, Tailwind v4, react-i18next. English is the
source language; German and Portuguese are translations, each under its
own path (`/`, `/de/`, `/pt/`).

```bash
yarn install
yarn dev       # http://localhost:5173 — draft pages included
yarn build     # type-check, bundle, then prerender every page to dist/
yarn preview   # serve the built site
```

Run `yarn install` once and commit the `yarn.lock` it creates — the deploy
workflow installs with `--frozen-lockfile` and fails without it.

---

## Version and changelog

Current version: **3.0.1** (also in `package.json`).

Every change gets a new version number and an entry here, newest first:

- **Major** (first number) — a relaunch: new address structure, new look or
  new code structure, e.g. 3.0.0 → 4.0.0
- **Minor** (second number) — something new: a page, a section, a feature,
  e.g. 3.0.0 → 3.1.0
- **Fix** (third number) — a correction or small adjustment, e.g. 3.0.0 → 3.0.1

Versions up to 3.0.0 were assigned afterwards, from the git history.
`main` (what is live) is at 1.2.1; everything from 1.3.0 on is on the
feature branches and not merged yet.

### 3.0.1 — 2026-11-11

- Version numbers and this changelog introduced; version in `package.json`.

### 3.0.0 — 2026-11-11 · `62e0566` · Major

- Code restructured to the pixelgeselle layout: `pages/`, `sections/`, one
  folder per component, data in `content/`, types in `types/`, helpers in
  `utils/`, design values only in `theme/`. Every code file has one job.
- Violet from dancer.one as the one highlight colour, always marking
  Denison himself: his part, his row in cast lists, "Current", his solo,
  link underlines, focus ring.
- New Work section: four pieces as a dancer, four as a choreographer, each
  with his part. Replaces the three long text blocks of "Productions".
- About now opens with the stage; teaching follows.
- Hero shows the current production at the bottom left, above the role
  line; it disappears after its last day.
- CV role filter in violet: active filter as a violet block, light violet
  on hover.
- Muted text darker: contrast 5.2:1 instead of 3.4:1 (WCAG AA everywhere).
- Fixed an endless re-measuring loop in the hero stencil; `yarn lint`
  now really type-checks.

### 2.1.0 — 2026-11-09 · `ba10585` · Minor

- Own pages for the COP17 Opening Show in Yerevan and The Nutcracker
  (Berlin Ballet Company), each with description, facts and full credits.
- Photo gallery with a full-width view on the COP17 page; button that
  starts the COP17 video at Denison's solo (9:30).
- Both productions in the CV, "Current" mark for The Nutcracker until
  20.12.2026; both videos on the home page and the video page.

### 2.0.0 — 2026-11-06 · `cf52533` · Major

- From one page to many: every page has its own address in each language
  (`/`, `/de/`, `/pt/`) and is prerendered to plain HTML.
- Video page and one page per video; draft pages for classes, workshops
  and choreography; 404 page; old `#legal/…` links redirect.
- Sitemap generated on every build, hreflang and structured data per page.

### 1.3.0 — 2026-11-05 · `c12ae38` · Minor

- All host variants redirect to https://www.denisonsilva.com.
- robots.txt, sitemap.xml, Open Graph image and favicons.
- Titles and descriptions name ballet, jazz and Berlin in all three languages;
  Person and WebSite structured data.

### 1.2.1 — 2026-10-08 · `ab7f4bc` · Fix

- New phone number in the contact details and the imprint.

### 1.2.0 — 2026-10-08 · `b638668` · Minor

- Imprint and privacy policy in Portuguese.

### 1.1.1 — 2026-10-02 · `f841928` · Fix

- `yarn.lock` added, so the deploy can install dependencies.

### 1.1.0 — 2026-10-02 · `b13a179` · Minor

- The real videos (Spelunkenwirt, creative process, Pandora's Box) and the
  hero background video.

### 1.0.0 — 2026-09-25 · `cefad56`

- First version: one page with the stencil hero, about, CV with role
  filter, productions, videos, references and contact form, in English,
  German and Portuguese; deploy to all-inkl.

---

## Why Vite and not Next.js

Vite and Next.js are alternative build systems, so the brief's "Vite,
Next.js" had to resolve to one. The site has no server data, and the few
pages it has are prerendered by a 40-line script instead of a framework
(see "Pages, languages and prerendering").

---

## Where things live

The structure follows the pixelgeselle repository: one folder per
component, sections built from components, pages built from sections.
Every code file has one job and stays under 300 lines.

```
src/
  App.tsx           picks the page for the current route
  routes.ts         paths of every page in every language, and back
  main.tsx          browser entry: hydrates the prerendered page
  entry-server.tsx  build entry: renders one page to HTML
  pages/            whole pages, composed from sections
  sections/         page sections, one folder each, composed from components
  components/       reusable building blocks, one folder each
  content/          all data: CV, videos, productions, work, legal texts, routes
  i18n/en|de|pt     all copy; en.json is the source of truth
  types/            the shape of the data in content/
  hooks/            shared React hooks
  utils/            small helper functions, one per file
  seo/              <head>, structured data (JSON-LD) and sitemap
  theme/            tokens.css (colours, fonts, type scale) and global.css
public/
  api/contact.php   the contact form's backend (see below)
  .htaccess         HTTPS, caching and headers for Apache
  media/            hero video, portrait, video stills, production photos
```

Pages, top to bottom:

| Page | What is on it |
| ---- | ------------- |
| `Home` | Hero, About, Work, CV, Videos, References, Contact |
| `VideosPage` | every video as a card |
| `VideoPage` | one video with player, description and facts |
| `ProductionPage` | one production: about, photos, video, credits |
| `ContentPage` | class, workshop and choreography pages (drafts) |
| `LegalPage` | imprint and privacy |
| `NotFound` | the 404 page |

Sections: `hero`, `about`, `work`, `resume` (the CV), `videos`,
`references`, `contact`, `productionDetail` (the four parts of a
production page) and `contentBlock` (one block of a content page).

Reusable components:

| Component | Purpose |
| --------- | ------- |
| `Section` | the left-rail / content split every section uses; `tone` paper or stage, `spacing` roomy or compact |
| `PageShell` | nav, main and footer around every page except the home page |
| `PageHeader` | a page's h1 and lead |
| `Nav` | top bar with the section links; the active one is underlined in violet |
| `Footer` | legal links, email, page list |
| `LanguageSwitcher` | EN / DE / PT, each a real link to the same page |
| `SkipLink` | keyboard link past the hero |
| `Stencil` | the name cut out of a black plate over the hero video (see below) |
| `NowOnStage` | the line in the hero with the current production |
| `CurrentMark` | the violet "Current" block; disappears after its last day |
| `WorkCard` | one piece of work: photo or outline word, house, title, his part |
| `EngagementItem` | one station of the CV |
| `RoleFilter` | dancer / teacher / choreographer filter of the CV |
| `EducationList`, `RepertoireList` | training and danced choreographers, under the CV |
| `FactList` | label and value pairs: year, place, date, role |
| `Breadcrumb` | "Home / Videos" above a page title |
| `CreditList`, `PersonName` | cast and team of a production; Denison's row in violet |
| `Gallery` | row of photos, full-width view on click |
| `VideoFacade` | still image that turns into the player on click |
| `VideoPlayer` | `VideoFacade` plus the button that jumps to Denison's moment |
| `VideoCard` | a video as a link to its own page |
| `ExternalLink` | link to another site, opens in a new tab |
| `LegalSection` | one heading of the imprint or privacy page |
| `RouteProvider` | makes the current route available to `useRoute()` |

Content is data, not markup. To add an engagement, add an entry to
`ENGAGEMENTS` in `src/content/cv.ts` and one line under `cv.items.<id>`
in each of the three locale files. Nothing else changes: the timeline,
the role filter and the references list all read from the same array.

**The Work section** (`src/content/work.ts`) is a selection, not the CV:
four pieces as a dancer, four as a choreographer, each with his part in
it. A piece without a photo shows its name in outline type, like the
hero. When Denison sends a still of himself in one of them, put it in
`public/media/` and set `image`.

### Colour

Black, grey and paper white, plus one colour: the violet of dancer.one
(`oklch(0.61 0.205 292)`), so both sites belong together. Violet always
means "Denison": his part on a work card, his row in a cast list, the
"Current" mark, the jump to his solo, the underline of links and the
focus ring. It never fills a section. All values are in
`src/theme/tokens.css`; on dark grounds (`bg-stage`, `bg-scrim`) the
muted grey and the violet switch to lighter versions automatically, so
every text stays at WCAG AA contrast or better.

---

## Pages, languages and prerendering

```
src/
  content/routes.ts   every page and its slug in en / de / pt
  routes.ts           turns those into paths, and paths back into pages
  content/pages.ts    text of the class, workshop and choreography pages
  seo/head.ts         title, canonical, hreflang, Open Graph
  seo/structuredData.ts  JSON-LD: person, breadcrumb, video or event
  seo/sitemap.ts      sitemap.xml, generated on every build
  entry-server.tsx    renders one route to HTML
scripts/prerender.mjs writes dist/<path>/index.html for every route
```

`yarn build` renders each page to its own `index.html`, so the text and
the `<head>` of every page are in the HTML itself — Google, link previews
and AI crawlers read them without running JavaScript. In the browser the
page then hydrates and behaves as before. Pages link to each other with
plain `<a>` tags; there is no client-side router and Apache needs no
rewrite rules. The language comes from the path, never from the browser.

**Publishing a draft page.** The class, workshop, choreography and dancer
pages are `draft: true` in `PAGES` (`src/content/routes.ts`): `yarn dev` shows
them, `yarn build` leaves them out. Write the text in
`src/content/pages.ts` (gaps are marked in `yarn dev`), then delete the
`draft` flag — the page is built, listed in the sitemap and linked from
the footer. The dancer page reuses the About, CV and References sections,
so publish it together with a slimmer home page to avoid duplicate text.

**Adding a video.** Add an entry to `VIDEOS` in `src/content/videos.ts` (id,
slug per language, upload date and length from YouTube, a 16:9 still in
`public/media/videos/`) and `videos.items.<key>.title` / `.description`
in the three locale files. Its own page, its card and its VideoObject
for Google follow from that.

**Adding a production.** Add an entry to `PRODUCTIONS` in
`src/content/productions.ts` (slug per language, dates, venue, credits,
optionally a video key and `currentUntil` for the "Current" mark) and
`productions.items.<key>` in the three locale files. Point its CV entry
in `src/content/cv.ts` at it with `production: '<key>'`. The page at
`/productions/<slug>/` (`/de/produktionen/…`, `/pt/producoes/…`), its
sitemap entry and its Event for Google follow from that. The "Current"
mark comes off by itself in the browser after its last day; the next
build takes it out of the HTML as well.

---

## How the hero stencil works

One SVG `<mask>`: a white rectangle covering the stage, with black
letterforms punching holes in it. The black plate is painted *through*
that mask, so the plate exists everywhere except inside the type — and
the video underneath is visible only inside the letters.

Three details that are easy to get wrong:

1. **Measure, then fit.** The wordmark is drawn once into a group that is
   rendered invisibly and measured with `getComputedTextLength()`. `<use>`
   pulls that same group into the mask, so the ruler and the stencil can
   never drift apart.
2. **Wait for the font.** The measurement happens after
   `document.fonts.ready`. Measure before Anton loads and the wordmark is
   sized for the fallback face and stays that way.
3. **Fit to the cap height, not to `getBBox()`.** A font's bounding box
   includes ascender and descender space that all-caps type never fills.
   Fitting to it leaves the wordmark visibly too small, so the fit uses
   Anton's cap height (0.73 em) instead. If you swap the display face,
   change `CAP` in `Stencil.tsx` to match.

The `viewBox` tracks the element's real pixel size via `ResizeObserver`,
so nothing is ever cropped. Below 720 px the two words stack flush left
instead of taking the poster's ragged setting.

### The background video

Drop these into `public/media/`:

| file              | what it is                                            |
| ----------------- | ----------------------------------------------------- |
| `hero.webm`       | VP9 or AV1, the file most browsers will use           |
| `hero.mp4`        | H.264 fallback for Safari                             |
| `hero-poster.jpg` | first frame — shows before the video decodes          |

Keep it 8–15 seconds, silently looping, and **under 3 MB**. It is the
first thing that downloads. Because only the letters are transparent,
footage with movement across the middle of the frame reads best — a
close shot of a phrase works better than a wide stage shot.

```bash
ffmpeg -i source.mov -t 12 -an -vf "scale=1600:-2,format=yuv420p" \
  -c:v libvpx-vp9 -b:v 1200k -crf 34 public/media/hero.webm
ffmpeg -i source.mov -t 12 -an -vf "scale=1600:-2,format=yuv420p" \
  -c:v libx264 -crf 26 -movflags +faststart public/media/hero.mp4
ffmpeg -i source.mov -ss 1 -frames:v 1 public/media/hero-poster.jpg
```

Autoplay only works muted, and the video is paused on load for anyone
with "reduce motion" switched on. The poster image is the fallback in
both cases, so it has to look good on its own.

---

## Before it goes live

- **`src/content/legal.ts`** has three TODOs: street and house number, the
  photographer's credit, and the log retention period. A German Impressum
  without a deliverable postal address is the most common reason a
  freelance site gets an Abmahnung. A c/o address is fine; a PO box is not.
- **VAT line.** `vat` is `undefined`, which hides the section — correct if
  you invoice as a Kleinunternehmer under § 19 UStG. Fill it in otherwise.
- **Photo credit.** `public/media/portrait.jpg` came out of your CV PDF.
  Check you have the right to publish it on the web, not just in a PDF.
- **Contact form.** Create the mailbox `contact@denisonsilva.com` in KAS
  before the first real test — `contact.php` sends from and to it.
- **Privacy page.** Conclude the AV-Vertrag in the all-inkl Members area,
  copy the exact company name into `host` in `src/content/legal.ts`, and set
  `logDays` to what KAS says about log retention.
- **Testimonials.** `TESTIMONIALS` in `src/content/testimonials.ts` is empty on
  purpose — fill it only with quotes you have written permission to
  publish. Until then the section shows the directors you worked under,
  which is what a theatre wants to see anyway.

---

## Privacy, deliberately

No cookies, no analytics, no consent banner needed:

- Fonts are bundled from `@fontsource`, served from your own domain.
  Loading them from Google's CDN would put you on the wrong side of the
  2022 Munich ruling.
- YouTube and Vimeo are not contacted until someone presses play. The
  preview is a still from your server.
- The contact form uses a hidden honeypot field instead of a captcha,
  which would mean loading a third party on every visit.

If you add anything that sets a cookie, the privacy page needs updating
and a consent banner becomes mandatory.

---

## Hosting on all-inkl

`yarn build` produces a static `dist/` that already contains everything
the server needs: the site, `api/contact.php` and `.htaccess`.

### One-time setup in KAS

1. Point the domain at its own folder, e.g. `/denisonsilva.com/`, and set
   PHP to 8.1 or newer for it — `contact.php` uses 8.1 syntax.
2. Switch on the free Let's Encrypt certificate for the domain.
3. Create the mailbox `contact@denisonsilva.com`.
4. Create a **separate FTP user limited to that folder**. The deploy only
   ever gets that login, so a leaked secret cannot touch anything else.

### First deploy: by hand

Do this once before automating it, so you know what the automation does.

```bash
yarn build
```

Upload the *contents* of `dist/` (not the folder itself, and including
`.htaccess`) with FileZilla or Cyberduck over FTPS into the site folder.
Open the site, send yourself a message through the form.

### Test the form handler from the terminal

```bash
curl -i -X POST https://www.denisonsilva.com/api/contact.php \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://www.denisonsilva.com' \
  -d '{"name":"Test","email":"you@example.com","subject":"Test","message":"Hello"}'
```

`200` means the server accepted the mail. The other answers tell you what
failed: `403` wrong or missing Origin, `422` a field is missing or the
email is invalid, `500` PHP could not hand the mail to the server.

A `200` with no mail arriving almost always means the mailbox
`contact@denisonsilva.com` does not exist yet, or the message is in spam.

### After that: automatic

`.github/workflows/deploy.yml` builds and syncs `dist/` over rsync via SSH
on every push to `main` — the same route danielvonboros.com already uses,
so the key is already active on this all-inkl contract and only the five
repository secrets have to be added again (Settings → Secrets and
variables → Actions):

| Secret            | Value                                                 |
| ----------------- | ----------------------------------------------------- |
| `SSH_HOST`        | `wXXXXXX.kasserver.com`                               |
| `SSH_USER`        | `ssh-wXXXXXX`                                         |
| `SSH_PRIVATE_KEY` | the same deploy key, full PEM incl. header and footer |
| `SSH_KNOWN_HOSTS` | output of `ssh-keyscan wXXXXXX.kasserver.com`         |
| `SSH_TARGET`      | **this site's** document root, from KAS               |

`SSH_TARGET` is the only value that differs from the other site — and the
only one that can do damage. `rsync --delete` removes everything at the
target that is not in `dist/`, so a document root copied from the wrong
site would wipe that site. **Run the workflow once from the Actions tab
with the dry-run box ticked** and read what it would delete before the
first real push. `.well-known` is excluded so Let's Encrypt is untouched.

Test through the transition domain before DNS matters:
`denisonsilva.com.wXXXXXX.kasserver.com`.

### Last: HTTPS

The redirect block in `public/.htaccess` ships commented out. Activate the
free Let's Encrypt certificate for the domain in KAS first, then uncomment
the four lines, commit and push. The other way round the server redirects
to a certificate that does not exist yet and the site is unreachable.

Once the redirect works, change `R=302` to `R=301`. It is 302 while you
test because browsers cache a 301 so hard that a wrong rule keeps
redirecting even after you fix it.
