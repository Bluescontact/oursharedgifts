# OSG v4

**oursharedgifts.org** — the personal practice made legible.

The library, the toolkits, the public face, and the automation behind it. Built on the Meta-Tetrahedron operational lens. One site, one domain, four vertices.

## Repo structure

```
OSG4/
├── OSG_V4_SPINE.md            substrate doc — frame and scope of every vertex + edge
├── README.md                  this file
├── index.html                 root — orientation surface (Public Face entry)
├── offerings.html             Public Face — gift menu
├── refusals.html              Public Face — what is not offered
├── current.html               Public Face — what's true now
├── request.html               Public Face — gift request flow
├── about.html                 Public Face — third-person framing
├── library/                   Library vertex (Differentiation)
│   ├── index.html             single index per all texts
│   ├── meta-tetrahedron/      operational lens (full render + diagrams)
│   ├── transmissions/         articles passed through the engine
│   └── *.html                 framework text syntheses
├── toolkits/                  Toolkits vertex (Architecture)
│   ├── index.html             tools that operate without Kevin
│   ├── quick-diagnostic.html
│   ├── fit-filter.html
│   ├── recognition-cards.html
│   └── kit/                   RI Kit — 12-question audit + 16 prescriptions
├── automation/                Automation vertex (Boundaries)
│   ├── index.html             intake surface
│   ├── consult.html           consultation intake + commons-work consent + fit-filter routing
│   └── donate.html            Venmo donation surface
├── back/                      Kevin's workshop & dashboard (not in main nav)
│   └── index.html             operational launcher + discipline reminders
├── substrate/                 markdown source of truth for site content
│   ├── consultations.md       consultation tier substrate
│   ├── offerings.md           gift menu substrate
│   └── _archived/             upgrade-path specs and historical substrate
├── assets/
│   └── css/
├── .nojekyll                  GitHub Pages — skip Jekyll
├── CNAME                      custom domain pointer
└── .gitignore
```

## Deploy

- **Host:** GitHub Pages
- **Domain:** oursharedgifts.org (CNAME)
- **Build:** static HTML; no build step
- **Workflow:** edit locally → git commit → git push → live

## Stack (operational layer)

- **Booking:** Cal.com (hosted, open-source, free booking — no Stripe integration)
- **Donations:** Venmo, sliding scale, donor-controlled (engagement and exchange run on different channels by design)
- **Analytics:** none

## License

Use freely. Adapt as needed. Credit sources. Recognition welcomed, not required. Utility proves value.

## Lineage

- Architecture of Coherence v1.0 (April 2026) — canonical manuscript
- Meta-Tetrahedron paper (May 2026) — operational lens
