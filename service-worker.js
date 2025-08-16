self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("kpop-memory-cache").then(cache => {
      return cache.addAll([
        "./index.html","./style.css","./script.js","./manifest.json",
        "./assets/card_back.png","./assets/music.mp3"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
