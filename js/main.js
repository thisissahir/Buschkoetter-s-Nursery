/* ============================================================================
   Buschkoetter's Nursery — site behavior
   Scroll-reveal (IntersectionObserver), header condense, mobile menu,
   today's-hours highlight, footer year. Vanilla JS, no dependencies.
   ============================================================================ */
(function () {
  'use strict';

  /* ---- scroll reveal (IntersectionObserver) ------------------------------ */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');
  function revealAll() { reveals.forEach(function (el) { el.classList.add('in'); }); }

  if (reduce || !('IntersectionObserver' in window)) {
    revealAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
    reveals.forEach(function (el) { io.observe(el); });

    // Failsafe: content must never stay hidden. If the observer hasn't
    // revealed anything shortly after load (flaky environment, blocked paint),
    // just show everything.
    var failsafe = function () {
      if (reveals.length && !document.querySelector('.reveal.in')) revealAll();
    };
    window.addEventListener('load', function () { setTimeout(failsafe, 1200); });
    setTimeout(failsafe, 2500);
  }

  /* ---- header condense on scroll ----------------------------------------- */
  var hdr = document.querySelector('.hdr');
  if (hdr) {
    var onScroll = function () {
      hdr.classList.toggle('scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- mobile nav overlay ------------------------------------------------- */
  var burger = document.querySelector('.hdr-burger');
  var mobnav = document.querySelector('.mobnav');
  var closeBtn = document.querySelector('.mobnav-close');
  function openNav() { if (mobnav) { mobnav.classList.add('open'); document.body.style.overflow = 'hidden'; } }
  function closeNav() { if (mobnav) { mobnav.classList.remove('open'); document.body.style.overflow = ''; } }
  if (burger) burger.addEventListener('click', openNav);
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  if (mobnav) {
    mobnav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });

  /* ---- today's hours highlight ------------------------------------------- */
  // data-day = 0..6 (Mon..Sun). JS getDay(): Sun=0..Sat=6 -> map to Mon=0.
  var todayIdx = (new Date().getDay() + 6) % 7;
  document.querySelectorAll('.hours .row').forEach(function (row) {
    if (parseInt(row.getAttribute('data-day'), 10) === todayIdx) {
      row.classList.add('today');
      var day = row.querySelector('.day');
      if (day && !day.querySelector('.dot')) {
        var dot = document.createElement('span');
        dot.className = 'dot';
        day.insertBefore(dot, day.firstChild);
      }
    }
  });

  /* ---- footer year -------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
