(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js-ready');

  var header = document.querySelector('[data-site-header]');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && !reduceMotion && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  var journeys = document.querySelectorAll('[data-journey]');
  journeys.forEach(function (journey) {
    var stageImage = journey.querySelector('[data-journey-stage-image]');
    var stageCaption = journey.querySelector('[data-journey-stage-caption]');
    var stageCount = journey.querySelector('[data-journey-stage-count]');
    var steps = journey.querySelectorAll('[data-journey-step]');
    if (!stageImage || !steps.length) return;

    var activateStep = function (step) {
      var image = step.getAttribute('data-image');
      if (!image || stageImage.getAttribute('src') === image) return;
      steps.forEach(function (item) {
        item.classList.toggle('is-active', item === step);
      });
      stageImage.classList.add('is-switching');
      window.setTimeout(function () {
        stageImage.src = image;
        stageImage.alt = step.getAttribute('data-alt') || '';
        if (stageCaption) stageCaption.textContent = step.getAttribute('data-caption') || '';
        if (stageCount) stageCount.textContent = step.getAttribute('data-count') || '';
        stageImage.classList.remove('is-switching');
      }, reduceMotion ? 0 : 160);
    };

    steps[0].classList.add('is-active');
    if ('IntersectionObserver' in window) {
      var journeyObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) activateStep(entry.target);
        });
      }, { threshold: 0.55, rootMargin: '-18% 0px -28% 0px' });
      steps.forEach(function (step) { journeyObserver.observe(step); });
    }
  });
})();
