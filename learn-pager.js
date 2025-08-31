(function(){
  var mount = document.getElementById('learn-pager');
  if(!mount) return;
  fetch('assets/learn-toc.json', {cache:'no-store'}).then(function(r){return r.json();}).then(function(toc){
    var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var idx = toc.findIndex(function(p){ return p.href.toLowerCase() === path; });
    if (idx === -1) return;
    function link(i, label){
      if (i < 0 || i >= toc.length) return '<span class="pager-spacer"></span>';
      var p = toc[i]; return '<a class="btn btn-secondary" href="'+p.href+'">'+label+': '+p.title+'</a>';
    }
    mount.innerHTML = '<nav class="learn-pager">'+
      link(idx-1,'← Prev')+
      '<span class="pager-current">'+toc[idx].title+'</span>'+
      link(idx+1,'Next →')+
      '</nav>';
  }).catch(function(e){ console.error(e); });
})();