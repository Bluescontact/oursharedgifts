# AUDIT — oursharedgifts.org unified build
*2026-06-10 · staged in the deploy clone · nothing pushed*

## What the crawl found

67 HTML pages. **The nav seam the directive describes is already sewn** — the v5 inside-out rebuild (commits `851aef8` → `2920ed0`, June 7–9) put one identical 7-link header and one identical 10-link footer on every page, and rewrote Home, What I Do, The Work, The Model, Refusals, Current, Ask, and Gift Circle in the vernacular register. There is no page left carrying the old framework-OS nav.

What remains, and what this build does:

| Seam | State found | Action staged |
|---|---|---|
| Header nav missing Gift Circle / Library / Toolkits; footer carries Archive | Real gap vs the directive's one-map | One 10-item nav, header and footer, all 67 pages |
| Refusals: vernacular surface only, no depth layer | Surface already sewn; the four shadow axes / 37 refusals were cut in v5 (recoverable at `git show 851aef8~1:refusals.html`) | Depth layer re-seated below the site-wide descent device |
| Toolkits index in old register ("Architecture vertex", "substrate") | Worst remaining register break | Rewritten as a parts list; GOVERNANCE.md added |
| Library index opens in framework register | Documents are fine (deep register is at home there); the index isn't | Surface-voice index pass |
| Leaflet loaded from unpkg CDN on Gift Circle | **Hard-constraint violation** (§5: no third-party scripts) | Self-hosted at `/assets/vendor/leaflet/` |
| Home has no quiet door to the Library | — | One line at the bottom |
| The Model has no depth pointer | — | One-line depth footer to the Library (only edit) |

## The unified nav (all pages)

Home · What I Do · The Work · The Model · Refusals · Gift Circle · Library · Toolkits · Current · Ask

Retired from nav, still standing at their old URLs (nothing 404s, no redirects needed because nothing moved):
- `/archive/` — linked from the Library index ("the older shape of this site")
- `/automation/` — linked from the Library index; `/automation/consult.html` still referenced by the Fit Filter
- `/framework.html` — linked from Library and Archive (the walkable geometry)
- `/host-the-bus.html` — linked from Gift Circle and Current
- `/back/` — back office, noindex+nofollow, deliberately unlinked

`netlify.toml` keeps its one redirect (`/village-market-protocol` → `.html`). No URL moved in this build, so the redirect map is: **empty by construction.**

## Hard-constraint scan (§5 of the directive)

- **Fixed here:** Leaflet 1.9.4 css/js were the only third-party loads on the site. Now self-hosted.
- **Flagged, not changed — Kevin's call:**
  - The Gift Circle map fetches **tiles from openstreetmap.org** at view time. That's a functional dependency (a map needs tiles), not a tracker, but it is a third-party request the visitor's browser makes. Alternatives: keep it (honest, standard, OSM is a commons), or drop the map to the records-list only. Kept as-is.
  - **Hero images are ~0.8–1.7 MB dev PNGs** (`assets/img/*.dev.png`). Pages carrying them blow the ~500 KB-per-page target on farm Wi-Fi. They're photographic content in a lossless format; re-encoding to JPEG ~quality 80 would cut them ~80–90% with no visible loss. Not done here because they're Kevin's generated assets named `.dev` — flagging instead of silently re-encoding.
  - **noindex** sits on all of `/library/`, `/framework*`, `/archive/` (33 pages). It reads as a deliberate public-face/substrate split, and this build now puts Library in the nav while it stays noindexed — humans reach it, search engines don't index it. Coherent, but worth a deliberate mark: if the Library is meant to be findable, the noindex should come off. Left in place.
  - Everything else clean: no analytics, no fonts loaded from anywhere, system font stack, vanilla JS only where a tool needs it (10 of 67 pages), money moves off-platform (Venmo link is a plain link out).

## Page disposition (directive map → reality)

| Nav label | File | State | This build |
|---|---|---|---|
| Home | `index.html` | Sewn (v5) | Nav + one quiet Library line |
| What I Do | `offerings.html` | Sewn; already merged (one page, one name) | Nav only |
| The Work | `about.html` | Sewn; stories not credentials. Whistleblower arc **not told** — his call, ask before adding | Nav only |
| The Model | `the-model.html` | Canon | Nav + one-line depth footer |
| Refusals | `refusals.html` | Surface sewn, depth missing | Depth layer below descent device |
| Gift Circle | `village-market.html` | Sewn; protocol intact | Nav + Leaflet self-host |
| Library | `library/index.html` | Index in deep register | Surface-voice index; archive/automation/framework links absorbed |
| Toolkits | `toolkits/index.html` | Old register | Full rewrite + GOVERNANCE.md + report-back line |
| Current | `current.html` | Sewn; hand-editable | Nav only |
| Ask | `request.html` | Sewn; mailto, no forms | Nav only |

Inner pages (framework edges/faces, library texts, canonical syntheses, transmissions, toolkit tools, village-market sub-pages): nav block replaced, content untouched.

## Broken links

One: `/toolkits/capacity_lens.html` is referenced in `substrate/consultations.md` (a back-office .md, not a rendered page). Left alone — not a live link on any page.

## Preservation

Pre-transform copies of every modified file: `_source/` (gitignored — never deploys; git history is the deep archive). New writing is flagged in `NEW_PROSE.md`. How to edit any page with a text editor: `MAINTENANCE.md`.
