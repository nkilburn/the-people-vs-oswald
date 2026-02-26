/* =============================================
   THE PEOPLE VS. LEE HARVEY OSWALD
   Redesign — Countdown, Form, Interactions
   ============================================= */

(function () {
  'use strict';

  // --- COUNTDOWN — FLIP CLOCK ---
  const TARGET_DATE = new Date('2027-03-01T00:00:00-06:00'); // CST

  function updateCountdown() {
    const now = new Date();
    let diff = TARGET_DATE - now;

    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Pad to strings
    const daysStr = days.toString().padStart(3, '0');
    const hoursStr = hours.toString().padStart(2, '0');
    const minStr = minutes.toString().padStart(2, '0');
    const secStr = seconds.toString().padStart(2, '0');

    // Update individual flip cards
    setFlipDigit('flip-days-1', daysStr[0]);
    setFlipDigit('flip-days-2', daysStr[1]);
    setFlipDigit('flip-days-3', daysStr[2]);

    setFlipDigit('flip-hours-1', hoursStr[0]);
    setFlipDigit('flip-hours-2', hoursStr[1]);

    setFlipDigit('flip-min-1', minStr[0]);
    setFlipDigit('flip-min-2', minStr[1]);

    setFlipDigit('flip-sec-1', secStr[0]);
    setFlipDigit('flip-sec-2', secStr[1]);
  }

  function setFlipDigit(id, value) {
    var el = document.getElementById(id);
    if (!el) return;
    var span = el.querySelector('.flip-card span');
    if (!span) return;

    if (span.textContent !== value) {
      // Trigger a subtle flip animation
      var card = el.querySelector('.flip-card');
      card.style.transition = 'transform 0.15s ease-in';
      card.style.transform = 'scaleY(0.9)';

      setTimeout(function () {
        span.textContent = value;
        card.style.transition = 'transform 0.2s ease-out';
        card.style.transform = 'scaleY(1)';
      }, 100);
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  // --- FORM HANDLING ---
  var form = document.getElementById('subscribe-form');
  var successEl = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('sub-name').value.trim();
      var email = document.getElementById('sub-email').value.trim();

      if (!name || !email) return;

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        document.getElementById('sub-email').setCustomValidity('Please enter a valid email.');
        document.getElementById('sub-email').reportValidity();
        return;
      }

      document.getElementById('sub-email').setCustomValidity('');

      // Simulate submission
      form.hidden = true;
      successEl.hidden = false;
      successEl.focus();

      console.log('Subscription:', { name: name, email: email });
    });
  }


  // --- SMOOTH SCROLL ---
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = this.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });


  // --- SCROLL-BASED NAV STYLE CHANGE ---
  var nav = document.querySelector('.site-nav');
  var hero = document.querySelector('.hero');

  if (nav && hero) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          // Past hero — nav needs white text on dark sections
          nav.classList.add('nav--scrolled');
        } else {
          nav.classList.remove('nav--scrolled');
        }
      });
    }, { threshold: 0.1 });

    observer.observe(hero);
  }

  // Add scroll style to CSS dynamically
  var style = document.createElement('style');
  style.textContent = '.nav--scrolled .nav-pill { background: rgba(0,0,0,0.8); color: #fff; border-color: rgba(255,255,255,0.3); } .nav--scrolled .nav-pill:hover { background: rgba(255,255,255,0.15); border-color: #fff; } .nav--scrolled .nav-pill--red { background: #c0392b; border-color: #c0392b; }';
  document.head.appendChild(style);

  // --- ROTATING TEXT IN "I AM" SECTION ---
  var rotatingWords = document.querySelectorAll('#rotating-text .rotate-word');
  if (rotatingWords.length > 0) {
    var currentWordIndex = 0;
    var rotateInterval = 2500; // ms between rotations

    setInterval(function () {
      var currentWord = rotatingWords[currentWordIndex];
      currentWord.classList.remove('active');
      currentWord.classList.add('exit-up');

      // Move to next word
      currentWordIndex = (currentWordIndex + 1) % rotatingWords.length;
      var nextWord = rotatingWords[currentWordIndex];

      // Small delay so exit animation plays before enter
      setTimeout(function () {
        currentWord.classList.remove('exit-up');
        nextWord.classList.add('active');
      }, reduced ? 0 : 300);

    }, rotateInterval);
  }


  // --- INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ---
  if (!reduced) {
    var fadeStyle = document.createElement('style');
    fadeStyle.textContent = '.fade-in { opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease, transform 0.8s ease; } .fade-in.visible { opacity: 1; transform: translateY(0); }';
    document.head.appendChild(fadeStyle);

    // Apply to key elements
    var fadeTargets = document.querySelectorAll('.accused__content, .accused__tagline, .jury__heading, .jury__text, .section-title, .subscribe__heading, .format-card, .timeline__card, .quote-banner__text, .evidence-room__inner');
    fadeTargets.forEach(function (el) { el.classList.add('fade-in'); });

    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    fadeTargets.forEach(function (el) { fadeObserver.observe(el); });
  }

})();
