# OSG v4 — Spine

**Status:** substrate doc, v0.1, 2026-05-25. Frame and scope of each vertex and edge. Page-level work is downstream of this doc being sound.

---

## What OSG v4 is

**OSG is the personal practice made legible.** The library, the toolkits, the public face, and the automation behind it — one site, one domain (oursharedgifts.org), holding the geometry of the practice for Kevin personally.

Two surfaces, one architecture:
- **Front end** — designed for functionality and use by receivers, practitioners, and anyone the substrate reaches.
- **Back end** — Kevin's workshop and dashboard. Where the practice is operated, the substrate is composed, the rails are maintained, capacity is held.

The two surfaces share one geometry. The same four vertices hold both. The split is functional, not structural — every vertex has a front-end face (what a receiver sees and uses) and a back-end face (what Kevin sees and operates).

## The 4·6·4·1 form

```
                         LIBRARY
                      (Differentiation)
                              │
       ┌──────────────────────┼──────────────────────┐
       │                      │                      │
   TOOLKITS              PUBLIC FACE            AUTOMATION
   (Architecture)        (Connection)           (Boundaries)
       │                      │                      │
       └──────────────────────┼──────────────────────┘
                              │
                       SOMATIC GROUND
                            (Center)
```

Four vertices · six edges · four failure modes (one per dropped vertex) · one center (somatic ground / felt safety).

---

## Vertex 1 — LIBRARY (Differentiation)

**Capacity:** What things are. Named substrate. Position that holds.

