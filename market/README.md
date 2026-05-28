# Village Market — Setup

What lives here, what needs setup to make it operational, what stays manual.

## Files

- `records.json` — the public records (asks · offers · standing offers). Auto-updated by the `market-submit` Netlify Function. Hand-edited by Kevin if needed.
- `zip-coords.json` — zip → [lat, lng] lookup. Currently covers 16 zip codes around Grass Valley CA. **Expand this when the radius shifts** (when the bus moves to a new region, add zips for the new area).

**Private contact storage:** poster contacts are held in **Netlify Blobs** (store name `market-contacts`), NOT in this repo. The Function reads the contact when the matched claimer arrives, sends the exchange email, then deletes the Blob — one-shot reveal. Nothing about contact info ever enters the Git repo or its history. (Per cycle 77 audit finding P1.)

## What's already working (static, no setup)

- Map renders at `/village-market.html` from `records.json` + `zip-coords.json`
- List view shows same records below the map
- Filter checkboxes (type · open-only)
- Pin popups show record details + Claim button
- Protocol page at `/village-market-protocol.html`

You can deploy these right now and the map will render the 6 seed records that ship with this folder. The form will submit, fail with a clean error, and the user will know the function isn't yet configured.

## What needs external setup to make the form operational

The Netlify Function `market-submit.js` needs five environment variables set in the Netlify dashboard. Once these are set, the form posts a real record → commits to the repo → triggers a rebuild → record appears on the map within a few minutes.

In Netlify → Site settings → Environment variables → Add:

| Variable | Value | How to get it |
|---|---|---|
| `GITHUB_TOKEN` | a fine-grained personal access token | github.com → Settings → Developer settings → Personal access tokens → Fine-grained tokens → New. Scope: this repo only. Permissions: Contents (Read+Write). Copy the token. |
| `GITHUB_OWNER` | `Bluescontact` (or whichever account owns the repo) | The username/org that owns the repo |
| `GITHUB_REPO` | `oursharedgifts` (or the actual repo name) | The repo name |
| `GITHUB_BRANCH` | `main` (or whatever branch Netlify deploys from) | The branch Netlify is set to deploy |
| `RESEND_API_KEY` | your existing Resend API key | Already in motion from c43 work — same key |
| `FROM_EMAIL` | `kevin@oursharedgifts.org` (or whatever's verified in Resend) | Existing from c43 |
| `KEVIN_NOTIFY_EMAIL` | your email | Where you want claim notifications + new-record pings to land |
| `HASH_SECRET` | any random string | Generate one with `openssl rand -hex 32` or pick any unguessable string. Used to one-way-hash contact info in the public record. |

Total time: ~10 minutes if you already have Resend set up. ~20 minutes if Resend needs first-time setup.

## How to test it's working

1. Set the env vars above.
2. Trigger a Netlify rebuild (push any commit, or use "Trigger deploy" in the dashboard).
3. Go to `/village-market-submit.html` on the live site.
4. Fill in the form with test data. Use a real email you can check.
5. Submit. You should see "Posted. Your record will appear on the map within a few minutes."
6. Within 1-2 minutes, the site rebuilds (you'll see the new commit in the repo).
7. Reload `/village-market.html`. Your new pin should appear.
8. Click the pin → click Claim. Fill the claim form with another email you can check.
9. Both emails should receive exchange notifications via Resend.
10. The record's status changes to `claimed` on the next rebuild; the pin drops off the public map.

## What stays manual

- Adding new zip codes to `zip-coords.json` when the bus moves
- Setting `expires` dates that don't auto-clear (the rendering filters by `status: open`, not by `expires`; expired-but-not-closed records still show up — manual cleanup in `records.json` removes them, or a future build step can auto-archive)
- Closing records that were claimed but never met (currently no UI; edit `records.json` manually to mark `status: closed`)
- Adjusting the 45 mi radius — change `RADIUS_MILES` in `assets/js/village-market.js`
- Adjusting `CENTER_ZIP` in the same file when the bus moves

## For pickup-practitioners

To hold your own radius from a different location:

1. Fork the repo
2. In `assets/js/village-market.js`, change:
   - `CENTER_ZIP` to your zip code
   - `RADIUS_MILES` to whatever radius works for you
   - `CENTER_FALLBACK` to your lat/lng (used if CENTER_ZIP isn't yet in zip-coords)
3. In `market/zip-coords.json`, add the zip codes within your radius (use a free geocoder like Nominatim or a public zip-coords dataset)
4. In `market/records.json`, clear the seed records (or keep them as examples and remove later)
5. In `village-market.html` and `village-market-submit.html`, change the visible "Grass Valley, CA" / "45 miles" references to your location/radius
6. Deploy to Netlify (or any static host that runs Functions)
7. Set the env vars (your own GitHub token, your own Resend account, your own contact email)
8. Update `/current.html` to surface your location

Estimated time: ~30 minutes for someone comfortable with the tech.

See `/village-market-protocol.html` for the load-bearing refusals and discipline that the protocol holds. They are protocol-level, not config-level — they hold across every instance.
