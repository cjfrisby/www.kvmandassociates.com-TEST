/* KVM & Associates — site interactions
   ---------------------------------------------
   Currently: mobile hamburger menu toggle.
*/
(function () {
  'use strict';

  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    function closeMenu() {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }

    function openMenu() {
      links.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
    }

    toggle.addEventListener('click', function () {
      if (links.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close the menu after tapping any link inside it
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });

    // If the viewport resizes back to desktop, reset state
    var mq = window.matchMedia('(min-width: 821px)');
    function handleResize(e) {
      if (e.matches) closeMenu();
    }
    if (mq.addEventListener) {
      mq.addEventListener('change', handleResize);
    } else if (mq.addListener) {
      mq.addListener(handleResize);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
})();
