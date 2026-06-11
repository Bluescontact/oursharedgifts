# VISUAL_SYSTEM — the visual layer of oursharedgifts.org
*2026-06-10 · direction demonstrated on /refusals.html, marked by Kevin, and rolled out site-wide the same day. One deviation from the storyboard below: The Model kept its inline bolds (extracting them into seed blocks would have restructured canon paragraphs) and got the weight pass only.*

## The principle

The writing already serves three readers at three depths on the same pages. The visual layer extends that vertically into **three reading speeds**:

- **The glance — 5 seconds.** A page should hand over its whole shape before a single paragraph is read: one diagram, or the page's existing structure (the three doors, the state rows) doing that job.
- **The skim — 2 minutes.** A reader scrolling on a phone should catch every load-bearing sentence without reading the prose around it.
- **The read.** The full column, unchanged — the writing is done and stays the boss; the visual layer serves it and never replaces it.

Same rule as the language: each speed is whole. The glance is not a teaser for the read.

## The five elements (all demonstrated on Refusals)

1. **The glance figure** (`.glance`) — one inline SVG that carries the page's shape in five seconds. Hand-editable text in the file, ~3 KB, no JS, loads with the page.
2. **The seed line** (`.seed`) — the one sentence a section stands on, set large with a hairline. **One per section at most**; a page of seed lines is a page of shouting.
3. **The depth zone** (`.depth-zone`) — below the descent device, the field itself shifts (soft tint, one firm rule). Depth is felt before it's read.
4. **The scale map** (`.scale-map`) — before a long structural list, a small-multiples row showing its architecture (the 37 refusals as 11+8+9+9), so the reader holds the shape before entering the detail. This is the digestibility move for dense deep layers.
5. **Weight and legibility as cognitive access** — the neighbor on farm Wi-Fi is a register of comprehension too. Heroes re-encode PNG→JPEG (Refusals: 1,161 KB → 108 KB, no visible loss); small-text gray darkened from #999 to #75716a (was failing 4.5:1 contrast).

## Rules for any graphic on this site

- **Paper register.** Site palette (the four vertex colors + ink/muted on the paper field), system fonts, inline SVG. The dark-field/gold register belongs to the transmissions and Substack — daylight here, candlelight there; same geometry.
- One recognition per graphic. If it needs a legend, it's two graphics.
- Five-second test before it ships.
- Honest `aria-label` carrying the same recognition in words.
- No JS, no animation, no external loads. A graphic is a sentence, not an app.

## The storyboard — what each page gets, and what it deliberately doesn't

| Page | Glance | Seed lines | Depth zone | Notes |
|---|---|---|---|---|
| Home | **None** — the three doors *are* the glance | none | — | Weight pass only. Restraint is the design. |
| What I Do | "How asking works" strip: you ask → we talk plain → I show up → gift, no debt | 1 ("no price list…") | — | The work cards already skim well. |
| The Work | **None** — the photos are the glance | 1 ("built once, keeps serving") | — | Weight pass matters most here (photo-heavy). |
| The Model | Has its glance (the seven cards). Existing bold principles get `.seed` treatment — they're already written | several, already written | gate exists (pointer) | Canon page: typographic promotion only, no new content. |
| Refusals | Four-shadows diagram (in depth) | 1 on surface | yes + scale map | **The demo. Done.** |
| Gift Circle | "How a pin works" strip: zip-center pin → ask+offer together → mediated → drops off when met | — | — | Don't touch protocol mechanics. |
| Library | Shelf map: three doors by time-cost (5 seconds / a sitting / days) | — | — | The index text already routes; glance optional, low priority. |
| Toolkits | **None** — the does/needs/takes spec lines are the glance | — | — | Done in the unified build. |
| Current | **None** — the state rows are the glance | — | — | Keep cheap to hand-edit; nothing added. |
| Ask | **None** — three path cards are the glance | — | — | Nothing. |

Site-wide passes that ride along: re-encode all `.dev.png` heroes to JPEG (~85–90% lighter each; originals stay in the repo until you say otherwise), `loading="lazy"` on below-the-fold images, contrast fix (already in core.css).

## What this layer refuses

No stock iconography, no decorative illustration, no gradients-as-mood, no animation, no charts that dramatize (a count is a count). Every graphic must be something a reader *uses* to hold the page, or it doesn't go in. The infographic is a load-bearing wall, not wallpaper.
