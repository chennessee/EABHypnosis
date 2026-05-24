// EAB Hypnosis — main.js

(function () {
  'use strict';

  // ==================== MOBILE VIEWPORT HEIGHT FIX ====================
  // Fixes iOS Safari 100vh bug where browser chrome eats into viewport
  function setVh() {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  }
  setVh();
  window.addEventListener('resize', setVh, { passive: true });
  window.addEventListener('orientationchange', function () {
    setTimeout(setVh, 120); // slight delay lets browser settle after rotation
  });

  // ==================== HEADER SCROLL ====================
  var header       = document.querySelector('.site-header');
  var isTransparent = header && header.classList.contains('transparent');

  function updateHeader() {
    if (!header || !isTransparent) return;
    header.classList.toggle('scrolled', window.scrollY > 50);
  }

  if (isTransparent) {
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // ==================== HAMBURGER MENU ====================
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');

  function closeNav() {
    if (!hamburger || !mobileNav) return;
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openNav() {
    if (!hamburger || !mobileNav) return;
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  if (hamburger && mobileNav) {
    // Toggle on hamburger click
    hamburger.addEventListener('click', function () {
      hamburger.classList.contains('open') ? closeNav() : openNav();
    });

    // Close when a nav link is tapped
    mobileNav.querySelectorAll('.mobile-nav-link').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    // Close on outside tap
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        closeNav();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && hamburger.classList.contains('open')) {
        closeNav();
        hamburger.focus();
      }
    });

    // Close nav when window resizes past mobile breakpoint
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) closeNav();
    }, { passive: true });

    // ── Swipe left on mobile nav to close ──
    var swipeStartX = null;
    mobileNav.addEventListener('touchstart', function (e) {
      swipeStartX = e.touches[0].clientX;
    }, { passive: true });

    mobileNav.addEventListener('touchend', function (e) {
      if (swipeStartX === null) return;
      var dx = e.changedTouches[0].clientX - swipeStartX;
      if (dx < -60) closeNav(); // swipe left > 60px = close
      swipeStartX = null;
    }, { passive: true });

    // ── Focus trap inside mobile nav while open ──
    mobileNav.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !hamburger.classList.contains('open')) return;
      var focusable = mobileNav.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
  }

  // ==================== ACTIVE NAV LINK ====================
  var currentFile = window.location.pathname.split('/').pop() || 'index.html';
  if (currentFile === '') currentFile = 'index.html';

  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(function (link) {
    if (link.getAttribute('href') === currentFile) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // ==================== YOUTUBE PLACEHOLDER ====================
  document.querySelectorAll('.youtube-embed-wrap iframe').forEach(function (iframe) {
    if (!iframe.getAttribute('src')) {
      var wrap = iframe.parentElement;
      wrap.classList.add('empty-embed');
      iframe.style.display = 'none';
      var msg = document.createElement('p');
      msg.textContent = 'Video coming soon';
      msg.style.cssText = 'font-family:inherit;font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;';
      wrap.appendChild(msg);
    }
  });

  // ==================== SCROLL REVEAL ====================
  if ('IntersectionObserver' in window) {
    var style = document.createElement('style');
    style.textContent = [
      '.reveal-item{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease;}',
      '.reveal-item.revealed{opacity:1;transform:translateY(0);}'
    ].join('');
    document.head.appendChild(style);

    var revealSelectors = [
      '.service-card',
      '.service-card-full',
      '.download-card',
      '.white-paper-card',
      '.bio-grid',
      '.about-grid',
      '.download-banner-inner',
      '.credential-tag',
      '.bio-pull-quote',
      '.patreon-section .section-heading',
      '.patreon-section .section-subheading'
    ].join(', ');

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.style.transitionDelay = ((i * 75) % 400) + 'ms';
          el.classList.add('revealed');
          revealObserver.unobserve(el);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll(revealSelectors).forEach(function (el) {
      el.classList.add('reveal-item');
      revealObserver.observe(el);
    });
  }

  // ==================== SMOOTH ANCHOR SCROLL ====================
  // Offsets for fixed header so anchors don't hide under it
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var headerH = header ? header.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

})();
