// Main JS for Granja Los Compadres - injects header/footer, handles menu toggle and active link
(function(){
  function injectPartial(url, selector){
    return fetch(url).then(function(res){
      if(!res.ok) throw new Error('Failed to load '+url);
      return res.text();
    }).then(function(html){
      document.querySelector(selector).innerHTML = html;
    });
  }

  function initMenu(){
    const btn = document.querySelector('.menu-toggle');
    const nav = document.getElementById('primary-navigation');
    if(btn && nav){
      btn.addEventListener('click', function(){
        const isOpen = nav.classList.toggle('show');
        btn.setAttribute('aria-expanded', String(isOpen));
      });
    }
  }

  function markActive(){
    const page = document.body.dataset.page || '';
    const links = document.querySelectorAll('#primary-navigation a');
    links.forEach(function(a){
      a.removeAttribute('aria-current');
      const href = a.getAttribute('href') || '';
      if((page && href.indexOf(page) !== -1) || (page === 'index' && href.indexOf('index.html') !== -1)){
        a.setAttribute('aria-current','page');
      }
    });
  }

  // Inject header/footer then init behaviour
  document.addEventListener('DOMContentLoaded', function(){
    var headerPromise = injectPartial('/improvements/uniform-pages/partials/header.html', '#site-header');
    var footerPromise = injectPartial('/improvements/uniform-pages/partials/footer.html', '#site-footer');
    Promise.all([headerPromise, footerPromise]).then(function(){
      initMenu();
      markActive();
    }).catch(function(err){
      // Fallback: try loading from root-relative paths
      injectPartial('/partials/header.html', '#site-header').catch(()=>{});
      injectPartial('/partials/footer.html', '#site-footer').catch(()=>{});
      console.error(err);
    });
  });
})();
