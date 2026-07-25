# redmorr.github.io

Astro static site, zero deps beyond `astro`. `npm run build` → `dist/`, `npm run preview` → :4321.
Push to `main` deploys via Actions; never build or commit `dist/`.

## Adding / changing a project

`src/data/projects.ts` is the single source of truth — the card grid, the detail
page, and `getStaticPaths` all derive from it. Nothing else needs editing except:

- **Home-page section** — `src/pages/index.astro` has hardcoded slug lists per
  section. A project missing from both falls into an auto-generated "More"
  section, which is the signal you forgot it.
- **Thumbnail** — a 16:9 image in `public/`, referenced as `/<slug>-thumb.png`.

Field semantics that aren't obvious from the type:

- `game: true` → the embed is gated behind a ▶ Play button (only for heavy
  WebGL builds). Everything else loads immediately.
- `tags` → `[tech, domain/genre, platform/distribution]`; the first pill gets
  the accent color. Falls back to `tagLabel[type]` if absent.
- `type` `aws`/`web` → the iframe auto-grows to its content height so nothing
  scrolls inside it. `unity`/`python` keep a fixed aspect box (`embedAspect`).

## Gotchas

- **CRLF line endings.** Regex-based scripted edits must match `\r?\n` and
  re-emit the captured newline, or they'll silently no-op.
- **Auto-height is same-origin only.** An embed pointing at an absolute
  `https://redmorr.github.io/...` URL can't be measured from `localhost` and
  falls back to `85vh` in local preview. It's correct once deployed. Prefer a
  relative URL when the app is served from this repo's `public/`.
- **Embedded projects are separate repos**, each with its own Pages deploy.
  GitHub Pages on the free plan requires them to be **public** — a private repo
  returns 422 "plan does not support GitHub Pages", which looks like a config
  error but isn't.
