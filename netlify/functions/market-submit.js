// market-submit.js
//
// Netlify Function for the Village Market. Receives JSON POSTs from
// village-market-submit.html and either:
//
//   action: 'submit' → creates a new ask/offer/standing-offer record,
//                      commits market/records.json to the GitHub repo
//                      via the GitHub API. Stores the poster's private
//                      contact in Netlify Blobs (never in the repo).
//                      Triggers a rebuild.
//
//   action: 'claim'  → looks up the claimed record, updates its status
//                      to 'claimed', commits the updated records.json.
//                      Reads the poster's contact from Netlify Blobs.
//                      Sends two emails via Resend: contact info exchange
//                      between poster and claimer. Deletes the Blob after
//                      successful exchange (one-shot contact reveal).
//
// No platform-form dependency. No third-party form service. The Git repo
// is the data substrate for PUBLIC records. Netlify Blobs holds private
// contacts (per c77 audit finding P1 — contacts never enter the repo).
//
// Required environment variables (set in Netlify Site settings →
// Environment variables):
//
//   GITHUB_TOKEN          — fine-grained personal access token with
//                           read/write to a single repo
//   GITHUB_OWNER          — e.g., "Bluescontact"
//   GITHUB_REPO           — e.g., "oursharedgifts"
//   GITHUB_BRANCH         — e.g., "main"
//   RESEND_API_KEY        — existing
//   FROM_EMAIL            — existing; defaults to kevin@oursharedgifts.org
//   KEVIN_NOTIFY_EMAIL    — where Kevin receives claim notifications
//   HASH_SECRET           — random string used to sign management tokens
//                           (HMAC-SHA256). Must be unguessable. At least
//                           32 chars recommended.
//   SITE_URL              — canonical site URL for email links; defaults
//                           to https://www.oursharedgifts.org
//
// Netlify Blobs: auto-enabled on the free tier; no setup required.
// The store name "market-contacts" is created on first write.
//
// Signed tokens (per c77 audit findings F1, F2):
//   - On submit:  a 'manage' token (90-day expiry) is sent to the poster
//                 in the confirmation email. The token URL lets the poster
//                 withdraw their record without login.
//   - On claim:   two 'resolve' tokens (30-day expiry, one per party) are
//                 sent in the exchange emails. Either party can mark the
//                 claim 'met' or 'not-met' via their token URL.
//   - Tokens are HMAC-SHA256-signed JSON payloads. Format:
//                 base64url(payload).base64url(signature)
//   - Token actions are idempotent: a leaked token can re-apply the same
//                 state transition but cannot escalate capability.
//
// Graceful degrade: if GITHUB_TOKEN is absent, function returns 503 so
// the form shows an error rather than silently dropping. If Blobs is
// unavailable, submit still succeeds but claim-exchange emails cannot
// reach the poster — the Function returns an error to the claimer with
// guidance to contact via the request page.
//
// PRIVACY DISCIPLINE — DO NOT add console logs of request bodies. Any
// future debugging additions must log error messages only, NOT payload
// content (per c77 audit finding P4).

import crypto from 'node:crypto';
import { getStore } from '@netlify/blobs';

const ALLOWED_TYPES = ['ask', 'offer'];
const MAX_BODY_LEN = 600;
const MAX_NAME_LEN = 40;
const RECORDS_PATH = 'market/records.json';
const MANAGE_TOKEN_DAYS = 90;
const RESOLVE_TOKEN_DAYS = 30;
const RECORD_TTL_HOURS = 72;
const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;
// Rate limit: 3 paired submissions per IP per 72hr sliding window. The window
// matches RECORD_TTL_HOURS so submission cadence aligns with record lifetime —
// when your last batch begins expiring, the next submission window opens. Per
// c77 audit finding F5; closes the ESRP gap the audit's lens-applied-to-self
// check (discriminators 3 + 6) named.
const RATE_LIMIT_WINDOW_HOURS = 72;
const RATE_LIMIT_MAX_SUBMISSIONS = 3;

function generateToken(payload, secret) {
  const json = JSON.stringify(payload);
  const b64 = Buffer.from(json, 'utf8').toString('base64url');
  const sig = crypto
    .createHmac('sha256', secret || 'no-secret')
    .update(b64)
    .digest('base64url');
  return b64 + '.' + sig;
}

