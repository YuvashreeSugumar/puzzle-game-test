self.addEventListener('install',e=>{e.waitUntil(caches.open('kpop-rush').then(c=>c.addAll(['.','index.html','style.css','game.js'])))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
