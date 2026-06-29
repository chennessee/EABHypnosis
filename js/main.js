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

  // ==================== YOUTUBE DYNAMIC CONTAINER ====================
  // Hide any iframe wrap with no src. If every iframe in a section is empty,
  // hide the entire .youtube-section. The moment a real src is added to any
  // iframe (in the HTML), that wrap + its section re-appear automatically on reload.
  document.querySelectorAll('.youtube-section').forEach(function (section) {
    var iframes = section.querySelectorAll('.youtube-embed-wrap iframe');
    var anyLive = false;

    iframes.forEach(function (iframe) {
      var src = (iframe.getAttribute('src') || '').trim();
      var wrap = iframe.closest('.youtube-embed-wrap');
      if (!src || src === '#') {
        if (wrap) wrap.style.display = 'none';
      } else {
        if (wrap) wrap.style.display = '';
        anyLive = true;
      }
    });

    // If no live videos, collapse the whole section so the visit-channel CTA
    // and "Watch & Learn" heading don't sit on top of empty placeholders.
    if (!anyLive) {
      section.style.display = 'none';
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

  // ==================== CONTACT FORM (Web3Forms) ====================
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    var statusEl = document.getElementById('cf-status');
    var submitBtn = document.getElementById('cf-submit');
    var submitLabel = submitBtn ? submitBtn.querySelector('.cf-submit-label') : null;
    var originalLabel = submitLabel ? submitLabel.textContent : 'Send Message';

    function setStatus(msg, kind) {
      if (!statusEl) return;
      statusEl.textContent = msg;
      statusEl.classList.remove('success', 'error');
      if (kind) statusEl.classList.add(kind);
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Spam honeypot check
      var honeypot = contactForm.querySelector('.botcheck');
      if (honeypot && honeypot.checked) return;

      // Basic native validation
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      var data = new FormData(contactForm);

      // Block submission if access key not yet configured
      var key = data.get('access_key');
      if (!key || key === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
        setStatus('Form not yet configured. Please email ebrager@gmail.com directly.', 'error');
        return;
      }

      setStatus('');
      if (submitBtn) submitBtn.disabled = true;
      if (submitLabel) submitLabel.textContent = 'Sending…';

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
      .then(function (res) { return res.json().then(function (json) { return { ok: res.ok, json: json }; }); })
      .then(function (result) {
        if (result.ok && result.json && result.json.success) {
          setStatus('Thank you — your message has been sent. Elizabeth will be in touch personally within 1–2 business days.', 'success');
          contactForm.reset();
        } else {
          var msg = (result.json && result.json.message) ? result.json.message : 'Something went wrong sending your message.';
          setStatus(msg + ' Please try again or email ebrager@gmail.com directly.', 'error');
        }
      })
      .catch(function () {
        setStatus('Network error — please try again or email ebrager@gmail.com directly.', 'error');
      })
      .finally(function () {
        if (submitBtn) submitBtn.disabled = false;
        if (submitLabel) submitLabel.textContent = originalLabel;
      });
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