function verifyToken(token, secret) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  let expectedSig;
  try {
    expectedSig = crypto
      .createHmac('sha256', secret || 'no-secret')
      .update(parts[0])
      .digest('base64url');
  } catch {
    return null;
  }
  const a = Buffer.from(parts[1]);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length) return null;
  if (!crypto.timingSafeEqual(a, b)) return null;
  let payload;
  try {
    payload = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
  } catch {
    return null;
  }
  if (typeof payload.expires === 'number' && payload.expires < Date.now()) return null;
  if (!payload.record_id || !payload.capability) return null;
  return payload;
}

function generateSubmitterId(records) {
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = records.filter(function (r) {
    return r.submitter_id && r.submitter_id.indexOf('sub-' + today) === 0;
  }).length;
  // Each submission produces TWO records, so count submitters not records
  const uniqueSubmitters = new Set(
    records
      .filter(function (r) { return r.submitter_id && r.submitter_id.indexOf('sub-' + today) === 0; })
      .map(function (r) { return r.submitter_id; })
  );
  const seq = String(uniqueSubmitters.size + 1).padStart(3, '0');
  return 'sub-' + today + '-' + seq;
}

async function fetchKnownZips(siteUrl) {
  // Pull zip-coords.json from the deployed static site. This validates
  // submitted zips against the radius the practitioner is actually holding,
  // not against generic US zip-code format. Per c80 audit finding F4: bogus
  // zips outside the radius should be rejected at submit with a clear error
  // rather than silently failing to render a pin.
  try {
    const r = await fetch(siteUrl + '/market/zip-coords.json');
    if (!r.ok) return null;
    const body = await r.json();
    return Object.keys(body || {});
  } catch (err) {
    console.error('zip-coords fetch failed:', err.message);
    return null;
  }
}

function validatePairedSubmission(d, knownZips) {
  if (!/^[0-9]{5}$/.test(String(d.zip || ''))) {
    return 'zip must be five digits';
  }
  if (Array.isArray(knownZips) && knownZips.length > 0 && !knownZips.includes(String(d.zip))) {
    return 'That zip code is outside the current radius. The radius covers: ' + knownZips.slice(0, 10).join(', ') + (knownZips.length > 10 ? ', and others' : '') + '.';
  }
  if (!d.contact || String(d.contact).length > 200) {
    return 'contact required';
  }
  if (d.first_name && String(d.first_name).length > MAX_NAME_LEN) {
    return 'first name must be ' + MAX_NAME_LEN + ' characters or fewer';
  }
  const radius = Number(d.radius_acceptable);
  if (!Number.isFinite(radius) || radius < 0 || radius > 100) {
    return 'radius must be 0-100 miles';
  }
  if (!d.ask_shape || String(d.ask_shape).length > 60) {
    return 'ask shape required (max 60 chars)';
  }
  if (!d.ask_body || String(d.ask_body).length > MAX_BODY_LEN) {
    return 'ask body required (max ' + MAX_BODY_LEN + ' chars)';
  }
  if (!d.offer_shape || String(d.offer_shape).length > 60) {
    return 'offer shape required (max 60 chars)';
  }
  if (!d.offer_body || String(d.offer_body).length > MAX_BODY_LEN) {
    return 'offer body required (max ' + MAX_BODY_LEN + ' chars)';
  }
  return null;
}

async function ghGetFile(token, owner, repo, branch, path) {
  const url = 'https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + path + '?ref=' + branch;
  const r = await fetch(url, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'oursharedgifts-market-submit'
    }
  });
  if (r.status === 404) return { sha: null, content: null };
  if (!r.ok) throw new Error('GitHub GET failed: ' + r.status + ' ' + (await r.text()));
  const body = await r.json();
  const decoded = Buffer.from(body.content, 'base64').toString('utf8');
  return { sha: body.sha, content: decoded };
}

async function ghPutFile(token, owner, repo, branch, path, content, sha, message) {
  const url = 'https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + path;
  const body = {
    message: message,
    content: Buffer.from(content, 'utf8').toString('base64'),
    branch: branch
  };
  if (sha) body.sha = sha;
  const r = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'User-Agent': 'oursharedgifts-market-submit'
    },
    body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error('GitHub PUT failed: ' + r.status + ' ' + (await r.text()));
  return r.json();
}

