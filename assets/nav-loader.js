(function(){
  function inject(id, url){
    return fetch(url, {cache: 'no-store'})
      .then(function(res){ if(!res.ok) throw new Error('Failed '+url); return res.text(); })
      .then(function(html){
        var el = document.getElementById(id);
        if(el) el.innerHTML = html;
      }).catch(function(e){ console.error(e); });
  }

  // Toggle menu if not defined elsewhere (keeps back-compat with assets/app.js)
  if (typeof window.toggleMenu !== 'function') {
    window.toggleMenu = function(){
      document.documentElement.classList.toggle('nav-open');
    };
  }

  // Inject header/footer
  Promise.all([
    inject('site-header', 'assets/nav.html'),
    inject('site-footer', 'assets/footer.html')
  ]).then(function(){
    // Set active link
    try {
      var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
      // GitHub Pages may serve root as '' — normalize
      if (path === '') path = 'index.html';
      var links = document.querySelectorAll('.site-header nav a[data-path]');
      links.forEach(function(a){
        var apath = (a.getAttribute('data-path') || '').toLowerCase();
        if (apath === path) { a.setAttribute('aria-current','page'); a.classList.add('active'); }
      });
    } catch(e){ console.warn(e); }

    // Set year
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  });
})();