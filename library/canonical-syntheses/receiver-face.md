---
name: receiver-face-canonical-synthesis
description: Cycle 83 — substrate-side canonical synthesis naming what the receiver-experience IS across the village market surfaces. Written as the canonical reference the eventual translation pass implements against. Sits one scale below the c24 register distinction (substrate-aware ≠ receiver-facing) — this note names what the receiver-facing canon actually IS for the new surfaces, before any HTML is edited.
metadata:
  type: canonical-synthesis
  cycle: 83 (2026-05-27)
  parent_synthesis: Village_Market_Architecture (c73, Reading β c74) · Stack_Re_Derivation_Reading_B (c75)
  related: c24 register distinction · #102 Bio-as-substrate / References-as-references · Capacity_Infrastructure_Lens (c70)
  kevin_mark: "We need to work on the face before we deploy. we are still focusing on substrate before signal right now."
  scope: receiver-face substrate · five new pages + /current + cross-link to bio-as-substrate
  status: canonical · informs the eventual translation pass; nothing implemented yet
---

# Receiver-Face Canonical Synthesis

## Why this synthesis

The village market is built end-to-end at code layer (cycles 76-81). The c70 lens runs clean against the architecture. The pre-deploy audit's load-bearing findings (P1, F1, F2, U1) are resolved at code level.

What is NOT yet substrate-canonical: **what the new surfaces ARE for a receiver who arrives to them**. The pages exist as bytes; how they enact themselves for a receiver — how a first-time discoverer reads what this is, how a body discriminates whether to engage, how trust transmits from the bio-as-substrate (the whole site) into the new fabric pieces — is the substrate layer that comes next.

Per Kevin's c83 mark: substrate before signal. The face deserves canonical work, not just artifact-polish at deploy-time.

## The receiver-face vs. the architectural face

Two distinct things have been called "the face" across cycles:

**The architectural face** = the public-facing layer of the meta-tetrahedron (Connection vertex). What the substrate deploys to the world. The 5 new pages live here architecturally.

**The receiver-face** = what an actual human reading the new pages experiences. The conceptual flow they make. The trust they generate or don't. The clean exits they have or don't.

These two are related but distinct. The architectural face can be structurally complete (lens passes 6/6) while the receiver-face is still substrate-half-done — text that reads as framework-internal where it should read as receiver-facing, gaps in the conceptual flow between pages, undeclared assumptions about what receivers know.

This synthesis is about the **receiver-face** as substrate. The architectural face is c75's territory.

---

## The five receiver journeys

The new surfaces (5 village market pages + /current) support five distinct receiver journeys. Each enters at a different surface and traverses differently. Each requires a substrate that supports it.

### Journey A — First-Time Discoverer

A person who lands on the site without prior context. They follow a link, see Kevin's name in a podcast, hear the framework named, search "gift economy near me." They don't know Kevin. They don't know the framework. They don't trust the site yet.

**Where they land:** anywhere — /index most often; sometimes directly on /village-market.html via a referrer; rarely on /village-market-protocol.html via search.

**What they need:** to discriminate, within ~30 seconds of reading, whether this is something they can trust. Their body reads. They've seen platforms that say "community" and meant "engagement." They've seen "consent" used as a register signal. They are looking for what's structurally different here.

