/* ============================================================
   MOBILE OIL CHANGE — JAVASCRIPT (vanilla JS, no dependencies)
   ------------------------------------------------------------
   Handles:
   1.  Page loader
   2.  Sticky navbar shadow on scroll
   3.  Mobile hamburger menu
   4.  Active navigation highlighting
   5.  Scroll reveal animations
   6.  Scroll-to-top button
   7.  FAQ accordion
   8.  Booking form validation + submission handling
   9.  Footer year
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Helper: run once the DOM is ready
     ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setupLoader();
    setupNavbarScroll();
    setupMobileMenu();
    setupActiveNav();
    setupScrollReveal();
    setupScrollTop();
    setupAccordion();
    setupBookingForm();
    setFooterYear();
    setMinBookingDate();
  }

  /* ----------------------------------------------------------
     1. PAGE LOADER — hide once everything is loaded
     ---------------------------------------------------------- */
  function setupLoader() {
    var loader = document.getElementById('loader');
    if (!loader) return;
    var hide = function () {
      loader.classList.add('is-hidden');
      // Remove from DOM after the transition for accessibility
      setTimeout(function () { loader.remove(); }, 500);
    };
    // Hide on load, with a safety fallback timeout
    window.addEventListener('load', hide);
    setTimeout(hide, 1600);
  }

  /* ----------------------------------------------------------
     2. STICKY NAVBAR — add shadow after scrolling down
     ---------------------------------------------------------- */
  function setupNavbarScroll() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    var onScroll = function () {
      navbar.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ----------------------------------------------------------
     3. MOBILE HAMBURGER MENU
     ---------------------------------------------------------- */
  function setupMobileMenu() {
    var toggle = document.getElementById('nav-toggle');
    var menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    var closeMenu = function () {
      toggle.classList.remove('is-open');
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    };

    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('nav-open', isOpen);
    });

    // Close the menu when a link is clicked
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    // Close if resized up to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  /* ----------------------------------------------------------
     4. ACTIVE NAVIGATION HIGHLIGHTING (scroll spy)
     ---------------------------------------------------------- */
  function setupActiveNav() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var sections = links
      .map(function (link) {
        var id = link.getAttribute('href');
        return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
      })
      .filter(Boolean);

    var setActive = function (id) {
      links.forEach(function (link) {
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
      });
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ----------------------------------------------------------
     5. SCROLL REVEAL ANIMATIONS (fade-in)
     ---------------------------------------------------------- */
  function setupScrollReveal() {
    var revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    // If IntersectionObserver isn't supported, just show everything
    if (!('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target); // reveal once, then stop watching
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el, i) {
      // Slight stagger for grouped items
      el.style.transitionDelay = (i % 4) * 60 + 'ms';
      observer.observe(el);
    });
  }

  /* ----------------------------------------------------------
     6. SCROLL-TO-TOP BUTTON
     ---------------------------------------------------------- */
  function setupScrollTop() {
    var btn = document.getElementById('scroll-top');
    if (!btn) return;
    var onScroll = function () {
      btn.classList.toggle('is-visible', window.scrollY > 500);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------
     7. FAQ ACCORDION
     ---------------------------------------------------------- */
  function setupAccordion() {
    var items = document.querySelectorAll('.accordion__item');
    if (!items.length) return;

    items.forEach(function (item) {
      var trigger = item.querySelector('.accordion__trigger');
      var panel = item.querySelector('.accordion__panel');
      if (!trigger || !panel) return;

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');

        // Optional: close others for a classic accordion feel.
        // Comment out this block to allow multiple open at once.
        items.forEach(function (other) {
          if (other !== item) {
            other.classList.remove('is-open');
            other.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
            other.querySelector('.accordion__panel').style.maxHeight = null;
          }
        });

        item.classList.toggle('is-open', !isOpen);
        trigger.setAttribute('aria-expanded', String(!isOpen));
        panel.style.maxHeight = !isOpen ? panel.scrollHeight + 'px' : null;
      });
    });

    // Recalculate open panel height on resize
    window.addEventListener('resize', function () {
      document.querySelectorAll('.accordion__item.is-open .accordion__panel')
        .forEach(function (panel) { panel.style.maxHeight = panel.scrollHeight + 'px'; });
    });
  }

  /* ----------------------------------------------------------
     8. BOOKING FORM — validation + submission
     ---------------------------------------------------------- */
  function setupBookingForm() {
    var form = document.getElementById('booking-form');
    if (!form) return;
    var status = document.getElementById('form-status');

    // Required fields and their friendly labels
    var required = {
      name: 'your name',
      phone: 'a phone number',
      email: 'a valid email',
      date: 'a preferred date',
      time: 'a preferred time',
      address: 'a service address'
    };

    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phoneRe = /[0-9]{7,}/; // at least 7 digits

    function showError(field, message) {
      var group = field.closest('.form__group');
      var errorEl = form.querySelector('[data-error-for="' + field.id + '"]');
      if (group) group.classList.add('has-error');
      if (errorEl) errorEl.textContent = message;
    }
    function clearError(field) {
      var group = field.closest('.form__group');
      var errorEl = form.querySelector('[data-error-for="' + field.id + '"]');
      if (group) group.classList.remove('has-error');
      if (errorEl) errorEl.textContent = '';
    }

    // Live clearing of errors as the user types
    Object.keys(required).forEach(function (id) {
      var field = document.getElementById(id);
      if (field) field.addEventListener('input', function () { clearError(field); });
    });

    function validate() {
      var valid = true;
      var firstInvalid = null;

      Object.keys(required).forEach(function (id) {
        var field = document.getElementById(id);
        if (!field) return;
        var value = field.value.trim();
        clearError(field);

        if (!value) {
          showError(field, 'Please enter ' + required[id] + '.');
          valid = false;
          firstInvalid = firstInvalid || field;
        } else if (id === 'email' && !emailRe.test(value)) {
          showError(field, 'Please enter a valid email address.');
          valid = false;
          firstInvalid = firstInvalid || field;
        } else if (id === 'phone' && !phoneRe.test(value)) {
          showError(field, 'Please enter a valid phone number.');
          valid = false;
          firstInvalid = firstInvalid || field;
        }
      });

      if (firstInvalid) firstInvalid.focus();
      return valid;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (status) { status.textContent = ''; status.className = 'form__status'; }

      if (!validate()) {
        if (status) {
          status.textContent = 'Please fix the highlighted fields and try again.';
          status.classList.add('is-error');
        }
        return;
      }

      /* --------------------------------------------------------
         FORM SUBMISSION
         --------------------------------------------------------
         Right now this shows a friendly confirmation without
         sending data anywhere (perfect for GitHub Pages preview).

         To send real bookings, connect a service:

         ---- OPTION A: Formspree / Basin / Netlify (recommended) ----
         Set the <form action="..."> and method="POST" in index.html,
         then REPLACE the "success block" below with this fetch call:

           var data = new FormData(form);
           fetch(form.action, {
             method: 'POST',
             body: data,
             headers: { 'Accept': 'application/json' }
           })
           .then(function (res) {
             if (res.ok) { showSuccess(); form.reset(); }
             else { showFailure(); }
           })
           .catch(showFailure);

         ---- OPTION B: EmailJS ----
         1. Add the EmailJS SDK <script> to index.html <head>.
         2. Call emailjs.init('YOUR_PUBLIC_KEY').
         3. Replace the success block with:

           emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', form)
             .then(function () { showSuccess(); form.reset(); })
             .catch(showFailure);

         ---- OPTION C: Google Forms ----
         Point the form action to your Google Form's formResponse URL
         and rename each input's "name" to the matching entry.XXXX id.
         -------------------------------------------------------- */

      // Default (no backend) success block:
      showSuccess();
      form.reset();
    });

    function showSuccess() {
      if (!status) return;
      var name = (document.getElementById('name').value || '').trim();
      status.textContent = (name ? 'Thanks, ' + name + '! ' : 'Thank you! ') +
        'Your booking request has been received. We’ll contact you shortly to confirm.';
      status.className = 'form__status is-success';
      status.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    function showFailure() {
      if (!status) return;
      status.textContent = 'Something went wrong. Please call us at (555) 123-4567 and we’ll get you booked.';
      status.className = 'form__status is-error';
    }
  }

  /* ----------------------------------------------------------
     9. FOOTER YEAR
     ---------------------------------------------------------- */
  function setFooterYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ----------------------------------------------------------
     Prevent booking dates in the past (nice-to-have UX)
     ---------------------------------------------------------- */
  function setMinBookingDate() {
    var dateInput = document.getElementById('date');
    if (!dateInput) return;
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = yyyy + '-' + mm + '-' + dd;
  }
})();
