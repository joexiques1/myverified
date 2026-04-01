// ── SHARED GSAP UTILITIES ──
(function () {
  function initUtils() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // ── WIPE-FADE: left-to-right clip-path reveal on scroll entrance ──
    document.querySelectorAll('.wipe-fade').forEach(function (el) {
      gsap.fromTo(el,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)', opacity: 1,
          duration: 1.6,
          ease: 'sine.inOut',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true }
        }
      );
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUtils);
  } else {
    initUtils();
  }
})();