**What lives here:**
- The Architecture of Coherence manuscript
- The Meta-Tetrahedron paper (rendered)
- Recognition Infrastructure framework texts
- Essays, primers, the recognition-threshold piece, Theory of Gift, Refusal As A Generative Act, etc.
- Frameworks: register audit, naming bridge, threshold mechanism, succession stages
- Case studies / case portraits (the seven from Lettherobotsbuild's `examples.html`)
- Twelve failure-mode case patterns
- Lineage and attribution
- The Forgotten Ground (presencing as peer-system)

**Front-end scope (functionality and use):**
- Receiver can read the manuscript and the Meta-Tetrahedron in full
- Receiver can enter any text directly (no gate, no signup)
- Receiver can follow lateral links from a case study into the framework, from the framework into a tool, from a tool back to the substrate that grounds it
- Every text is downloadable as PDF or markdown
- Lineage and license visible on every text (self-licensed: use freely, adapt as needed)
- Search across the library

**Back-end scope (workshop and dashboard):**
- Where Kevin drafts new substrate (Genesis Seed feeds here)
- Version control for canonical texts (manuscript versions, framework revisions)
- Staging: what's mid-form, what's ready, what's been released
- Edit interface for live texts (or local-edit + git deploy, depending on stack choice)
- Composting layer: incoming raw material → composted → staged → released
- Dashboard view: what's been touched recently, what's been read most, what hasn't moved in a long time

**Composts in:**
- Meta-Tetrahedron content (from `meta_tetrahedron/`)
- Manuscript (from DSS root)
- Case portraits (from Lettherobotsbuild `examples.html`)
- Failure patterns (from Lettherobotsbuild `artifacts/failure-patterns.html`)
- Recognition Infrastructure synthesis diagram (from Lettherobotsbuild)
- Forgotten Ground (from Lettherobotsbuild `artifacts/the-forgotten-ground.html`)
- Open Village engine + synthesis (from Lettherobotsbuild)
- Lineage (from Lettherobotsbuild `lineage.html`)
- Frameworks directory content (from DSS root `frameworks/`)

**Failure mode when this vertex drops:** Dissolved. Receivers can't tell what the practice is or isn't. Texts blur into each other; no position holds; receivers leave without naming what they encountered.

---

## Vertex 2 — TOOLKITS (Architecture)

**Capacity:** What persists without Kevin. Things others can use. The framework operating in the receiver's hands.

**What lives here:**
- RI Kit (the 12-question audit + diagnosis + substrate selection + prescription flow)
- Quick Diagnostic (the prototype 4-question tool)
- 48 Recognition Cards (with breath-gate UX)
- Entry-sequence (four diagnostic questions)
- Stage-locator (interactive succession self-diagnostic)
- Fit-filter tool (consultation intake)
- Transmission Engine (Kevin-side; produces sideways assets from articles)
- Future tools: Consent Check (Wheel of Consent), Failure Mode Identifier, Verification Questions, Translation Protocol guide
- Downloadable artifacts: PDF versions of kit, share-cards from transmissions

**Front-end scope (functionality and use):**
- Every tool is standalone HTML, no external dependencies, runs in the browser
- No login, no account, no data captured
- Tools read user answers back through the framework (not AI grading — structural reading)
- Each tool ends with: what the receiver did, what their answers mean structurally, where to read more in the Library, what to do next (often: nothing — sit with it)
- Lineage + gift-form license at every tool's close
- Tools downloadable / runnable offline

**Back-end scope (workshop and dashboard):**
- Where Kevin builds new tools (or where the Transmission Engine writes outputs that become tools)
- Tool staging: prototype → tested → published
- Publication ledger: which tools are live, when last revised, what they depend on
- Transmission Engine operates here — Kevin runs a finished article through the engine, the engine produces SVG + header prompt + pull-quotes, Kevin reviews, releases to the Library or publishes externally
- Aggregate usage signal only if it can be captured without tracking individuals (e.g., download counts, no per-user analytics)
- Dashboard view: which tools have been touched recently, which need maintenance

**Composts in:**
- The kit's editorial content (from `kit/`)
- 48 Recognition Cards (from Lettherobotsbuild `artifacts/practice.html`)
- Entry-sequence (from Lettherobotsbuild `artifacts/entry-sequence.html`)
- Stage-locator (from Lettherobotsbuild `stage-locator.html`)
- Quick Diagnostic (from `tools/quick_diagnostic.html`)
- Transmission Engine (from `~/.claude/skills/transmission-engine/`)
- Breath-gate UX pattern (from Lettherobotsbuild) — design substrate, not a tool itself

**Net-new to build:**
- Kit HTML front-end (12-question audit → diagnosis → substrate → prescription flow)
- Fit-filter tool (intake for consultations)

**Failure mode when this vertex drops:** Ephemeral. Whatever Kevin does dies with his attention. Receivers can read about the practice but can't carry anything home that operates without him.

---

## Vertex 3 — PUBLIC FACE (Connection)

**Capacity:** Where the practice meets the receiver. The point of contact.

**What lives here:**
- Index (orientation; what this is)
- Offerings (gift menu — what Kevin gives freely)
- Current State (what's true now; what's being asked; what's being received in aggregate)
- Refusals (what Kevin does not do; the extraction-pattern table made visible)
- Request (the asking flow for gift offerings)
- Recognition (how to credit work that uses this substrate)
- How (operating notes for receivers — how to read the site, what to expect)
- About (third-person framing of Kevin and the practice)

**Front-end scope (functionality and use):**
- Index orients in under 30 seconds: what this is, what's available, where to go
- Offerings page: gift cards (what is / what is NOT / quadrant) with no prices, no scarcity, no upsells. "Ask about this," not "Book now."
- Current State: aggregate-level only (what asks are open, what capacity is open, what was received last month) — no per-receiver names
- Refusals: visible, equal-weight to Offerings, not buried
- Request flow: form OR mailto, receiver-shaped (not Kevin-shaped)
- Lineage + license footer on every page
- Mobile-first design — Public Face is where receivers arrive, often on phones
- Voice register: third-person about Kevin, geometric, direct, no padding

**Back-end scope (workshop and dashboard):**
- Where Kevin sees incoming asks (aggregated — counts, categories — not per-message dashboards; specific messages still go to email/inbox)
- Where Kevin edits the Current State page (this is the page that updates most frequently)
- Where Kevin composes responses to gift requests (NOT inside the site itself — happens in email/messaging; the site just receives the ask)
- Edit interface for Offerings, Refusals, About
- Voice register check: does what's on the page match the patterns library? Periodic audit.

**Composts in:**
- Voice register and page shapes from OSG v2
- `knowledge/02_offerings.md` substrate from OSG v3
- Refusals page concept from OSG v2
- Refusal table format from OSG v3
- Somatic-invitation pattern (one body-directed question per major page) from Lettherobotsbuild

**Failure mode when this vertex drops:** Isolated. The substrate is rich, the toolkits are powerful, the automation runs — but no receiver ever encounters any of it because there's no surface where the practice meets the world.

---

## Vertex 4 — AUTOMATION (Boundaries)

**Capacity:** Limits made operational. The structural rules that hold without requiring Kevin's continuous attention.

**What lives here:**
- Consultation booking (Cal.com, free booking — Wed/Thu only, two event types: 30-min initial + 1-hour follow-up, 2-hour calendar blocks per engagement)
- Donation rail (Venmo at @Kevin-Mears-11, donor-controlled sliding scale, separate from any engagement)
- Fit-filter (recommended pre-booking; routes between fit / substrate-first / outside-the-tier)
- Consent defaults (the commons-work phrasing baked into intake)
- Capacity (body-discriminated above Cal.com per-week frequency limits)
- Cancellation policy (named, no-friction; no money changes hands so no refund logic)
- Refusal automations (the fit-filter routes "not a fit" responses to specific Library texts)

**Front-end scope (functionality and use):**
- Fit-filter tool sits between Public Face and the calendar — receiver walks 5 questions, gets one of: "fit, here's the consultation page," "not the consultation tier — try [the kit / a specific essay / the gift menu]," "this is something Kevin doesn't offer"
- Cal.com booking surface: receiver sees Wed/Thu availability for the initial 30-min consultation; follow-ups scheduled emergently
- Venmo handle visible on the donation surface (separate page from consultations)
- All material support runs on Venmo; engagement and exchange channels structurally separate
- Commons-work consent default shown on consult page (the phrasing from `consultations.md`)
- Cancellation policy visible at consult page

**Back-end scope (workshop and dashboard):**
- Cal.com admin: event-type config, Wed/Thu availability, per-week frequency limits, pause/unpause
- Booking queue: who's booked, when, what event type (Kevin necessarily sees this; the commons-work consent makes the boundary explicit)
- Venmo donations: Kevin sees these (structural weakness vs. an aggregate-only rail — accepted for now with explicit discipline)
- Fit-filter: standalone client-side; no analytics captured (the routing logic itself is the diagnostic; pattern observed across engagements, not metricized)
- Tunable parameters: cancellation policy, event-type settings, commons-work phrasing
- Discipline reminder surface: when Kevin opens the dashboard, the commitments to donors and receivers are visible at the top

**Composts in:**
- `OSG v3/knowledge/process_donation_rail.md` (archived as upgrade path for fiscal-sponsor rail)
- `OSG v3/consultations.md` (commons-work substrate, refusal table)
- The capacity caps + extraction-refusal table from `_PERSONAL_OS.md`

**Net-new built:**
- Fit-filter tool (the gating intake — sits in Toolkits but is wired into Automation) — done
- Cal.com setup (Kevin's back-end work)
- Venmo handle live on donate page — done
- Back-end dashboard at `/back/` — bookmarks to operational surfaces + discipline reminders — done

**Failure mode when this vertex drops:** Overflowing. The practice has no edges; gift offerings get treated as services; consultations creep into retainers; donations become tip-jar transactional; Kevin's capacity dissolves into whatever shows up. The whole architecture loses shape.

---

## The six edges

Each edge is an integration the surface must hold. Each has a front-end manifestation (what a receiver experiences) and a back-end manifestation (how Kevin operates it).

### Edge 1 — Gift (Library ↔ Toolkits)

**Integration:** Substrate deposited into things that persist without Kevin.

**Front-end:** Tools carry the framework embedded in them — running a tool teaches the framework by operating it. Every tool links to the Library texts that ground it. Every Library text that names a pattern links to the tool that exercises it.

**Back-end:** Kevin extracts patterns from engagements (consultations, lived practice) and folds them into new kit cells, new tools, manuscript revisions. The Transmission Engine is one such tool — it takes a Library text (article) and emits Toolkit assets (recognition pattern, header, pull-quotes) for circulation.

**Cross-link rule:** Every tool ends with a "this comes from" link to a Library text. Every Library text that names a tool links to it.

### Edge 2 — Relationship (Library ↔ Public Face)

**Integration:** How the substrate meets a specific receiver.

**Front-end:** The voice register that runs through every Public Face page is the same as the Library's. The receiver who arrives at Offerings or About and then opens the manuscript should feel one voice, not two. Public Face pages reference Library texts by name when the receiver needs more depth.

**Back-end:** Kevin uses Library content to compose responses to specific gift requests (in email/messaging, not on-site). The voice on the Public Face is curated from the Library; periodic register-audit (using `frameworks/register_audit.md`) confirms it hasn't drifted.

**Cross-link rule:** Public Face pages don't duplicate Library content; they reference it. "What we mean by Differentiation" is a link to a Library text, not a paragraph rewritten on the Offerings page.

### Edge 3 — Self-Knowledge (Library ↔ Automation)

**Integration:** What's known about the practice becomes how it operates.

**Front-end:** The refusal table on the Refusals page is structurally the same as the refusal logic in the fit-filter tool. The capacity ceiling stated on the Current State page is the same number the booking app enforces. The commons-work phrasing at consultation intake is the same as the phrasing in the Library's substrate doc.

**Back-end:** When Kevin updates an extraction pattern in `_PERSONAL_OS.md`, the change propagates to the fit-filter logic, to the Refusals page, and to the consent defaults. The Library is the source of truth; Automation reads from it.

**Cross-link rule:** Automation rules are versioned against Library substrate docs. Changing an Automation rule without updating its source doc (or vice versa) is a desync that breaks the integration.

### Edge 4 — Consent (Public Face ↔ Automation)

**Integration:** The visible interface and the structural limits that hold it.

**Front-end:** Between any Public Face surface and any Automation action (booking, payment, donation), there is a consent gate. For consultations: the fit-filter. For donations: the commons-work explanation and the discipline statement. For gift requests: the receiver-shaped form. The receiver knows what they are agreeing to before any automation runs.

**Back-end:** Consent defaults are versioned. Kevin can see when a default was last changed, why, and what receivers consented to under each version. The commons-work phrasing is the load-bearing example.

**Cross-link rule:** No Automation action fires without the receiver passing through a consent surface on the Public Face. No consent surface exists without a corresponding Automation action — empty consent gates are theater.

### Edge 5 — Circulation (Toolkits ↔ Public Face)

**Integration:** Tools moving through the face into the world.

**Front-end:** Tools are surfaced from the Public Face when relevant — the Offerings page that names "thinking partner" links to the kit's Differentiation cells; the Current State page that names "capacity is at half" links to the recognition cards practice for receivers who want to do their own work first. Sideways shareable assets (transmissions) appear on the Public Face's index / archive as the practice emits them.

**Back-end:** Kevin reviews staged transmissions, releases to the Public Face, sees aggregate signal (downloads, shares — never per-receiver) on what's circulating. The Transmission Engine's outputs land here.

**Cross-link rule:** Every published transmission has a Library source link and a Toolkit "do this yourself" link. Circulation that doesn't anchor back to substrate is just content.

### Edge 6 — Deployment (Toolkits ↔ Automation)

**Integration:** Tools made operational, with limits.

**Front-end:** The kit's HTML closes itself when a user's answers fall outside its scope (routes them to a different tool or Library text). The fit-filter is itself a tool that operates an Automation rule. The Transmission Engine requires Kevin's release — no auto-publication.

**Back-end:** Where new tools get wired into the practice's operational layer. When a new tool is built, this edge is where it gets its limits — what it returns to the receiver, what it routes them to next, what it does not do. Publication ledger lives here.

**Cross-link rule:** No tool ships without explicit limits named at its close. "What this tool is NOT" gets equal weight to "What this tool is."

---

## Center — Somatic Ground

**Capacity:** Felt recognition of safety. Kevin's body, capacity, pacing discipline.

This is not a vertex — it is the ground the four vertices rest on. Without it, the geometry is correct but inert; with it, the geometry activates.

**What lives here:**
- Kevin's capacity (real, finite, body-discriminated)
- Pacing discipline (no more than X active engagements, no faster than Y release cadence)
- The somatic-invitation pattern (one body-directed question on every major page — carried from Lettherobotsbuild)
- The check that runs through all four vertices: does engaging this surface increase the receiver's capacity to notice, or deplete it?

**Front-end manifestation:** The somatic invitations on each page. The pace of the site (loads fast, no animations that don't serve recognition, no popups, no scarcity, no urgency). The visual breath — whitespace, typography, the way each page lets the body settle before reading.

**Back-end manifestation:** Kevin's own check before opening the dashboard. The discipline that the financial layer is reviewed on a fixed cadence, not on demand. The body as the primary discriminator — if any back-end view starts producing the wrong nervous-system state in Kevin, the back-end is wrong-shaped and gets restructured.

**Failure mode when the center drops:** The site is structurally correct (all four vertices, all six edges) and somatically inert. Receivers can navigate it perfectly and feel nothing. Kevin can operate it and burn out. This is the failure mode most modern sites have: legible but lifeless.

---

## Stack notes (provisional)

- **Domain:** oursharedgifts.org (existing)
- **Hosting:** GitHub Pages (deployed from `Bluescontact/oursharedgifts` repo, CNAME points at oursharedgifts.org)
- **Site generator:** static, plain HTML + minimal CSS/JS. No build tools that introduce dependencies Kevin doesn't want to maintain. (Optional: a tiny static-site generator if it makes maintenance easier.)
- **Booking:** Cal.com hosted (open-source alignment with self-license discipline; escape hatch via self-hostable code)
- **Payment (consultations):** none — booking takes no money; engagement and exchange run on separate channels by design
- **Donations:** Venmo (sliding scale, public handle on dedicated donation page)
- **Back-end "dashboard":** static page at `/back/` linking to Cal.com admin, Venmo, GitHub repo, and email; plus the discipline reminders. Real dashboard only if/when needed.
- **Editing:** local markdown → commit → deploy (git-based workflow keeps Kevin's authoring substrate matching the Library's substrate)
- **Analytics:** none, or strictly aggregate (Plausible / GoatCounter if anything — never Google Analytics)
- **Search:** simple client-side search (Pagefind, Lunr) — no third-party indexing service

## Build sequence (smallest assembly that runs end-to-end)

1. **OSG4 directory scaffold** — create `OSG4/` substructure (`substrate/`, `library/`, `toolkits/`, `public_face/`, `automation/`, `assets/`) — empty but named.
2. **Migrate substrate docs into `OSG4/substrate/`** — pull `consultations.md`, `02_offerings.md`, archived donation-rail spec, refusal table, capacity caps from `_PERSONAL_OS.md`. Substrate first; pages later.
3. **Stand up Cal.com + Venmo with one test booking** — proves the rail end-to-end. Cal.com free hosted, two event types (30-min initial + 1-hour follow-up), Wed/Thu availability, no Stripe. Venmo handle already live.
4. **Build the fit-filter tool** — first new tool; sits in Toolkits, wired to Automation.
5. **Build the Public Face index + Offerings page** — two pages, the minimum that orients a receiver and shows them what's available.
6. **Build the Refusals page + Current State page** — completing the Public Face vertex's core.
7. **Migrate Library content** — Meta-Tetrahedron, manuscript, case portraits, failure patterns. One canonical text at a time.
8. **Migrate Toolkit content** — kit HTML build, 48 recognition cards, entry-sequence, stage-locator, quick diagnostic.
9. **Wire the six edges as cross-links** — once all four vertices have content, the edges get wired in.
10. **Cutover** — oursharedgifts.org points at OSG v4 deploy. OSG v2 retires from disk after a brief grace period.
11. **Lettherobotsbuild redirect** — once OSG v4 is stable, set redirects from key Lettherobotsbuild URLs to OSG v4 equivalents.

Each step is small enough to complete in a focused session. No step depends on more than one prior step.

---

## Open questions

- **Hosting choice** (GitHub Pages vs. Netlify vs. other) — decide before step 1.
- **Capacity ceiling** — resolved to body-discriminated above Cal.com floor (no published fixed concurrent-engagement number); see `substrate/consultations.md` v0.3.
- **Whether the Library should have a single index page or one per major text** — affects the Library landing UX.
- **Whether to keep `tools/quick_diagnostic.html` at DSS root or migrate to OSG4/toolkits/** — probably migrate, but the file is also referenced elsewhere.
- **Lettherobotsbuild redirect granularity** — root-to-root or per-page mapping.

## What this document is NOT

- Not page-level specs. Each vertex's pages get their own substrate docs once this spine is confirmed (template: same shape as `OSG v3/knowledge/02_offerings.md`).
- Not the build. This is the substrate the build rests on.
- Not the visual / interaction design. Voice register, somatic-invitation pattern, and "tools not pages" discipline are named; visual design is downstream.
- Not the deployment pipeline. That's a stack decision once hosting is chosen.

---

*Substrate references: [Meta-Tetrahedron paper](../meta_tetrahedron/META_TETRAHEDRON.md), [_PERSONAL_OS.md](../_PERSONAL_OS.md), [consultations.md](../OSG%20v3/consultations.md), [composted iterations](../Genesis%20Seed/composted/_COMPOST_OVERVIEW.md).*
