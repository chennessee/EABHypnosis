// EAB Hypnosis — main.js

(function () {
  'use strict';

  // ==================== HEADER SCROLL ====================
  const header = document.querySelector('.site-header');
  const isTransparent = header && header.classList.contains('transparent');

  function updateHeader() {
    if (!header || !isTransparent) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  if (isTransparent) {
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // ==================== HAMBURGER MENU ====================
  const hamburger  = document.querySelector('.hamburger');
  const mobileNav  = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('.mobile-nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && hamburger.classList.contains('open')) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });
  }

  // ==================== ACTIVE NAV LINK ====================
  var currentFile = window.location.pathname.split('/').pop() || 'index.html';
  if (currentFile === '') currentFile = 'index.html';

  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentFile) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // ==================== YOUTUBE PLACEHOLDER ====================
  // If an iframe has no src, show a styled placeholder rather than a blank frame
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
    style.textContent = '.reveal-item{opacity:0;transform:translateY(22px);transition:opacity .65s ease,transform .65s ease;} .reveal-item.revealed{opacity:1;transform:translateY(0);}';
    document.head.appendChild(style);

    var targets = document.querySelectorAll(
      '.service-card, .service-card-full, .download-card, .white-paper-card'
    );

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, idx) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = (idx * 80) % 480;
          el.style.transitionDelay = delay + 'ms';
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) {
      el.classList.add('reveal-item');
      observer.observe(el);
    });
  }

})();
