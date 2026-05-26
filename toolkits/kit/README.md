# The Recognition Infrastructure Kit

A diagnostic that routes a user from a 12-question audit to a focused prescription, based on which vertex of the tetrahedral framework is weakest in their system.

## What the kit is and is not

This is a **diagnostic instrument**, not a teaching, a course, a community, or a content library. It assumes the user is already responsible for a specific system whose coherence has begun to slip. It points them to the thinnest set of resources that addresses the specific gap they are facing.

If you are looking for an introduction to the framework itself, read `frameworks/recognition_infrastructure_complete.md` first.

## Structure

```
kit/
├── README.md           — this file
├── preamble.md         — front-door statement of what the kit is and isn't
├── questions.json      — the 12 audit questions, vertex-tagged
├── closing.md          — gift-logic and what-this-isn't statements
├── diagnoses/
│   ├── differentiation.md
│   ├── connection.md
│   ├── boundaries.md
│   └── architecture.md
├── substrates/
│   ├── biological.md
│   ├── institutional.md
│   ├── relational.md
│   └── technical.md
└── prescriptions/
    ├── _TEMPLATE.md
    ├── differentiation-{biological,institutional,relational,technical}.md
    ├── connection-{biological,institutional,relational,technical}.md
    ├── boundaries-{biological,institutional,relational,technical}.md
    └── architecture-{biological,institutional,relational,technical}.md
```

## How it flows

1. User reads `preamble.md` and affirms the three pre-audit gates. If any are false, the audit waits.
2. User answers the 12 questions in `questions.json`. Score 0–3 per question. Sum within vertex.
3. The vertex with the highest sum is the weakest. Tie-break: ask which weakness the user recognizes most viscerally.
4. User reads the matching diagnosis in `diagnoses/{vertex}.md`.
5. User selects a substrate (Biological, Institutional, Relational, Technical).
6. User reads the matching prescription in `prescriptions/{vertex}-{substrate}.md`.
7. User reads `closing.md`.

## What's complete in v1

- Preamble, questions, closing, diagnoses: complete.
- Substrate treatments: all four (Biological, Institutional, Relational, Technical).
- Prescriptions: all sixteen cells.

Interactive front-end: `index.html` is a single self-contained file with all editorial content embedded. No external dependencies; works opened directly in a browser or hosted on any static surface.

See `prescriptions/_TEMPLATE.md` for the cell structure if extending to a new substrate.

## How to extend

Each piece is one file. To add a new substrate:

1. Author `substrates/{name}.md` at the density of `technical.md`.
2. Author `prescriptions/{vertex}-{name}.md` for each of the four vertices, following `_TEMPLATE.md`.
3. Add the substrate name to the substrate-selection step in the front-end.

You do not need to modify the questions, the diagnoses, or the closing to add a substrate. They are vertex-keyed, not substrate-keyed. That is the architectural move that makes this kit extensible without re-authoring.

## Lineage

This kit is part of the Recognition Infrastructure framework. Use it. Adapt it. Share it. Credit the lineage.

Kevin Mears · 2026
