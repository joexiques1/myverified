(function () {
  var NAV_HTML = '<nav id="main-nav">' +
    '<ul class="nav-links">' +
      '<li><a href="about.html" data-nav="about">About</a></li>' +
      '<li><a href="creators.html" data-nav="creators">Creators</a></li>' +
      '<li><a href="subscribers.html" data-nav="subscribers">Subscribers</a></li>' +
    '</ul>' +
    '<div class="nav-logo"><a href="index.html"><img src="img/my-verified-logo.png" alt="myVerified"></a></div>' +
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
  } else {
    loadHeader();
  }
})();