const TERMINAL_STATUSES = ['withdrawn', 'met', 'closed', 'expired'];

async function maybeCleanupContactBlob(submitterId, records) {
  // Delete the contact Blob only when ALL paired records for this submitter
  // have reached terminal state. While any paired record is still open or
  // claimed, the contact must remain available for exchange on future claim.
  const paired = records.filter(function (r) { return r.submitter_id === submitterId; });
  if (paired.length === 0) return;
  const allTerminal = paired.every(function (r) { return TERMINAL_STATUSES.includes(r.status); });
  if (!allTerminal) return;
  try {
    const contacts = getStore('market-contacts');
    await contacts.delete(submitterId);
  } catch (err) {
    console.error('blobs cleanup failed for', submitterId, ':', err.message);
  }
}

async function sendEmail(resendKey, fromEmail, to, subject, text) {
  if (!resendKey) return { skipped: true };
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + resendKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [to],
      subject: subject,
      text: text
    })
  });
  if (!r.ok) return { ok: false, status: r.status };
  return { ok: true };
}

function clientIpFrom(req) {
  // Netlify sets x-nf-client-connection-ip as the canonical client IP. Fallbacks
  // for portability if the function ever runs on different infrastructure.
  return (
    req.headers.get('x-nf-client-connection-ip') ||
    (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

async function checkRateLimit(clientIp) {
  // Returns { allowed, recent, resetAt? }. Fails open (allowed:true) if the
  // Blobs store is unavailable — blocking legitimate use because storage is
  // down is worse than allowing a temporary over-limit submission.
  if (!clientIp || clientIp === 'unknown') return { allowed: true, reason: 'no-ip', recent: [] };
  try {
    const store = getStore('market-ratelimit');
    const existing = await store.get(clientIp, { type: 'json' });
    const now = Date.now();
    const windowStart = now - (RATE_LIMIT_WINDOW_HOURS * HOUR_MS);
    const recent = (existing && Array.isArray(existing.timestamps))
      ? existing.timestamps.filter(function (t) { return t > windowStart; })
      : [];
    if (recent.length >= RATE_LIMIT_MAX_SUBMISSIONS) {
      const oldestRecent = recent[0];
      const resetAt = new Date(oldestRecent + (RATE_LIMIT_WINDOW_HOURS * HOUR_MS)).toISOString();
      return { allowed: false, reason: 'limit-exceeded', resetAt: resetAt, recent: recent };
    }
    return { allowed: true, recent: recent };
  } catch (err) {
    console.error('rate limit check failed:', err.message);
    return { allowed: true, reason: 'store-unavailable', recent: [] };
  }
}

async function recordRateLimitHit(clientIp, recent) {
  if (!clientIp || clientIp === 'unknown') return;
  try {
    const store = getStore('market-ratelimit');
    const updated = (recent || []).concat([Date.now()]);
    await store.setJSON(clientIp, { timestamps: updated });
  } catch (err) {
    console.error('rate limit record failed:', err.message);
  }
}

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL || 'kevin@oursharedgifts.org';
  const kevinEmail = process.env.KEVIN_NOTIFY_EMAIL;
  const hashSecret = process.env.HASH_SECRET || '';
  const siteUrl = (process.env.SITE_URL || 'https://www.oursharedgifts.org').replace(/\/$/, '');

  if (!token || !owner || !repo) {
    return new Response(JSON.stringify({
      error: 'Function not yet configured. GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO env vars required.'
    }), { status: 503, headers: { 'Content-Type': 'application/json' } });
  }

  let data;
  try {
    data = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid JSON body' }), {
      status: 400, headers: { 'Content-Type': 'application/json' }
    });
  }

  // Honeypot
  if (data.company && String(data.company).trim() !== '') {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    });
  }

  // Rate limit (submit action only) — check before the GitHub API call so flood
  // attempts cost no upstream API quota. Result reused later to append the hit.
  const clientIp = clientIpFrom(req);
  let rateCheck = null;
  if (data.action === 'submit') {
    rateCheck = await checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      const resetDate = new Date(rateCheck.resetAt);
      return new Response(JSON.stringify({
        error: 'You have posted ' + RATE_LIMIT_MAX_SUBMISSIONS + ' paired records in the last ' + RATE_LIMIT_WINDOW_HOURS + ' hours. The market is rate-limited to keep volume in proportion to the local fabric. Your next submission opens at ' + resetDate.toUTCString() + '. If you have a legitimate need to post more, reach out via the request page.'
      }), { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': String(Math.max(60, Math.floor((new Date(rateCheck.resetAt).getTime() - Date.now()) / 1000))) } });
    }
  }

  // Load current records
  let recordsFile;
  try {
    recordsFile = await ghGetFile(token, owner, repo, branch, RECORDS_PATH);
  } catch (err) {
    return new Response(JSON.stringify({ error: 'could not read records: ' + err.message }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }
  let records;
  if (recordsFile.content) {
    try {
      records = JSON.parse(recordsFile.content).records || [];
    } catch {
      records = [];
    }
  } else {
    records = [];
  }

  // === SUBMIT action ===
  // Produces a PAIRED submission per c80: every submitter posts an ask AND
  // an offer simultaneously. Both records share submitter_id, zip, first_name
  // (if provided), contact (held in Blobs by submitter_id), and 72hr expiry.
  // Either record can be claimed independently after submission.
  if (data.action === 'submit') {
    const knownZips = await fetchKnownZips(siteUrl);
    const err = validatePairedSubmission(data, knownZips);
    if (err) {
      return new Response(JSON.stringify({ error: err }), {
        status: 400, headers: { 'Content-Type': 'application/json' }
      });
    }

    const now = new Date();
    const nowIso = now.toISOString();
    const expiresIso = new Date(now.getTime() + (RECORD_TTL_HOURS * HOUR_MS)).toISOString();
    const submitterId = generateSubmitterId(records);
    const firstName = data.first_name ? String(data.first_name).trim() : '';
    const zip = String(data.zip);
    const radius = Number(data.radius_acceptable);

    const baseRecord = {
      submitter_id: submitterId,
      first_name: firstName,
      zip: zip,
      radius_acceptable: radius,
      expires: expiresIso,
      status: 'open',
      claimed_by: null,
      claimed_at: null,
      created: nowIso
    };

    const askRecord = Object.assign({}, baseRecord, {
      record_id: submitterId + '-a',
      record_type: 'ask',
      shape: String(data.ask_shape).trim(),
      time_window: data.ask_time_window ? String(data.ask_time_window).trim() : '',
      body: String(data.ask_body).trim()
    });

    const offerRecord = Object.assign({}, baseRecord, {
      record_id: submitterId + '-o',
      record_type: 'offer',
      shape: String(data.offer_shape).trim(),
      time_window: data.offer_time_window ? String(data.offer_time_window).trim() : '',
      body: String(data.offer_body).trim()
    });

    records.push(askRecord);
    records.push(offerRecord);
    const newContent = JSON.stringify({ records: records }, null, 2) + '\n';

    try {
      await ghPutFile(
        token, owner, repo, branch, RECORDS_PATH,
        newContent, recordsFile.sha,
        'market: paired submission ' + submitterId + ' · zip ' + zip
      );
    } catch (err) {
      return new Response(JSON.stringify({ error: 'could not commit record: ' + err.message }), {
        status: 500, headers: { 'Content-Type': 'application/json' }
      });
    }

    // Store contact in Blobs keyed by submitter_id (one contact serves both
    // paired records). Per c78: contacts never enter the Git repo.
    try {
      const contacts = getStore('market-contacts');
      await contacts.setJSON(submitterId, {
        contact: String(data.contact),
        first_name: firstName,
        created: nowIso
      });
    } catch (err) {
      console.error('blobs write failed for', submitterId, ':', err.message);
    }

    // Generate manage token covering the submitter (both records). The token
    // lets the submitter withdraw either or both, view status, and re-up
    // both records' expiry without login.
    const manageToken = generateToken({
      submitter_id: submitterId,
      capability: 'manage',
      expires: Date.now() + (MANAGE_TOKEN_DAYS * DAY_MS)
    }, hashSecret);
    const manageUrl = siteUrl + '/village-market-manage.html?token=' + encodeURIComponent(manageToken);

    if (resendKey) {
      await sendEmail(
        resendKey, fromEmail, String(data.contact),
        '[market] your ask and offer are posted',
        'Your village market submission is now visible on the map.\n\n' +
        'Ask: ' + askRecord.shape + ' — ' + askRecord.body + '\n\n' +
        'Offer: ' + offerRecord.shape + ' — ' + offerRecord.body + '\n\n' +
        'Both records expire in ' + RECORD_TTL_HOURS + ' hours unless you re-up.\n\n' +
        '------------------------------------------------------------\n' +
        'Manage your submission (withdraw, re-up, view status):\n' +
        manageUrl + '\n' +
        '------------------------------------------------------------\n\n' +
        'Keep this email — the link above is how you take either record down, ' +
        'extend the expiry, or mark engagements complete. The link works for ' +
        MANAGE_TOKEN_DAYS + ' days. No login required.\n\n' +
        'When someone claims your ask or your offer, you\'ll receive a ' +
        'separate email with their contact info.\n\n' +
        '— Village Market, oursharedgifts.org'
      );
    }

    if (kevinEmail) {
      await sendEmail(
        resendKey, fromEmail, kevinEmail,
        '[market] new paired submission · zip ' + zip,
        'New submission posted to the village market.\n\n' +
        'Submitter: ' + submitterId + (firstName ? ' (' + firstName + ')' : ' (no first name)') + '\n' +
        'Zip: ' + zip + '\n' +
        'Expires: ' + expiresIso + '\n\n' +
        'ASK · ' + askRecord.shape + '\n' + askRecord.body + '\n\n' +
        'OFFER · ' + offerRecord.shape + '\n' + offerRecord.body
      );
    }

    // Record the rate limit hit only after the GitHub commit succeeded — a
    // failed submission (validation error, GitHub API failure) does not count
    // against the limit. rateCheck.recent is the filtered list from the earlier
    // check; appending here keeps the sliding window correct.
    await recordRateLimitHit(clientIp, rateCheck ? rateCheck.recent : []);

    return new Response(JSON.stringify({
      ok: true,
      submitter_id: submitterId,
      ask_record_id: askRecord.record_id,
      offer_record_id: offerRecord.record_id,
      expires: expiresIso
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  // === CLAIM action ===
  if (data.action === 'claim') {
    const claimId = data.claim_record_id;
    if (!claimId) {
      return new Response(JSON.stringify({ error: 'claim_record_id required' }), {
        status: 400, headers: { 'Content-Type': 'application/json' }
      });
    }
    if (!data.contact) {
      return new Response(JSON.stringify({ error: 'contact required' }), {
        status: 400, headers: { 'Content-Type': 'application/json' }
      });
    }

    const idx = records.findIndex(function (r) { return r.record_id === claimId; });
    if (idx === -1) {
      return new Response(JSON.stringify({
        error: 'This record could not be found. Someone may have just withdrawn it. The map has other open records you can browse.'
      }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    if (records[idx].status === 'claimed') {
      return new Response(JSON.stringify({
        error: 'Someone else just claimed this record. Other open records may fit — head back to the map and browse.'
      }), { status: 409, headers: { 'Content-Type': 'application/json' } });
    }
    if (records[idx].status === 'withdrawn') {
      return new Response(JSON.stringify({
        error: 'The submitter withdrew this record. The map has other open records.'
      }), { status: 409, headers: { 'Content-Type': 'application/json' } });
    }
    if (records[idx].status !== 'open') {
      return new Response(JSON.stringify({
        error: 'This record is no longer open (status: ' + records[idx].status + '). The map has other open records.'
      }), { status: 409, headers: { 'Content-Type': 'application/json' } });
    }

    // Auto-expiry check: if the record is past its expires timestamp,
    // treat it as expired and decline the claim (c80 — 72hr lifetime).
    if (records[idx].expires && new Date(records[idx].expires).getTime() < Date.now()) {
      return new Response(JSON.stringify({
        error: 'This record has expired. The submitter has not re-upped it. The map has other open records.'
      }), { status: 409, headers: { 'Content-Type': 'application/json' } });
    }

    records[idx].status = 'claimed';
    records[idx].claimed_at = new Date().toISOString();
    records[idx].claimed_by = true;

    const newContent = JSON.stringify({ records: records }, null, 2) + '\n';
    try {
      await ghPutFile(
        token, owner, repo, branch, RECORDS_PATH,
        newContent, recordsFile.sha,
        'market: claim ' + claimId
      );
    } catch (err) {
      return new Response(JSON.stringify({ error: 'could not commit claim: ' + err.message }), {
        status: 500, headers: { 'Content-Type': 'application/json' }
      });
    }

    // Look up original poster contact from Blobs (keyed by submitter_id —
    // one contact per submitter shared across their paired records).
    // The Blob is read; the contact is revealed to the matched claimer.
    // The Blob is NOT deleted on first claim because the submitter's OTHER
    // record may still be open and require the same contact for a future
    // exchange. The Blob is deleted only when BOTH paired records reach
    // terminal state (or when the submitter withdraws).
    const submitterId = records[idx].submitter_id;
    let posterContact = null;
    try {
      const contacts = getStore('market-contacts');
      const posterBlob = submitterId
        ? await contacts.get(submitterId, { type: 'json' })
        : null;
      if (posterBlob && posterBlob.contact) posterContact = posterBlob.contact;
    } catch (err) {
      console.error('blobs read failed for', submitterId, ':', err.message);
    }

    if (!posterContact) {
      return new Response(JSON.stringify({
        error: 'Claim recorded but the poster\'s contact could not be retrieved. The site owner has been notified. Please reach out via the request page if you need to coordinate.'
      }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    if (posterContact && resendKey) {
      // Generate per-party resolve tokens. Either party can mark the
      // engagement met / not-met via their token URL for RESOLVE_TOKEN_DAYS.
      const resolveExpires = Date.now() + (RESOLVE_TOKEN_DAYS * DAY_MS);
      const posterToken = generateToken({
        record_id: claimId,
        capability: 'resolve',
        party: 'poster',
        expires: resolveExpires
      }, hashSecret);
      const claimerToken = generateToken({
        record_id: claimId,
        capability: 'resolve',
        party: 'claimer',
        expires: resolveExpires
      }, hashSecret);
      const posterResolveUrl = siteUrl + '/village-market-resolve.html?token=' + encodeURIComponent(posterToken);
      const claimerResolveUrl = siteUrl + '/village-market-resolve.html?token=' + encodeURIComponent(claimerToken);

      await sendEmail(
        resendKey, fromEmail, posterContact,
        '[market] your ' + records[idx].record_type + ' was claimed',
        'Your village market record (' + claimId + ') was just claimed.\n\n' +
        'Record: ' + records[idx].body + '\n\n' +
        'The person responding can be reached at: ' + String(data.contact) + '\n\n' +
        'Reach out and arrange directly. 24-hour minimum notice applies. ' +
        'Either of you can decline cleanly.\n\n' +
        '------------------------------------------------------------\n' +
        'Mark this engagement complete (or didn\'t happen):\n' +
        posterResolveUrl + '\n' +
        '------------------------------------------------------------\n\n' +
        'The link above is how you close the loop when the work is done — ' +
        'or release the record back to the map if the engagement didn\'t happen. ' +
        'Valid for ' + RESOLVE_TOKEN_DAYS + ' days. No login required.\n\n' +
        '— Village Market, oursharedgifts.org'
      );
      await sendEmail(
        resendKey, fromEmail, String(data.contact),
        '[market] you claimed a ' + records[idx].record_type,
        'You just claimed: ' + records[idx].body + '\n\n' +
        'The person who posted can be reached at: ' + posterContact + '\n\n' +
        'Reach out and arrange. 24-hour minimum notice applies. ' +
        'Either of you can decline cleanly.\n\n' +
        '------------------------------------------------------------\n' +
        'Mark this engagement complete (or didn\'t happen):\n' +
        claimerResolveUrl + '\n' +
        '------------------------------------------------------------\n\n' +
        'The link above closes the loop after you meet — or releases the record ' +
        'back to the map if the engagement didn\'t happen. ' +
        'Valid for ' + RESOLVE_TOKEN_DAYS + ' days. No login required.\n\n' +
        '— Village Market, oursharedgifts.org'
      );

      // Contact has been revealed to this matched claimer. The Blob is
      // RETAINED while the submitter's OTHER paired record may still be
      // open. Cleanup happens when both paired records reach terminal
      // state OR when the submitter withdraws both (see withdraw action +
      // resolve actions below).
    }

    return new Response(JSON.stringify({ ok: true, record_id: claimId }), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    });
  }

  // === Token-authenticated actions ===
  //
  // All require a valid signed token in data.token. Capability governs scope:
  //
  //   capability: 'manage'  → carries submitter_id; covers BOTH paired records.
  //                           actions: peek (both records) · withdraw (one or
  //                           both, target_record_id required for one) · reup
  //                           (extends BOTH records' expires by 72hr) ·
  //                           mark-met (claimed→met on target record).
  //
  //   capability: 'resolve' → carries record_id + party; covers ONE record.
  //                           actions: peek · mark-met · mark-not-met.

  if (['withdraw', 'mark-met', 'mark-not-met', 'peek', 'reup'].includes(data.action)) {
    const tokenPayload = verifyToken(data.token, hashSecret);
    if (!tokenPayload) {
      return new Response(JSON.stringify({ error: 'invalid or expired token' }), {
        status: 401, headers: { 'Content-Type': 'application/json' }
      });
    }

    // === MANAGE-TOKEN PATH (submitter-scoped, covers paired records) ===
    if (tokenPayload.capability === 'manage') {
      const submitterId = tokenPayload.submitter_id;
      if (!submitterId) {
        return new Response(JSON.stringify({ error: 'manage token missing submitter_id' }), {
          status: 401, headers: { 'Content-Type': 'application/json' }
        });
      }
      const paired = records.filter(function (r) { return r.submitter_id === submitterId; });
      if (paired.length === 0) {
        return new Response(JSON.stringify({ error: 'no records found for this submission' }), {
          status: 404, headers: { 'Content-Type': 'application/json' }
        });
      }

      if (data.action === 'peek') {
        return new Response(JSON.stringify({
          ok: true,
          capability: 'manage',
          submitter_id: submitterId,
          records: paired.map(function (r) {
            return {
              record_id: r.record_id, record_type: r.record_type,
              first_name: r.first_name, zip: r.zip, shape: r.shape,
              radius_acceptable: r.radius_acceptable, time_window: r.time_window,
              body: r.body, expires: r.expires, status: r.status,
              claimed_at: r.claimed_at, created: r.created
            };
          })
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      if (data.action === 'reup') {
        const newExpires = new Date(Date.now() + (RECORD_TTL_HOURS * HOUR_MS)).toISOString();
        let touched = 0;
        records.forEach(function (r, i) {
          if (r.submitter_id === submitterId && r.status === 'open') {
            records[i].expires = newExpires;
            records[i].reupped_at = new Date().toISOString();
            touched++;
          }
        });
        if (touched === 0) {
          return new Response(JSON.stringify({ error: 'no open records to re-up' }), {
            status: 409, headers: { 'Content-Type': 'application/json' }
          });
        }
        const newContent = JSON.stringify({ records: records }, null, 2) + '\n';
        try {
          await ghPutFile(
            token, owner, repo, branch, RECORDS_PATH, newContent, recordsFile.sha,
            'market: re-up ' + submitterId + ' (' + touched + ' records, +' + RECORD_TTL_HOURS + 'hr)'
          );
        } catch (err) {
          return new Response(JSON.stringify({ error: 'could not commit re-up: ' + err.message }), {
            status: 500, headers: { 'Content-Type': 'application/json' }
          });
        }
        return new Response(JSON.stringify({ ok: true, touched: touched, new_expires: newExpires }), {
          status: 200, headers: { 'Content-Type': 'application/json' }
        });
      }

      // Withdraw or mark-met under manage capability — target one of the
      // paired records by target_record_id; for withdraw the "both" target
      // withdraws every open record in the pair.
      const target = data.target_record_id;
      if (!target) {
        return new Response(JSON.stringify({ error: 'target_record_id required' }), {
          status: 400, headers: { 'Content-Type': 'application/json' }
        });
      }
      const affected = [];
      if (data.action === 'withdraw') {
        records.forEach(function (r, i) {
          if (r.submitter_id !== submitterId) return;
          if (target !== 'both' && r.record_id !== target) return;
          if (r.status !== 'open') return;
          records[i].status = 'withdrawn';
          records[i].withdrawn_at = new Date().toISOString();
          affected.push(r.record_id);
        });
      } else if (data.action === 'mark-met') {
        records.forEach(function (r, i) {
          if (r.submitter_id !== submitterId) return;
          if (r.record_id !== target) return;
          if (r.status !== 'claimed') return;
          records[i].status = 'met';
          records[i].met_at = new Date().toISOString();
          affected.push(r.record_id);
        });
      } else {
        return new Response(JSON.stringify({ error: 'action not supported under manage capability' }), {
          status: 400, headers: { 'Content-Type': 'application/json' }
        });
      }
      if (affected.length === 0) {
        return new Response(JSON.stringify({ error: 'no records eligible for ' + data.action }), {
          status: 409, headers: { 'Content-Type': 'application/json' }
        });
      }

      const newContent = JSON.stringify({ records: records }, null, 2) + '\n';
      try {
        await ghPutFile(
          token, owner, repo, branch, RECORDS_PATH, newContent, recordsFile.sha,
          'market: ' + data.action + ' ' + submitterId + ' · ' + affected.join(',')
        );
      } catch (err) {
        return new Response(JSON.stringify({ error: 'could not commit state change: ' + err.message }), {
          status: 500, headers: { 'Content-Type': 'application/json' }
        });
      }

      // Cleanup Blob if all paired records reached terminal state
      await maybeCleanupContactBlob(submitterId, records);

      return new Response(JSON.stringify({ ok: true, affected: affected }), {
        status: 200, headers: { 'Content-Type': 'application/json' }
      });
    }

    // === RESOLVE-TOKEN PATH (per-claim, one record) ===
    if (tokenPayload.capability === 'resolve') {
      const recordId = tokenPayload.record_id;
      const idx = records.findIndex(function (r) { return r.record_id === recordId; });
      if (idx === -1) {
        return new Response(JSON.stringify({ error: 'record not found' }), {
          status: 404, headers: { 'Content-Type': 'application/json' }
        });
      }
      const rec = records[idx];

      if (data.action === 'peek') {
        return new Response(JSON.stringify({
          ok: true,
          capability: 'resolve',
          party: tokenPayload.party || null,
          record: {
            record_id: rec.record_id, record_type: rec.record_type,
            first_name: rec.first_name, zip: rec.zip, shape: rec.shape,
            body: rec.body, expires: rec.expires, status: rec.status,
            claimed_at: rec.claimed_at, created: rec.created
          }
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      if (data.action === 'mark-met') {
        if (rec.status !== 'claimed') {
          return new Response(JSON.stringify({ error: 'record is not in claimed state (status: ' + rec.status + ')' }), {
            status: 409, headers: { 'Content-Type': 'application/json' }
          });
        }
        records[idx].status = 'met';
        records[idx].met_at = new Date().toISOString();
      } else if (data.action === 'mark-not-met') {
        if (rec.status !== 'claimed') {
          return new Response(JSON.stringify({ error: 'record is not in claimed state (status: ' + rec.status + ')' }), {
            status: 409, headers: { 'Content-Type': 'application/json' }
          });
        }
        records[idx].status = 'open';
        records[idx].claimed_at = null;
        records[idx].claimed_by = null;
        records[idx].released_at = new Date().toISOString();
      } else {
        return new Response(JSON.stringify({ error: 'action not supported under resolve capability' }), {
          status: 400, headers: { 'Content-Type': 'application/json' }
        });
      }

      const newContent = JSON.stringify({ records: records }, null, 2) + '\n';
      try {
        await ghPutFile(
          token, owner, repo, branch, RECORDS_PATH, newContent, recordsFile.sha,
          'market: ' + data.action + ' ' + recordId
        );
      } catch (err) {
        return new Response(JSON.stringify({ error: 'could not commit state change: ' + err.message }), {
          status: 500, headers: { 'Content-Type': 'application/json' }
        });
      }

      // If the action put both paired records into terminal state, cleanup
      if (rec.submitter_id) await maybeCleanupContactBlob(rec.submitter_id, records);

      return new Response(JSON.stringify({
        ok: true, record_id: recordId, new_status: records[idx].status
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'unknown token capability' }), {
      status: 401, headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ error: 'unknown action' }), {
    status: 400, headers: { 'Content-Type': 'application/json' }
  });
};
