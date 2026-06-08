// village-market.js
// Renders the Gift Circle on a Leaflet + OpenStreetMap map from
// market/records.json, at zip-code centroid resolution (market/zip-coords.json).
//
// Record types:
//   ask   — gift-work or support someone needs        (blue / --conn)
//   offer — gift-work or support someone has to give   (gold / --arch)
//   host  — a parking spot a host extends to the bus   (green / --bound)
//   bus   — where Kevin + the bus are now / headed next (ink, larger pin)
//
// Back-office model: posting is mediated. A submission emails Kevin + the
// back-office; records are curated into records.json and pushed. The map is
// real and public; the intake routes through the back-office, not a server.
//
// Records expire 72hr after creation unless re-upped (host + bus records can
// set their own longer 'expires'). Expired records are filtered client-side.

(function () {
  'use strict';

  // Practitioner config — change to relocate a fork.
  const CENTER_ZIP = '95945';        // Grass Valley, CA (where the bus heads July 1)
  const RADIUS_MILES = 45;
  const CENTER_FALLBACK = [39.2191, -121.0611];

  const TYPE_COLORS = {
    'ask': '#3d7ab5',    // --conn
    'offer': '#a89030',  // --arch
    'host': '#558a3e',   // --bound  (a spot for the bus)
    'bus': '#2c2c2c'     // --ink    (where the bus is)
  };

  const CLAIM_LABEL = {
    'ask': 'I can help with this',
    'offer': 'I could use this',
    'host': 'Ask about this spot'
  };

  let map = null;
  let allRecords = [];
  let zipCoords = {};
  let markerLayer = null;

  async function loadJson(path) {
    const r = await fetch(path);
    if (!r.ok) throw new Error('failed to load ' + path);
    return r.json();
  }

  function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function isExpired(rec) {
    if (!rec.expires) return false;
    return new Date(rec.expires).getTime() < Date.now();
  }

  // Offset paired records at the same zip so multiple pins are visible
  function offsetForType(rec) {
    switch (rec.record_type) {
      case 'offer': return { lat: 0.0011, lng: 0.0016 };
      case 'host':  return { lat: 0.0011, lng: -0.0016 };
      case 'bus':   return { lat: 0, lng: 0 };
      default:      return { lat: -0.0011, lng: -0.0016 }; // ask
    }
  }

  function recordToPin(rec) {
    const base = zipCoords[rec.zip];
    if (!base) return null;
    const off = offsetForType(rec);
    const coords = [base[0] + off.lat, base[1] + off.lng];
    const color = TYPE_COLORS[rec.record_type] || '#666';
    const isBus = rec.record_type === 'bus';
    const marker = L.circleMarker(coords, {
      radius: isBus ? 12 : 9,
      fillColor: color,
      color: color,
      weight: isBus ? 3 : 2,
      fillOpacity: isBus ? 0.85 : 0.55
    });
    marker.bindPopup(buildPopup(rec));
    return marker;
  }

  function hoursUntil(iso) {
    if (!iso) return null;
    const ms = new Date(iso).getTime() - Date.now();
    if (ms <= 0) return 0;
    return Math.max(1, Math.round(ms / (60 * 60 * 1000)));
  }

  function buildPopup(rec) {
    if (rec.record_type === 'bus') {
      return '' +
        '<div class="record-popup">' +
          '<div class="meta"><span class="shape bus-tag">The bus</span> ' + escapeHtml(rec.zip) + '</div>' +
          '<div class="body">' + escapeHtml(rec.body || '') + '</div>' +
          (rec.time_window ? '<div class="footer">' + escapeHtml(rec.time_window) + '</div>' : '') +
        '</div>';
    }
    const typeLabel = rec.record_type.charAt(0).toUpperCase() + rec.record_type.slice(1);
    const tagClass = rec.record_type === 'offer' ? 'offer-tag'
                   : rec.record_type === 'host' ? 'host-tag' : 'ask-tag';
    const nameLine = rec.first_name
      ? '<strong>' + escapeHtml(rec.first_name) + '</strong> · '
      : '';
    const expiresIn = hoursUntil(rec.expires);
    const expiresLine = expiresIn !== null
      ? '<div class="footer">Open for ' + expiresIn + 'h more</div>'
      : '';
    const label = CLAIM_LABEL[rec.record_type] || 'Reach out';
    const claimedBlock = rec.status === 'open'
      ? '<button class="claim-btn" data-claim="' + escapeHtml(rec.record_id) + '">' + label + '</button>'
      : '<div class="claimed">' + escapeHtml(rec.status) + '</div>';
    return '' +
      '<div class="record-popup">' +
        '<div class="meta">' +
          '<span class="shape ' + tagClass + '">' + escapeHtml(typeLabel) + '</span>' +
          '<span class="shape">' + escapeHtml(rec.shape || '') + '</span>' +
          nameLine + 'zip ' + escapeHtml(rec.zip) +
        '</div>' +
        '<div class="body">' + escapeHtml(rec.body || '') + '</div>' +
        '<div class="footer">' +
          (rec.time_window ? 'When: ' + escapeHtml(rec.time_window) + '<br>' : '') +
          'Within ' + escapeHtml(rec.radius_acceptable || RADIUS_MILES) + ' miles of zip ' + escapeHtml(rec.zip) +
        '</div>' +
        expiresLine +
        claimedBlock +
      '</div>';
  }

  function getFilters() {
    const types = [];
    document.querySelectorAll('input[data-filter]').forEach(function (cb) {
      if (cb.checked) types.push(cb.dataset.filter);
    });
    return { types: types };
  }

  function filteredRecords() {
    const f = getFilters();
    return allRecords.filter(function (rec) {
      if (rec.record_type === 'bus') return true; // the bus pin always shows
      if (rec.status && rec.status !== 'open') return false;
      if (isExpired(rec)) return false;
      if (f.types.length && f.types.indexOf(rec.record_type) === -1) return false;
      return true;
    });
  }

  function renderPins() {
    if (markerLayer) {
      markerLayer.clearLayers();
    } else {
      markerLayer = L.layerGroup().addTo(map);
    }
    filteredRecords().forEach(function (rec) {
      const pin = recordToPin(rec);
      if (pin) markerLayer.addLayer(pin);
    });
  }

  function renderList() {
    const container = document.getElementById('records-list-container');
    if (!container) return;
    const recs = filteredRecords().filter(function (r) { return r.record_type !== 'bus'; });
    if (recs.length === 0) {
      container.innerHTML = '<div class="empty-state">Nothing open in view right now. The fabric is quiet — or it is waiting for you to be the first.</div>';
      return;
    }
    const rows = recs.map(function (rec) {
      const typeLabel = rec.record_type.charAt(0).toUpperCase() + rec.record_type.slice(1);
      const namePart = rec.first_name
        ? '<span class="zip">' + escapeHtml(rec.first_name) + ' · ' + escapeHtml(rec.zip) + '</span>'
        : '<span class="zip">zip ' + escapeHtml(rec.zip) + '</span>';
      const expiresIn = hoursUntil(rec.expires);
      const expiresPart = expiresIn !== null
        ? ' · <span class="zip">' + expiresIn + 'h left</span>'
        : '';
      return '' +
        '<div class="record-row">' +
          '<span class="type ' + escapeHtml(rec.record_type) + '">' + escapeHtml(typeLabel) + '</span>' +
          '<span class="body">' + escapeHtml(rec.body || '') + '</span>' +
          namePart + expiresPart +
        '</div>';
    });
    container.innerHTML = rows.join('');
  }

  function initMap() {
    const center = zipCoords[CENTER_ZIP] || CENTER_FALLBACK;
    map = L.map('village-map').setView(center, 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // If a bus record is present, center on it instead.
    const bus = allRecords.find(function (r) { return r.record_type === 'bus'; });
    if (bus && zipCoords[bus.zip]) {
      map.setView(zipCoords[bus.zip], 10);
    }

    renderPins();
  }

  function attachFilters() {
    document.querySelectorAll('input[data-filter]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        renderPins();
        renderList();
      });
    });
  }

  document.addEventListener('click', function (e) {
    const btn = e.target.closest && e.target.closest('[data-claim]');
    if (!btn) return;
    const recordId = btn.dataset.claim;
    window.location.href = '/village-market-submit.html?claim=' + encodeURIComponent(recordId);
  });

  Promise.all([
    loadJson('/market/records.json'),
    loadJson('/market/zip-coords.json')
  ]).then(function (results) {
    allRecords = results[0].records || [];
    zipCoords = results[1];
    initMap();
    renderList();
    attachFilters();
  }).catch(function (err) {
    console.error(err);
    const container = document.getElementById('records-list-container');
    if (container) {
      container.innerHTML = '<div class="empty-state">Could not load the map data.</div>';
    }
  });
})();
