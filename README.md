# denisonsilva.com

Single-page site for Denison Silva — dancer, choreographer and dance
educator. React 19 + TypeScript on Vite, Tailwind v4, react-i18next.
English is the source language; German and Portuguese are translations.

```bash
yarn install
yarn dev       # http://localhost:5173
yarn build     # type-check, then bundle to dist/
yarn preview   # serve the built bundle
```

Run `yarn install` once and commit the `yarn.lock` it creates — the deploy
workflow installs with `--frozen-lockfile` and fails without it.

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
public/
  api/contact.php   the contact form's backend (see below)
  .htaccess         HTTPS, caching and headers for Apache
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
letterforms punching holes in it. The black plate is painted _through_
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

| file              | what it is                                   |
| ----------------- | -------------------------------------------- |
| `hero.webm`       | VP9 or AV1, the file most browsers will use  |
| `hero.mp4`        | H.264 fallback for Safari                    |
| `hero-poster.jpg` | first frame — shows before the video decodes |

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
  photographer's credit, and the log retention period. A German Impressum
  without a deliverable postal address is the most common reason a
  freelance site gets an Abmahnung. A c/o address is fine; a PO box is not.
- **VAT line.** `vat` is `undefined`, which hides the section — correct if
  you invoice as a Kleinunternehmer under § 19 UStG. Fill it in otherwise.
- **Videos.** Replace the three `REPLACE_ME` ids in `src/data/media.ts`
  and the placeholder stills in `public/media/`.
- **Photo credit.** `public/media/portrait.jpg` came out of your CV PDF.
  Check you have the right to publish it on the web, not just in a PDF.
- **Contact form.** Create the mailbox `contact@denisonsilva.com` in KAS
  before the first real test — `contact.php` sends from and to it.
- **Privacy page.** Conclude the AV-Vertrag in the all-inkl Members area,
  copy the exact company name into `host` in `src/data/legal.ts`, and set
  `logDays` to what KAS says about log retention.
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

Upload the _contents_ of `dist/` (not the folder itself, and including
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
