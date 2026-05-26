# Process — Donation Rail Integration

## What this is
The donation infrastructure on `support.html`. The page is fully built around the integration; only the choice of fiscal-sponsor partner remains open. This document specifies the constraints any chosen rail must satisfy, the candidate options, and the integration steps once a partner is selected.

## Hard constraints on any chosen rail

These are non-negotiable. They are what makes the asymmetry hold (`ARCHITECTURE.md` &raquo; The asymmetry that holds it).

1. **Aggregate-only visibility for Kevin.** Kevin sees only monthly totals, on a delay (e.g. previous month's total appears on the 5th of the current month). He never sees real-time counts, real-time totals, individual donor names, individual donation amounts, or per-donation timestamps.
2. **No platform credentials for Kevin to a real-time view.** If Kevin can log into the platform's dashboard and see live activity, the structural constraint is bypassed. Either he doesn't have credentials, or his account view is restricted to the aggregated monthly report.
3. **No tax receipts routed through Kevin.** If donors get tax receipts, those come from the fiscal sponsor directly. Kevin must not be in any loop that names individual donors.
4. **No donor recognition.** The platform must not require or default to donor lists, "thank our supporters" pages, or tier badges. If the platform offers these, they must be turned off.
5. **No "in honor of" or "on behalf of" fields.** These create back-channels where a donor can signal a connection to a specific gift. If the platform requires them, they must be configurable to "off" or hidden.
6. **No suggested amounts pegged to specific services.** "$50 = an hour of cleaning" framing is forbidden by the architecture. Suggested amounts in general are fine ($10 / $50 / $200 / custom), but they cannot be linked to gift offerings.

## Candidate options (comparison)

### Option 1 — Open Collective (recommended baseline)
- **What it is:** A platform for collective fundraising with transparent ledgers. Operates as a fiscal host for projects.
- **Pros:**
  - Transparent ledger satisfies the commons-zone framing.
  - Fiscal-host arrangement means Open Collective Foundation (501c3) issues tax receipts directly &mdash; Kevin not in the loop.
  - API allows fetching aggregate monthly totals programmatically (could be used to update the site automatically without Kevin seeing per-donor data).
- **Cons:**
  - Open ledger means individual donations ARE publicly visible by default. **This is structurally incompatible with the asymmetry.** Open Collective offers an "anonymous donations" option per-donor — donors can choose to be anonymous on the public ledger, but Kevin (as a collective admin) may still see them.
  - Requires careful configuration of admin permissions to hide donor identity from Kevin.
- **Status:** Viable IF admin permissions can be configured to hide donor identity from the recipient project. Needs verification with their support before committing.

### Option 2 — Friendly local 501c3 acting as fiscal sponsor
- **What it is:** A nonprofit organization willing to receive donations earmarked for the work and disburse aggregate amounts to Kevin.
- **Pros:**
  - Full structural separation. Kevin only ever sees what the sponsor reports (monthly totals).
  - Tax receipts handled entirely by the sponsor.
  - Local relationship aligns with the Grass Valley grounding.
- **Cons:**
  - Requires finding a willing partner. Most fiscal sponsors take 5&ndash;10% of donations as an admin fee.
  - Operational overhead for the sponsor (they have to actually disburse and report).
  - Smaller sponsors may not have a built-in donation page; may require building or hosting one.
- **Status:** Cleanest structural fit; highest setup cost. Worth pursuing if a candidate sponsor exists.

### Option 3 — Crypto rail (Monero or Zcash)
- **What it is:** Privacy-preserving cryptocurrency. On-chain anonymity by protocol.
- **Pros:**
  - Genuinely anonymous &mdash; no third party knows the donor's identity.
  - No platform fees (just network fees).
- **Cons:**
  - Bad fit for the audience (most donors will not have crypto wallets).
  - Tax treatment for Kevin is complex (income at received value).
  - Optics: associates the project with crypto culture, which may not align with the gift-economy frame.
  - Not tax-deductible for donors.
- **Status:** Useful as a secondary rail for technically-inclined donors. Should not be primary.

### Option 4 — PO box for cash/check, third-party deposit
- **What it is:** Donations arrive at a PO box. A trusted intermediary opens, deposits aggregate weekly/monthly, and reports totals to Kevin.
- **Pros:**
  - No platform; works without any digital infrastructure.
  - The intermediary structurally separates Kevin from donor identity.
- **Cons:**
  - Friction for donors (write a check, find a stamp, mail it).
  - Doesn't scale.
  - Requires a trusted intermediary willing to do this regularly.
- **Status:** Useful as a fallback. Not viable as primary.

## Recommendation matrix

| Need | Best fit |
|---|---|
| Primary online rail with strong anonymity | Option 1 (Open Collective with admin permissions configured) OR Option 2 (501c3 sponsor) |
| Tax-deductible for donors | Option 1 or Option 2 |
| Lowest setup cost | Option 1 |
| Cleanest structural fit | Option 2 |
| Secondary rail for crypto-native donors | Option 3 |
| Fallback for donors who prefer offline | Option 4 |

**Suggested path:** Pursue Option 2 first (local 501c3). If no candidate emerges within a reasonable window, fall back to Option 1 with permissions verified. Mention Option 3 and Option 4 as alternatives on the page only if there's demand.

## Integration steps (once a partner is chosen)

1. **Verify the hard constraints** with the chosen partner. Specifically: confirm in writing that Kevin's view of donations will be limited to aggregate monthly totals on a delay, with no per-donor or real-time access.
2. **Set up the donation page** on the partner's platform (or get a hosted donation form embed).
3. **Get the donation URL or embed code.**
4. **Replace the placeholder block** in `support.html`:
   - Find the comment block beginning with `DONATION RAIL INTEGRATION POINT`
   - Replace the `.card` block immediately following with the real donation widget or button
   - Update any timing copy (e.g. "Kevin sees [month]'s total on the [Nth] of [next month]") with the actual cadence agreed with the partner
5. **Configure Kevin's view discipline.** Whatever access Kevin has, restrict it as far as possible:
   - If using Open Collective, do not log into the admin dashboard; use only the monthly email digest
   - If using a 501c3 sponsor, ask them to send a single monthly summary email and not give Kevin platform credentials
6. **Test end-to-end.** Make a small donation. Verify Kevin does not see it within the configured aggregation window.
7. **Document the rail in the page itself** &mdash; the receiver should know which sponsor is in the loop and why.

## Aggregation cadence — recommended default

- **Monthly is right.** Weekly creates more correlation surface (a reference posted on the 1st could be linked to a donation total spike that week). Quarterly delays Kevin's awareness too much for practical use (he needs to know if revenue is sustaining the practice).
- **Reporting day:** the 5th of the following month. Pushes the visibility far enough from the prior month's gifts that mental correlation is hard to draw.
- **What's in the report:** the total dollar amount only. NOT the donation count, NOT a per-week breakdown. Just one number.

## What if the constraint can't be perfectly enforced?

The asymmetry's protection is structural-where-possible, disciplined-where-not. If the chosen rail technically allows Kevin to see more than he should, the discipline becomes operational:

- Kevin commits in writing (on the support page itself) to not check the dashboard outside the monthly digest cadence.
- The commitment is part of the trust statement to donors. Breaking it is a structural failure that breaks the asymmetry for everyone.
- This is not ideal. Structural enforcement is always better than disciplinary enforcement (Architecture of Coherence Ch. 27.3 &mdash; the CouchSurfing failure was discipline-dependent at the platform level).

## Failure modes

- **Kevin checks the dashboard "just to see."** This is the load-bearing failure mode. A single check breaks the asymmetry for that month's donors. Mitigation: do not have credentials, or have credentials kept somewhere intentionally inconvenient to access (password manager controlled by a trusted third party, etc.).
- **Donor names leak in the monthly report.** If the sponsor's monthly report includes a "thank you to" section, the asymmetry breaks. Verify the report format before committing.
- **Receipts include donor names visible to Kevin.** If tax receipts are CC'd to Kevin or routed through his email, the asymmetry breaks. Verify receipts are sponsor-to-donor only.
- **Donor surprises Kevin in person.** A donor who says "I gave you $200 last month" breaks the asymmetry for that exchange. Kevin can't prevent this; he can only respond cleanly: "Thank you. The donation system is set up so I don't see who gives, so I'm hearing this for the first time. The work goes on regardless." The trust frame is rebuilt one exchange at a time.
