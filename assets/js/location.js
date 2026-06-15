// To update location: change SITE_LOCATION here. One edit updates the whole site on next deploy.
var SITE_LOCATION = 'Grass Valley';
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.site-loc').forEach(function (el) {
    el.textContent = SITE_LOCATION;
  });
  document.querySelectorAll('[data-loc-placeholder]').forEach(function (el) {
    el.placeholder = 'town, or how far from ' + SITE_LOCATION;
  });
});
