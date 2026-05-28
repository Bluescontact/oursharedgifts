# Village Market Protocol

A 45-mile-radius local coordination fabric for asks and offers.
One practitioner at a time, from wherever they are.

---

## What this is

A protocol — not a platform.

If you are a practitioner who can hold a radius from your location, this document is what you need to do that. The data shape, the refusals, and the discipline are named below. The infrastructure that runs it is portable. Kevin holds his radius; you can hold yours.

The fabric is the center. Each practitioner is one node in it.

---

## The shape

Two surfaces, anonymized at zip-code resolution.

**Asks.** Someone in the radius needs something. Cleaning. Organizing. Building. A meal. Space for an afternoon. A ride. Company. A skill they don't have. Anything that one human can give another. The ask names what is needed, where (zip), when, and how to be reached when claimed. No profile. No history. The ask is a record, not a person.

**Offers.** Someone in the radius has something to give. Same shape as asks. What is offered, where, when, how to be reached when claimed.

**How asks and offers relate.** The protocol does not specify whether asks and offers travel separately or as paired submissions. Some practitioners hold a radius where receivers can post just an ask or just an offer; others require a paired submission (one ask plus one offer) so nobody arrives only to take or only to give. Each practitioner names their instance's choice. See *Kevin's instance choices* below.

---

## The radius

45 miles from wherever the practitioner holding the radius is located.

If you live in a fixed place, the radius is a circle around your address. If you live mobile (bus, RV, etc.), the radius travels with you. The current location surfaces on a /current page; the radius follows.

The radius is the geographic membrane. Inside it: you are available to claim asks, post offers, witness the local fabric. Outside it: another practitioner holds another radius, or the area is uncovered. There is no global view. There is no everywhere.

---

## What is refused

The protocol's load-bearing refusals. Any infrastructure that holds this protocol enforces them.

**No profiles.** Hosts post offers, not selves. Askers post asks, not selves. The unit of trust is the record, not the user.

**No reputation systems.** No ratings, no reviews, no "trusted host" badges, no scores. A practitioner who behaves badly can be refused on next contact; that does not produce a permanent record of their behavior on the platform.

**No verification tiers.** No "verified host," no "completed onboarding," no premium status. Everyone in the radius can post and claim.

**No matching-as-recommendation.** The map shows asks and offers. Readers do their own matching. No algorithmic suggestion. No "you might like."

**No reputation-as-data.** Claim history is not aggregated, displayed, or sold. The fact that you claimed an ask three months ago is not part of the public surface.

**No platform-take.** If money moves between two people meeting through the map, it moves off-platform. The infrastructure does not process payments.

**No engagement optimization.** No notifications designed to bring you back. No streaks. No "you have 3 unread asks." The infrastructure is silent unless you check it.

**No global aggregation.** Each radius is local. The protocol does not aggregate across radii into a national or global view. Practitioners can talk to each other; their infrastructures don't merge.

---

## The discipline

**24-hour minimum notice on any claim.** When you claim an ask or someone claims your offer, the meeting is at least 24 hours out. The body needs time to discriminate.

**Clean refusal is always available.** Either side can withdraw a claim with no penalty, no rating impact, no friction. The clean no is what makes the yes carry weight.

**The body discriminates.** No algorithm decides who is a good match. You read the ask or offer; you check your own body; you claim or don't.

**Pickup-ability is structural, not theoretical.** If you stop holding your radius, the radius empties. Other practitioners can pick up other radii. There is no central operator who keeps the system running. The protocol IS the system; the infrastructure is replaceable.

---

## The minimum infrastructure

You need three things to hold a radius:

1. **A way to receive ask and offer records.** A form (web form, email intake, paper-and-phone — anything that captures the record fields).
2. **A way to display them at zip-code resolution.** A map (Leaflet, OpenStreetMap, hand-drawn on paper for a small radius) showing pins at zip-code center, not addresses.
3. **A way to export the records.** Whatever holds the records (Airtable, a spreadsheet, a markdown file) must support clean export so the substrate is portable.

Kevin's instance runs on a Git repo as data substrate, serverless function intake for form submissions, and Leaflet + OpenStreetMap for the map. Static, FOSS-aligned, portable — fork-and-deploy. Other practitioners may use other tools. The protocol does not specify; only that the three capacities exist.

---

## Kevin's instance choices

The protocol above holds across any practitioner's instance. These are the choices Kevin's instance makes — instance-level, not canonical. Other practitioners may choose otherwise.

- **Reciprocity required.** Every submission carries both an ask AND an offer. No pure-takers, no pure-givers. The two records share a submitter, a zip, an optional first name, and a contact; either can be claimed independently.
- **First name opt-in.** Receivers and posters may include a first name with their submission. If present, the first name appears on the public map alongside the zip code. If absent, only the zip appears. Sensitive needs can post without a name.
- **72-hour record lifetime.** Every record expires 72 hours after creation. The submitter can re-up the expiry (extend by another 72 hours) via the link in their confirmation email. The short lifetime keeps the fabric fresh; the re-up keeps legitimate longer-arc needs visible.
- **No standing offers.** Kevin's instance does not have a separate "standing offer" record type. Hosts with recurring availability post a new offer when they have capacity and re-up while it's open.

If you fork this instance, you can change any of these choices — or all of them. The protocol's load-bearing refusals (no profiles, no reputation, no verification, no matching-as-recommendation, no global aggregation, no platform-take, no engagement optimization, no reputation-as-data) hold regardless.

---

## The license

Use freely. Adapt as needed.

If you hold a radius and want to be listed alongside Kevin's, contact through `oursharedgifts.org/request.html`. The fabric becomes denser with each held radius.

---

*This protocol is one practitioner's offering. Kevin holds his radius; you can hold yours. The fabric is the center. The body is the discriminator. The work is the gift.*

*4 · 6 · 4 · 1 · Use freely. Adapt as needed.*
