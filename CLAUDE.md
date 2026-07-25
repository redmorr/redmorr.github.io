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
- `gallery` + `storeEmbed` → for projects with no playable build; see
  [Store embeds](#store-embeds).

## Embeds

Three sizing modes, in `src/pages/projects/[slug].astro`. Pick by asking what the
embedded page *is*, not what engine made it:

| the page… | field | what happens |
|---|---|---|
| reflows to its container (HTML apps) | none; `type` `aws`/`web` | JS grows the iframe to `scrollHeight`, re-fit by `ResizeObserver` |
| has a hardcoded pixel size (Unity) | `embedSize: { w, h }` | iframe gets exactly that box; column widens to `w + 2` |
| has a fixed *ratio* | `embedAspect: '960 / 856'` | plain aspect-ratio box |

### Never scale an embed with a CSS transform

This is the trap. Squeezing a fixed-size page into a narrower column with
`transform: scale()` looks right and silently breaks mouse input: Unity maps
cursor position into canvas space by comparing `getBoundingClientRect()` against
the canvas buffer size, and a transform makes the rect report the *painted* size
while the buffer stays 960. At `scale(0.935)` every coordinate is multiplied by
1.069 in both axes, so a first-person camera drifts steadily right and down.
Check for a regression with:

```js
canvas.width / canvas.getBoundingClientRect().width  // must be exactly 1
```

Accept a narrower column instead. Below ~1024px the fixed page scrolls
horizontally inside the iframe — a known ceiling, not a bug to "fix" with a
transform. The real fix is making the build responsive (below).

### Measuring `embedSize`

Do not guess it, and do not measure at a viewport smaller than the content:
`#unity-container` is absolutely centered, so anything too small reports a
*truncated* scroll size. Load the build at a large viewport and read the
container's border box:

```js
document.getElementById('unity-container').getBoundingClientRect()  // → 960 x 642
```

For templates without that container, size the viewport to the candidate and
confirm `scrollWidth/Height === clientWidth/Height`.

Values seen so far — the two stock template variants differ, so check per build:

| build | size | why |
|---|---|---|
| spring-sway, pickup-physics, navmesh | 960×**642** | 600 canvas + 4 + 38px footer |
| missile-command, minijam-119 | 960×**604** | 600 canvas + 4, no footer |

The stray **+4px is real**: the canvas is an inline element, so its line box adds
a baseline descender underneath. Miss it and you get a 4px overflow → vertical
scrollbar → which steals width → horizontal scrollbar too.

The wrapper is `box-sizing: content-box` so its 1px border sits *outside* the box
the page needs. Under the global `border-box` reset the border eats 2px and the
scrollbars come straight back.

### Making a build responsive

The permanent fix for narrow screens, done in the game repo rather than here.
Unity's stock template already ships it, gated behind a user-agent check for
phones: drop the `else` branch that sets `canvas.style.width = "960px"` and use
the `.unity-mobile` rules (`width/height: 100%`). `matchWebGLToCanvasSize` then
keeps the render target matched to the canvas.

Costs, per game: the aspect ratio stops being fixed (Unity holds *vertical* FOV,
so a wider box reveals more to the sides — fine for FPS, risky for a fixed
playfield like Missile Command), CanvasScaler settings decide whether the HUD
adapts, and the stock footer's fullscreen button is hidden in that mode.

### Store embeds

For projects with no playable build. Both widgets are iframe-able — verified
neither sends `X-Frame-Options`:

- **Steam** — `https://store.steampowered.com/widget/<appid>/`, 646×190.
  Screenshots come from `https://store.steampowered.com/api/appdetails?appids=<appid>`
  (`screenshots[].path_thumbnail` is the 600×338 variant, ~66 KB).
- **itch.io** — `https://itch.io/embed/<game_id>`, 552×167, and it takes
  `bg_color`/`fg_color`/`link_color`/`border_color` params to match the palette.
  The game id is in the page source as `"id":<n>`. Take screenshot URLs from the
  page's `screenshot_list` `<img src>` — itch signs each size variant separately,
  so a smaller one **cannot** be constructed by editing the URL.

Images are hotlinked from the stores' CDNs, not vendored.

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
- **A hidden browser pane doesn't run `requestAnimationFrame` or
  `ResizeObserver`.** `document.hidden === true` means callback-driven layout
  never fires and `clientWidth` can read 0, so verify sizing by reading computed
  geometry directly rather than trusting an observer to have run.
