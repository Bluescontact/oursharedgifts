# MAINTENANCE — how to edit this site with nothing but a text editor
*One page. No toolchain. Every file is what it looks like.*

## To change a sentence

Open the `.html` file in any text editor, find the sentence, change it, save. That's the whole procedure. The pages are plain HTML — what you see in the file is what ships. Push when you're ready (`git add -A && git commit -m "what changed" && git push`), and Netlify publishes it in about a minute.

## Which file is which page

| Page | File |
|---|---|
| Home | `index.html` |
| What I Do | `offerings.html` |
| The Work | `about.html` |
| The Model | `the-model.html` |
| Refusals | `refusals.html` |
| Gift Circle | `village-market.html` |
| Library | `library/index.html` |
| Toolkits | `toolkits/index.html` |
| Current | `current.html` |
| Ask | `request.html` |

## The page you'll edit most: Current

Open `current.html`. Change the date in the line `<p class="updated">Last updated · …</p>`, then edit the text inside the `<dd>…</dd>` blocks. Each "state chip" is `<span class="state open">…</span>` — swap the class word `open` / `partial` / `closed` to change its color.

## The nav (if you ever add a page)

Every page carries the same two nav blocks — `<header class="nav">` at the top and the `<nav>` inside `<footer class="site">` at the bottom. They're identical on every page on purpose. If you add a link, add it to both blocks **in every html file** (a find-and-replace across files on the old block does it in one move).

## The one style file

All shared styling lives in `assets/css/core.css`. Page-specific styling sits in a `<style>` block at the top of each page. Colors and fonts are the variables at the top of `core.css` — change `--bg` or `--ink` there and the whole site follows.

## The descent device

Where a page drops from plain terms into structural language, it uses one device — a `<div class="depth-gate">` holding one italic line. If you add a depth layer to another page, copy that div exactly from `refusals.html` so the descent reads the same everywhere.

## Rules the files keep for you (don't break them by accident)

- **No third-party anything.** No analytics, no CDN fonts, no external scripts. The map library is self-hosted at `assets/vendor/leaflet/`. If you ever paste in an embed snippet, that's the line you'd be crossing.
- **No build step.** Don't introduce anything that needs compiling. If a tool generates a page, commit the generated plain HTML.
- **Plain files, open formats.** Documents go in as `.md`, `.pdf`, or `.html`, ungated.
- **`_source/` is local-only** (gitignored) — pre-rebuild copies of every page, June 2026. Git history is the deeper archive.

## If something looks broken

Every page must work with JavaScript off — if it doesn't, the page is wrong, not the visitor. And check links the cheap way: open the page in a browser straight off the disk (double-click the file) and click around.
