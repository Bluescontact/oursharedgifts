/* ═══════════════════════════════════════════════════════════════
   Our Shared Gifts — Mobile Navigation
   Hamburger menu with slide-in panel
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  var nav = document.querySelector('nav');
  var header = document.querySelector('header .container');
  if (!nav || !header) return;

  // Create hamburger button
  var hamburger = document.createElement('button');
  hamburger.className = 'hamburger';
  hamburger.setAttribute('aria-label', 'Toggle navigation');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.innerHTML = '&#9776;';

  // Create overlay
  var overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);

  // Insert hamburger after h1
  var h1 = header.querySelector('h1');
  if (h1) {
    h1.parentNode.insertBefore(hamburger, h1.nextSibling);
  }

  function openMenu() {
    nav.classList.add('open');
    overlay.style.display = 'block';
    hamburger.innerHTML = '&times;';
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('open');
    overlay.style.display = 'none';
    hamburger.innerHTML = '&#9776;';
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function() {
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  // Handle dropdowns on mobile
  var dropdowns = nav.querySelectorAll('.dropdown > a');
  dropdowns.forEach(function(link) {
    link.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        var parent = this.parentElement;
        var wasOpen = parent.classList.contains('open');

        // Close all dropdowns
        nav.querySelectorAll('.dropdown').forEach(function(d) {
          d.classList.remove('open');
        });

        // Toggle clicked one
        if (!wasOpen) {
          parent.classList.add('open');
        }
      }
    });
  });

  // Close menu on nav link click (mobile)
  nav.querySelectorAll('.dropdown-content a').forEach(function(link) {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });

  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Close on resize to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      closeMenu();
      nav.querySelectorAll('.dropdown').forEach(function(d) {
        d.classList.remove('open');
      });
    }
  });
})();
