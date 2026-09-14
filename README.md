# denisonsilva.com

Single-page site for Denison Silva — dancer, choreographer and dance
educator. React 19 + TypeScript on Vite, Tailwind v4, react-i18next.
English is the source language; German and Portuguese are translations.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check, then bundle to dist/
npm run preview  # serve the built bundle
```

---

## Why Vite and not Next.js

Vite and Next.js are alternative build systems, so the brief's "Vite,
Next.js" had to resolve to one. For a single page with no server data
and no dynamic routes, Next adds a framework without adding anything the
site uses. If search visibility for the Impressum and privacy pages
later matters, moving to `next export` touches two files: `App.tsx` and
the hash routing in it. Every component below stays as it is.

---

## Where things live

```
src/
  data/cv.ts        engagements, training, repertoire, contact details
  data/media.ts     video ids, testimonials
  data/legal.ts     everything the Impressum and privacy page print
  i18n/en|de|pt     all copy; en.json is the source of truth
  components/
    Stencil.tsx     the wordmark cut out of a plate (see below)
    Hero.tsx        video + stencil + role line
    Section.tsx     the left-rail / content split every section uses
    Resume.tsx      the timeline, with the role filter
    Productions.tsx the three role summaries
    Videos.tsx      click-to-load embeds
    References.tsx  directors, or testimonials once you have them
    Contact.tsx     form with honeypot and mailto fallback
    Legal.tsx       Impressum and privacy
```

Content is data, not markup. To add an engagement, add an entry to
`ENGAGEMENTS` in `src/data/cv.ts` and one line under `cv.items.<id>` in
each of the three locale files. Nothing else changes: the timeline, the
role filter and the references list all read from the same array.

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

- **`src/data/legal.ts`** has three TODOs: street and house number, the
  photographer's credit, and the hosting company. A German Impressum
  without a deliverable postal address is the most common reason a
  freelance site gets an Abmahnung. A c/o address is fine; a PO box is not.
- **VAT line.** `vat` is `undefined`, which hides the section — correct if
  you invoice as a Kleinunternehmer under § 19 UStG. Fill it in otherwise.
- **Videos.** Replace the three `REPLACE_ME` ids in `src/data/media.ts`
  and the placeholder stills in `public/media/`.
- **Photo credit.** `public/media/portrait.jpg` came out of your CV PDF.
  Check you have the right to publish it on the web, not just in a PDF.
- **Contact form.** Set `VITE_CONTACT_ENDPOINT` to a Formspree, Basin or
  own handler URL. With it unset the form opens the visitor's mail client,
  which works but loses people who use webmail.
- **Testimonials.** `TESTIMONIALS` in `src/data/media.ts` is empty on
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

## Deploying

`npm run build` produces a fully static `dist/`. Netlify, Vercel, Cloudflare
Pages or plain nginx all work with no configuration — the legal pages sit
behind `#legal/imprint` and `#legal/privacy` precisely so that no rewrite
rules are needed.

Two things worth adding at the host: a redirect from `denisonsilva.com`
to `www` (or the other way, pick one), and long cache headers on
`/assets/*`, which is content-hashed.