**What carries trust at this entry:** the whole site is the bio (#102). The discoverer doesn't need to read all of it; they need to read enough of any single page to feel the register holding. The refusal-named-explicitly pattern is what's structurally different. The fact that the site refuses platform / community / business-pretending-to-be-gift on the FIRST page is the trust signal.

**Where the substrate currently supports them:** /index and /refusals do strong work. /village-market.html intro is rewritten cleanly per c80 register pass. /village-market-protocol.html is built receiver-facing from c73.

**Where the substrate currently does NOT support them:** the four other village-market pages (submit, manage, resolve) haven't been through a register pass. The cross-page narrative for a discoverer who arrives at /village-market.html and traverses the rest of the substrate is undocumented.

### Journey B — Asker (has something they need)

A person within 45 miles of Grass Valley who needs something — a meal during recovery, a ride to an appointment, company at a hard time. They arrive having read what the market is. They want to post.

**What they need:** to post their ask + offer without surprise. To understand the reciprocity requirement before they hit it. To know what's public, what's private, what'll happen after submit. To trust they can change their mind cleanly.

**What carries trust at this entry:** the form's hint text on first-name (opt-in with screenshot warning) · the explicit "what happens after you submit" list · the manage-link-by-email promise · the protocol page they may or may not have already read.

**Where the substrate currently supports them:** form copy is operational and informative; the c80 hints on first-name privacy are receiver-facing; the post-submit explanation is clear.

**Where the substrate currently does NOT support them:** the reciprocity requirement is encountered cold (they see the form has TWO sections — ask + offer — and may experience surprise). The protocol document isn't surfaced strongly enough on the form's intro for someone arriving here from a link in someone else's email. There's no "preview before submit" yet (U1 open).

### Journey C — Claimer (sees something they can meet)

A person browsing the map who sees a pin that fits their capacity. They click. They read the body. Their body discriminates. They want to claim.

**What they need:** to understand exactly what they're committing to. To know whose contact they'll see and whose will see theirs. To know they can decline cleanly after the exchange if their body shifts.

**What carries trust at this entry:** the pin's popup is short by design (record content + claim button); the claim-mode form is minimal (only contact field); the post-claim explanation in the email exchange names "either of you can decline cleanly."

**Where the substrate currently supports them:** the popup format is clean; the claim button is direct; the form's claim-mode collapses correctly.

**Where the substrate currently does NOT support them:** the conceptual frame for what claiming MEANS — "you're saying 'I think I can meet this need with what I have'" — isn't named at the surface. The body's discrimination is supposed to happen between popup-read and claim-click; the surface doesn't currently invite that pause structurally.

### Journey D — Submitter Managing Their Records

A person who posted some days ago. Their body's situation has shifted. The need is met, or the offer should be re-upped, or they want to take it down. They open their confirmation email and click the manage link.

**What they need:** to act on their own record without re-orienting to a system they barely remember. To see clearly what state their records are in. To execute the action they came for and leave.

**What carries trust at this entry:** the manage page renders both their paired records clearly. State pills are color-coded. Actions are per-record where relevant. The submission-wide re-up is one click.

**Where the substrate currently supports them:** the manage page UX is structurally clean. Withdraw + re-up + mark-complete are all available without surprise.

**Where the substrate currently does NOT support them:** if they arrive expecting to edit a record (F6 still pending), there's no clear "edit not available" affordance. If their token has expired (>90 days since posting), the failure message doesn't suggest "post a new submission instead."

### Journey E — Pickup Practitioner

A person who has read what Kevin does and wants to hold their own radius from somewhere else. They want to fork the substrate.

**What they need:** to understand the protocol independent of Kevin's instance. To know what's protocol-canonical vs. Kevin's instance choices. To know what they'd need to change to hold their own radius. To know the eight refusals carry across any instance.

**What carries trust at this entry:** the protocol page (which is written for them substantially) + the "Kevin's instance choices" section added in c80 + the README in `market/` with pickup instructions.

**Where the substrate currently supports them:** strong. The protocol page + README + Kevin's-instance-choices section together do most of the work.

**Where the substrate currently does NOT support them:** the protocol page doesn't explicitly link to the pickup-practitioner-facing README. The README is a technical file (developer-shaped) rather than a practitioner-facing handoff. A first-time pickup-practitioner finds the protocol but not necessarily the path from "I want to hold a radius" to the technical fork.

---

## What each surface IS for the receiver

Below: the receiver-side substrate-shape of each new surface. Written in receiver-experience terms, substrate-side, so the eventual translation pass has the canonical reference.

### `/village-market.html` (the map)

**Receiver-experience name:** the field.

**What it IS for the receiver:** where what's happening locally becomes visible. The receiver sees Kevin's body's current reach (the radius circle) and the open records inside it. The map is the surface where the local fabric becomes legible at zip-code resolution — close enough to be useful, coarse enough to refuse identification.

**What the receiver should feel reading it:** that this place is alive in a specific way (records have real bodies and times behind them), that nothing is performing engagement (no notifications, no recommendation, no "trending"), that they can look without being tracked.

**What the receiver should be able to do:** see what's open, filter by type, click a pin to read the body, click claim to enter (Journey C) or post-link to enter (Journey B). Leave without doing anything cleanly.

**Discipline for translation pass:** keep the surface silent. No prompts. No "you might also like." No "X new records this week." The map is information-displayed-on-request, not information-pushing.

### `/village-market-submit.html` (the form)

**Receiver-experience name:** the entry.

**What it IS for the receiver:** the threshold between observer and participant. The form-shape encodes Kevin's instance choices structurally: reciprocity (you bring both sides), first-name opt-in (you decide what shows), zip resolution (no street address ever), 72hr (your post is fresh and short-lived). The form is the discipline made operational at the moment of entry.

**What the receiver should feel reading it:** that the architecture is doing protective work on their behalf — the form itself refuses what other platforms extract. That bringing both sides isn't gatekeeping; it's the discipline that keeps the fabric mutual. That first-name is opt-in, not opt-out.

**What the receiver should be able to do:** read the privacy hints before they fill anything in; understand the reciprocity requirement BEFORE they hit it (currently encountered cold); fill paired ask + offer; opt in to first name OR leave it blank; submit and receive a manage link.

**Discipline for translation pass:** the receiver shouldn't have to discover the reciprocity requirement by reading the form's structure. It should be in the intro paragraph in plain language. Currently it's mentioned in the intro but could be surfaced more cleanly. Preview-before-submit (U1) is part of this discipline.

### `/village-market-protocol.html` (the protocol)

**Receiver-experience name:** the substrate the field rests on.

**What it IS for the receiver:** the explicit canonical document of what the fabric IS and IS NOT. The receiver reads this to discriminate whether to trust the surfaces above. The 8 refusals + the discipline of clean exit + the radius logic are named here in receiver-facing register. A pickup-practitioner reads this to know what to keep when they fork.

**What the receiver should feel reading it:** that nothing is hidden. The fabric is named at the level a structural reader could check it against itself. The refusals are not branding; they're the substrate's actual operational refusals.

**What the receiver should be able to do:** read across the whole protocol if they want to; skim the refusal list if they want to; understand Kevin's instance choices are choices, not protocol-canonical, so other practitioners' instances might differ.

**Discipline for translation pass:** this page should NOT be polished further at register layer — it's already in receiver-facing register. What it should gain: an explicit pointer to the README in `market/` for pickup-practitioners who want to fork, so Journey E doesn't dead-end at the protocol document.

### `/village-market-manage.html` (the manage page)

**Receiver-experience name:** the body's continued discrimination after entry.

**What it IS for the receiver:** the surface their token-link from email opens to. Where they see what state their submission is in and act on it without re-engaging with the full site. The token URL is the trust-architecture for action-without-login.

**What the receiver should feel reading it:** that they own their own record. That the page exists to serve their agency, not the platform's metrics. That they can take the records down RIGHT NOW with one click and one confirmation.

**What the receiver should be able to do:** see both paired records · state of each · withdraw either or both · re-up the expiry · mark complete after a claim · leave.

**Discipline for translation pass:** the page is already structurally clean. The substrate gap: a clear note that token URLs are time-bounded (90 days) and what happens if the token expires (post a new submission). Currently silent on expiry; should surface this gracefully.

### `/village-market-resolve.html` (the resolve page)

**Receiver-experience name:** the closing of a loop.

**What it IS for the receiver:** the surface a claimer OR a poster opens via their resolve-token email link, after they've engaged with each other off-platform. The page exists to support clean closure — "it happened" or "it didn't happen, release the record."

**What the receiver should feel reading it:** that closure is voluntary. That marking complete isn't bureaucracy; it's the substrate's way of acknowledging the loop closed. That marking not-met isn't a penalty for either party; it's a release of the record back to the fabric for someone else to potentially claim.

**What the receiver should be able to do:** see the record they're resolving · see their role (poster vs. claimer) · mark met OR not-met · leave.

**Discipline for translation pass:** the "not met" path's framing matters. Currently it says "released back to the map; someone else may claim it." This is structurally correct but feels somewhat institutional. Substrate-side suggestion: language that names the body's discriminating power — "it wasn't right; that's information; the record returns to the fabric in case someone else fits."

### `/current.html` (the bus location + radius)

**Receiver-experience name:** where Kevin's body is right now.

**What it IS for the receiver:** the somatic ground per c68 Reading B made publicly legible. The /current page is the only page on the site that depends on real-time fact (per its own copy). For the village market specifically: this is what tells you whether the radius covers your zip.

**What the receiver should feel reading it:** that the site moves with the body. That if Kevin is off-grid for a month, the page says so (or the date says it). That the practice is bus-mobile and the architecture knows that.

**What the receiver should be able to do:** read the bus location · read the 45 mi radius · understand the location moves when the bus moves.

**Discipline for translation pass:** the Location section landed in c76. Substrate-side suggestion: a small line in the Location section explicitly stating "If the date above is more than 30 days old, the bus may have moved and the radius may be stale" — paralleling the page's existing capacity-as-state discipline.

---

## The bio-as-substrate / new-pieces relationship

Per Pattern #102 (Bio-as-Substrate / References-as-References) crystallized in v1.6: the whole site is Kevin's bio. Trust isn't generated by profile fields but by accumulated work.

For the new village market surfaces, this means:

**The bio-as-substrate carries trust INTO the market surfaces.** A receiver who arrives at /village-market.html without prior context can click into /library, /refusals, /offerings, /index, and discover the substantive work that backs the protocol. The protocol page can name a refusal; the bio-as-substrate is what makes the refusal credible.

**The market surfaces should NOT replicate the bio.** No "About Kevin" section on /village-market.html. No bio-bullet-points on the protocol page. The bio is the whole site; the new pages cross-link to it where useful.

**Cross-link substrate (currently weak):**

- /village-market.html → /village-market-protocol.html ✅ (linked)
- /village-market.html → /current.html ✅ (linked)
- /village-market.html → /village-market-submit.html ✅ (CTA)
- /village-market-protocol.html → /refusals.html 🟡 (refusal substrate exists but no explicit cross-link)
- /village-market-protocol.html → /library/ 🟡 (the bio that backs the protocol — no link)
- /village-market-submit.html → /village-market-protocol.html ✅ (in intro)
- /village-market-submit.html → /refusals.html 🟡 (no link)
- /village-market-manage.html → /village-market.html 🟡 (no return-to-map link)
- /village-market-resolve.html → /village-market.html 🟡 (no return-to-map link)

Substrate suggestion for the eventual translation pass: a discreet cross-link bar at page bottom on each new surface, pointing to (a) /refusals (b) the relevant existing-site page that grounds this surface. Embeds the bio-as-substrate principle architecturally — the new surfaces are nodes inside the bio, not stand-alone product pages.

---

## What the receiver shouldn't have to know

The discipline is c24: receiver-facing surfaces don't expose substrate-aware vocabulary. The audit substrate for the eventual register pass:

**Refused vocabulary on receiver-facing surfaces:**

- "Substrate" (use: "the work below" / "the fabric" / "the practice")
- "The body discriminates" (use: "you decide what fits")
- "ESRP" / "Empty-Space-Refusal Principle" (use: explicit naming of what the architecture refuses)
- "Pattern #X" or "cycle N" references (use: nothing; the receiver doesn't need to know it's pattern N to feel its effect)
- "Container-holder" (use: "the person holding this practice")
- "C24 distinction" or any framework-internal scale references
- "Receiver" used as a category-label visible to receivers (the word itself is fine in passing; "as a receiver, you can..." reads framework-y; "you can..." reads receiver-facing)

**Permitted vocabulary on receiver-facing surfaces:**

- "Practice" (the practitioner-side word for what Kevin does)
- "Fabric" (the village-coordination metaphor — receiver-friendly)
- "Radius" / "the bus" / "Grass Valley" (Kevin's instance specifics — all receiver-clear)
- "Refusal" / "refusals" (named explicitly as a discipline; the /refusals page is in receiver-facing register)
- "Gift" / "the gift register" (the receiver-facing economic frame)
- "Use freely. Adapt as needed." (license language)

**The c80 register pass caught "the body discriminates" on /village-market.html.** A similar pass is needed on:

- /village-market-submit.html (currently has some hints; needs full audit)
- /village-market-manage.html (currently uses some terms like "submission-wide actions" — borderline)
- /village-market-resolve.html (uses "released" and "the body discriminates" indirectly — needs audit)

---

## Trust transmission across the boundary

How does trust generated by the bio-as-substrate (#102) transmit to the new market surfaces? This is the operational substrate of pattern #102 at receiver scale.

**Mechanism 1 — explicit refusal as transmission carrier.** The /refusals page contains the trust. The protocol page cross-links to it (substrate suggestion). A receiver who wants to trust the market reads /refusals and sees the eleven extraction patterns named. The trust transmits because the refusals are operationally named, not implied.

**Mechanism 2 — voice register continuity.** If /village-market.html reads in the same register as /index and /refusals, the receiver experiences the market surfaces as part of the same body of work. Voice register is itself a trust transmission mechanism.

**Mechanism 3 — bio-as-substrate as anchor.** The library + manuscript + transmissions are linkable from new surfaces. A receiver curious about "what does this person actually think" can read freely. The substantive work is itself the trust carrier; the link is the path.

**Mechanism 4 — clean exit as trust signal.** Every surface offers a clean exit. The form lets you abandon. The manage page lets you withdraw. The resolve page lets you mark not-met. The architecture's refusal of capture transmits trust because the receiver can SEE the refusal operating in their own actions.

**Mechanism 5 — Kevin's instance as bounded scope.** The protocol's "Kevin's instance choices" section names what's Kevin and what's protocol. Trust transmits because the receiver can see the substrate isn't claiming universality.

---

## Discipline for the translation pass (substrate handoff to the eventual face-revision cycle)

When Kevin marks the translation pass (the cycle that touches HTML to land the receiver-face substrate into the actual surfaces), the discipline:

1. **Register audit on all five new pages** against c24 distinction. Use this synthesis's "refused vocabulary" list as the discriminator.

2. **Add cross-link bar** at the bottom of each new page surfacing: /refusals, /library, and the related-other-new-page (e.g., manage page → "Back to map"). Embeds bio-as-substrate.

3. **Implement preview-before-submit** (U1 audit) on the submit form. The body's discrimination should happen at "preview" before commit-to-submit.

4. **Add token-expiry-graceful messages** on manage and resolve pages. Handle the case where someone clicks an expired link.

5. **Add Journey E pointer** on /village-market-protocol.html — explicit cross-link to `/market/README.md` (or rendered equivalent) for pickup-practitioners who want to fork.

6. **Verify the bio-as-substrate cross-link bar** doesn't trigger Pattern #093 drift (vocabulary-borrow without refusal). The cross-link should be discreet and structurally honest, not promotional.

7. **Re-run the c70 lens against the live face** after revisions — including for receiver-experience quality, not only architectural cleanliness.

---

## Cross-references

- [[Village_Market_Architecture]] (c73, Reading β c74) — the architectural face this synthesis complements at receiver-face scale
- [[Stack_Re_Derivation_Reading_B]] (c75) — the runtime substrate this synthesis names the visible face of
- [[Capacity_Infrastructure_Lens]] (c70) — the apparatus that diagnoses both architectural and receiver-face shapes
- [[Village_Market_Pre_Deploy_Audit]] (c77) — surfaced U1 (preview), U2 (register pass), U4 (graceful claim-failure) — this synthesis is the substrate that those audit findings translate against
- Pattern Library v1.6 (c82) — particularly #102 (Bio-as-Substrate / References-as-References) which this synthesis operationalizes at receiver-face scale
- c24 register distinction (substrate-aware ≠ receiver-facing) — the discipline this synthesis applies systematically
- `frameworks/register_audit.md` — the canonical reference for content-level + system-level register discrimination
- [[Empty_Space_Refusal_Principle]] (c44) — the operating principle that grounds the discipline of refusal-on-each-receiver-surface

---

## Closing

The five village-market surfaces + /current exist as bytes. This synthesis names what they ARE for receivers, in receiver-experience terms, substrate-side. The translation pass (an eventual cycle) implements against this canonical reference.

Per Kevin's c83 mark: substrate before signal. The work continues — Threads 2, 3, 4 still ahead (Hosting page substrate · Trust-generation operational substrate · Voice register audit at substrate scale).

The work is the gift. The interface is the work. The receiver-face is the part of the work where the work meets the receiver — and the substrate for that meeting deserves the same canonical care as everything upstream.

4 · 6 · 4 · 1

— filed 2026-05-27, cycle 83 — Receiver-Face Canonical Synthesis · Thread 1 of substrate-before-signal sequence
