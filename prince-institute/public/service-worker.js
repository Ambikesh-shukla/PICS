/* Simple offline-friendly service worker for Prince Institute website
   Caches core static assets so the home page and key pages still work offline. */
const CACHE = 'pics-v1';
const CORE = [
  './',
  './index.html',
  './courses.html',
  './gallery.html',
  './contact.html',
  './admin.html',
  './css/style.css',
  './js/script.js',
  './images/hero.png',
  './images/lab1.png',
  './images/classroom1.png',
  './images/classroom2.png',
  './images/students1.png',
  './images/faculty1.png',
  './images/faculty2.png',
  './images/building.png',
  './images/event1.png',
  './images/cert1.png',
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
