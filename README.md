# Portfolio

Developer portfolio with a geometric, "clay"-palette design. Vite + React +
TypeScript + Framer Motion. Implements the `Portfolio Workshop` design canvas as
a production static site (the `.dc.html` / `support.js` dc-runtime shim was a
preview harness and is not used here).

## Run

```bash
npm install
npm run dev       # local dev at http://localhost:5173
npm run build     # type-check + production build -> dist/
npm run preview   # serve the built dist/
```

## Editing content

All copy - projects, experience timeline, posts, socials, résumé URL, identity -
lives in **`public/content.json`**. The site fetches it at runtime and falls
back to the bundled defaults in `src/lib/content.ts` if the fetch fails, so the
page never breaks.

### Phase 1 (now) - in-house data

Edit `public/content.json`, then redeploy (rebuild). Fields:

- `identity` - name, initials, role, location, email, **resumeUrl**, footer, year
- `hero` - eyebrow, three headline lines, badge, blurb
- `about`, `contact` - section copy (accent = the coloured word)
- `tags` - hero chips
- `projects[]` - id, name, kind, year, blurb, snippet, hard, stats[{v,k}]
  (each project becomes a coin in the physics tray + a slide-in sheet)
- `notes[]` - sticky notes ({rot, tag, body})
- `stops[]` - experience timeline ({when, role, company, detail})
- `posts[]` - writing cards ({rot, date, title, dek})
- `stack[]` - the **kit** / tech-stack section: groups of
  {group, note, items:[{n, y}]} (n = tool, y = years)
- `socials[]` - {label, handle, href, icon, nav}. `icon` ∈ github|linkedin|bluesky|email.
  `nav: true` also shows it in the header.

> **Note:** `public/content.json` **overrides** the `src/lib/content.ts`
> defaults at runtime. Edit `content.json` for real content; the defaults are
> only the offline fallback. Keep both in sync (or delete `content.json` and
> edit only the defaults) to avoid surprises.

### Phase 2 (no-redeploy edits) - external JSON

Move `content.json` to an [npoint.io](https://www.npoint.io) / jsonbin bin
(they give you a web edit UI + a raw URL), then point the site at it via an env
var - no code change:

```bash
# .env
VITE_CONTENT_URL=https://api.npoint.io/<your-bin-id>
```

Rebuild once. After that, edit the JSON in the bin's UI and the **live site
picks it up on next load - no rebuild, no redeploy**. See `src/lib/content.ts`.

## Deploy

`npm run build` emits a static `dist/`. Drop it on any static host (Cloudflare
Pages, Netlify, Vercel, GitHub Pages) and point your domain at it. If deploying
under a sub-path rather than a domain root, set Vite's `base` in
`vite.config.ts`.

## Structure

```
src/
  App.tsx                 # composition + project-sheet state
  lib/
    types.ts              # Content model
    content.ts            # defaults + runtime loader + CONTENT_URL
    theme.ts              # clay palette (also used by canvas/cursor)
  hooks/
    useContent.ts         # fetch + fallback
    useMagnet.ts          # pointer-follow buttons
  components/
    Cursor.tsx            # springy label cursor (vanilla RAF)
    Nav.tsx  Hero.tsx  Tray.tsx (canvas physics)  ProjectSheets.tsx
    About.tsx  RouteTimeline.tsx  Desk.tsx  Contact.tsx
    Reveal.tsx            # framer-motion scroll reveal
    icons.tsx
```

## Themes

Six palettes - clay (default), ferrous, oxblood, brine, plaster, inkwell -
switchable live from the footer swatches; choice persists in `localStorage`.
Defined in `src/lib/theme.ts`; the switch drives CSS variables, the canvas tray,
and the cursor together. Respects `prefers-reduced-motion` throughout.
