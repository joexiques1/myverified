(function () {
  var NAV_HTML = '<nav id="main-nav">' +
    '<button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">' +
      '<span class="nav-toggle-bar"></span>' +
      '<span class="nav-toggle-bar"></span>' +
      '<span class="nav-toggle-bar"></span>' +
    '</button>' +
    '<ul class="nav-links" id="nav-links">' +
      '<li><a href="about.html" data-nav="about">Our Mission</a></li>' +
      '<li><a href="about.html#section-team" data-nav="team">Our Team</a></li>' +
      '<li><a href="creators.html" data-nav="creators">Creators</a></li>' +
      '<li><a href="subscribers.html" data-nav="subscribers">Subscribers</a></li>' +
      '<li class="nav-links-login"><a href="#" data-nav="login">Log In</a></li>' +
    '</ul>' +
    '<div class="nav-logo"><a href="index.html" aria-label="myVerified home"><img src="img/my-verified-logo.png" alt="myVerified"></a></div>' +
    '<div class="nav-right">' +
      '<a href="#" class="nav-login">Log In</a>' +
      '<a href="#" class="btn-signup">Sign Up</a>' +
    '</div>' +
  '</nav>';

  function loadHeader() {
    var placeholder = document.getElementById('header-placeholder');
    if (!placeholder) return;

    var wrapper = document.createElement('div');
    wrapper.innerHTML = NAV_HTML;
    var nav = wrapper.firstElementChild;
    placeholder.replaceWith(nav);

    // Nav scroll behavior
    window.addEventListener('scroll', function () {
      nav.classList.toggle('nav-scrolled', window.scrollY > 60);
    }, { passive: true });

    // Active nav link based on data-page on <body>
    var page = document.body.dataset.page;
    if (page) {
      var link = nav.querySelector('[data-nav="' + page + '"]');
      if (link) link.classList.add('nav-active');
    }

    // Mobile menu toggle
    var toggle = nav.querySelector('.nav-toggle');

    function setMenu(open) {
      nav.classList.toggle('nav-open', open);
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('nav-open'));
    });

    // Close the menu when a link is chosen
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });

    // Close on Escape and return focus to the toggle
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
        setMenu(false);
        toggle.focus();
      }
    });

    // Reset state if the viewport grows past the mobile breakpoint
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1100 && nav.classList.contains('nav-open')) setMenu(false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
  } else {
    loadHeader();
  }
})();
