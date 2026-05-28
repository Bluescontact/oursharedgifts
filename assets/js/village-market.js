// village-market.js
// Renders ask + offer records from market/records.json onto a Leaflet +
// OpenStreetMap map at zip-code centroid resolution. Reads
// market/zip-coords.json for zip → lat/lng lookup. Records expire 72hr
// after creation (c80); expired records are filtered client-side.
//
// First-name field is optional on the public surface: rendered when
// present, omitted (just zip) when blank. Per c80 instance choice.
//
// Pickup-practitioner: change CENTER_ZIP + RADIUS_MILES + (optionally) the
// zip-coords table to your radius.

(function () {
  'use strict';

  // Practitioner config — change to relocate a fork.
  const CENTER_ZIP = '95945';        // Grass Valley, CA
  const RADIUS_MILES = 45;
  const CENTER_FALLBACK = [39.2191, -121.0611];

  const TYPE_COLORS = {
    'ask': '#3a6a7e',    // var(--conn)
    'offer': '#7e5a3a'   // var(--arch)
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

  // Offset paired records (ask + offer at same zip) so both pins are visible
  function offsetForType(rec) {
    return rec.record_type === 'offer'
      ? { lat: 0.0010, lng: 0.0015 }
      : { lat: -0.0010, lng: -0.0015 };
  }

  function recordToPin(rec) {
    const base = zipCoords[rec.zip];
    if (!base) return null;
    const off = offsetForType(rec);
    const coords = [base[0] + off.lat, base[1] + off.lng];
    const color = TYPE_COLORS[rec.record_type] || '#666';
    const marker = L.circleMarker(coords, {
      radius: 9,
      fillColor: color,
      color: color,
      weight: 2,
      fillOpacity: 0.55
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
    const typeLabel = rec.record_type.charAt(0).toUpperCase() + rec.record_type.slice(1);
    const tagClass = rec.record_type === 'offer' ? 'offer-tag' : 'ask-tag';
    const nameLine = rec.first_name
      ? '<strong>' + escapeHtml(rec.first_name) + '</strong> · '
      : '';
    const expiresIn = hoursUntil(rec.expires);
    const expiresLine = expiresIn !== null
      ? '<div class="footer">Expires in ' + expiresIn + 'h</div>'
      : '';
    const claimedBlock = rec.status === 'open'
      ? '<button class="claim-btn" data-claim="' + escapeHtml(rec.record_id) + '">Claim this</button>'
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
      if (rec.status !== 'open') return false;
      if (isExpired(rec)) return false;
      if (f.types.indexOf(rec.record_type) === -1) return false;
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
    const recs = filteredRecords();
    if (recs.length === 0) {
      container.innerHTML = '<div class="empty-state">No open records in the current view. The fabric is quiet.</div>';
      return;
    }
    const rows = recs.map(function (rec) {
      const typeLabel = rec.record_type === 'ask' ? 'Ask' : 'Offer';
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

    const radiusMeters = RADIUS_MILES * 1609.34;
    L.circle(center, {
      radius: radiusMeters,
      color: '#999',
      weight: 1,
      fillOpacity: 0.04,
      dashArray: '4 6'
    }).addTo(map);

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
      container.innerHTML = '<div class="empty-state">Could not load records. The map will be available once the data files are in place.</div>';
    }
  });
})();
