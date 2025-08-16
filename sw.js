
const CACHE = 'kpop-memory-v2';
const ASSETS = [
  './','./index.html','./style.css','./game.js','./manifest.webmanifest',
  './assets/logo.webp','./assets/bg-1600x900.webp','./assets/bg-1200x600.webp',
  './assets/back.svg','./assets/lightstick.svg','./assets/mic.svg','./assets/disco.svg',
  './assets/sneaker.svg','./assets/album.svg','./assets/headphone.svg','./assets/star.svg','./assets/heart.svg',
  './anim/confetti.webp','./anim/lightstick.webp',
  './audio/bg.wav','./audio/match.wav','./audio/miss.wav','./audio/power.wav',
  './icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png'
];
self.addEventListener('install', e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e=>{ e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE?caches.delete(k):null)))); self.clients.claim(); });
self.addEventListener('fetch', e=>{
  const url = new URL(e.request.url);
  if(url.origin===location.origin){
    e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request).then(res=>{
      const copy=res.clone(); caches.open(CACHE).then(c=>c.put(e.request, copy)); return res;
    }).catch(()=> caches.match('./index.html'))));
  }
});
