/* ═══════════════════════════════════════════════════════════
   OUR SHARED GIFTS — Navigation Script
   menu.js

   Handles:
   - Hamburger toggle for mobile
   - Dropdown open/close on click
   - Close dropdowns on outside click
   - Close mobile menu when a link is clicked
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Inject hamburger button ───
  // The button is added via JS so pages don't each need it in markup.
  var header = document.querySelector('header .container');
  var nav = document.querySelector('header nav');
  if (!header || !nav) return;

  var toggle = document.createElement('button');
  toggle.className = 'nav-toggle';
  toggle.setAttribute('aria-label', 'Menu');
  toggle.innerHTML = '<span></span><span></span><span></span>';
  header.insertBefore(toggle, nav);

  // ─── Hamburger toggle ───
  toggle.addEventListener('click', function () {
    toggle.classList.toggle('active');
    nav.classList.toggle('open');
  });

  // ─── Dropdown toggle ───
  var dropdownTriggers = document.querySelectorAll('.dropdown > a');

  dropdownTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      var parent = trigger.parentElement;
      var wasOpen = parent.classList.contains('open');

      // Close all other dropdowns
      document.querySelectorAll('.dropdown').forEach(function (d) {
        d.classList.remove('open');
      });

      // Toggle the clicked one
      if (!wasOpen) {
        parent.classList.add('open');
      }
    });
  });

  // ─── Close dropdowns on outside click ───
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown').forEach(function (d) {
        d.classList.remove('open');
      });
    }
  });

  // ─── Close mobile menu when a non-dropdown link is clicked ───
  var navLinks = nav.querySelectorAll('a');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      // Only close if it's not a dropdown trigger
      if (!link.parentElement.classList.contains('dropdown')) {
        toggle.classList.remove('active');
        nav.classList.remove('open');
      }
    });
  });

})();
